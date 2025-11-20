import { google } from 'googleapis';

// Initialize Google Calendar API
export function getGoogleCalendar() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/calendar'],
  });

  return google.calendar({ version: 'v3', auth });
}

interface CreateEventParams {
  summary: string;
  description: string;
  startDateTime: Date;
  endDateTime: Date;
  attendeeEmail?: string;
  attendeeName?: string;
}

// Create calendar event
export async function createCalendarEvent(params: CreateEventParams) {
  try {
    const calendar = getGoogleCalendar();
    const calendarId = process.env.GOOGLE_CALENDAR_ID || 'primary';

    const event = {
      summary: params.summary,
      description: params.description,
      start: {
        dateTime: params.startDateTime.toISOString(),
        timeZone: 'Europe/Amsterdam',
      },
      end: {
        dateTime: params.endDateTime.toISOString(),
        timeZone: 'Europe/Amsterdam',
      },
      // NOTE: Service accounts cannot create Google Meet links without Domain-Wide Delegation
      // We'll add the Meet link manually in the description or use a separate solution
      attendees: undefined,
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email', minutes: 24 * 60 }, // 1 day before
          { method: 'popup', minutes: 60 }, // 1 hour before
        ],
      },
      // Color: Blue
      colorId: '9',
    };

    const response = await calendar.events.insert({
      calendarId,
      requestBody: event,
      sendUpdates: 'none', // Don't send updates (we handle emails ourselves)
    });

    // Service accounts cannot create Meet links automatically
    // You'll need to manually add Meet link or use a fixed room
    console.log('📅 Calendar Event Created:', {
      eventId: response.data.id,
      eventLink: response.data.htmlLink,
    });

    return {
      success: true,
      eventId: response.data.id,
      eventLink: response.data.htmlLink,
      meetLink: undefined, // Service account cannot create Meet links
    };
  } catch (error) {
    console.error('Google Calendar Error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

// Check if a time slot is available
export async function checkTimeSlotAvailability(startDateTime: Date, endDateTime: Date) {
  try {
    const calendar = getGoogleCalendar();
    const calendarId = process.env.GOOGLE_CALENDAR_ID || 'primary';

    const response = await calendar.events.list({
      calendarId,
      timeMin: startDateTime.toISOString(),
      timeMax: endDateTime.toISOString(),
      singleEvents: true,
      orderBy: 'startTime',
    });

    // If there are any events in this time range, slot is not available
    return {
      available: !response.data.items || response.data.items.length === 0,
      conflictingEvents: response.data.items?.length || 0,
    };
  } catch (error) {
    console.error('Calendar availability check error:', error);
    // If check fails, assume available (graceful degradation)
    return { available: true, conflictingEvents: 0 };
  }
}

// Delete calendar event (for cancellations)
export async function deleteCalendarEvent(eventId: string) {
  try {
    const calendar = getGoogleCalendar();
    const calendarId = process.env.GOOGLE_CALENDAR_ID || 'primary';

    await calendar.events.delete({
      calendarId,
      eventId,
      sendUpdates: 'all', // Notify attendees
    });

    return { success: true };
  } catch (error) {
    console.error('Calendar delete error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
