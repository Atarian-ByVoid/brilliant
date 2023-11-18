import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { MqttController } from './client.controller';
import { MqttClientService } from './client.service';
import { DatabaseCleanupService } from './database-cleanup/database-cleanup.service';

@Module({
  controllers: [MqttController],
  providers: [MqttClientService, PrismaService, DatabaseCleanupService],
})
export class ClientModule {}
