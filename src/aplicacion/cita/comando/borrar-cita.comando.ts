import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ComandoCancelarCita {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ example: 1 })
  public id: number;
}
