import { Injectable } from '@nestjs/common';
import { Historial } from 'src/domain/HistorialDomain/historial.entity';
import { GeminiService } from '../gemini-ia/gemini.service';
import { HistorialRepository } from '../repository/historial.repository';

@Injectable()
export class ChatbotService {
  constructor(
    private readonly geminiService: GeminiService,
    private readonly historialRepository: HistorialRepository,
  ) { }

  async procesarPregunta(fk_user: number, nuevaPregunta: string): Promise<string> {
    // 1. Obtener últimas 3–5 preguntas/respuestas
    const historial: Historial[] = await this.historialRepository.getLastFiveByUser(fk_user);

    // 2. Armar el contexto del prompt
    let contexto = '';

    if (historial.length === 0) {
      contexto = `El usuario pregunta: "${nuevaPregunta}". Responde de forma clara y en español.`;
    } else {
      contexto = 'Según este historial de conversación:\n\n';
      for (const item of historial) {
        contexto += `Usuario: ${item.question}\nIA: ${item.answer}\n\n`;
      }
      contexto += `Ahora el usuario pregunta: "${nuevaPregunta}"\nResponde de forma clara y en español con un limite de 400 a 500 caracteres.`;
    }
    // 3. Consultar a Gemini con el prompt
    console.log('contexto almacenado: ',contexto)
    const respuesta = await this.geminiService.preguntarGemini(contexto);

    // 4. Guardar nuevo registro en la base de datos
    await this.historialRepository.insertHistorial(fk_user, nuevaPregunta, respuesta);

    // 5. Retornar la respuesta final
    return respuesta;
  }
}
