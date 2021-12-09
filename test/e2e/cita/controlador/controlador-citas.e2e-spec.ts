import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { RepositorioCita } from 'src/dominio/cita/puerto/repositorio/repositorio-cita';
import { DaoCita } from 'src/dominio/cita/puerto/dao/dao-cita';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { FiltroExcepcionesDeNegocio } from 'src/infraestructura/excepciones/filtro-excepciones-negocio';
import { CitaControlador } from 'src/infraestructura/cita/controlador/citas.controlador';
import { ServicioRegistrarCita } from 'src/dominio/cita/servicio/servicio-registrar-cita';
import { servicioRegistrarCitaProveedor } from 'src/infraestructura/cita/proveedor/servicio/servicio-registrar-cita.proveedor';
import { ManejadorRegistrarCita } from 'src/aplicacion/cita/comando/registar-cita.manejador';
import { ManejadorListarCita } from 'src/aplicacion/cita/consulta/listar-citas.manejador';
import { ComandoRegistrarCita } from 'src/aplicacion/cita/comando/registrar-cita.comando';
import { ComandoCancelarCita } from 'src/aplicacion/cita/comando/borrar-cita.comando';
import { AppLogger } from 'src/infraestructura/configuracion/ceiba-logger.service';
import { createSandbox, SinonStubbedInstance } from 'sinon';
import { createStubObj } from '../../../util/create-object.stub';
import { ServicioCancelarCita } from 'src/dominio/cita/servicio/servicio-cancelar-cita';
import { servicioCancelarCitaProveedor } from 'src/infraestructura/cita/proveedor/servicio/servicio-cancelar-cita.proveedor';
import { ManejadorCancelarCita } from 'src/aplicacion/cita/comando/borrar-cita.manejador';

/**
 * Un sandbox es util cuando el módulo de nest se configura una sola vez durante el ciclo completo de pruebas
 * */
const sinonSandbox = createSandbox();

describe('Pruebas al controlador de usuarios', () => {
  let app: INestApplication;
  let repositorioCita: SinonStubbedInstance<RepositorioCita>;
  let daoCita: SinonStubbedInstance<DaoCita>;
  const message =
    'El horario establecido es de lunes a viernes de 08:00 a 17:00';
  /**
   * No Inyectar los módulos completos (Se trae TypeORM y genera lentitud al levantar la prueba, traer una por una las dependencias)
   **/
  beforeAll(async () => {
    repositorioCita = createStubObj<RepositorioCita>(
      ['existeCita', 'guardar', 'borrar'],
      sinonSandbox,
    );
    daoCita = createStubObj<DaoCita>(['listar'], sinonSandbox);
    const moduleRef = await Test.createTestingModule({
      controllers: [CitaControlador],
      providers: [
        AppLogger,
        {
          provide: ServicioRegistrarCita,
          inject: [RepositorioCita],
          useFactory: servicioRegistrarCitaProveedor,
        },
        {
          provide: ServicioCancelarCita,
          inject: [RepositorioCita],
          useFactory: servicioCancelarCitaProveedor,
        },
        { provide: RepositorioCita, useValue: repositorioCita },
        { provide: DaoCita, useValue: daoCita },
        ManejadorRegistrarCita,
        ManejadorListarCita,
        ManejadorCancelarCita,
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    const logger = await app.resolve(AppLogger);
    logger.customError = sinonSandbox.stub();
    app.useGlobalFilters(new FiltroExcepcionesDeNegocio(logger));
    await app.init();
  });

  afterEach(() => {
    sinonSandbox.restore();
  });

  afterAll(async () => {
    await app.close();
  });

  it('debería listar las citas', () => {
    const citas: any[] = [
      {
        raza: 'mediano',
        hora: '14:00',
        fecha: '2021-11-30T05:00:00.000',
      },
    ];
    daoCita.listar.returns(Promise.resolve(citas));

    return request(app.getHttpServer())
      .get('/citas')
      .expect(HttpStatus.OK)
      .expect(citas);
  });

  it('debería crear una cita valida', async () => {
    const cita: ComandoRegistrarCita = {
      raza: 'grande',
      hora: '08:00',
      fecha: '2021-12-04T05:00:00.000',
    };
    const message = 'Cita creada';
    repositorioCita.existeCita.returns(Promise.resolve(false));

    const response = await request(app.getHttpServer())
      .post('/citas')
      .send(cita)
      .expect(HttpStatus.CREATED);
    expect(response.body.message).toBe(message);
    expect(response.statusCode).toBe(HttpStatus.CREATED);
  });

  it('debería borrar una cita', async () => {
    const cita: ComandoCancelarCita = {
      id: 1,
    };
    const message = 'Cita borrada';
    const response = await request(app.getHttpServer())
      .delete('/citas')
      .send(cita)
      .expect(HttpStatus.OK);
    expect(response.body.message).toBe(message);
    expect(response.statusCode).toBe(HttpStatus.OK);
  });

  it('debería fallar al borrar una cita sin id', async () => {
    const response = await request(app.getHttpServer())
      .delete('/citas')
      .expect(HttpStatus.BAD_REQUEST);
    expect(response.body.message[0]?.property).toBe('id');
    expect(response.body.statusCode).toBe(HttpStatus.BAD_REQUEST);
  });
});
