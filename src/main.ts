import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const config = new DocumentBuilder()
    .setTitle('Onboard API')
    .setVersion('2.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('', app, document);
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.PORT);
}
bootstrap();
// import { NestFactory } from '@nestjs/core';
// import { MicroserviceOptions, Transport } from '@nestjs/microservices';
// import { AppModule } from './app.module';
// async function bootstrap() {
//   const app = await NestFactory.createMicroservice<MicroserviceOptions>(
//     AppModule,
//     {
//       transport: Transport.MQTT,
//       options: {
//         url: 'mqtt://localhost:1883',
//       },
//     },
//   );

//   await app.listen();
// }

// bootstrap();
