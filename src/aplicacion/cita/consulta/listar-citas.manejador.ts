import { Injectable } from '@nestjs/common';
import { DaoCita } from 'src/dominio/cita/puerto/dao/dao-cita';
import { CitaDto } from 'src/aplicacion/cita/consulta/dto/cita.dto';

@Injectable()
export class ManejadorListarCita {
  constructor(private _daoCita: DaoCita) {}

  async ejecutar(): Promise<CitaDto[]> {
    return this._daoCita.listar();
  }
}
