import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDTO } from 'src/usuarios/client/user.dto';
import { UpdateRoleDTO } from './auth.dto';
import { AuthService } from './auth.service';

@ApiTags('Register')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async create(@Body() CreateUserDTO: CreateUserDTO) {
    await this.authService.create(CreateUserDTO);

    return {
      message: `Usuario com nome de ${CreateUserDTO.username} foi criado com sucesso!`,
    };
  }

  @Put(':id/update-role')
  async updateUserRole(
    @Param('id') id: string,
    @Body() updateRoleDto: UpdateRoleDTO,
  ) {
    const updatedUser = await this.authService.updateUserRole(
      id,
      updateRoleDto.role,
    );

    return {
      message: `Usuario com nome de ${updatedUser.username} teve a role atualizada com sucesso!`,
    };
  }
}
