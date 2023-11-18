import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { DatabaseCleanupService } from './database-cleanup/database-cleanup.service';
import { MqttController } from './temperatures.controller';
import { MqttClientService } from './temperatures.service';

@Module({
  controllers: [MqttController],
  providers: [MqttClientService, PrismaService, DatabaseCleanupService],
})
export class ClientModule {}
