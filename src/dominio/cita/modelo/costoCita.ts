enum valorRaza {
  pequeno = 40000,
  mediano = 50000,
  grande = 70000,
}
const RECARGO_SABADO = 1.25;

export class CostoCita {
  readonly DIA_SABADO: number;
  constructor() {
    this.DIA_SABADO = 6;
  }
  public valorTotal(raza, fecha): string {
    const sobreCostoSabado = new Date(fecha).getDay();
    let value = parseInt(valorRaza[raza], 10);
    if (sobreCostoSabado === this.DIA_SABADO) {
      value = value * RECARGO_SABADO;
      return `${value}`;
    }
    return `${value}`;
  }
}
