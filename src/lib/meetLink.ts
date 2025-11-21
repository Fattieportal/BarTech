/**
 * Generate Google Meet Link
 * 
 * Service accounts cannot create Google Meet links automatically.
 * This helper provides different strategies for Meet links.
 */

/**
 * Strategy 1: Fixed Meet Room (Simple)
 * Use a permanent Google Meet room for all appointments
 */
export function getFixedMeetLink(): string {
  // TODO: Replace with your actual permanent Meet room
  // Go to https://meet.google.com/ → "New meeting" → Copy the code
  return process.env.GOOGLE_MEET_ROOM || 'https://meet.google.com/your-permanent-room';
}

/**
 * Strategy 2: Unique Meeting Code (Recommended)
 * Generate a unique meet link based on booking details
 * 
 * Note: These are NOT real Google Meet rooms, they are suggestions.
 * You still need to manually create the room or use a fixed room.
 */
export function generateMeetCode(appointmentId: string | number): string {
  // Generate a readable meet code based on appointment ID
  const code = `bar-technology-${appointmentId}`;
  return `https://meet.google.com/${code}`;
}

/**
 * Strategy 3: Calendar Event ID Based
 * Use the Google Calendar event ID to create a consistent link
 */
export function getMeetLinkFromEventId(eventId?: string): string {
  if (!eventId) {
    return getFixedMeetLink();
  }
  
  // Create a unique code from event ID
  const shortCode = eventId.substring(0, 10);
  return `https://meet.google.com/bar-technology-${shortCode}`;
}

/**
 * Get Meet Link for Booking
 * 
 * Call this function to get the Meet link for a booking.
 * Customize based on your preferred strategy.
 */
export function getMeetLinkForBooking(options: {
  appointmentId?: number;
  eventId?: string;
  useFixed?: boolean;
}): string {
  const { appointmentId, eventId, useFixed } = options;

  // Strategy 1: Use fixed room (simplest)
  if (useFixed || !appointmentId) {
    return getFixedMeetLink();
  }

  // Strategy 2: Generate unique code based on DB appointment ID
  if (appointmentId) {
    return generateMeetCode(appointmentId);
  }

  // Strategy 3: Use calendar event ID
  if (eventId) {
    return getMeetLinkFromEventId(eventId);
  }

  // Fallback to fixed room
  return getFixedMeetLink();
}

/**
 * TODO: Setup Instructions
 * 
 * Option A - Fixed Room (Recommended for now):
 * 1. Go to https://meet.google.com/
 * 2. Click "New meeting" → "Create a meeting for later"
 * 3. Copy the permanent meeting code (e.g., abc-defg-hij)
 * 4. Add to .env.local: GOOGLE_MEET_ROOM=https://meet.google.com/abc-defg-hij
 * 5. Use getFixedMeetLink() for all bookings
 * 
 * Option B - Google Workspace (Future):
 * 1. Upgrade to Google Workspace ($6-12/month)
 * 2. Enable Domain-Wide Delegation for service account
 * 3. Google Calendar API can then create Meet links automatically
 * 
 * Option C - Manual Creation:
 * 1. When you receive booking notification email
 * 2. Open the calendar event
 * 3. Click "Add Google Meet video conferencing"
 * 4. Link is automatically added and sent to attendees
 */
