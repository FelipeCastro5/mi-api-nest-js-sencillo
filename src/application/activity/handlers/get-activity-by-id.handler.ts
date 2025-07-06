import { Inject, Injectable } from '@nestjs/common';
import { GetActivityByIdCommand } from '../commands/get-activity-by-id.command';
import { ActivityInterface } from '../../../domain/activity-domain/activity.interface';
import { ResponseUtil } from '../../utilities/response.util';

@Injectable()
export class GetActivityByIdHandler {
  constructor(
    @Inject('ActivityInterface')
    private readonly activityRepository: ActivityInterface,
  ) {}

  async execute(command: GetActivityByIdCommand) {
    try {
      const activity = await this.activityRepository.getById(command.id);
      if (!activity) {
        return ResponseUtil.error('Actividad no encontrada', 404);
      }
      return ResponseUtil.success(activity, 'Actividad encontrada exitosamente.');
    } catch (error) {
      console.error('Error en GetActivityByIdHandler:', error);
      return ResponseUtil.error('Error al obtener la actividad', 500);
    }
  }
}
