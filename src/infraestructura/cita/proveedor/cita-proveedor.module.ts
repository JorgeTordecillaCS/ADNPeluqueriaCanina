import { Module } from '@nestjs/common';
import { ServicioRegistrarCita } from 'src/dominio/cita/servicio/servicio-registrar-cita';
import { RepositorioCita } from 'src/dominio/cita/puerto/repositorio/repositorio-cita';
import { servicioRegistrarCitaProveedor } from './servicio/servicio-registrar-cita.proveedor';
import { servicioCancelarCitaProveedor } from './servicio/servicio-cancelar-cita.proveedor';
import { repositorioCitaProvider } from './repositorio/repositorio-cita.proveedor';
import { daoCitaProvider } from './dao/dao-cita.proveedor';
import { ManejadorRegistrarCita } from 'src/aplicacion/cita/comando/registar-cita.manejador';
import { ManejadorListarCita } from 'src/aplicacion/cita/consulta/listar-citas.manejador';
import { DaoCita } from 'src/dominio/cita/puerto/dao/dao-cita';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CitaEntidad } from '../entidad/cita.entidad';
import { ManejadorCancelarCita } from 'src/aplicacion/cita/comando/borrar-cita.manejador';
import { ServicioCancelarCita } from 'src/dominio/cita/servicio/servicio-cancelar-cita';

@Module({
  imports: [TypeOrmModule.forFeature([CitaEntidad])],
  providers: [
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
    repositorioCitaProvider,
    daoCitaProvider,
    ManejadorRegistrarCita,
    ManejadorListarCita,
    ManejadorCancelarCita,
  ],
  exports: [
    ServicioRegistrarCita,
    ManejadorRegistrarCita,
    ManejadorCancelarCita,
    ServicioCancelarCita,
    ManejadorListarCita,
    RepositorioCita,
    DaoCita,
  ],
})
export class CitaProveedorModule {}
