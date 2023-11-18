import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class TemperaturesDTO {
  @ApiProperty()
  @IsNumber()
  celsiusTemperature: number;

  @ApiProperty()
  @IsNumber()
  fahrenheitTemperature: number;

  constructor(celsiusTemperature: number, fahrenheitTemperature: number) {
    this.celsiusTemperature = celsiusTemperature;
    this.fahrenheitTemperature = fahrenheitTemperature;
  }
}
