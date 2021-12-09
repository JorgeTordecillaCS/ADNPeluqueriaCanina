import { ErrorHorarioInvalido } from 'src/dominio/errores/error-horario-invalido';
const HORA_APERTURA = '08:00';
const HORA_CIERRE = '17:00';
const RECARGO_SABADO = 1.25;
const DIA_SABADO = 6;
enum valorRaza {
  pequeno = 40000,
  mediano = 50000,
  grande = 70000,
}

export class Cita {
  readonly _raza: string;
  readonly _fecha: Date;
  readonly _hora: string;
  readonly _finalCita: string;
  readonly _valor: string;

  constructor(raza: string, hora: string, fecha: string) {
    this.horarioValido(hora, fecha);
    this._raza = raza;
    this._fecha = new Date(fecha);
    this._hora = hora;
    this._finalCita = this.obtenerFinalCita(hora);
    this._valor = this.valorTotal(raza, fecha);
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
  private valorTotal(raza, fecha): string {
    const sobreCostoSabado = new Date(fecha).getDay();
    let value = parseInt(valorRaza[raza], 10);
    if (sobreCostoSabado === DIA_SABADO) {
      value = value * RECARGO_SABADO;
      return `${value}`;
    }
    return `${value}`;
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
