const nodemailer = require('nodemailer');

const checkIsConfigured = () => {
    const { SMTP_HOST, SMTP_USER, SMTP_PASSWORD } = process.env;
    return Boolean(SMTP_HOST && SMTP_USER && SMTP_PASSWORD);
};

const getTransporter = () => {
    const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD } = process.env;
    if (SMTP_HOST && SMTP_USER && SMTP_PASSWORD) {
        return nodemailer.createTransport({
            host: SMTP_HOST,
            port: Number(SMTP_PORT || 587),
            secure: Number(SMTP_PORT) === 465,
            auth: { user: SMTP_USER, pass: SMTP_PASSWORD }
        });
    }
    return null;
};

/**
 * Sends mail when SMTP is configured. Without SMTP credentials it logs the
 * message instead, so the reset flow is testable in development without
 * silently pretending a real email went out.
 */
const sendMail = async ({ to, subject, text, html }) => {
    const transporter = getTransporter();
    const { MAIL_FROM, SMTP_USER, NODE_ENV } = process.env;

    if (!transporter) {
        if (NODE_ENV === 'production') {
            throw new Error('SMTP is not configured; cannot send mail in production');
        }
        console.log('\n--- EMAIL (SMTP not configured, logging instead) ---');
        console.log(`To:      ${to}`);
        console.log(`Subject: ${subject}`);
        console.log(text);
        console.log('--- END EMAIL ---\n');
        return { delivered: false, logged: true };
    }

    await transporter.sendMail({
        from: MAIL_FROM || SMTP_USER,
        to,
        subject,
        text,
        html
    });
    return { delivered: true, logged: false };
};

const sendPasswordResetEmail = async ({ to, name, resetUrl, expiresInMinutes }) => {
    const subject = 'Reset your TalentSphere AI password';
    const text = [
        `Hi ${name},`,
        '',
        'We received a request to reset your TalentSphere AI password.',
        `Open this link to enter your new password (valid for ${expiresInMinutes} minutes):`,
        '',
        resetUrl,
        '',
        'If you did not request this, you can safely ignore this email — your password will not change.'
    ].join('\n');

    const html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background-color: #0f172a; color: #f8fafc; border-radius: 12px; border: 1px solid #1e293b;">
            <h2 style="color: #38bdf8; font-size: 24px; margin-top: 0; margin-bottom: 16px;">TalentSphere AI</h2>
            <p style="font-size: 16px; color: #e2e8f0; line-height: 1.5;">Hi <strong>${name}</strong>,</p>
            <p style="font-size: 15px; color: #94a3b8; line-height: 1.5;">We received a request to reset your TalentSphere AI account password. Click the button below to enter your new password:</p>
            <div style="margin: 28px 0; text-align: left;">
                <a href="${resetUrl}" style="background: linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%); color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600; display: inline-block; font-size: 15px; box-shadow: 0 4px 14px rgba(6, 182, 212, 0.3);">
                    Enter New Password
                </a>
            </div>
            <p style="font-size: 13px; color: #64748b; line-height: 1.5;">Or copy and paste this link into your browser:<br/>
                <a href="${resetUrl}" style="color: #38bdf8; word-break: break-all;">${resetUrl}</a>
            </p>
            <p style="font-size: 13px; color: #64748b; margin-top: 16px;">This link will expire in <strong>${expiresInMinutes} minutes</strong>.</p>
            <hr style="border: none; border-top: 1px solid #1e293b; margin: 24px 0;" />
            <p style="font-size: 12px; color: #475569; margin-bottom: 0;">If you did not request a password reset, you can safely ignore this email — your account remains secure.</p>
        </div>
    `;

    return sendMail({ to, subject, text, html });
};

exports = module.exports = { sendMail, sendPasswordResetEmail, isConfigured: checkIsConfigured };
