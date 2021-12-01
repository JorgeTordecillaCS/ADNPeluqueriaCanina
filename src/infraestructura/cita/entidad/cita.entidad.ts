import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'cita' })
export class CitaEntidad {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  raza: string;

  @Column()
  hora: string;

  @Column()
  fecha: Date;

  @Column()
  finalCita: string;

  @Column()
  valor: string;
}
