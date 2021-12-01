import { RepositorioCita } from 'src/dominio/cita/puerto/repositorio/repositorio-cita';
import { ServicioCancelarCita } from 'src/dominio/cita/servicio/servicio-cancelar-cita';

export function servicioCancelarCitaProveedor(
  repositorioCita: RepositorioCita,
) {
  return new ServicioCancelarCita(repositorioCita);
}
