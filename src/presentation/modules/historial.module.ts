import { Module } from '@nestjs/common';
import { PostgresModule } from 'src/infrastructure/postgres-db/postgres.module';
import { HistorialRepository } from 'src/infrastructure/repository/historial.repository';

@Module({
  imports: [PostgresModule],
  providers: [
    {
      provide: 'HistorialInterface',
      useClass: HistorialRepository,
    },
  ],
  exports: ['HistorialInterface'],
})
export class HistorialModule {}
