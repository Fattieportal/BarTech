import { NextResponse } from 'next/server';
import { initializeDatabase } from '@/lib/database';

/**
 * Initialize Database API
 * 
 * This endpoint should only be called once to set up the database tables.
 * For security, you might want to protect this endpoint or remove it after initialization.
 * 
 * Usage: GET /api/init-db
 */
export async function GET() {
  try {
    const result = await initializeDatabase();

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: 'Database initialized successfully',
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          message: 'Database initialization failed',
          error: result.error,
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Database initialization error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Database initialization failed',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
