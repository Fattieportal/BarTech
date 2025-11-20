# Database Quick Start Guide

## 🚀 Setup Stappen

### Stap 1: Vercel Postgres Database Aanmaken

1. **Log in bij Vercel**
   - Ga naar https://vercel.com/dashboard
   - Selecteer je project (of maak een nieuw project aan)

2. **Storage Tab**
   - Klik op "Storage" in de navigatie
   - Klik "Create Database"
   - Selecteer "Postgres"
   - Kies regio: **Frankfurt** (dichtst bij Nederland)
   - Klik "Create"

3. **Environment Variables Kopiëren**
   - Na het aanmaken krijg je automatisch environment variables
   - Klik ".env.local" tab
   - Kopieer ALLE variables
   - Plak in je lokale `.env.local` bestand

   Voorbeeld:
   ```env
   POSTGRES_URL="postgres://default:..."
   POSTGRES_PRISMA_URL="postgres://default:..."
   POSTGRES_URL_NO_SSL="postgres://default:..."
   POSTGRES_URL_NON_POOLING="postgres://default:..."
   POSTGRES_USER="default"
   POSTGRES_HOST="..."
   POSTGRES_PASSWORD="..."
   POSTGRES_DATABASE="verceldb"
   ```

### Stap 2: Database Initialiseren

**Optie A: Via API Endpoint (Makkelijkst)**

1. Start je dev server:
   ```bash
   npm run dev
   ```

2. Open in browser:
   ```
   http://localhost:3000/api/init-db
   ```

3. Je zou moeten zien:
   ```json
   {
     "success": true,
     "message": "Database initialized successfully"
   }
   ```

**Optie B: Via Vercel Dashboard**

1. Ga naar Vercel Dashboard → Storage → je database
2. Klik op "Query" tab
3. Plak en run dit SQL script:

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

CREATE INDEX IF NOT EXISTS idx_appointment_datetime 
ON appointments(appointment_date, appointment_time);

CREATE INDEX IF NOT EXISTS idx_email 
ON appointments(email);

CREATE INDEX IF NOT EXISTS idx_status 
ON appointments(status);
```

### Stap 3: Test de Database

1. **Maak een test booking** via je website
2. **Check of het werkt** via Vercel Dashboard:
   - Ga naar Storage → je database → Data tab
   - Run query: `SELECT * FROM appointments;`
   - Je zou je test appointment moeten zien

### Stap 4: Test Conflict Detection

1. **Probeer dubbele booking** voor dezelfde tijd
2. Je zou een error moeten krijgen:
   ```json
   {
     "error": "Deze tijd is helaas niet meer beschikbaar."
   }
   ```

## ✅ Verificatie Checklist

- [ ] Environment variables in `.env.local`
- [ ] Database aangemaakt in Vercel
- [ ] API endpoint `/api/init-db` geeft success
- [ ] Test booking werkt
- [ ] Appointment verschijnt in database
- [ ] Dubbele booking wordt voorkomen
- [ ] Google Calendar event wordt nog steeds gemaakt
- [ ] Emails worden verstuurd met Meet link

## 🎯 Wat Werkt Nu

### Dubbele Beveiliging tegen Conflicten

1. **Database Check** (Primair)
   - Voordat een booking wordt gemaakt
   - Controleert of datum/tijd al bestaat
   - Snelst en meest betrouwbaar

2. **Google Calendar Check** (Backup)
   - Als database check faalt
   - Extra zekerheid
   - Voorkomt sync issues

### Data Flow

```
Client maakt booking
    ↓
1. Database conflict check ✓
    ↓
2. Google Calendar check ✓
    ↓
3. Create Google Meet link
    ↓
4. Save to database
    ↓
5. Create calendar event
    ↓
6. Send emails (met .ics attachment)
    ↓
Success response
```

## 📊 Database Functies Beschikbaar

- `checkAppointmentConflict(date, time)` - Check of tijd beschikbaar is
- `createAppointment(data)` - Maak nieuwe appointment
- `getAllAppointments(status?)` - Haal alle appointments op
- `updateAppointmentStatus(id, status)` - Update status
- `deleteAppointment(id)` - Verwijder appointment
- `getAppointmentsByDate(date)` - Haal appointments voor specifieke dag

## 🔐 Security Note

**BELANGRIJK:** Verwijder of beveilig de `/api/init-db` endpoint na eerste gebruik!

Voeg authenticatie toe of verwijder het bestand:
```bash
rm src/app/api/init-db/route.ts
```

## 📱 Volgende Stappen (Optioneel)

1. **Admin Dashboard** - Overzicht van alle appointments
2. **Cancellation Flow** - Klanten kunnen afspraken annuleren
3. **Email Reminders** - Automatische herinneringen versturen
4. **Analytics** - Statistieken van bookings

## 🆘 Troubleshooting

### Error: "Cannot connect to database"

- Check of environment variables correct zijn in `.env.local`
- Herstart dev server na toevoegen van env variables
- Check Vercel Dashboard of database actief is

### Error: "Table already exists"

- Normaal! Dit betekent database is al geïnitialiseerd
- Je kunt de error negeren of `DROP TABLE appointments;` runnen om opnieuw te beginnen

### Appointments verdwijnen

- Check of je in Vercel Dashboard kijkt naar de juiste database
- Run: `SELECT * FROM appointments WHERE status = 'confirmed';`

## 💡 Tips

- **Development**: Gebruik lokale database voor sneller testen
- **Production**: Vercel Postgres is gratis voor kleine projecten
- **Backups**: Vercel maakt automatisch backups van je database
- **Monitoring**: Check Vercel Dashboard voor query performance
