import { RepositorioCita } from '../puerto/repositorio/repositorio-cita';

export class ServicioCancelarCita {
  constructor(private readonly _repositorioCita: RepositorioCita) {}

  async ejecutar(id: number) {
    await this._repositorioCita.borrar(id);
  }
}
