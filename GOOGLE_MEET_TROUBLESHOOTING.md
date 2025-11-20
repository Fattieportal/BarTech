# Google Meet Link Troubleshooting

## Probleem: "Link volgt spoedig" in plaats van echte Google Meet link

### Mogelijke Oorzaken:

1. **Service Account Permissions** (Meest waarschijnlijk)
   - Service accounts kunnen geen Google Meet links maken zonder extra permissies
   - Google Workspace vereist voor Domain-Wide Delegation

2. **conferenceDataVersion niet ingesteld**
   - ✅ Dit is al gefixed (`conferenceDataVersion: 1`)

3. **API Response bevat geen conferenceData**
   - Google Calendar API geeft soms geen Meet link terug voor service accounts

### ✅ Quick Fix (Huidige Implementatie)

We hebben nu logging toegevoegd om te debuggen:

```typescript
console.log('📅 Google Calendar API Response:', {
  eventId: response.data.id,
  hasConferenceData: !!response.data.conferenceData,
  conferenceData: response.data.conferenceData,
});
```

**Check de terminal output** na een booking om te zien of `hasConferenceData: true` is.

### 🔧 Mogelijke Oplossingen:

#### Oplossing 1: Gebruik OAuth2 in plaats van Service Account (Complex)

Service accounts hebben beperkingen. OAuth2 werkt beter voor Meet links.

**Nadelen:**
- Complexer
- Vereist user consent flow
- Refresh tokens management

#### Oplossing 2: Google Workspace + Domain-Wide Delegation (Kost geld)

**Stappen:**
1. Upgrade naar Google Workspace ($6-12/maand)
2. Enable Domain-Wide Delegation voor service account
3. Add scopes: `https://www.googleapis.com/auth/calendar` en `https://www.googleapis.com/auth/calendar.events`

**Voordelen:**
- Service account kan alles
- Meet links werken
- Attendees kunnen worden toegevoegd

#### Oplossing 3: Manually Create Meet Links (Workaround) ✅ AANBEVOLEN

In plaats van Google Calendar API Meet links te gebruiken, kunnen we:

**A. Vaste Meet Link gebruiken**
```typescript
const meetLink = 'https://meet.google.com/jouw-vaste-code';
```

**B. Unieke Meet Links genereren via meet.google.com**
- Ga naar https://meet.google.com
- Klik "Nieuwe vergadering"
- Kopieer de link
- Gebruik deze in je calendar events

**C. Google Meet API (Vereist Google Workspace)**

### 🎯 Aanbevolen Actie NU:

**Test met logging:**

1. Maak een nieuwe booking
2. Check de terminal voor de log output:
   ```
   📅 Google Calendar API Response: { ... }
   ```
3. Als `hasConferenceData: false`, dan moet je Oplossing 3 gebruiken

**Tijdelijke Workaround:**

Je kunt voor nu een vaste Meet link gebruiken voor alle afspraken:

```typescript
// In book-appointment/route.ts
const meetLink = 'https://meet.google.com/jouw-vaste-room-code';
```

Dan werkt het direct en kun je later upgraden naar Google Workspace als je het professioneler wilt.

### 📊 Verificatie Checklist:

- [ ] Check terminal logs na booking
- [ ] Kijk of `conferenceData` in response zit
- [ ] Check of service account calendar permissions heeft
- [ ] Test of calendar event wel wordt gemaakt
- [ ] Overweeg Google Workspace upgrade ($6/maand)

### 💡 Pro Tip:

Voor nu kun je klanten ook vertellen:
"De Google Meet link staat in het calendar event in jouw Google Calendar"

Want zelfs als de service account geen Meet link maakt, kun je als eigenaar van de calendar handmatig een Meet link toevoegen aan het event!
