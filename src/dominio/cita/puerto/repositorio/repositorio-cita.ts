import { Cita } from '../../modelo/cita';

export abstract class RepositorioCita {
  abstract async existeCita(
    hora: string,
    fecha: Date,
    finalCita: string,
  ): Promise<boolean>;
  abstract async guardar(cita: Cita);
  abstract async borrar(id: string);
}
