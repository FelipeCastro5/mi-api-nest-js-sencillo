import { Injectable, Logger } from '@nestjs/common';
import { GeminiService } from '../gemini-ia/gemini.service';
import { PostgresService } from 'src/infrastructure/postgres-db/postgres.service';
import { HistorialRepository } from '../repository/historial.repository';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class MixtoDbHistorialService {
  private readonly logger = new Logger(MixtoDbHistorialService.name);

  constructor(
    private readonly geminiService: GeminiService,
    private readonly postgresService: PostgresService,
    private readonly historialRepository: HistorialRepository,
  ) {}

  async procesarMixto(fk_user: number, preguntaUsuario: string): Promise<string> {
    try {
      // 1. Leer esquema SQL
      const esquemaPath = path.join(process.cwd(), 'src', 'infrastructure', 'utilities', 'db.sql');
      const estructuraSQL = fs.readFileSync(esquemaPath, 'utf8');

      // 2. Generar SQL desde pregunta
      const promptSQL = `Estructura de la base de datos:

${estructuraSQL}

Genera una consulta SQL que responda esta pregunta del usuario:
"${preguntaUsuario}"

Usa comparaciones insensibles a mayúsculas (ej: ILIKE para PostgreSQL).
No agregues comentarios ni explicaciones, solo el SQL.`;

      const sqlGenerado = await this.geminiService.preguntarGemini(promptSQL);
      const sqlLimpio = sqlGenerado.replace(/```sql|```/g, '').trim();

      this.logger.debug(`SQL generado: ${sqlLimpio}`);

      // 3. Ejecutar el SQL
      const resultado = await this.postgresService.query(sqlLimpio);
      const datos = resultado.rows;

      // 4. Obtener historial de usuario
      const historial = await this.historialRepository.getLastFiveByUser(fk_user);

      const historialTexto = historial.map(
        h => `Usuario: ${h.question}\nIA: ${h.answer}`
      ).join('\n\n');

      // 5. Crear prompt final
      const promptFinal = `El usuario hizo esta nueva pregunta: "${preguntaUsuario}"

Este es el historial de la conversación reciente:
${historialTexto}

Y estos son los datos actuales que obtuvimos desde la base de datos:
${JSON.stringify(datos)}

Redacta una respuesta comparativa y clara en español. Limítala a 400-500 caracteres.`;

      const respuesta = await this.geminiService.preguntarGemini(promptFinal);

      // 6. Guardar en historial
      await this.historialRepository.insertHistorial(fk_user, preguntaUsuario, respuesta);

      // 7. Retornar la respuesta final
      return respuesta.trim();
    } catch (error) {
      this.logger.error('❌ Error en servicio mixto DB + Historial', error);
      throw new Error('Error procesando la pregunta con historial y base de datos');
    }
  }
}
