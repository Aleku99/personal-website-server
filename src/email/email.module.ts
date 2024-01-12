import { Module } from '@nestjs/common';
import { EmailService } from 'src/email/email.service';
import { MessageService } from 'src/message/message.service';

@Module({
  providers: [EmailService, MessageService],
})
export class EmailModule {}
