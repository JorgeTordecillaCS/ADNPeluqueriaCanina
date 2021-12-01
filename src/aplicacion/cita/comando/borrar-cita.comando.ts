import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ComandoCancelarCita {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Pequeña' })
  public id: string;
}
