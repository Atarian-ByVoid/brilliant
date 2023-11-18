import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Register')
@Controller('auth')
export class AuthController {}
