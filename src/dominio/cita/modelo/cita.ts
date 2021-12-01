import { ErrorHorarioInvalido } from 'src/dominio/errores/error-horario-invalido';
import { CostoCita } from './costoCita';
const HORA_APERTURA = '08:00';
const HORA_CIERRE = '17:00';

export class Cita extends CostoCita {
  readonly _raza: string;
  readonly _fecha: Date;
  readonly _hora: string;
  readonly _finalCita: string;
  readonly _valor: string;

  constructor(raza: string, hora: string, fecha: string) {
    super();
    this.horarioValido(hora, fecha);
    this._raza = raza;
    this._fecha = new Date(fecha);
    this._hora = hora;
    this._finalCita = this.obtenerFinalCita(hora);
    this._valor = super.valorTotal(raza, fecha);
  }

  private horarioValido(hora: string, fecha: string) {
    const horarioValido = hora >= HORA_APERTURA && hora <= HORA_CIERRE;
    const diaValido = new Date(fecha).getDay() !== 0;
    if (!horarioValido || !diaValido) {
      throw new ErrorHorarioInvalido(
        `El horario establecido es de lunes a viernes de ${HORA_APERTURA} a ${HORA_CIERRE}`,
      );
    }
  }

  private obtenerFinalCita(hora: string) {
    const HORA_MENOR_DIES = 9;
    const parcialHora = parseInt(hora.split(':')[0], 10) + 1;
    return parcialHora <= HORA_MENOR_DIES
      ? `0${parcialHora}:00`
      : `${parcialHora}:00`;
  }

  get raza(): string {
    return this._raza;
  }

  get fecha(): Date {
    return this._fecha;
  }

  get hora(): string {
    return this._hora;
  }
  get finalCita(): string {
    return this._finalCita;
  }
  get valor(): string {
    return this._valor;
  }
}
