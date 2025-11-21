import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { createCalendarEvent, checkTimeSlotAvailability } from '@/lib/googleCalendar';
import { generateICS } from '@/lib/icsGenerator';
import { checkAppointmentConflict, createAppointment } from '@/lib/database';
import { getMeetLinkForBooking } from '@/lib/meetLink';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { date, time, name, email, phone, message, language } = body;

    // Validate required fields
    if (!date || !time || !name || !email || !phone) {
      return NextResponse.json(
        { error: language === 'nl' ? 'Alle velden zijn verplicht' : 'All fields are required' },
        { status: 400 }
      );
    }

    // Format date for emails
    const bookingDate = new Date(date);
    const formattedDate = language === 'nl'
      ? bookingDate.toLocaleDateString('nl-NL', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
      : bookingDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    // Parse time and create start/end datetime
    const [hours, minutes] = time.split(':').map(Number);
    const startDateTime = new Date(bookingDate);
    startDateTime.setHours(hours, minutes, 0, 0);
    
    const endDateTime = new Date(startDateTime);
    endDateTime.setMinutes(endDateTime.getMinutes() + 30); // 30 min appointment

    // Format date and time for database (YYYY-MM-DD and HH:MM)
    const dbDate = bookingDate.toISOString().split('T')[0]; // YYYY-MM-DD
    const dbTime = time; // HH:MM

    // 1. Check database for conflicts first (primary check)
    try {
      const conflict = await checkAppointmentConflict(dbDate, dbTime);
      if (!conflict.available) {
        return NextResponse.json(
          { 
            error: language === 'nl' 
              ? 'Deze tijd is helaas niet meer beschikbaar. Kies een andere tijd.' 
              : 'This time slot is no longer available. Please choose another time.',
            conflictingAppointment: conflict.conflictingAppointment 
          },
          { status: 409 }
        );
      }
    } catch (dbError) {
      console.error('Database conflict check failed:', dbError);
      // Continue with Google Calendar check as fallback
    }

    // 2. Check Google Calendar availability (backup check)
    const availability = await checkTimeSlotAvailability(startDateTime, endDateTime);
    if (!availability.available) {
      return NextResponse.json(
        { error: language === 'nl' 
          ? 'Deze tijd is helaas niet meer beschikbaar. Kies een andere tijd.' 
          : 'This time slot is no longer available. Please choose another time.' 
        },
        { status: 409 }
      );
    }

    try {
      // Create Google Calendar event with Google Meet
      const calendarResult = await createCalendarEvent({
        summary: `Technisch Adviesgesprek - ${name}`,
        description: `
📧 Email: ${email}
📱 Telefoon: ${phone}
💬 Bericht: ${message || 'Geen bericht'}

Via Bar Technology website booking systeem
        `.trim(),
        startDateTime,
        endDateTime,
        // Don't add attendee - service accounts need Domain-Wide Delegation for that
        // Klant krijgt .ics file in email om zelf toe te voegen
      });

      // Check if calendar event was created successfully
      if (!calendarResult.success) {
        console.error('Failed to create calendar event:', calendarResult.error);
        return NextResponse.json(
          { 
            error: language === 'nl' 
              ? 'Er is een probleem met Google Calendar. Probeer het opnieuw of neem contact op.' 
              : 'There was a problem with Google Calendar. Please try again or contact us.',
            details: calendarResult.error 
          },
          { status: 500 }
        );
      }

      // Generate Meet link (service accounts can't create them automatically)
      // Option 1: Use fixed room (recommended for now)
      const meetLink = getMeetLinkForBooking({ useFixed: true });
      
      // Option 2: Generate unique link per appointment (after DB save)
      // const meetLink = getMeetLinkForBooking({ appointmentId: dbAppointment?.id });

      // Log for debugging
      console.log('📅 Calendar Event Created:', {
        eventId: calendarResult.eventId,
        meetLink: meetLink,
      });

      // Update client email content with Google Meet link
      const clientEmailContentWithMeet = language === 'nl' ? `
      <h1>Bedankt voor je afspraak!</h1>
      <p>Hallo ${name},</p>
      <p>Je afspraak is succesvol ingepland. Hier zijn de details:</p>
      <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p style="margin: 5px 0;"><strong>📅 Datum:</strong> ${formattedDate}</p>
        <p style="margin: 5px 0;"><strong>🕐 Tijd:</strong> ${time}</p>
        <p style="margin: 5px 0;"><strong>📧 Email:</strong> ${email}</p>
        <p style="margin: 5px 0;"><strong>📱 Telefoon:</strong> ${phone}</p>
        ${message ? `<p style="margin: 5px 0;"><strong>💬 Bericht:</strong> ${message}</p>` : ''}
      </div>
      <div style="background-color: #dbeafe; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #2563eb;">
        <p style="margin: 0 0 10px 0;"><strong>📹 Google Meet Link:</strong></p>
        <p style="margin: 0;"><a href="${meetLink}" style="color: #2563eb; font-weight: bold; font-size: 16px;">${meetLink}</a></p>
        <p style="margin: 10px 0 0 0; font-size: 14px; color: #6b7280;">Klik op de link om deel te nemen aan het videogesprek op het afgesproken tijdstip.</p>
      </div>
      <p>We kijken ernaar uit om met je te praten!</p>
      <p>Heb je vragen? Stuur gerust een berichtje via WhatsApp: <a href="https://wa.me/31685498990">+31 6 85498990</a></p>
      <br>
      <p>Met vriendelijke groet,<br><strong>Bar Technology</strong></p>
    ` : `
      <h1>Thank you for your appointment!</h1>
      <p>Hello ${name},</p>
      <p>Your appointment has been successfully scheduled. Here are the details:</p>
      <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p style="margin: 5px 0;"><strong>📅 Date:</strong> ${formattedDate}</p>
        <p style="margin: 5px 0;"><strong>🕐 Time:</strong> ${time}</p>
        <p style="margin: 5px 0;"><strong>📧 Email:</strong> ${email}</p>
        <p style="margin: 5px 0;"><strong>📱 Phone:</strong> ${phone}</p>
        ${message ? `<p style="margin: 5px 0;"><strong>💬 Message:</strong> ${message}</p>` : ''}
      </div>
      <div style="background-color: #dbeafe; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #2563eb;">
        <p style="margin: 0 0 10px 0;"><strong>📹 Google Meet Link:</strong></p>
        <p style="margin: 0;"><a href="${meetLink}" style="color: #2563eb; font-weight: bold; font-size: 16px;">${meetLink}</a></p>
        <p style="margin: 10px 0 0 0; font-size: 14px; color: #6b7280;">Click the link to join the video call at the scheduled time.</p>
      </div>
      <p>We look forward to speaking with you!</p>
      <p>Have questions? Feel free to message us on WhatsApp: <a href="https://wa.me/31685498990">+31 6 85498990</a></p>
      <br>
      <p>Best regards,<br><strong>Bar Technology</strong></p>
    `;

      // Update Bar Technology notification email with Google Meet link
      const barTechnologyEmailContentWithMeet = `
      <h1>🎉 Nieuwe afspraak ingepland!</h1>
      <p>Er is een nieuwe afspraak gemaakt via de website.</p>
      <div style="background-color: #eff6ff; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #2563eb;">
        <h2 style="margin-top: 0; color: #1e40af;">Afspraak Details</h2>
        <p style="margin: 5px 0;"><strong>📅 Datum:</strong> ${formattedDate}</p>
        <p style="margin: 5px 0;"><strong>🕐 Tijd:</strong> ${time}</p>
        <p style="margin: 5px 0;"><strong>📹 Google Meet:</strong> <a href="${meetLink}" style="color: #2563eb; font-weight: bold;">${meetLink}</a></p>
      </div>
      <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h2 style="margin-top: 0; color: #374151;">Klant Gegevens</h2>
        <p style="margin: 5px 0;"><strong>👤 Naam:</strong> ${name}</p>
        <p style="margin: 5px 0;"><strong>📧 Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p style="margin: 5px 0;"><strong>📱 Telefoon:</strong> <a href="tel:${phone}">${phone}</a></p>
        <p style="margin: 5px 0;"><strong>🌐 Taal:</strong> ${language === 'nl' ? 'Nederlands' : 'English'}</p>
        ${message ? `<p style="margin: 10px 0 5px 0;"><strong>💬 Bericht van klant:</strong></p><p style="background-color: white; padding: 10px; border-radius: 4px;">${message}</p>` : '<p style="margin: 5px 0;"><em>Geen bericht achtergelaten</em></p>'}
      </div>
      <div style="margin-top: 20px; padding: 15px; background-color: #fef3c7; border-radius: 8px;">
        <p style="margin: 0;"><strong>⏰ Reminder:</strong> De Google Meet link is automatisch aangemaakt en staat in je Google Calendar.</p>
      </div>
    `;

      // Generate .ics file for client with Meet link
      const icsContent = generateICS({
        summary: language === 'nl' 
          ? `Technisch Adviesgesprek met Bar Technology`
          : `Technical Consultation with Bar Technology`,
        description: language === 'nl'
          ? `Gratis 30-minuten technisch adviesgesprek met Bar Technology.\n\n📹 Google Meet: ${meetLink}\n\nVragen? Stuur een WhatsApp bericht naar +31 6 85498990`
          : `Free 30-minute technical consultation with Bar Technology.\n\n📹 Google Meet: ${meetLink}\n\nQuestions? Send a WhatsApp message to +31 6 85498990`,
        startDateTime,
        endDateTime,
        location: meetLink,
        organizerEmail: 'abarjaj@gmail.com',
        organizerName: 'Bar Technology - Aimane',
        attendeeEmail: email,
        attendeeName: name,
      });

      // 3. Save appointment to database
      let dbAppointment;
      try {
        dbAppointment = await createAppointment({
          name,
          email,
          phone,
          appointmentDate: dbDate,
          appointmentTime: dbTime,
          message: message || undefined,
          language,
          calendarEventId: calendarResult.eventId || undefined,
          meetLink: meetLink,
        });
        console.log('✅ Appointment saved to database:', dbAppointment.id);
      } catch (dbError) {
        console.error('❌ Failed to save appointment to database:', dbError);
        // Don't fail the booking if database save fails - calendar event is already created
        // We can manually add to DB later if needed
      }

      // Send both emails
      await Promise.all([
        // Client confirmation email
        resend.emails.send({
          from: 'Bar Technology <info@bar-technology.nl>',
          to: [email],
          subject: language === 'nl' 
            ? '✅ Afspraak bevestiging - Bar Technology' 
            : '✅ Appointment Confirmation - Bar Technology',
          html: clientEmailContentWithMeet,
          attachments: [
            {
              filename: 'afspraak.ics',
              content: Buffer.from(icsContent).toString('base64'),
            },
          ],
        }),
        // Notification to Bar Technology
        resend.emails.send({
          from: 'Bar Technology <info@bar-technology.nl>',
          to: ['info@bar-technology.nl'],
          subject: `🎉 Nieuwe afspraak: ${name} op ${formattedDate} om ${time}`,
          html: barTechnologyEmailContentWithMeet,
          replyTo: email, // Makes it easy to reply directly to the client
        }),
      ]);

      return NextResponse.json({
        success: true,
        message: language === 'nl' 
          ? 'Afspraak succesvol ingepland! Check je email voor de bevestiging.' 
          : 'Appointment successfully scheduled! Check your email for confirmation.',
        appointment: dbAppointment ? {
          id: dbAppointment.id,
          date: dbAppointment.appointment_date,
          time: dbAppointment.appointment_time,
        } : null,
        calendarEvent: calendarResult.success ? {
          eventId: calendarResult.eventId,
          eventLink: calendarResult.eventLink,
          meetLink: meetLink,
        } : null,
      });
    } catch (emailError) {
      console.error('Email sending error:', emailError);
      return NextResponse.json(
        { 
          error: language === 'nl' 
            ? 'Afspraak opgeslagen maar er was een probleem met het versturen van de email. We nemen zo snel mogelijk contact op.' 
            : 'Appointment saved but there was an issue sending the email. We will contact you shortly.',
          details: emailError instanceof Error ? emailError.message : 'Unknown error'
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Booking error:', error);
    return NextResponse.json(
      { 
        error: 'Er is een fout opgetreden. Probeer het opnieuw of neem direct contact op via WhatsApp.',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
