import { Injectable } from '@nestjs/common';
import { ServicioCancelarCita } from 'src/dominio/cita/servicio/servicio-cancelar-cita';
import { ComandoCancelarCita } from './borrar-cita.comando';

@Injectable()
export class ManejadorCancelarCita {
  constructor(private _servicioCancelarCita: ServicioCancelarCita) {}

  async ejecutar(comandoCancelarCita: ComandoCancelarCita) {
    await this._servicioCancelarCita.ejecutar(comandoCancelarCita.id);
  }
}
