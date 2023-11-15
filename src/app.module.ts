import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { MqttController } from './client/client.controller';
import { MqttClientService } from './client/client.service';
import { EspMongoModule } from './esp-mongo/esp-mongo.module';

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
    MongooseModule.forRoot(process.env.DATABASE_URL),
    EspMongoModule,
  ],
  providers: [MqttClientService],
  controllers: [MqttController],
})
export class AppModule {}
