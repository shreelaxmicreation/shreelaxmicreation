require('dotenv').config({ path: '.env.local' });
const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

async function test() {
  const { data, error } = await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
    to: process.env.RESEND_TO_EMAIL || 'shreelaxmicreation81@gmail.com',
    subject: `Test`,
    html: `Test`
  });
  console.log({ data, error });
}
test();
