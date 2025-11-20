import { NextRequest, NextResponse } from 'next/server';
import { getAppointmentsByDate } from '@/lib/database';

/**
 * Check which time slots are already booked for a specific date
 * 
 * Usage: GET /api/check-availability?date=2025-11-20
 * Returns: { bookedSlots: ["10:00", "14:30", ...] }
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const date = searchParams.get('date');

    if (!date) {
      return NextResponse.json(
        { error: 'Date parameter is required' },
        { status: 400 }
      );
    }

    // Get all confirmed appointments for this date
    const appointments = await getAppointmentsByDate(date);

    // Extract just the time values
    const bookedSlots = appointments.map(apt => 
      apt.appointment_time.substring(0, 5) // Convert "10:00:00" to "10:00"
    );

    return NextResponse.json({
      success: true,
      date,
      bookedSlots,
    });
  } catch (error) {
    console.error('Error checking availability:', error);
    
    // Graceful degradation - return empty array if database fails
    // This way the booking system still works, just without showing booked slots
    return NextResponse.json({
      success: true,
      date: request.nextUrl.searchParams.get('date') || '',
      bookedSlots: [],
      warning: 'Could not check database, showing all slots as available',
    });
  }
}
