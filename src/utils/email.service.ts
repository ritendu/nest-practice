import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as sgMail from '@sendgrid/mail';

@Injectable()
export class EmailService {
  constructor(private configService: ConfigService) {}
  async adminsendOTP(email: string, otp: string) {
    const apiKey = this.configService.get('SENDGRID_API_KEY');
    sgMail.setApiKey(apiKey);

    const msg = {
      to: email,
      from: 't3stnservices@gmail.com',
      subject: 'Forget Password',
      text: 'Forget Password OTP sent',
      html: `OTP is ${otp}`,
    };
    try {
      const data = await sgMail.send(msg);
    } catch (error) {
      return true;
    }
  }

  async userSendPassword(email: string, password: string) {
    const apiKey = this.configService.get('SENDGRID_API_KEY');
    sgMail.setApiKey(apiKey);

    const msg = {
      to: email,
      from: 't3stnservices@gmail.com',
      subject: 'Forget Password',
      text: 'Forget Password',
      html: `Password is ${password}`,
    };
    try {
      const data = await sgMail.send(msg);
    } catch (error) {
      return true;
    }
  }
}
