import { Cita } from 'src/dominio/cita/modelo/cita';
import { ErrorHorarioInvalido } from 'src/dominio/errores/error-horario-invalido';

describe('Cita', () => {
  const _Cita = Cita as any;
  it('Debe fallar una cita fuera del Horario', () => {
    return expect(
      async () => new _Cita('mediano', '07:00', '2021-11-30T05:00:00.000'),
    ).rejects.toStrictEqual(
      new ErrorHorarioInvalido(
        `El horario establecido es de lunes a viernes de 08:00 a 17:00`,
      ),
    );
  });

  it('Debe fallar una  cita el domingo', () => {
    return expect(
      async () => new _Cita('mediano', '09:00', '2021-12-05T05:00:00.000'),
    ).rejects.toStrictEqual(
      new ErrorHorarioInvalido(
        `El horario establecido es de lunes a viernes de 08:00 a 17:00`,
      ),
    );
  });

  it('Cita debe crear bien en los horarios y dias', () => {
    const cita = new _Cita('mediano', '09:00', '2021-12-03T05:00:00.000');

    expect(cita.raza).toEqual('mediano');
    expect(cita.hora).toEqual('09:00');
    expect(cita.finalCita).toEqual('10:00');
    expect(cita.valor).toEqual('50000');
  });

  it('Cita debe crear bien y el sabado debe valor 1.25+', () => {
    const cita = new _Cita('pequeno', '11:00', '2021-12-04T05:00:00.000');

    expect(cita.raza).toEqual('pequeno');
    expect(cita.hora).toEqual('11:00');
    expect(cita.finalCita).toEqual('12:00');
    expect(cita.valor).toEqual('50000');
  });
});
