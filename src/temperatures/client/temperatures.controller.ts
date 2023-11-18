import {
  BadRequestException,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MqttClientService } from './temperatures.service';

@ApiTags('Temperatures')
@Controller('temperature')
export class MqttController {
  constructor(private readonly mqttService: MqttClientService) {
    this.mqttService.subscribeToTopics(['data', 'AT-ST']);
  }

  @Get()
  async findAllTemperatures(
    @Query('page') page: string = '1',
    @Query('pageSize') pageSize: string = '10',
  ) {
    const pageNumber = parseInt(page, 10);
    const pageSizeNumber = parseInt(pageSize, 10);

    if (isNaN(pageNumber) || isNaN(pageSizeNumber)) {
      throw new BadRequestException(
        'page e pageSize devem ser números válidos.',
      );
    }

    return await this.mqttService.getAllTemperatures(
      pageNumber,
      pageSizeNumber,
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const user = await this.mqttService.findOneTemperature(id);
      if (!user) {
        throw new NotFoundException(`Temparatura com ID ${id} não encontrada!`);
      }
      return user;
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao buscar a temperatura solicitada!',
      );
    }
  }

  @Delete(':id')
  async deletePaciente(@Param('id') id: string) {
    try {
      await this.mqttService.deleteTemperature(id);

      return { message: `Temperatura com ID ${id} foi excluída com sucesso` };
    } catch (error) {
      throw new InternalServerErrorException('Erro ao excluir a temperatura');
    }
  }
}
