import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, message, language } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: language === 'nl' ? 'Naam, email en bericht zijn verplicht' : 'Name, email and message are required' },
        { status: 400 }
      );
    }

    // Send confirmation email to client
    const clientEmailContent = language === 'nl' ? `
      <h1>Bedankt voor je bericht!</h1>
      <p>Hallo ${name},</p>
      <p>We hebben je bericht ontvangen en nemen zo snel mogelijk contact met je op, meestal binnen 24 uur.</p>
      <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h2 style="margin-top: 0; color: #374151;">Jouw bericht:</h2>
        <p style="white-space: pre-wrap;">${message}</p>
      </div>
      <p>Heb je een dringende vraag? Stuur gerust een berichtje via WhatsApp: <a href="https://wa.me/31685498990">+31 6 85498990</a></p>
      <br>
      <p>Met vriendelijke groet,<br><strong>Bar Technology</strong></p>
    ` : `
      <h1>Thank you for your message!</h1>
      <p>Hello ${name},</p>
      <p>We have received your message and will contact you as soon as possible, usually within 24 hours.</p>
      <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h2 style="margin-top: 0; color: #374151;">Your message:</h2>
        <p style="white-space: pre-wrap;">${message}</p>
      </div>
      <p>Have an urgent question? Feel free to message us on WhatsApp: <a href="https://wa.me/31685498990">+31 6 85498990</a></p>
      <br>
      <p>Best regards,<br><strong>Bar Technology</strong></p>
    `;

    // Send notification email to Bar Technology
    const barTechnologyEmailContent = `
      <h1>📩 Nieuw contactformulier bericht</h1>
      <p>Er is een nieuw bericht binnengekomen via het contactformulier.</p>
      <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h2 style="margin-top: 0; color: #374151;">Contact Gegevens</h2>
        <p style="margin: 5px 0;"><strong>👤 Naam:</strong> ${name}</p>
        <p style="margin: 5px 0;"><strong>📧 Email:</strong> <a href="mailto:${email}">${email}</a></p>
        ${phone ? `<p style="margin: 5px 0;"><strong>📱 Telefoon:</strong> <a href="tel:${phone}">${phone}</a></p>` : ''}
        <p style="margin: 5px 0;"><strong>🌐 Taal:</strong> ${language === 'nl' ? 'Nederlands' : 'English'}</p>
      </div>
      <div style="background-color: #eff6ff; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #2563eb;">
        <h2 style="margin-top: 0; color: #1e40af;">Bericht</h2>
        <p style="white-space: pre-wrap;">${message}</p>
      </div>
      <div style="margin-top: 20px; padding: 15px; background-color: #fef3c7; border-radius: 8px;">
        <p style="margin: 0;"><strong>💡 Tip:</strong> Klik op het email adres hierboven om direct te antwoorden.</p>
      </div>
    `;

    try {
      // Send both emails
      await Promise.all([
        // Client confirmation email
        resend.emails.send({
          from: 'Bar Technology <info@bar-technology.nl>',
          to: [email],
          subject: language === 'nl' 
            ? '✅ Bericht ontvangen - Bar Technology' 
            : '✅ Message Received - Bar Technology',
          html: clientEmailContent,
        }),
        // Notification to Bar Technology
        resend.emails.send({
          from: 'Bar Technology <info@bar-technology.nl>',
          to: ['abarjaj@gmail.com'],
          subject: `📩 Nieuw contactformulier: ${name}`,
          html: barTechnologyEmailContent,
          replyTo: email, // Makes it easy to reply directly to the client
        }),
      ]);

      return NextResponse.json({
        success: true,
        message: language === 'nl' 
          ? 'Bedankt voor je bericht! We nemen zo snel mogelijk contact op.' 
          : 'Thank you for your message! We will contact you as soon as possible.',
      });
    } catch (emailError) {
      console.error('Email sending error:', emailError);
      return NextResponse.json(
        { 
          error: language === 'nl' 
            ? 'Je bericht is opgeslagen maar er was een probleem met het versturen van de bevestiging. We nemen zo snel mogelijk contact op.' 
            : 'Your message was saved but there was an issue sending the confirmation. We will contact you shortly.',
          details: emailError instanceof Error ? emailError.message : 'Unknown error'
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { 
        error: 'Er is een fout opgetreden. Probeer het opnieuw of neem direct contact op via WhatsApp.',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
