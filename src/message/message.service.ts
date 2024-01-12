import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MessageService {
  constructor(private prismaService: PrismaService) {}

  async createMessage(dto: CreateMessageDto) {
    return this.prismaService.message.create({ data: { ...dto } });
  }

  async markAsSent(messageId: number) {
    return this.prismaService.message.update({
      where: { id: messageId },
      data: { sent: true },
    });
  }

  async getUnsentMessages() {
    return this.prismaService.message.findMany({
      where: {
        sent: false,
      },
    });
  }
}
