<h1 style="font-family: 'Título';">Conectar o NestJS ao Mosquitto para Escutar Tópicos MQTT</h1>
<div style="text-align: center;">
  <img src="https://d33wubrfki0l68.cloudfront.net/49c2be6f2607b5c12dd27f8ecc8521723447975d/f05c5/logo-small.cbbeba89.svg" alt="Logo do projeto" style="margin: 0 auto;border-radius:10px; width:340px">
</div>

Este tutorial irá orientá-lo sobre como configurar um aplicativo NestJS para se conectar a um servidor Mosquitto MQTT e escutar mensagens em tópicos específicos.

## Pré-requisitos

Antes de começar, certifique-se de ter o [Node.js](https://nodejs.org/) e o [NestJS](https://nestjs.com/) instalados em seu ambiente de desenvolvimento.

```bash
# Instalar o NestJS globalmente
npm install -g @nestjs/cli
```

# Passo 1: Instalar Pacotes Necessários

Instale os pacotes `mqtt` e `@nestjs/microservices` usando o npm.

```bash
npm install mqtt @nestjs/microservices
```

# Passo 2: Configurar o Cliente MQTT

Crie um serviço para gerenciar a conexão MQTT. Crie um arquivo chamado `mqtt-client`.service.ts.

```bash
nest g mqtt-client service
```

```Ts
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
```

# Passo 3: Integrar com o Módulo NestJS

Integre o serviço MQTT ao módulo principal `(app.module.ts)`.

```Ts
import { Module } from '@nestjs/common';
import { MqttClientService } from './mqtt-client.service';

@Module({
  providers: [MqttClientService],
})
export class AppModule {}

```

# Passo 4: Utilizar o Serviço no Controlador ou Serviço

Em um controlador ou serviço, injete o serviço `MqttClientService` e comece a assinar tópicos.

```bash
nest g mqtt-client controller
```

```Ts
import { Controller, Get } from '@nestjs/common';
import { MqttClientService } from './client.service';

@Controller('mqtt')
export class MqttController {
  constructor(private readonly mqttService: MqttClientService) {
    // Subscreva a um tópico específico
    this.mqttService.subscribeToTopic('/brilliant/listen');
  }

  @Get()
  getHello(): string {
    return 'If you"ve made it here, congratulations this is the Brilliant embedded server :)';
  }
}

```

# Passo 5: Executar o Aplicativo

Certifique-se de ter o servidor Mosquitto em execução. Em seguida, inicie seu aplicativo NestJS.

```bash
npm run start
```
