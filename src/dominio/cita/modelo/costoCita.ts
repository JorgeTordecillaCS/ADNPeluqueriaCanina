enum valorRaza {
  pequeno = 40000,
  mediano = 50000,
  grande = 70000,
}

export class CostoCita {
  readonly DIA_SABADO: number;
  constructor() {
    this.DIA_SABADO = 6;
  }
  public valorTotal(raza, fecha): string {
    const sobreCostoSabado = new Date(fecha).getDay();
    let value = parseInt(valorRaza[raza]);
    if (sobreCostoSabado === this.DIA_SABADO) {
      value = value * 1.25;
      return `${value}`;
    }
    return `${value}`;
  }
}
