import { sql } from '@vercel/postgres';

export interface Appointment {
  id: number;
  name: string;
  email: string;
  phone: string;
  appointment_date: string; // YYYY-MM-DD format
  appointment_time: string; // HH:MM format
  message?: string;
  language: string;
  calendar_event_id?: string;
  meet_link?: string;
  status: 'confirmed' | 'cancelled' | 'completed' | 'no_show';
  created_at: Date;
  updated_at: Date;
}

/**
 * Initialize the database (create tables if they don't exist)
 * Run this once during setup or deployment
 */
export async function initializeDatabase() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS appointments (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        appointment_date DATE NOT NULL,
        appointment_time TIME NOT NULL,
        message TEXT,
        language VARCHAR(10) DEFAULT 'nl',
        calendar_event_id VARCHAR(255),
        meet_link TEXT,
        status VARCHAR(50) DEFAULT 'confirmed',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // Create indexes for better performance
    await sql`
      CREATE INDEX IF NOT EXISTS idx_appointment_datetime 
      ON appointments(appointment_date, appointment_time);
    `;

    await sql`
      CREATE INDEX IF NOT EXISTS idx_email 
      ON appointments(email);
    `;

    await sql`
      CREATE INDEX IF NOT EXISTS idx_status 
      ON appointments(status);
    `;

    console.log('✅ Database initialized successfully');
    return { success: true };
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    return { success: false, error };
  }
}

/**
 * Check if a time slot is already booked
 */
export async function checkAppointmentConflict(
  date: string, // YYYY-MM-DD
  time: string  // HH:MM
): Promise<{ available: boolean; conflictingAppointment?: Appointment }> {
  try {
    const result = await sql<Appointment>`
      SELECT * FROM appointments 
      WHERE appointment_date = ${date}
      AND appointment_time = ${time}
      AND status = 'confirmed'
      LIMIT 1;
    `;

    if (result.rows.length > 0) {
      return {
        available: false,
        conflictingAppointment: result.rows[0],
      };
    }

    return { available: true };
  } catch (error) {
    console.error('Error checking appointment conflict:', error);
    // In case of error, assume not available (fail-safe)
    throw error;
  }
}

/**
 * Create a new appointment in the database
 */
export async function createAppointment(data: {
  name: string;
  email: string;
  phone: string;
  appointmentDate: string; // YYYY-MM-DD
  appointmentTime: string; // HH:MM
  message?: string;
  language: string;
  calendarEventId?: string;
  meetLink?: string;
}): Promise<Appointment> {
  try {
    const result = await sql<Appointment>`
      INSERT INTO appointments (
        name, 
        email, 
        phone, 
        appointment_date, 
        appointment_time, 
        message, 
        language,
        calendar_event_id,
        meet_link,
        status
      )
      VALUES (
        ${data.name},
        ${data.email},
        ${data.phone},
        ${data.appointmentDate},
        ${data.appointmentTime},
        ${data.message || null},
        ${data.language},
        ${data.calendarEventId || null},
        ${data.meetLink || null},
        'confirmed'
      )
      RETURNING *;
    `;

    return result.rows[0];
  } catch (error) {
    console.error('Error creating appointment:', error);
    throw error;
  }
}

/**
 * Get all appointments (for admin dashboard later)
 */
export async function getAllAppointments(
  status?: 'confirmed' | 'cancelled' | 'completed' | 'no_show'
): Promise<Appointment[]> {
  try {
    const result = status
      ? await sql<Appointment>`
          SELECT * FROM appointments 
          WHERE status = ${status}
          ORDER BY appointment_date DESC, appointment_time DESC;
        `
      : await sql<Appointment>`
          SELECT * FROM appointments 
          ORDER BY appointment_date DESC, appointment_time DESC;
        `;

    return result.rows;
  } catch (error) {
    console.error('Error fetching appointments:', error);
    throw error;
  }
}

/**
 * Update appointment status
 */
export async function updateAppointmentStatus(
  id: number,
  status: 'confirmed' | 'cancelled' | 'completed' | 'no_show'
): Promise<Appointment> {
  try {
    const result = await sql<Appointment>`
      UPDATE appointments 
      SET status = ${status}, 
          updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id}
      RETURNING *;
    `;

    if (result.rows.length === 0) {
      throw new Error(`Appointment with id ${id} not found`);
    }

    return result.rows[0];
  } catch (error) {
    console.error('Error updating appointment status:', error);
    throw error;
  }
}

/**
 * Delete appointment (use with caution - prefer status update)
 */
export async function deleteAppointment(id: number): Promise<boolean> {
  try {
    await sql`
      DELETE FROM appointments 
      WHERE id = ${id};
    `;
    return true;
  } catch (error) {
    console.error('Error deleting appointment:', error);
    throw error;
  }
}

/**
 * Get appointments for a specific date
 */
export async function getAppointmentsByDate(date: string): Promise<Appointment[]> {
  try {
    const result = await sql<Appointment>`
      SELECT * FROM appointments 
      WHERE appointment_date = ${date}
      AND status = 'confirmed'
      ORDER BY appointment_time ASC;
    `;

    return result.rows;
  } catch (error) {
    console.error('Error fetching appointments by date:', error);
    throw error;
  }
}
