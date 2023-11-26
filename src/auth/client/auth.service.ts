import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Prisma, Role, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDTO } from 'src/usuarios/client/user.dto';
import { UserService } from 'src/usuarios/client/user.service';
import { AuthUserDTO } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private usersService: UserService,
    private jwtService: JwtService   
     ) {}
  async create(CreateUserDTO: CreateUserDTO) {
    const { password, ...rest } = CreateUserDTO;

    const createData: Prisma.UserCreateInput = {
      ...rest,
      password: await bcrypt.hash(password, 10),
    };

    try {
      await this.checkUniqueFields(rest.email, rest.username);
    } catch (error) {
      throw new ConflictException('Erro ao criar o usuário: ' + error.message);
    }

    try {
      const usuario = await this.prismaService.user.create({
        data: createData,
      });

      return {
        statusCode: 200,
        data: usuario,
      };
    } catch {
      throw new InternalServerErrorException(
        'Não foi possivel criar o usuario',
      );
    }
  }

  async login(body: AuthUserDTO) {
    const payload = {
      email: body.email,
    };

    const user = await this.usersService.validateUser(payload);

    if (!user) {
      throw new UnauthorizedException('Usuário não cadastrado.');
    }

    const isPasswordValid = await bcrypt.compare(body.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Senha incorreta.');
    }

    const secretKey = process.env.JWT_KEY;

    if (user.role) {
      payload['role'] = user.role;
      payload['id'] = user.id;
    }

    return this.jwtService.sign(
      { ...payload, sub: user.id },
      { secret: secretKey },
    );
  }

  async updateUserRole(userId: string, newRole: Role): Promise<User | null> {
    try {
      const updatedUser = await this.prismaService.user.update({
        where: { id: userId },
        data: { role: newRole },
      });

      return updatedUser;
    } catch (error) {
      throw new NotFoundException('Erro ao atualizar o papel do usuário.');
    }
  }

  private async checkUniqueFields(
    email: string,
    username: string,
  ): Promise<void> {
    const existingUser = await this.prismaService.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });

    if (existingUser) {
      throw new ConflictException('Email ou Username já estão em uso.');
    }
  }
}
