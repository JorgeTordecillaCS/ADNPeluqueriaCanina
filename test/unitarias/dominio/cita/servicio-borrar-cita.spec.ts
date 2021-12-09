import { ServicioCancelarCita } from 'src/dominio/cita/servicio/servicio-cancelar-cita';
import { RepositorioCita } from 'src/dominio/cita/puerto/repositorio/repositorio-cita';
import { SinonStubbedInstance } from 'sinon';
import { createStubObj } from '../../../util/create-object.stub';

describe('ServicioRegistrarUsuario', () => {
  let servicioCancelarCita: ServicioCancelarCita;
  let repositorioCitaStub: SinonStubbedInstance<RepositorioCita>;

  beforeEach(() => {
    repositorioCitaStub = createStubObj<RepositorioCita>(['borrar']);
    servicioCancelarCita = new ServicioCancelarCita(repositorioCitaStub);
  });

  it('Debe borrar una cita', async () => {
    await servicioCancelarCita.ejecutar(100);
    await servicioCancelarCita.ejecutar(101);
    expect(repositorioCitaStub.borrar.getCalls().length).toBe(2);
    expect(repositorioCitaStub.borrar.calledWith(100)).toBeTruthy();
    expect(repositorioCitaStub.borrar.calledWith(101)).toBeTruthy();
  });
});
