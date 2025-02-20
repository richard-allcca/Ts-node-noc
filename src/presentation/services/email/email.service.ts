import nodemailer from 'nodemailer';
import { envs } from '../../../config/plugins/envs.plugin';

interface IAttachment {
  filename: string;
  path: string;
}

export interface ISendMailOptions {
  to: string | string[];
  subject: string;
  htmlBody: string;
  attachments?: IAttachment[];
}

export class EmailService {

  config = {
    service: envs.MAILER_SERVICE,
    auth: {
      user: envs.MAILER_EMAIL,
      pass: envs.MAILER_SECRET_KEY
    }
  };

  private transporter = nodemailer.createTransport(this.config);

  constructor() {}

  async sendMail(options: ISendMailOptions) {
    const { to, subject, htmlBody, attachments = [] } = options;

    try {

      const emailOptions = {
        from: `Thouma. ${envs.MAILER_EMAIL}`,
        to,
        subject,
        html: htmlBody,
        attachments: attachments
      }

      const sendInformation = await this.transporter.sendMail(emailOptions);

      console.log(sendInformation);
      return true;
    } catch (error) {

      console.log(error);
      return false;
    }
  }

  async sendMailWithAttachments(to: string | string[]) {
    const attachments: IAttachment[] = [
      {
        filename: 'logs-all.log',
        path: './logs/logs-all.log'
      },
      {
        filename: 'logs-error.log',
        path: './logs/logs-error.log'
      },
      {
        filename: 'logs-info.log',
        path: './logs/logs-info.log'
      },
      {
        filename: 'logs-warning.log',
        path: './logs/logs-warning.log'
      },
    ];

    const optionsMail = {
      to: to,
      subject: 'Test email with attachments',
      htmlBody: '<h1>Test email with attachments</h1>',
      attachments: attachments
    };

    return this.sendMail(optionsMail);
  }

}