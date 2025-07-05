// src/infrastructure/modules/activities.module.ts
import { Module } from '@nestjs/common';
import { ActivityRepository } from 'src/infrastructure/repository/activity.repository';
import { PostgresModule } from 'src/infrastructure/postgres-db/postgres.module';
import { ActivitiesController } from '../controllers/activity.controller';
import { CreateActivityHandler } from 'src/application/activity/handlers/create-activity.handler';
import { UpdateActivityHandler } from 'src/application/activity/handlers/update-activity.handler';
import { DeleteActivityHandler } from 'src/application/activity/handlers/delete-activity.handler';
import { GetAllActivitiesHandler } from 'src/application/activity/handlers/get-all-activities.handler';
import { GetActivityByIdHandler } from 'src/application/activity/handlers/get-activity-by-id.handler';
// Aquí podrías importar tus handlers y controller

@Module({
  imports: [PostgresModule],
  providers: [
    {
      provide: 'ActivityInterface',
      useClass: ActivityRepository,
    },
    CreateActivityHandler,
    UpdateActivityHandler,
    DeleteActivityHandler,
    GetAllActivitiesHandler,
    GetActivityByIdHandler,
  ],
  controllers: [ActivitiesController],
})
export class ActivitiesModule {}
