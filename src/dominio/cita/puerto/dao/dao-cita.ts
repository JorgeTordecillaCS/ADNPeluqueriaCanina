import { CitaDto } from 'src/aplicacion/cita/consulta/dto/cita.dto';

export abstract class DaoCita {
  abstract async listar(): Promise<CitaDto[]>;
}
