import { Module } from '@nestjs/common';
import { ConsultaDbIAService } from './consulta-db-ia.service';
import { ConsultaDbIAController } from './consulta-db-ia.controller';
import { PostgresService } from 'src/infrastructure/postgres-db/postgres.service';
import { ConfigModule } from '@nestjs/config';
import { GeminiService } from '../gemini-ia/gemini.service';

@Module({
  imports: [ConfigModule],
  controllers: [ConsultaDbIAController],
  providers: [ConsultaDbIAService, GeminiService, PostgresService],
})
export class ConsultaDbIAModule {}
