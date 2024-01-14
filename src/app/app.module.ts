import { Module } from '@nestjs/common';
import { MessageModule } from '../message/message.module';
import { PrismaModule } from '../prisma/prisma.module';
import { ScheduleModule } from '@nestjs/schedule';
import { EmailModule } from '../email/email.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { AppController } from './app.controller';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
          user: process.env.MAILDEV_INCOMING_USER,
          pass: process.env.MAILDEV_INCOMING_PASS,
        },
      },
    }),
    ScheduleModule.forRoot(),
    MessageModule,
    PrismaModule,
    EmailModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
