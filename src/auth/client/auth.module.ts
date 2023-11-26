import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from 'src/usuarios/client/user.service';
import { JwtStrategy } from './strategies/local.strategy';
@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_KEY'),
        signOptions: { expiresIn: '1d' },
      }),
    }),
  PassportModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, UserService, JwtService, JwtStrategy],
  exports: [JwtService],

})
export class AuthModule {}
