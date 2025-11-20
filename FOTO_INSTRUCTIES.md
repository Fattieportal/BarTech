# Profielfoto Toevoegen

## Instructies

Je hebt een foto meegestuurd. Om deze toe te voegen aan de About pagina:

1. **Download je profielfoto** van de attachment in deze chat

2. **Sla de foto op als:** `public/images/profile.jpg`

3. **Update About pagina** - Open `src/app/about/page.tsx` en vervang regel 30-39 met:

```tsx
<div className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-2xl">
  <Image
    src="/images/profile.jpg"
    alt="Aimane - Full-Stack Software Engineer"
    fill
    className="object-cover"
    priority
  />
</div>
```

4. **Voeg Image import toe** - Bovenaan het bestand bij de imports:

```tsx
import Image from 'next/image';
```

## Alternatief: Gebruik externe URL

Als je de foto op LinkedIn wilt gebruiken, vervang dan de placeholder div met:

```tsx
<div className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-2xl">
  <Image
    src="https://media.licdn.com/dms/image/v2/D4E03AQHnM5Q6qZ8QYA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1712851755434?e=1740614400&v=beta&t=xxx"
    alt="Aimane - Full-Stack Software Engineer"
    fill
    className="object-cover"
    priority
  />
</div>
```

(Vervang de URL met je actuele LinkedIn foto URL)

## Huidige Status

De placeholder toont nu een blauwe gradient met instructie tekst. Vervang dit met een van de bovenstaande opties.
