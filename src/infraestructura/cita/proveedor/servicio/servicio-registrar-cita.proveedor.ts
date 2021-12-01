import { RepositorioCita } from 'src/dominio/cita/puerto/repositorio/repositorio-cita';
import { ServicioRegistrarCita } from 'src/dominio/cita/servicio/servicio-registrar-cita';

export function servicioRegistrarCitaProveedor(
  repositorioCita: RepositorioCita,
) {
  return new ServicioRegistrarCita(repositorioCita);
}
