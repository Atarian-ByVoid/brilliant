import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ASCIIDocument = HydratedDocument<ASCII>;

@Schema({ _id: true })
export class ASCII {
  @Prop({ type: Date, default: Date.now }) criado_em: Date;

  @Prop()
  field1: string;

  @Prop()
  field2: number;
}
export const ASCIISchema = SchemaFactory.createForClass(ASCII);
