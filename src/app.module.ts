import { Module } from '@nestjs/common';
import { UsersModule } from './presentation/modules/user.module';
import { GoogleDriveModule } from './infrastructure/google-drive-api/google-drive.module';
import { ProjectsModule } from './presentation/modules/projects.module';
import { GeminiModule } from './infrastructure/gemini-ia/gemini.module';
import { ConfigModule } from '@nestjs/config';
import { HistorialModule } from './presentation/modules/historial.module';
import { ChatbotModule } from './infrastructure/chatbot/chatbot.module';
import { ConsultaDbIAModule } from './infrastructure/consulta-db-ia/consulta-db-ia.module';

@Module({
  imports: [
    UsersModule,
    ProjectsModule,
    HistorialModule,
    GoogleDriveModule,
    ConfigModule.forRoot({ isGlobal: true }), // 👈 carga automáticamente .env
    GeminiModule,
    ChatbotModule,
    ConsultaDbIAModule,
  ],
  //controllers: [AppController],
  //providers: [AppService],
})
export class AppModule { }
