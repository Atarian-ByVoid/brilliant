import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDTO } from './user.dto';

@Injectable()
export class UserSrvice {
  constructor(private prisma: PrismaService) {}

  async findAllUsers(page: number, pageSize: number) {
    const skip = (page - 1) * pageSize;

    const [data, total] = await Promise.all([
      this.prisma.user.findMany({
        where: {
          deletedAt: null,
        },
        skip,
        take: pageSize,
      }),
      this.prisma.user.count(),
    ]);

    if (!data || total === 0) {
      throw new NotFoundException(`Nenhum usuario encontado`);
    }

    return {
      data,
      page,
      pageSize,
      totalItems: total,
    };
  }

  async findOneUser(id: string) {
    const dataUsuario = await this.prisma.user.findFirst({
      where: {
        deletedAt: null,
        id,
      },
    });
    if (!dataUsuario) {
      throw new NotFoundException(`Usuario com ID ${id} não encontrado`);
    }
    return dataUsuario;
  }

  async deleteUser(id: string): Promise<void> {
    const now = new Date();
    await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        deletedAt: now,
      },
    });
  }

  async updateUser(
    id: string,
    updatedUserDTO: UpdateUserDTO,
  ): Promise<UpdateUserDTO> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException(`Usuario com ID ${id} não encontrado`);
    }

    const updatedUserData: { [key: string]: any } = {};

    if (updatedUserDTO.username) {
      updatedUserData.username = updatedUserDTO.username;

      const updatedUser = await this.prisma.user.update({
        where: { id },
        data: updatedUserData,
      });

      return {
        ...updatedUser,
      };
    }
  }
}
