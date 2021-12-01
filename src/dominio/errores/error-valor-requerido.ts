import { ErrorDeNegocio } from './error-de-negocio';

export class ErrorValorRequerido extends ErrorDeNegocio {
  constructor(message: string) {
    super(message, ErrorValorRequerido.name);
  }
}
