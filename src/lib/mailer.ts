import nodemailer from "nodemailer";

export type ContactSubmission = {
  firstName: string;
  lastName: string;
  dialCode: string;
  phone: string;
  email: string;
  countryOfResidence: string;
  interestedIn: string;
  message: string;
  hearAboutUs: string;
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
    subject: `New enquiry from ${submission.firstName} ${submission.lastName} — ${submission.interestedIn}`,
    text: [
      `Name: ${submission.firstName} ${submission.lastName}`,
      `Phone: ${submission.dialCode} ${submission.phone}`,
      `Email: ${submission.email}`,
      `Country of Residence: ${submission.countryOfResidence}`,
      `Interested In: ${submission.interestedIn}`,
      `Heard About Us Via: ${submission.hearAboutUs}`,
      "",
      submission.message,
    ].join("\n"),
  });
}
