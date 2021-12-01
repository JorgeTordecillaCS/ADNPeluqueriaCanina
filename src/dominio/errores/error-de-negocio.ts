export class ErrorDeNegocio extends Error {
  constructor(message: string, clase?: string) {
    super(message);
    this.name = clase || ErrorDeNegocio.name;
  }
}
