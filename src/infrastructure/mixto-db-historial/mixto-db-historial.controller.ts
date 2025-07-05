// src/application/controllers/mixto-db-historial.controller.ts
import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { MixtoDbHistorialService } from './mixto-db-historial.service';
import { MixtoDbHistorialDto } from './mixto-db-historial.dto';

@ApiTags('IA - DB + Historial')
@Controller('ia-mixta')
export class MixtoDbHistorialController {
  constructor(
    private readonly mixtoService: MixtoDbHistorialService,
  ) {}

  @Post('procesar')
  @ApiOperation({ summary: 'Procesar pregunta usando base de datos y historial de conversación' })
  @ApiResponse({
    status: 200,
    description: 'Respuesta generada por IA considerando datos actuales y contexto histórico',
    schema: {
      example: {
        respuesta: 'Actualmente hay 3 actividades activas, lo cual representa un aumento respecto a las 2 anteriores. Esto indica una mejora en la participación reciente.',
      },
    },
  })
  async procesarPreguntaMixta(
    @Body() datos: MixtoDbHistorialDto,
  ): Promise<{ respuesta: string }> {
    const respuesta = await this.mixtoService.procesarMixto(
      datos.fk_user,
      datos.pregunta,
    );

    return { respuesta };
  }
}
