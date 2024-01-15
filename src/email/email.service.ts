import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { MailerService } from '@nestjs-modules/mailer';
import { MessageService } from 'src/message/message.service';

@Injectable()
export class EmailService {
  constructor(
    private mailerService: MailerService,
    private messageService: MessageService,
  ) {}

  @Cron(CronExpression.EVERY_HOUR)
  async handleCron() {
    const emails = await this.messageService.getUnsentMessages();

    emails.forEach(async (email) => {
      const res = await this.mailerService.sendMail({
        to: 'loghinalex19@gmail.com', // list of receivers
        subject: 'New Personal Website E-mail', // Subject line
        html: `<p>Got new message from ${email.name}, e-mail ${email.email}</p> <p style="padding:12px;border-left:4px solid #d0d0d0;font-style:italic">${email.message}</p> `,
      });
      if (res.response.includes('250')) {
        this.messageService.markAsSent(email.id);
      }
    });
  }
}
