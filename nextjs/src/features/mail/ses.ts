/**
 * https://docs.aws.amazon.com/ja_jp/sdk-for-javascript/v3/developer-guide/javascript_ses_code_examples.html
 * https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/client/sesv2/
 * https://docs.aws.amazon.com/ses/latest/dg/regions.html
 * https://docs.aws.amazon.com/general/latest/gr/ses.html
 */

import * as sesClientModule from '@aws-sdk/client-ses';
import nodemailer from 'nodemailer';
import { Options as IMailer } from 'nodemailer/lib/mailer';

// 環境変数で持ちたい。AWS上で動かす場合は設定不要の想定。
// import {
//   AWS_ACCESS_KEY_ID,
//   AWS_SECRET_ACCESS_KEY,
//   AWS_SES_ENDPOINT,
//   MAIL_FROM,
// } from '@/config';
const AWS_ACCESS_KEY_ID = 'AWS_ACCESS_KEY_ID';
const AWS_SECRET_ACCESS_KEY = 'AWS_SECRET_ACCESS_KEY';
const AWS_SES_ENDPOINT = 'http://localhost:8005';
const MAIL_FROM = 'hoge@fuga';
const REGION = 'ap-northeast-1';

export function createTransporter() {
  const clientConfig: sesClientModule.SESClientConfig = { region: REGION };

  if (AWS_SES_ENDPOINT) clientConfig.endpoint = AWS_SES_ENDPOINT;

  if (AWS_ACCESS_KEY_ID && AWS_SECRET_ACCESS_KEY) {
    clientConfig.credentials = {
      accessKeyId: AWS_ACCESS_KEY_ID,
      secretAccessKey: AWS_SECRET_ACCESS_KEY,
    };
  }

  const client = new sesClientModule.SESClient(clientConfig);

  return nodemailer.createTransport({
    SES: { ses: client, aws: sesClientModule },
  });
}

export function sendHtmlMail({ to, cc, subject, html, attachments }: IMailer) {
  const transporter = createTransporter();

  return new Promise((resolve, reject) => {
    transporter.sendMail(
      {
        from: MAIL_FROM,
        to,
        cc,
        subject,
        html,
        attachments,
      },
      (err, info) => {
        if (err) {
          console.log('error', err);
          reject(err);
        } else {
          const { raw: _, ...pickedInfo } = info;
          console.log('success', pickedInfo);
          resolve(info);
        }
      },
    );
  });
}
