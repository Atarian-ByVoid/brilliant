import { Controller, Get } from '@nestjs/common';
import { MqttClientService } from './client.service';

@Controller('mqtt')
export class MqttController {
  constructor(private readonly mqttService: MqttClientService) {
    // Subscreva a um tópico específico
    this.mqttService.subscribeToTopic('/esp-mongo/save');
  }

  @Get()
  getHello(): string {
    return 'Hello, MQTT!';
  }
}
