# 🚀 Quick Setup Guide - BarTech Website

## Email Functionaliteit Activeren (Verplicht)

### Stap 1: Resend Account
1. Ga naar [resend.com/signup](https://resend.com/signup)
2. Maak gratis account aan
3. Ga naar [resend.com/api-keys](https://resend.com/api-keys)
4. Klik "Create API Key"
5. Kopieer de key (begint met `re_`)

### Stap 2: Environment Variable
1. Maak bestand `.env.local` aan in de root folder:
   ```bash
   RESEND_API_KEY=re_jouw_api_key_hier
   ```

2. Herstart development server:
   ```bash
   npm run dev
   ```

### Stap 3: Test
1. Open de website
2. Klik op "Start Jouw Project" of ga naar Contact pagina
3. Vul een formulier in
4. Check je email inbox!

## Email Adressen Aanpassen

Standaard gebruikt de website:
- **Van**: `noreply@bartech.nl` en `bookings@bartech.nl`
- **Naar**: `info@bartech.nl`

### Zonder Custom Domain (Gratis Tier)
Als je nog geen domein hebt, verander in de API routes:

**`src/app/api/book-appointment/route.ts`**:
```typescript
from: 'BarTech <onboarding@resend.dev>',
```

**`src/app/api/contact/route.ts`**:
```typescript
from: 'BarTech <onboarding@resend.dev>',
```

### Met Custom Domain (Aanbevolen)
1. Voeg je domein toe in Resend dashboard
2. Volg DNS instructies (zie `EMAIL_SETUP.md` voor details)
3. Email adressen in de code blijven zoals ze zijn

## 📋 Checklist

- [ ] Resend account aangemaakt
- [ ] API key gekopieerd
- [ ] `.env.local` bestand aangemaakt met API key
- [ ] Development server herstart
- [ ] Booking formulier getest
- [ ] Contact formulier getest
- [ ] Emails ontvangen (check spam folder!)

## ⚡ Snelle Test

```bash
# In terminal:
npm run dev

# In browser:
# 1. Ga naar http://localhost:3000
# 2. Klik op "Start Jouw Project"
# 3. Selecteer datum & tijd
# 4. Vul formulier in
# 5. Check email!
```

## 🔧 Troubleshooting

**"API Key Invalid"**
- Check of `.env.local` correct is
- Herstart dev server
- Geen spaties voor/na de key

**"Email niet ontvangen"**
- Check spam folder
- Wacht 1-2 minuten
- Check Resend logs: [resend.com/logs](https://resend.com/logs)
- Bij gratis tier: emails komen van `onboarding@resend.dev`

**"500 Error bij submit"**
- Check browser console (F12)
- Check terminal voor errors
- Zorg dat `RESEND_API_KEY` in `.env.local` staat

## 📦 Deploy naar Productie

Vercel (Aanbevolen):
1. Push code naar GitHub
2. Importeer in Vercel
3. Voeg `RESEND_API_KEY` toe in Environment Variables
4. Deploy!

Zie `EMAIL_SETUP.md` voor complete instructies.

## ✅ Wat Werkt Nu

- ✅ **Booking systeem**: Datum/tijd selectie met email confirmatie
- ✅ **Contact formulier**: Direct email naar jou + confirmatie naar klant
- ✅ **Bilingual**: Alle emails in Nederlands of Engels
- ✅ **WhatsApp**: Alternatieve contact methode
- ✅ **Beschikbaarheid**: 
  - Ma/Wo: 18:00-22:00
  - Di/Do: 10:00-18:00
  - Vr/Za/Zo: 9:00-18:00

## 🎯 Volgende Stappen (Optioneel)

1. **Custom domain instellen** voor professionele emails
2. **Google Calendar integratie** om dubbele bookings te voorkomen
3. **Database** voor booking management
4. **SMS notificaties** via Twilio
5. **Analytics** toevoegen (Google Analytics, Plausible)

Meer info in `EMAIL_SETUP.md`!
