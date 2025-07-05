// src/application/activity/handlers/delete-activity.handler.ts
import { Inject, Injectable } from '@nestjs/common';
import { DeleteActivityCommand } from '../commands/delete-activity.command';
import { ActivityInterface } from 'src/domain/ActivityDomain/activity.interface';
import { ResponseUtil } from 'src/application/utilities/response.util';

@Injectable()
export class DeleteActivityHandler {
  constructor(
    @Inject('ActivityInterface')
    private readonly activityRepository: ActivityInterface,
  ) {}

  async execute(command: DeleteActivityCommand) {
    try {
      const result = await this.activityRepository.deleteActivity(command.id);
      if (!result?.rowCount) {
        return ResponseUtil.error('Actividad no encontrada', 404);
      }
      return ResponseUtil.success(null, 'Actividad eliminada exitosamente.', 200);
    } catch (error) {
      console.error('Error en DeleteActivityHandler:', error);
      return ResponseUtil.error('Error al eliminar la actividad', 500);
    }
  }
}
