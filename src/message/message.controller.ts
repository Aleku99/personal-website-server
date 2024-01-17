import { Body, Controller, Ip, Post } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { MessageService } from './message.service';

@Controller('message')
export class MessageController {
  constructor(private messageService: MessageService) {}

  @Post()
  createMessage(@Ip() ip: string, @Body() dto: CreateMessageDto) {
    return this.messageService.createMessage(ip, dto);
  }
}
