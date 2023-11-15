import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { ASCIIDTOCreate } from './esp-mongo.dto';
import { EspMongoService } from './esp-mongo.service';

@Controller('esp-mongo')
@ApiTags('ASCII')
export class EspMongoController {
  constructor(private readonly service: EspMongoService) {}

  @Post('save')
  @ApiBody({ type: ASCIIDTOCreate })
  async criarVariaveis(@Body() body: ASCIIDTOCreate) {
    try {
      return await this.service.createASCII(body);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
