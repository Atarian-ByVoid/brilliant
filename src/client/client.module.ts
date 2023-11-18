import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { MqttController } from './client.controller';
import { MqttClientService } from './client.service';

@Module({
  controllers: [MqttController],
  providers: [MqttClientService, PrismaService],
})
export class ClientModule {}
