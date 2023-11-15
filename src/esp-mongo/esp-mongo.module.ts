// esp-mongo.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MqttClientService } from 'src/client/client.service';
import { EspMongoController } from './esp-mongo.controller';
import { ASCIISchema } from './esp-mongo.schema';
import { EspMongoService } from './esp-mongo.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'ASCII', schema: ASCIISchema }]),
  ],
  controllers: [EspMongoController],
  providers: [EspMongoService, MqttClientService],
  exports: [EspMongoService],
})
export class EspMongoModule {}
