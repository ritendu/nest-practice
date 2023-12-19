import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as sgMail from '@sendgrid/mail';

@Injectable()
export class EmailService {
  constructor(private configService: ConfigService) {}
  async adminsendOTP(email: string, otp: string) {
    const apiKey = this.configService.get('SENDGRID_API_KEY');
    sgMail.setApiKey(
     apiKey
    );

    const msg = {
      to: email,
      from: 't3stnservices@gmail.com',
      subject: 'Forget Password',
      text: 'Forget Password OTP sent',
      html: `OTP is ${otp}`,
    };

    sgMail.send(msg).then((data) => {
      console.log(data);
      (error) => {
        if (error.response) {
          console.error(error.response.body);
        }
      };
    });
  }
}
