import { Injectable } from '@nestjs/common';
import * as mqtt from 'mqtt';

@Injectable()
export class MqttClientService {
  private readonly client;

  constructor() {
    this.client = mqtt.connect('mqtt://localhost');

    this.client.on('connect', () => {
      console.log('Conectado ao servidor MQTT');
    });

    this.client.on('message', (topic, message) => {
      console.log(`${message.toString()}`);
    });
  }

  subscribeToTopic(topic: string) {
    this.client.subscribe(topic);
  }
}
