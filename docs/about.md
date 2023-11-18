# Sistema de Monitoramento de Temperatura (Brilliant)

O projeto é um sistema de monitoramento de temperatura baseado em IoT, projetado para coletar dados de sensores e armazená-los em um banco de dados. Utiliza o framework NestJS para criar uma API que gerencia as operações relacionadas às leituras de temperatura.

## Componentes Principais:

- ### Dispositivos IoT (ESP8266):

  - Os dispositivos IoT (como o ESP8266) coletam dados de temperatura.
  - Os dados são enviados para o servidor MQTT para processamento posterior.

- ### Servidor MQTT:

  - Implementado usando o NestJS, o servidor MQTT recebe dados dos dispositivos IoT.
  - Ao receber dados, o servidor os processa e os encaminha para o serviço correspondente no NestJS.

- ### Banco de Dados (Prisma):

  - O banco de dados Prisma armazena as leituras de temperatura.
  - Um modelo, como TemperatureReading, é utilizado para representar as informações relevantes.

- ### NestJS API:

  A API NestJS oferece endpoints para:

  - Obter leituras de temperatura.
  - Executar operações de limpeza no banco de dados.
  - Lidar com mensagens MQTT recebidas.
  - Limpeza Automática do Banco de Dados:

  Uma tarefa cron agendada é configurada para limpar automaticamente as leituras de temperatura antigas do banco de dados.

- ### Funcionalidades Principais:

  - Coleta de Dados: Os dispositivos IoT enviam dados de temperatura para o servidor.
  - Armazenamento Seguro: As leituras de temperatura são armazenadas no banco de dados Prisma.
  - API para Acesso aos Dados: A API NestJS permite consultar leituras de temperatura e fornece funcionalidades adicionais.
  - Limpeza Automática: Uma tarefa cron limpa automaticamente as leituras antigas do banco de dados.

# Tecnologias Principais:

- NestJS (Node.js framework)
- Prisma (ORM para Node.js e TypeScript)
- MQTT (protocolo de mensagens)
- Dispositivos IoT (ESP8266)

# Referencias:

Crons [: veja aqui](https://docs.nestjs.com/techniques/task-scheduling#declarative-cron-jobs)

ASCII Arts [: veja aqui](https://www.asciiart.eu/text-to-ascii-art)

Prisma [: veja aqui](https://www.prisma.io/nestjs)

NestJs [: veja qui](https://nestjs.com/)
