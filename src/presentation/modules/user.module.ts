import { Module } from '@nestjs/common';
import { CreateUserHandler } from 'src/application/user/handlers/create-user.handler';
import { DeleteUserHandler } from 'src/application/user/handlers/delete-user.handler';
import { GetAllUsersHandler } from 'src/application/user/handlers/get-all-users.handler';
import { GetUserByIdHandler } from 'src/application/user/handlers/get-user-by-id.handler';
import { UpdateUserHandler } from 'src/application/user/handlers/update-user.handler';
import { UserRepository } from 'src/infrastructure/repository/user.repository';
import { UsersController } from '../controllers/user.controller';
import { PostgresModule } from 'src/infrastructure/postgres-db/postgres.module';

@Module({
  imports: [PostgresModule],
  providers: [
    {
      provide: 'UserInterface',
      useClass: UserRepository,
    },
    GetAllUsersHandler,
    GetUserByIdHandler,
    CreateUserHandler,
    UpdateUserHandler,
    DeleteUserHandler,
  ],
  controllers: [UsersController],
})
export class UsersModule {}
