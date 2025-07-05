// src/application/activity/handlers/create-activity.handler.ts
import { Inject, Injectable } from '@nestjs/common';
import { CreateActivityCommand } from '../commands/create-activity.command';
import { ActivityInterface } from 'src/domain/ActivityDomain/activity.interface';
import { ResponseUtil } from 'src/application/utilities/response.util';

@Injectable()
export class CreateActivityHandler {
  constructor(
    @Inject('ActivityInterface')
    private readonly activityRepository: ActivityInterface,
  ) { }

  async execute(command: CreateActivityCommand) {
    try {
      const newActivity = await this.activityRepository.createActivity(
        command.fk_user,
        command.fk_proj,
        command.activity,
      );
      return ResponseUtil.success(newActivity, 'Actividad creada exitosamente', 201);
    } catch (error) {
      console.error('Error en CreateActivityHandler:', error);
      return ResponseUtil.error('Error al crear la actividad', 500);
    }
  }
}
