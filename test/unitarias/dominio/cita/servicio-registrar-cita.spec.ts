import { ServicioRegistrarCita } from 'src/dominio/cita/servicio/servicio-registrar-cita';
import { Cita } from 'src/dominio/cita/modelo/cita';
import { RepositorioCita } from 'src/dominio/cita/puerto/repositorio/repositorio-cita';
import { SinonStubbedInstance } from 'sinon';
import { createStubObj } from '../../../util/create-object.stub';

describe('ServicioRegistrarUsuario', () => {
  let servicioRegistrarCita: ServicioRegistrarCita;
  let repositorioCitaStub: SinonStubbedInstance<RepositorioCita>;

  beforeEach(() => {
    repositorioCitaStub = createStubObj<RepositorioCita>([
      'existeCita',
      'guardar',
      'borrar',
    ]);
    servicioRegistrarCita = new ServicioRegistrarCita(repositorioCitaStub);
  });

  it('Debe retornar un error si la cita ya esta reservada', async () => {
    repositorioCitaStub.existeCita.returns(Promise.resolve(true));

    await expect(
      servicioRegistrarCita.ejecutar(
        new Cita('mediano', '09:10', '2021-12-03T05:00:00.000'),
      ),
    ).rejects.toThrow(
      'La cita para Fri Dec 03 2021 a las 09:10 ya esta ocupada',
    );
  });

  it('Debe registrar una cita si el espacio no esta reservado', async () => {
    const cita = new Cita('mediano', '09:00', '2021-12-03T05:00:00.000');
    repositorioCitaStub.existeCita.returns(Promise.resolve(false));

    await servicioRegistrarCita.ejecutar(cita);
    expect(repositorioCitaStub.guardar.getCalls().length).toBe(1);
    expect(repositorioCitaStub.guardar.calledWith(cita)).toBeTruthy();
  });
});
