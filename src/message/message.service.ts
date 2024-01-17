import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MessageService {
  private countUserMessages: {
    [key: string]: {
      counter: number;
      sentAt: Date;
    };
  } = {};
  constructor(private prismaService: PrismaService) {}

  async createMessage(ip: string, dto: CreateMessageDto) {
    //user has already made a request from this IP
    if (this.countUserMessages[ip]) {
      const now = new Date();
      const requestInterval =
        now.getTime() - this.countUserMessages[ip].sentAt.getTime();

      // 2 requests at more than 1 hour difference; reset counter
      if (requestInterval > 3600000) {
        this.countUserMessages[ip].counter = 1;
        this.countUserMessages[ip].sentAt = new Date();
        return this.prismaService.message.create({ data: { ...dto } });
      }

      //2 request at less than 1 hour difference
      if (this.countUserMessages[ip].counter < 5) {
        this.countUserMessages[ip].counter++;
        this.countUserMessages[ip].sentAt = new Date();
        return this.prismaService.message.create({ data: { ...dto } });
      } else {
        throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
      }
    }
    // first request
    else {
      this.countUserMessages[ip] = {
        counter: 1,
        sentAt: new Date(),
      };
      return this.prismaService.message.create({ data: { ...dto } });
    }
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
