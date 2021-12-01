import { RepositorioCita } from '../puerto/repositorio/repositorio-cita';
import { Cita } from '../modelo/cita';
import { ErrorDeNegocio } from 'src/dominio/errores/error-de-negocio';

export class ServicioRegistrarCita {
  constructor(private readonly _repositorioCita: RepositorioCita) {}

  async ejecutar(cita: Cita) {
    if (
      await this._repositorioCita.existeCita(
        cita.hora,
        cita.fecha,
        cita.finalCita,
      )
    ) {
      throw new ErrorDeNegocio(
        `La cita para ${cita.fecha.toDateString()} a las ${
          cita.hora
        } ya esta ocupada`,
      );
    }

    await this._repositorioCita.guardar(cita);
  }
}
