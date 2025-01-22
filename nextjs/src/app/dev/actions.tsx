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

export async function handleForm(formData: FormData) {
  for (let i = 0; i < 100000; i++) {
    for (let j = 0; j < 100000; j++) {
      // do nothing
    }
  }

  for (const [key, value] of formData.entries()) {
    console.log(key, value);
  }
};
