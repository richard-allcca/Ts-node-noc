import nodemailer from 'nodemailer';
import { EmailService, ISendMailOptions } from "./email.service";



describe( 'EmailService', () => {

  const mockSendMail = jest.fn();

  // Mock al createTransport
  nodemailer.createTransport = jest.fn().mockReturnValue( {
    sendMail: mockSendMail
  } );

  const emailService = new EmailService();


  test( 'should send email', async () => {


    const options: ISendMailOptions = {
      to: 'rallcca28@gmail.com',
      subject: 'Test',
      htmlBody: '<h1>Test</h1>'
    };

    await emailService.sendMail( options );

    expect( mockSendMail ).toHaveBeenCalledWith( {
      from: 'Thouma. rallcca28@gmail.com',
      to: 'rallcca28@gmail.com',
      subject: 'Test',
      html: '<h1>Test</h1>',
      attachments: []
    } );

  } );

  test( 'should send email with attachments', async () => {

    const email = 'rallcca28@gmail.com';
    await emailService.sendMailWithAttachments( email );


    expect( mockSendMail ).toHaveBeenCalledWith( {
      from: 'Thouma. rallcca28@gmail.com',
      to: 'rallcca28@gmail.com',
      subject: 'Test email with attachments',
      html: '<h1>Test email with attachments</h1>',
      attachments: expect.arrayContaining( [
        { filename: 'logs-all.log', path: './logs/logs-all.log' },
        { filename: 'logs-error.log', path: './logs/logs-error.log' },
        { filename: 'logs-info.log', path: './logs/logs-info.log' },
        { filename: 'logs-warning.log', path: './logs/logs-warning.log' }
      ] )
    } );
  } );


} );