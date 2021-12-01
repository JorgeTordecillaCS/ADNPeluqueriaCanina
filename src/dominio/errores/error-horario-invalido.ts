import { ErrorDeNegocio } from './error-de-negocio';

export class ErrorHorarioInvalido extends ErrorDeNegocio {
  constructor(message: string) {
    super(message, ErrorHorarioInvalido.name);
  }
}
