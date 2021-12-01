import { ApiProperty } from '@nestjs/swagger';

export class CitaDto {
  @ApiProperty({ example: 'Pequeno' })
  raza: string;

  @ApiProperty({ example: '08:00' })
  hora: string;

  @ApiProperty({ type: Date, example: '2021-11-29T00:00:00' })
  fecha: string;

  @ApiProperty({ example: '08:00' })
  finalCita: string;

  @ApiProperty({ example: '50000' })
  valor: string;
}
