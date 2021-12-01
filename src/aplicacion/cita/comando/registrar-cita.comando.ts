import { IsDateString, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ComandoRegistrarCita {
  @IsString()
  @ApiProperty({ example: 'pequeno' })
  public raza: string;

  @IsString()
  @ApiProperty({ example: '08:00' })
  public hora: string;

  @IsDateString()
  @ApiProperty({ type: Date, example: '2021-11-29T00:00:00' })
  public fecha: string;
}
