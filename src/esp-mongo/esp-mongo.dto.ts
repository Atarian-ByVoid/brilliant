import { ApiProperty } from '@nestjs/swagger';

export class ASCIIDTO {
  @ApiProperty()
  field1: string;
  @ApiProperty()
  field2: number;
}

export class ASCIIDTOCreate extends ASCIIDTO {}
