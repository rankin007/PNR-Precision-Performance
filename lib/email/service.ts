import nodemailer from "nodemailer";

interface OnboardingApplication {
  id: string;
  client_name: string;
  business_name: string | null;
  stable_address: string;
  direct_email: string;
  admin_email: string | null;
  mobile_number: string;
  confirmation_token: string;
}

const getTransporter = () => {
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.warn("SMTP environment variables missing. Emails will be logged to console in development.");
    return null;
  }

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
};

const sendHtmlEmail = async (to: string, subject: string, html: string, replyTo?: string) => {
  const transporter = getTransporter();
  const fromAddress = process.env.SMTP_FROM || "noreply@precisionperformance.com.au";

  if (!transporter) {
    console.log(`\n\n--- MOCK EMAIL TO: ${to} ---`);
    console.log(`SUBJECT: ${subject}`);
    console.log(`BODY (HTML): \n${html}`);
    console.log(`-------------------------------------------\n\n`);
    return;
  }

  await transporter.sendMail({
    from: `"Precision Performance" <${fromAddress}>`,
    to,
    subject,
    html,
    replyTo,
  });
};

type ContactEnquiry = {
  name: string;
  email: string;
  mobile: string;
  comments: string;
};

export async function sendApplicantConfirmationEmail(application: OnboardingApplication) {
  const appUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const confirmUrl = `${appUrl}/onboarding/confirm?token=${application.confirmation_token}`;

  const html = `
    <h2>Welcome to Precision Performance</h2>
    <p>Hi ${escapeHtml(application.client_name)},</p>
    <p>Thank you for submitting your onboarding application for <strong>${application.business_name || application.stable_address}</strong>.</p>
    
    <h3>The Concept</h3>
    <p>
      Precision Performance is an elite equine clinical ledger designed for structured performance and biochemistry data capture. 
      Our system helps trainers and owners make data-driven decisions based on meticulous record-keeping.
    </p>

    <h3>Next Steps</h3>
    <ol>
      <li>Verify your email using the link below.</li>
      <li>Review and agree to the clinical disclaimer.</li>
      <li>Our team will review your application and provisions your secure membership environment.</li>
    </ol>

    <h3>Verify & Agree</h3>
    <p>To confirm your email address and read the legal disclaimer, please click the secure link below:</p>
    <p><a href="${confirmUrl}" style="display:inline-block;padding:10px 20px;background:#18212b;color:#ffffff;text-decoration:none;border-radius:5px;">Confirm Email & Review Disclaimer</a></p>

    <p>Or alternatively, copy and paste this link into your browser:<br/>
    <a href="${confirmUrl}">${confirmUrl}</a></p>

    <p>Best regards,<br/>The Precision Performance Team</p>
  `;

  await sendHtmlEmail(application.direct_email, "Confirm your Precision Performance Application", html);
}

export async function sendAdminNotificationEmail(application: OnboardingApplication) {
  const adminNotificationEmail = process.env.ADMIN_NOTIFICATION_EMAIL;

  if (!adminNotificationEmail) {
    console.warn("ADMIN_NOTIFICATION_EMAIL is not configured. Admin onboarding notifications will be skipped.");
    return;
  }

  const html = `
    <h2>New Onboarding Application Received</h2>
    <p>A new client has submitted the onboarding form.</p>
    <ul>
      <li><strong>Client Name:</strong> ${escapeHtml(application.client_name)}</li>
      <li><strong>Business Name:</strong> ${escapeHtml(application.business_name || "N/A")}</li>
      <li><strong>Stable Address:</strong> ${escapeHtml(application.stable_address)}</li>
      <li><strong>Direct Email:</strong> ${escapeHtml(application.direct_email)}</li>
      <li><strong>Admin Email:</strong> ${escapeHtml(application.admin_email || "N/A")}</li>
      <li><strong>Mobile Number:</strong> ${escapeHtml(application.mobile_number)}</li>
    </ul>
    <p>Status: Application recorded and verification email sent.</p>
  `;

  await sendHtmlEmail(adminNotificationEmail, `New Client Application: ${application.client_name}`, html);
}

export async function sendContactEnquiryEmail(enquiry: ContactEnquiry) {
  const enquiryRecipient = process.env.CONTACT_ENQUIRY_EMAIL || process.env.ADMIN_NOTIFICATION_EMAIL;

  if (!enquiryRecipient) {
    throw new Error("CONTACT_ENQUIRY_EMAIL or ADMIN_NOTIFICATION_EMAIL must be configured.");
  }

  const html = `
    <h2>New Website Enquiry</h2>
    <p>A new enquiry has been submitted through the contact page.</p>
    <ul>
      <li><strong>Name:</strong> ${escapeHtml(enquiry.name)}</li>
      <li><strong>Email:</strong> ${escapeHtml(enquiry.email)}</li>
      <li><strong>Mobile:</strong> ${escapeHtml(enquiry.mobile)}</li>
      <li><strong>Comments:</strong> ${escapeHtml(enquiry.comments || "No comments provided")}</li>
    </ul>
  `;

  await sendHtmlEmail(
    enquiryRecipient,
    `Website Enquiry: ${enquiry.name}`,
    html,
    enquiry.email
  );
}

function escapeHtml(unsafe: string) {
  return unsafe
       .replace(/&/g, "&amp;")
       .replace(/</g, "&lt;")
       .replace(/>/g, "&gt;")
       .replace(/"/g, "&quot;")
       .replace(/'/g, "&#039;");
}
