const nodemailer = require('nodemailer');

const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD, MAIL_FROM, NODE_ENV } = process.env;

const isConfigured = Boolean(SMTP_HOST && SMTP_USER && SMTP_PASSWORD);

const transporter = isConfigured
    ? nodemailer.createTransport({
        host: SMTP_HOST,
        port: Number(SMTP_PORT || 587),
        secure: Number(SMTP_PORT) === 465,
        auth: { user: SMTP_USER, pass: SMTP_PASSWORD }
    })
    : null;

/**
 * Sends mail when SMTP is configured. Without SMTP credentials it logs the
 * message instead, so the reset flow is testable in development without
 * silently pretending a real email went out.
 */
const sendMail = async ({ to, subject, text, html }) => {
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
        `Open this link to choose a new one (valid for ${expiresInMinutes} minutes):`,
        '',
        resetUrl,
        '',
        'If you did not request this, you can safely ignore this email — your password will not change.'
    ].join('\n');

    const html = `
        <p>Hi ${name},</p>
        <p>We received a request to reset your TalentSphere AI password.</p>
        <p><a href="${resetUrl}">Choose a new password</a> (valid for ${expiresInMinutes} minutes).</p>
        <p>If you did not request this, you can safely ignore this email &mdash; your password will not change.</p>
    `;

    return sendMail({ to, subject, text, html });
};

exports = module.exports = { sendMail, sendPasswordResetEmail, isConfigured };
