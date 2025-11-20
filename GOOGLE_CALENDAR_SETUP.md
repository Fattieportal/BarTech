# 📅 Google Calendar Setup Instructies

## Stap 1: Google Cloud Project Aanmaken

1. Ga naar [Google Cloud Console](https://console.cloud.google.com/)
2. Klik op "Select a Project" → "New Project"
3. Naam: `BarTech Website`
4. Klik "Create"

## Stap 2: Calendar API Activeren

1. In je nieuwe project, ga naar "APIs & Services" → "Library"
2. Zoek naar "Google Calendar API"
3. Klik erop en klik "Enable"

## Stap 3: Service Account Aanmaken

1. Ga naar "APIs & Services" → "Credentials"
2. Klik "Create Credentials" → "Service Account"
3. Service account name: `bartech-calendar`
4. Klik "Create and Continue"
5. Role: Selecteer "Editor" (of "Owner" voor volledige toegang)
6. Klik "Done"

## Stap 4: Service Account Key Genereren

1. Klik op de service account die je net hebt gemaakt
2. Ga naar "Keys" tab
3. Klik "Add Key" → "Create new key"
4. Kies "JSON"
5. Klik "Create"
6. **JSON bestand wordt gedownload** - bewaar dit veilig!

## Stap 5: Service Account Toegang Geven tot Calendar

1. Open [Google Calendar](https://calendar.google.com)
2. Aan de linkerkant, naast "Mijn agenda's", klik op de 3 puntjes bij je hoofdagenda
3. Klik "Instellingen en delen"
4. Scroll naar "Delen met specifieke personen"
5. Klik "Personen toevoegen"
6. Plak het **service account email adres** (staat in je JSON bestand, eindigt op `@bartech-website-xxx.iam.gserviceaccount.com`)
7. Rechten: "Wijzigingen aanbrengen in gebeurtenissen"
8. Klik "Verzenden"

## Stap 6: Calendar ID Vinden

1. Nog steeds in Calendar instellingen
2. Scroll naar "Agenda integreren"
3. Kopieer de "Agenda-ID" (meestal je email adres)

## Stap 7: Environment Variables Toevoegen

Open je `.env.local` bestand en voeg toe:

```env
# Google Calendar API
GOOGLE_SERVICE_ACCOUNT_EMAIL=bartech-calendar@bartech-website-xxx.iam.gserviceaccount.com
GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nJouw private key hier...\n-----END PRIVATE KEY-----\n"
GOOGLE_CALENDAR_ID=jouw-email@gmail.com
```

### Hoe vul je dit in:

1. **GOOGLE_SERVICE_ACCOUNT_EMAIL**: 
   - Open het gedownloade JSON bestand
   - Kopieer de waarde van `"client_email"`

2. **GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY**:
   - Open het JSON bestand
   - Kopieer de HELE waarde van `"private_key"` (inclusief `-----BEGIN...` en `-----END...`)
   - Zet het tussen aanhalingstekens
   - **Let op**: De `\n` characters moeten blijven staan!

3. **GOOGLE_CALENDAR_ID**:
   - Gebruik je Gmail adres (bijv. `abarjaj@gmail.com`)
   - Of de Calendar ID die je in stap 6 hebt gevonden

## Stap 8: Test de Integratie

1. Herstart je development server:
   ```bash
   taskkill /F /IM node.exe
   cmd /c "cd C:\Users\Gslik\OneDrive\Documents\website && npm run dev"
   ```

2. Maak een test booking via de website
3. Check je Google Calendar - het event zou automatisch moeten verschijnen!

## ✅ Wat er Nu Gebeurt Bij Elke Booking:

1. **Automatisch Calendar Event:**
   - Titel: "Technisch Adviesgesprek - [Naam Klant]"
   - Datum/tijd: Gekozen tijdslot
   - Duur: 30 minuten
   - Beschrijving: Email, telefoon, bericht van klant

2. **Automatische Reminders:**
   - Email 24 uur van tevoren
   - Pop-up 1 uur van tevoren

3. **Klant Uitnodiging:**
   - Klant wordt toegevoegd als attendee
   - Krijgt .ics bestand in email
   - Kan toevoegen aan eigen agenda

4. **Dubbele Booking Preventie:**
   - Systeem checkt beschikbaarheid
   - Bezette tijden worden geblokkeerd

## 🔧 Troubleshooting

### "Service account does not have access"
- Check of je de service account email hebt toegevoegd aan je calendar (Stap 5)
- Check of je "Wijzigingen aanbrengen" rechten hebt gegeven

### "Invalid private key"
- Zorg dat de private key tussen aanhalingstekens staat
- Check of alle `\n` characters er nog in zitten
- Kopieer de HELE key inclusief BEGIN/END lines

### "Calendar API not enabled"
- Ga terug naar Google Cloud Console
- APIs & Services → Library
- Zoek "Google Calendar API" en enable het

### Events verschijnen niet
- Check of GOOGLE_CALENDAR_ID correct is (je email)
- Check browser console en terminal voor errors
- Kijk in Resend logs of emails wel worden verstuurd

## 📱 iPhone Sync

Als je iPhone sync wilt:
1. iPhone Instellingen → Wachtwoorden & Accounts
2. Voeg je Google account toe (abarjaj@gmail.com)
3. Zet "Kalenders" aan
4. Alle bookings syncen nu automatisch naar je iPhone!

## 🎯 Extra Features (Optioneel)

### Verschillende Kleuren per Type Afspraak
In `googleCalendar.ts`, regel 57:
```typescript
colorId: '9', // 9 = Blauw, 11 = Rood, 5 = Geel, 10 = Groen
```

### Langere/Kortere Afspraken
In `book-appointment/route.ts`, regel 32:
```typescript
endDateTime.setMinutes(endDateTime.getMinutes() + 30); // Verander 30 naar bijv. 60
```

### Meerdere Calendars
Maak aparte calendars voor verschillende diensten en gebruik verschillende CALENDAR_IDs.

## 🚀 Klaar!

Na deze setup:
- ✅ Elke booking gaat automatisch in je Google Agenda
- ✅ Je krijgt reminders op je telefoon
- ✅ Klanten krijgen calendar invite
- ✅ Geen dubbele bookings meer mogelijk
- ✅ Alles sync met iPhone/Android/etc.

Succes! 🎉
