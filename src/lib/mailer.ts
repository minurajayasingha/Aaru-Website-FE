import nodemailer from "nodemailer";

export type ContactSubmission = {
  fullName: string;
  email: string;
  phone: string;
  interestedIn: string;
  message: string;
};

export async function sendContactEmail(submission: ContactSubmission): Promise<void> {
  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transport.sendMail({
    to: process.env.CONTACT_TO_EMAIL,
    from: process.env.SMTP_USER,
    replyTo: submission.email,
    subject: `New enquiry from ${submission.fullName} — ${submission.interestedIn}`,
    text: [
      `Name: ${submission.fullName}`,
      `Email: ${submission.email}`,
      `Phone: ${submission.phone}`,
      `Interested In: ${submission.interestedIn}`,
      "",
      submission.message,
    ].join("\n"),
  });
}
