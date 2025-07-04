import { Injectable, Logger } from '@nestjs/common';
import { PostgresService } from 'src/infrastructure/postgres-db/postgres.service';
import * as fs from 'fs';
import * as path from 'path';
import { GeminiService } from '../gemini-ia/gemini.service';

@Injectable()
export class ConsultaDbIAService {
  private readonly logger = new Logger(ConsultaDbIAService.name);

  constructor(
    private readonly geminiService: GeminiService,
    private readonly postgresService: PostgresService,
  ) { }

  async procesarPregunta(preguntaUsuario: string): Promise<{
    sql: string;
    datos: any;
    respuesta: string;
  }> {
    try {
      // 1. Leer el esquema SQL
      const esquemaPath = path.join(process.cwd(), 'src', 'infrastructure', 'utilities', 'db.sql');
      const estructuraSQL = fs.readFileSync(esquemaPath, 'utf8');

      // 2. Prompt para que Gemini genere la consulta SQL
      const promptSQL = `Tienes la siguiente estructura de base de datos:

${estructuraSQL}

Genera una consulta SQL para responder esta pregunta del usuario: "${preguntaUsuario}"
Usa comparaciones insensibles a mayúsculas (por ejemplo, ILIKE en PostgreSQL) cuando compares texto.
Devuelve solo la consulta SQL, sin explicaciones ni comentarios.`;

      const sqlGeneradoRaw = await this.geminiService.preguntarGemini(promptSQL);
      const sqlLimpio = sqlGeneradoRaw.replace(/```sql|```/g, '').trim();
      //console.log('estructuraSQL:',estructuraSQL);

      this.logger.debug(`🔍 SQL generado:\n${sqlLimpio}`);

      // 3. Ejecutar el SQL
      const resultado = await this.postgresService.query(sqlLimpio);
      const datos = resultado.rows;

      // 4. Generar una conclusión en lenguaje natural
      const promptConclusion = `El usuario preguntó: "${preguntaUsuario}".
Los datos obtenidos de la base de datos son:

${JSON.stringify(datos)}

Redacta una respuesta clara en español explicando estos resultados.`;

      const respuesta = await this.geminiService.preguntarGemini(promptConclusion);

      return {
        sql: sqlLimpio,
        datos,
        respuesta: respuesta.trim(),
      };
    } catch (error) {
      this.logger.error('❌ Error procesando consulta IA + DB', error);
      throw new Error('Error al procesar la consulta con IA y base de datos');
    }
  }
}
