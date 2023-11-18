import { Injectable } from '@nestjs/common';
import * as mqtt from 'mqtt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MqttClientService {
  private readonly client: mqtt.MqttClient;

  constructor(private prismaService: PrismaService) {
    this.client = mqtt.connect('mqtt://localhost');
    this.client.on('message', async (topic, message) => {
      const content = message.toString();
      console.log(` ${content}`);

      try {
        if (topic === 'data') {
          const mqttData = JSON.parse(content);
          await this.handleDataMessage(mqttData);
        } else if (topic === 'AT-ST') {
          await this.handleArteMessage(content);
        } else {
          console.log(`Tópico desconhecido: ${topic}`);
        }
      } catch (error) {
        console.error('Erro ao processar mensagem:', error.message);
      }
    });
  }

  subscribeToTopics(topics: string[]) {
    topics.forEach((topic) => {
      this.client.subscribe(topic);
    });
  }

  async handleDataMessage(mqttData: any) {
    console.log('Dados recebidos:', mqttData);
    await this.prismaService.aSSCII.create({
      data: {
        criadoEm: new Date(),
        field1: mqttData.field1,
        field2: parseFloat(mqttData.field2),
      },
    });
  }
  async handleArteMessage(mqttData: any) {
    if (typeof mqttData === 'string') {
      console.log(mqttData);
    } else {
      console.log('Formato de mensagem de arte inválido:', mqttData);
    }
  }
}
