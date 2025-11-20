# Email Setup Instructies

## Resend Account Aanmaken

1. Ga naar [Resend.com](https://resend.com) en maak een gratis account aan
2. Verifieer je email adres
3. Ga naar [API Keys](https://resend.com/api-keys)
4. Klik op "Create API Key"
5. Geef de key een naam (bijv. "BarTech Website")
6. Kopieer de API key (je kunt deze maar 1 keer zien!)

## Environment Variables Instellen

1. Kopieer het `.env.local.example` bestand naar `.env.local`:
   ```bash
   copy .env.local.example .env.local
   ```

2. Open `.env.local` en plak je API key:
   ```
   RESEND_API_KEY=re_jouw_api_key_hier
   ```

3. Herstart de development server:
   ```bash
   npm run dev
   ```

## Domain Configuratie (Optioneel maar Aanbevolen)

### Gratis Tier (Zonder Custom Domain)
Met de gratis tier kun je alleen emails versturen vanaf `onboarding@resend.dev`. Dit werkt prima voor testen.

### Custom Domain (Aanbevolen voor Productie)
Voor professionele emails vanaf je eigen domein (bijv. `noreply@bartech.nl`):

1. Ga naar [Domains](https://resend.com/domains) in Resend
2. Klik op "Add Domain"
3. Voer je domein in (bijv. `bartech.nl`)
4. Volg de instructies om DNS records toe te voegen:
   - SPF record
   - DKIM records
   - DMARC record (optioneel maar aanbevolen)

5. Update het email adres in de API route (`src/app/api/book-appointment/route.ts`):
   ```typescript
   from: 'BarTech <noreply@bartech.nl>',
   to: ['info@bartech.nl'],
   ```

### DNS Records Voorbeeld voor TransIP/Hosting Provider

Als je domein bij TransIP of een andere provider staat:

**SPF Record:**
- Type: `TXT`
- Name: `@`
- Value: `v=spf1 include:_spf.resend.com ~all`

**DKIM Records (krijg je van Resend):**
- Type: `TXT`
- Name: `resend._domainkey`
- Value: `p=MIGfMA0GCSqG...` (lange string van Resend)

**DMARC Record:**
- Type: `TXT`
- Name: `_dmarc`
- Value: `v=DMARC1; p=none; rua=mailto:info@bartech.nl`

## Testen

1. Start de development server
2. Open de website en klik op "Start Jouw Project"
3. Vul het booking formulier in
4. Check je email inbox (en spam folder!)

## Veelvoorkomende Problemen

### "API Key Invalid"
- Controleer of je de API key correct hebt gekopieerd
- Zorg dat er geen spaties voor/na de key staan
- Herstart de dev server na het aanpassen van `.env.local`

### "Email niet ontvangen"
- Check je spam folder
- Bij gratis tier: emails komen vanaf `onboarding@resend.dev`
- Wacht 1-2 minuten (kan soms even duren)
- Check de Resend logs: [resend.com/logs](https://resend.com/logs)

### "Domain not verified"
- DNS records kunnen 24-48 uur duren om door te voeren
- Gebruik `dig` of [mxtoolbox.com](https://mxtoolbox.com) om DNS te checken
- Bij TransIP: DNS wijzigingen zijn meestal binnen 1 uur actief

## Productie Deployment

Voor deployment op Vercel:

1. Ga naar je Vercel project settings
2. Ga naar "Environment Variables"
3. Voeg toe:
   - Key: `RESEND_API_KEY`
   - Value: `re_jouw_api_key`
   - Environment: `Production`, `Preview`, `Development`
4. Deploy opnieuw

## Kosten

- **Gratis Tier**: 100 emails per dag, 3,000 per maand
- **Voldoende voor**: Kleine tot middelgrote websites
- **Upgrade**: Als je meer nodig hebt, kost het €20/maand voor 50k emails

Voor BarTech met gemiddeld 5-10 bookings per dag is de gratis tier ruim voldoende!

## Support

Bij vragen over Resend setup:
- [Resend Documentatie](https://resend.com/docs)
- [Resend Support](https://resend.com/support)
