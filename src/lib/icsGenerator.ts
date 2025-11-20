// Generate .ics calendar file content
export function generateICS(params: {
  summary: string;
  description: string;
  startDateTime: Date;
  endDateTime: Date;
  location?: string;
  organizerEmail: string;
  organizerName: string;
  attendeeEmail?: string;
  attendeeName?: string;
}): string {
  const formatDate = (date: Date): string => {
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  };

  const escapeText = (text: string): string => {
    return text
      .replace(/\\/g, '\\\\')
      .replace(/;/g, '\\;')
      .replace(/,/g, '\\,')
      .replace(/\n/g, '\\n');
  };

  const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//BarTech//Booking System//NL
CALSCALE:GREGORIAN
METHOD:REQUEST
BEGIN:VEVENT
UID:${Date.now()}@bartech.nl
DTSTAMP:${formatDate(new Date())}
DTSTART:${formatDate(params.startDateTime)}
DTEND:${formatDate(params.endDateTime)}
SUMMARY:${escapeText(params.summary)}
DESCRIPTION:${escapeText(params.description)}
${params.location ? `LOCATION:${escapeText(params.location)}` : ''}
ORGANIZER;CN=${escapeText(params.organizerName)}:mailto:${params.organizerEmail}
${params.attendeeEmail ? `ATTENDEE;CN=${escapeText(params.attendeeName || '')}:mailto:${params.attendeeEmail}` : ''}
STATUS:CONFIRMED
SEQUENCE:0
BEGIN:VALARM
TRIGGER:-PT24H
ACTION:DISPLAY
DESCRIPTION:Herinnering: ${escapeText(params.summary)}
END:VALARM
BEGIN:VALARM
TRIGGER:-PT1H
ACTION:DISPLAY
DESCRIPTION:Over 1 uur: ${escapeText(params.summary)}
END:VALARM
END:VEVENT
END:VCALENDAR`;

  return icsContent;
}
