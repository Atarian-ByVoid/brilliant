import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { UpdateUserDTO } from './user.dto';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/client/guard/auth.guard';

@ApiTags('Users')
@Controller('user')
@ApiSecurity('bearer')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(
    @Query('page') page: string = '1',
    @Query('pageSize') pageSize: string = '10',
  ) {
    const pageNumber = parseInt(page, 10);
    const pageSizeNumber = parseInt(pageSize, 10);

    if (isNaN(pageNumber) || isNaN(pageSizeNumber)) {
      throw new BadRequestException(
        'page e pageSize devem ser números válidos.',
      );
    }
    return await this.userService.findAllUsers(pageNumber, pageSizeNumber);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.userService.findOneUser(id);

    return { message: `Usuário com ID ${id} foi encontrado!`, user };
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    await this.userService.deleteUser(id);

    return { message: `Usuário com ID ${id} foi excluído com sucesso!` };
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDTO: UpdateUserDTO,
  ) {
    const updatedUser = await this.userService.updateUser(id, updateUserDTO);

    return {
      message: `Usuario com nome de ${updatedUser.username} foi atualizado com sucesso!`,
      updatedUser,
    };
  }
}
