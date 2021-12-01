import { Module } from '@nestjs/common';
import { CitaControlador } from './controlador/citas.controlador';
import { CitaProveedorModule } from './proveedor/cita-proveedor.module';

@Module({
  imports: [CitaProveedorModule],
  controllers: [CitaControlador],
})
export class CitaModule {}
