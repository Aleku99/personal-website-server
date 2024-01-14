import { Controller, Get, HttpCode } from '@nestjs/common';

@Controller('app')
export class AppController {
  @Get('/health')
  @HttpCode(200)
  healthCheck() {
    return {};
  }
}
