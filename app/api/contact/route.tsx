import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const formatFormType = (type: string) => {
  switch (type) {
    case 'sdk_api': return 'OSP SDK/API Inquiries';
    default: return 'General Contact';
  }
};

const getEmailTemplateToCompany = (
  name: string, 
  email: string, 
  message: string, 
  formType: string, 
  source: string, 
  company?: string | null
) => `
  <div style="font-family: sans-serif; line-height: 1.5; color: #333;">
    <h2 style="color: #0f172a; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px;">
      [OSP Site] New Submission: ${formatFormType(formType)}
    </h2>
    <p>You have received a new submission from the OSP contact form.</p>
    <ul style="list-style: none; padding-left: 0;">
      <li style="margin-bottom: 8px;"><strong>Name:</strong> ${name}</li>
      <li style="margin-bottom: 8px;"><strong>Email:</strong> ${email}</li>
      <li style="margin-bottom: 8px;"><strong>Topic Focus:</strong> ${formatFormType(formType)}</li>
      <li style="margin-bottom: 8px;"><strong>Source Page:</strong> ${source}</li>
      ${company ? `<li style="margin-bottom: 8px;"><strong>Company / Project:</strong> ${company}</li>` : ''}
    </ul>
    <h3 style="color: #0f172a; margin-top: 24px;">Message / Inquiry Details:</h3>
    <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 16px; font-style: ${message ? 'normal' : 'italic'};">
      ${message ? message.replace(/\n/g, '<br/>') : 'No message provided.'}
    </div>
  </div>
`;

const getConfirmationEmailTemplate = (name: string, formType: string) => `
  <div style="font-family: sans-serif; line-height: 1.5; color: #333;">
    <h2 style="color: #0f172a;">Thanks for connecting with OSP, ${name}!</h2>
    <p>
      We have received your ${
        formType === 'sdk_api' 
          ? 'inquiry regarding our upcoming Upload & Verification SDK / APIs' 
          : 'general contact message'
      }.
    </p>
    <p>We are excited about what we are building and will have a team member review your questions and get back to you with details shortly.</p>
    <br />
    <p>Best regards,</p>
    <p><strong>OSP Team</strong><br />DoubleThink Solutions</p>
  </div>
`;

const resend = new Resend(process.env.RESEND_API_KEY);
const companyEmail = process.env.COMPANY_EMAIL;
const fromEmail = process.env.FROM_EMAIL;

export async function POST(request: Request) {
  try {
    if (!companyEmail || !fromEmail) {
      console.error('Missing environment variables: COMPANY_EMAIL or FROM_EMAIL');
      return NextResponse.json({ error: 'Server configuration error.' }, { status: 500 });
    }

    const { name, company, email, message, formType, source } = await request.json();

    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required.' }, { status: 400 });
    }

    const subjectLine = `[OSP Portal] ${formatFormType(formType)} Inquiry from ${name}`;

    const toCompany = await resend.emails.send({
      from: fromEmail,
      to: companyEmail,
      subject: subjectLine,
      html: getEmailTemplateToCompany(name, email, message, formType, source || 'OSP Contact Page', company),
    });

    if (toCompany.error) {
      console.error('Failed to send email to company:', toCompany.error);
      return NextResponse.json({ error: 'Failed to submit form. Please try again.' }, { status: 500 });
    }

    await resend.emails.send({
      from: fromEmail,
      to: email,
      subject: formType === 'sdk_api' ? 'OSP: SDK & API Inquiry Received' : 'We received your OSP submission',
      html: getConfirmationEmailTemplate(name, formType),
    });

    return NextResponse.json({ message: 'Success' }, { status: 200 });

  } catch (error) {
    console.error('Unexpected error in OSP contact API:', error);
    return NextResponse.json({ error: 'Something went wrong. Please try again later.' }, { status: 500 });
  }
}
