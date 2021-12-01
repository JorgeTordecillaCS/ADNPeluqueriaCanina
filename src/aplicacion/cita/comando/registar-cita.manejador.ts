import { Injectable } from '@nestjs/common';
import { ServicioRegistrarCita } from 'src/dominio/cita/servicio/servicio-registrar-cita';
import { ComandoRegistrarCita } from './registrar-cita.comando';
import { Cita } from 'src/dominio/cita/modelo/cita';

@Injectable()
export class ManejadorRegistrarCita {
  constructor(private _servicioRegistrarCita: ServicioRegistrarCita) {}

  async ejecutar(comandoRegistrarCita: ComandoRegistrarCita) {
    await this._servicioRegistrarCita.ejecutar(
      new Cita(
        comandoRegistrarCita.raza,
        comandoRegistrarCita.hora,
        comandoRegistrarCita.fecha,
      ),
    );
  }
}
