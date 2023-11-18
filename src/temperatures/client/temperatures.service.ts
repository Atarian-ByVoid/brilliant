import { Injectable, NotFoundException } from '@nestjs/common';
import * as mqtt from 'mqtt';
import { PrismaService } from 'src/prisma/prisma.service';
import { TemperaturesDTO } from './temperatures.dto';

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

  async handleDataMessage(mqttData: TemperaturesDTO) {
    console.log('Dados recebidos:', mqttData);
    await this.prismaService.temperatures.create({
      data: {
        createdAt: new Date(),
        celsiusTemperature: mqttData.celsiusTemperature,
        fahrenheitTemperature: mqttData.fahrenheitTemperature,
      },
    });
  }

  async getAllTemperatures(page: number, pageSize: number) {
    const skip = (page - 1) * pageSize;

    const [data, total] = await Promise.all([
      this.prismaService.temperatures.findMany({
        where: {
          deletedAt: null,
        },
        skip,
        take: pageSize,
      }),
      this.prismaService.temperatures.count(),
    ]);

    if (!data || total === 0) {
      throw new NotFoundException(`Nenhuma temperatura encontrada.`);
    }
    return {
      data,
      page,
      pageSize,
      totalItems: total,
    };
  }

  async findOneTemperature(id: string) {
    const dataTemparature = await this.prismaService.temperatures.findFirst({
      where: {
        deletedAt: null,
        id,
      },
    });
    if (!dataTemparature) {
      throw new NotFoundException(`Temperatura com ID ${id} não encontrada.`);
    }
    return dataTemparature;
  }

  async deleteTemperature(id: string): Promise<void> {
    const now = new Date();
    await this.prismaService.temperatures.update({
      where: {
        id,
      },
      data: {
        deletedAt: now,
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
