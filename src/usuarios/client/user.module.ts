import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { DatabaseCleanupService } from 'src/temperatures/client/database-cleanup/database-cleanup.service';
import { MqttClientService } from 'src/temperatures/client/temperatures.service';
import { UserController } from './user.controller';

@Module({
  controllers: [UserController],
  providers: [MqttClientService, PrismaService, DatabaseCleanupService],
})
export class UserModule {}
