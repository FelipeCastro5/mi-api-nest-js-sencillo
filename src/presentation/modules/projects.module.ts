import { Module } from '@nestjs/common';
import { ProjectRepository } from 'src/infrastructure/repository/project.repository';
import { ProjectsController } from '../controllers/project.controller';
import { PostgresModule } from 'src/infrastructure/postgres-db/postgres.module';
import { GetAllProjectsHandler } from 'src/application/project/handlers/get-all-projects.handler';
import { GetProjectByIdHandler } from 'src/application/project/handlers/get-project-by-id.handler';
import { CreateProjectHandler } from 'src/application/project/handlers/create-project.handler';
import { UpdateProjectHandler } from 'src/application/project/handlers/update-project.handler';
import { DeleteProjectHandler } from 'src/application/project/handlers/delete-project.handler';

@Module({
  imports: [PostgresModule],
  providers: [
    {
      provide: 'ProjectInterface',
      useClass: ProjectRepository,
    },
    GetAllProjectsHandler,
    GetProjectByIdHandler,
    CreateProjectHandler,
    UpdateProjectHandler,
    DeleteProjectHandler,
  ],
  controllers: [ProjectsController],
})
export class ProjectsModule {}
