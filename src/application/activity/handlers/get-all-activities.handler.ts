import { Inject, Injectable } from '@nestjs/common';
import { GetAllActivitiesCommand } from '../commands/get-all-activities.command';
import { ActivityInterface } from '../../../domain/activity-domain/activity.interface';
import { ResponseUtil } from '../../utilities/response.util';

@Injectable()
export class GetAllActivitiesHandler {
  constructor(
    @Inject('ActivityInterface')
    private readonly activityRepository: ActivityInterface,
  ) {}

  async execute(command: GetAllActivitiesCommand) {
    try {
      const activities = await this.activityRepository.getAll();
      return ResponseUtil.success(activities, 'Actividades obtenidas exitosamente.');
    } catch (error) {
      console.error('Error en GetAllActivitiesHandler:', error);
      return ResponseUtil.error('Error al obtener las actividades', 500);
    }
  }
}
