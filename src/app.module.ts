import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ScheduleModule } from '@nestjs/schedule';
import { MqttController } from './client/client.controller';
import { ClientModule } from './client/client.module';
import { MqttClientService } from './client/client.service';
import { DatabaseCleanupService } from './client/database-cleanup/database-cleanup.service';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'BROKER_SERVICE',
        transport: Transport.MQTT,
        options: {
          url: 'mqtt://localhost:1883',
        },
      },
    ]),
    ConfigModule.forRoot({ isGlobal: true, cache: true }),
    PrismaModule,
    ClientModule,
    ScheduleModule.forRoot(),
    // MongooseModule.forRoot(process.env.DATABASE_URL),
    // EspMongoModule,
  ],
  providers: [MqttClientService, PrismaService, DatabaseCleanupService],
  controllers: [MqttController],
})
export class AppModule {}
