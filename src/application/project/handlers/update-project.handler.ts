import { Inject, Injectable } from '@nestjs/common';
import { UpdateProjectCommand } from '../commands/update-project.command';
import { ProjectInterface } from 'src/domain/ProjectDomain/project.interface';
import { ResponseUtil } from 'src/application/utilities/response.util';

@Injectable()
export class UpdateProjectHandler {
  constructor(
    @Inject('ProjectInterface')
    private readonly projectRepository: ProjectInterface,
  ) {}

  async execute(command: UpdateProjectCommand) {
    try {
      const result = await this.projectRepository.updateProject(
        command.id,
        command.name,
        command.details,
      );

      if (!result?.rows?.length) {
        return ResponseUtil.error('Proyecto no encontrado', 404);
      }

      return ResponseUtil.success(null, 'Proyecto actualizado exitosamente.', 200);
    } catch (error: any) {
      console.error('Error inesperado en UpdateProjectHandler:', error);
      return ResponseUtil.error('Error al actualizar el proyecto', 500);
    }
  }
}
