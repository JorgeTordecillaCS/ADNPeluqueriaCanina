import { RepositorioCita } from 'src/dominio/cita/puerto/repositorio/repositorio-cita';
import { RepositorioCitaMysql } from 'src/infraestructura/cita/adaptador/repositorio/repositorio-cita-mysql';

export const repositorioCitaProvider = {
  provide: RepositorioCita,
  useClass: RepositorioCitaMysql,
};
