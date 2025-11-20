# Database Setup - BarTech Booking System

## Overview

We gebruiken **Vercel Postgres** voor appointment management. Dit voorkomt dubbele bookings en geeft je een centraal overzicht van alle afspraken.

## Database Schema

### Table: `appointments`

```sql
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

-- Index voor snelle conflict checks
CREATE INDEX idx_appointment_datetime ON appointments(appointment_date, appointment_time);

-- Index voor email lookups
CREATE INDEX idx_email ON appointments(email);

-- Index voor status filtering
CREATE INDEX idx_status ON appointments(status);
```

## Setup Stappen

### Optie 1: Vercel Postgres (Aanbevolen voor productie)

1. **Ga naar Vercel Dashboard**
   - https://vercel.com/dashboard
   - Selecteer je project

2. **Storage Tab**
   - Klik "Create Database"
   - Kies "Postgres"
   - Selecteer region (closest to Netherlands: Frankfurt)
   - Create

3. **Connect Database**
   - Kopieer de connection string
   - Voeg toe aan `.env.local`:
     ```
     POSTGRES_URL="postgres://..."
     POSTGRES_PRISMA_URL="postgres://..."
     POSTGRES_URL_NON_POOLING="postgres://..."
     ```

4. **Run Schema**
   - In Vercel dashboard → Storage → Query tab
   - Plak en run het CREATE TABLE script hierboven

### Optie 2: Lokale Development (SQLite met better-sqlite3)

Voor lokale development kunnen we SQLite gebruiken:

```bash
npm install better-sqlite3
npm install -D @types/better-sqlite3
```

## Environment Variables

Add to `.env.local`:

```env
# Vercel Postgres (Production)
POSTGRES_URL="your_connection_string"
POSTGRES_PRISMA_URL="your_prisma_connection_string"
POSTGRES_URL_NON_POOLING="your_non_pooling_string"

# Or for local development
DATABASE_URL="file:./dev.db"
```

## Features

### ✅ Conflict Detection
- Checks database before creating booking
- Prevents double bookings for same time slot
- Returns 409 error if slot is already taken

### ✅ Status Management
- `confirmed` - Default status for new appointments
- `cancelled` - For cancelled appointments
- `completed` - For finished appointments
- `no_show` - For missed appointments

### ✅ Data Integrity
- Indexes for fast queries
- Foreign key constraints
- Timestamps for auditing

## API Usage

The booking API will:
1. Check for conflicts: `SELECT * FROM appointments WHERE date = ? AND time = ? AND status = 'confirmed'`
2. Create appointment: `INSERT INTO appointments (...) VALUES (...)`
3. Return appointment details with database ID

## Admin Panel (Future)

Later kunnen we een admin panel toevoegen om:
- Alle appointments te bekijken
- Status te updaten (confirmed → completed)
- Appointments te annuleren
- Statistieken te zien

## Migration Path

Current flow:
```
User books → Google Calendar check → Create event → Send emails
```

New flow:
```
User books → Database conflict check → Create in DB → Create Calendar event → Send emails
```

Dit geeft dubbele beveiliging:
1. Database check (primair)
2. Google Calendar check (backup)
