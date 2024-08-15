'use server';

// server actionでAWS SESによるメール送信を行う例
// import { sendHtmlMail } from "@/features/mail/ses";
// import { buildHtmlMailStr } from "@/features/mail/html";

export async function sendMail() {
  console.log('server');
  // const html = buildHtmlMailStr(<div>hello</div>);
  // await sendHtmlMail({ html });

  return Math.random();
}
