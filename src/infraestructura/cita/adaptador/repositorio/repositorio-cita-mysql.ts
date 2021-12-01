import { RepositorioCita } from 'src/dominio/cita/puerto/repositorio/repositorio-cita';
import { Cita } from 'src/dominio/cita/modelo/cita';
import { InjectRepository } from '@nestjs/typeorm';
import { CitaEntidad } from '../../entidad/cita.entidad';
import { Repository, Between } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RepositorioCitaMysql implements RepositorioCita {
  constructor(
    @InjectRepository(CitaEntidad)
    private readonly repositorio: Repository<CitaEntidad>,
  ) {}

  async existeCita(hora, fecha, finalCita): Promise<boolean> {
    const citaAnterior = this.citaAnterior(finalCita);
    const citaLibre = (await this.repositorio.count({ fecha, hora })) === 0;
    const tiempoCitaLibre =
      (await this.repositorio.count({
        fecha,
        hora: Between(citaAnterior, finalCita),
      })) === 0;
    return !(citaLibre && tiempoCitaLibre);
  }

  async guardar(cita: Cita) {
    const entidad = new CitaEntidad();
    entidad.raza = cita.raza;
    entidad.hora = cita.hora;
    entidad.fecha = cita.fecha;
    entidad.finalCita = cita.finalCita;
    entidad.valor = cita.valor;
    await this.repositorio.save(entidad);
  }

  async borrar(id: string) {
    await this.repositorio.delete(id);
  }

  private citaAnterior(finalCita: string): string {
    const HORA_MENOR_DIES = 9;
    const parcialHora = parseInt(finalCita.split(':')[0], 10) - 1;
    return parcialHora <= HORA_MENOR_DIES
      ? `0${parcialHora}:00`
      : `${parcialHora}:00`;
  }
}
