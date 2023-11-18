import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DatabaseCleanupService {
  constructor(private readonly prismaService: PrismaService) {}
  private readonly logger = new Logger(DatabaseCleanupService.name);

  @Cron(CronExpression.EVERY_12_HOURS)
  async cleanupDatabase() {
    try {
      await this.prismaService.temperatures.deleteMany({});

      console.log('Limpeza do banco de dados concluída.');
    } catch (error) {
      console.error('Erro ao limpar o banco de dados:', error.message);
    }
  }
}
