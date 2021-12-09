import { Cita } from 'src/dominio/cita/modelo/cita';
import { CitaEntidad } from '../../entidad/cita.entidad';

const MAPKEYS = ['raza', 'hora', 'fecha', 'finalCita', 'valor'];

export const citaMap = (cita: Cita): CitaEntidad => {
  const entidad = new CitaEntidad();
  MAPKEYS.forEach(key => (entidad[key] = cita[key]));
  return entidad;
};
