import { Controller, Get } from '@nestjs/common';
import { MqttClientService } from './client.service';

@Controller('mqtt')
export class MqttController {
  constructor(private readonly mqttService: MqttClientService) {
    this.mqttService.subscribeToTopics(['data', 'AT-ST']);
  }

  @Get()
  getHello(): string {
    return 'If you"ve made it here, congratulations this is the Brilliant embedded server :)';
  }
}
