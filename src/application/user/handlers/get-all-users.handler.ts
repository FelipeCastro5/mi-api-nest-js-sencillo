import { Inject, Injectable } from '@nestjs/common';
import { GetAllUsersCommand } from '../commands/get-all-users.command';
import { UserInterface } from 'src/domain/UserDomain/user.interface';
import { ResponseUtil } from 'src/application/utilities/response.util';

@Injectable()
export class GetAllUsersHandler {
  constructor(
    @Inject('UserInterface')
    private readonly userRepository: UserInterface,
  ) {}

  async execute(command: GetAllUsersCommand) {
    try {
      const users = await this.userRepository.getAll();
      return ResponseUtil.success(users, 'Usuarios obtenidos exitosamente.');
    } catch (error) {
      console.error(`Error en GetAllUsersHandler: ${error}`);
      return ResponseUtil.error('Error al obtener los usuarios', 500);
    }
  }
}
