import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CreateActivityCommand } from '../../application/activity/commands/create-activity.command';
import { UpdateActivityCommand } from '../../application/activity/commands/update-activity.command';
import { DeleteActivityCommand } from '../../application/activity/commands/delete-activity.command';
import { GetAllActivitiesCommand } from '../../application/activity/commands/get-all-activities.command';
import { GetActivityByIdCommand } from '../../application/activity/commands/get-activity-by-id.command';

import { CreateActivityHandler } from '../../application/activity/handlers/create-activity.handler';
import { UpdateActivityHandler } from '../../application/activity/handlers/update-activity.handler';
import { DeleteActivityHandler } from '../../application/activity/handlers/delete-activity.handler';
import { GetAllActivitiesHandler } from '../../application/activity/handlers/get-all-activities.handler';
import { GetActivityByIdHandler } from '../../application/activity/handlers/get-activity-by-id.handler';

import { CreateActivityDto } from '../dtos/activity/create-activity.dto';
import { UpdateActivityDto } from '../dtos/activity/update-activity.dto';

@ApiTags('Activities')
@Controller('activities')
export class ActivitiesController {
  constructor(
    private readonly getAllHandler: GetAllActivitiesHandler,
    private readonly getByIdHandler: GetActivityByIdHandler,
    private readonly createHandler: CreateActivityHandler,
    private readonly updateHandler: UpdateActivityHandler,
    private readonly deleteHandler: DeleteActivityHandler,
  ) { }

  @Get('getAll')
  @ApiOperation({ summary: 'Obtener todas las actividades' })
  @ApiResponse({ status: 200, description: 'Actividades obtenidas exitosamente' })
  async getAllActivities() {
    return this.getAllHandler.execute(new GetAllActivitiesCommand());
  }

  @Get('getById')
  @ApiOperation({ summary: 'Obtener actividad por ID' })
  @ApiResponse({ status: 200, description: 'Actividad encontrada exitosamente' })
  @ApiResponse({ status: 404, description: 'Actividad no encontrada' })
  async getActivityById(@Query('id') id: number) {
    return this.getByIdHandler.execute(new GetActivityByIdCommand(id));
  }

  @Post('create')
  @ApiOperation({ summary: 'Crear una nueva actividad' })
  @ApiResponse({ status: 201, description: 'Actividad creada exitosamente' })
  async createActivity(@Body() dto: CreateActivityDto) {
    return this.createHandler.execute(
      new CreateActivityCommand(dto.fk_user, dto.fk_proj, dto.activity), // ✅ añadido activity
    );
  }

  @Put('update')
  @ApiOperation({ summary: 'Actualizar una actividad existente' })
  @ApiResponse({ status: 200, description: 'Actividad actualizada exitosamente' })
  async updateActivity(@Body() dto: UpdateActivityDto) {
    return this.updateHandler.execute(
      new UpdateActivityCommand(dto.id, dto.fk_user, dto.fk_proj, dto.activity), // ✅ añadido activity
    );
  }

  @Delete('delete')
  @ApiOperation({ summary: 'Eliminar una actividad por ID' })
  @ApiResponse({ status: 200, description: 'Actividad eliminada exitosamente' })
  async deleteActivity(@Query('id') id: number) {
    return this.deleteHandler.execute(new DeleteActivityCommand(id));
  }
}
