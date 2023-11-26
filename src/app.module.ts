import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ScheduleModule } from '@nestjs/schedule';
import { AuthController } from './auth/client/auth.controller';
import { AuthModule } from './auth/client/auth.module';
import { AuthService } from './auth/client/auth.service';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';
import { DatabaseCleanupService } from './temperatures/client/database-cleanup/database-cleanup.service';
import { MqttController } from './temperatures/client/temperatures.controller';
import { ClientModule } from './temperatures/client/temperatures.module';
import { MqttClientService } from './temperatures/client/temperatures.service';
import { UserController } from './usuarios/client/user.controller';
import { UserService } from './usuarios/client/user.service';


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
    PrismaModule,
    ClientModule,
    ScheduleModule.forRoot(),
    AuthModule,
    // MongooseModule.forRoot(process.env.DATABASE_URL),
    // EspMongoModule,
  ],
  providers: [
    MqttClientService,
    PrismaService,
    DatabaseCleanupService,
    UserService,
    AuthService,
  ],
  controllers: [MqttController, UserController, AuthController],
})
export class AppModule {}
