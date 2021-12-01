import { DaoCita } from 'src/dominio/cita/puerto/dao/dao-cita';
import { DaoCitaMysql } from 'src/infraestructura/cita/adaptador/dao/dao-cita-mysql';

export const daoCitaProvider = {
  provide: DaoCita,
  useClass: DaoCitaMysql,
};
