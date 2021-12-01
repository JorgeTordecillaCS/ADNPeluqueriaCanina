import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
  Response,
  HttpStatus,
} from '@nestjs/common';
import { ComandoRegistrarCita } from 'src/aplicacion/cita/comando/registrar-cita.comando';
import { ManejadorRegistrarCita } from 'src/aplicacion/cita/comando/registar-cita.manejador';
import { ComandoCancelarCita } from 'src/aplicacion/cita/comando/borrar-cita.comando';
import { ManejadorCancelarCita } from 'src/aplicacion/cita/comando/borrar-cita.manejador';
import { ManejadorListarCita } from 'src/aplicacion/cita/consulta/listar-citas.manejador';
import { CitaDto } from 'src/aplicacion/cita/consulta/dto/cita.dto';

@Controller('citas')
export class CitaControlador {
  constructor(
    private readonly _manejadorRegistrarCita: ManejadorRegistrarCita,
    private readonly _manejadorListarCita: ManejadorListarCita,
    private readonly _manejadorCancelarCita: ManejadorCancelarCita,
  ) {}

  @Get()
  async listar(): Promise<CitaDto[]> {
    return this._manejadorListarCita.ejecutar();
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async crear(
    @Body() comandoRegistrarCita: ComandoRegistrarCita,
    @Response() res,
  ) {
    await this._manejadorRegistrarCita.ejecutar(comandoRegistrarCita);
    res.json({ message: 'Cita creada' }).status(HttpStatus.CREATED);
  }

  @Delete()
  @UsePipes(new ValidationPipe({ transform: true }))
  async borrar(
    @Body() comandoCancelarCita: ComandoCancelarCita,
    @Response() res,
  ) {
    await this._manejadorCancelarCita.ejecutar(comandoCancelarCita);
    res.json({ message: 'Cita borrada' }).status(HttpStatus.OK);
  }
}
