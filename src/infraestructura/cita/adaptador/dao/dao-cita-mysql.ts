import { EntityManager } from 'typeorm';
import { InjectEntityManager } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { DaoCita } from 'src/dominio/cita/puerto/dao/dao-cita';
import { CitaDto } from 'src/aplicacion/cita/consulta/dto/cita.dto';

@Injectable()
export class DaoCitaMysql implements DaoCita {
  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}

  async listar(): Promise<CitaDto[]> {
    return this.entityManager.query(
      'SELECT id, raza, hora, fecha, valor FROM CITA',
    );
  }
}
