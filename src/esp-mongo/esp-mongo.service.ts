import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ASCIIDTOCreate } from './esp-mongo.dto';
import { ASCII } from './esp-mongo.schema';

@Injectable()
export class EspMongoService {
  constructor(
    @InjectModel(ASCII.name)
    private readonly asciiModel: Model<ASCII>,
  ) {}

  async createASCII(createEspDto: ASCIIDTOCreate): Promise<ASCII> {
    const newEsp = new this.asciiModel(createEspDto);
    return await newEsp.save();
  }
}
