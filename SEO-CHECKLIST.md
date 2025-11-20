# ⚡ SEO Quick Reference

## 📋 Voor Website Live Gaat

### Must-Do (Anders werkt SEO niet!)
- [ ] **Domein naam kopen** (bijv. bartech.nl)
- [ ] **SSL Certificaat** (HTTPS - krijg je gratis via Vercel)
- [ ] **Update alle URLs**:
  - [ ] `src/app/layout.tsx` → metadataBase
  - [ ] `src/app/sitemap.ts` → baseUrl  
  - [ ] `src/lib/seo.ts` → baseUrl
  - [ ] `public/robots.txt` → Sitemap URL

### Should-Do (Anders zie je er lelijk uit)
- [ ] **OG Image maken** → `/public/og-image.jpg` (1200x630px)
- [ ] **Favicon toevoegen** → `/public/favicon.ico`
- [ ] **Logo toevoegen** → `/public/logo.png`

---

## 🚀 Direct Na Launch

### Dag 1:
1. **Google Search Console**
   - https://search.google.com/search-console
   - Voeg website toe
   - Verifieer eigenaarschap
   - Submit sitemap: `https://jouwdomein.nl/sitemap.xml`

2. **Test Tools**
   - PageSpeed: https://pagespeed.web.dev
   - Mobile Test: https://search.google.com/test/mobile-friendly
   - Schema Test: https://validator.schema.org

### Week 1:
3. **Google Business Profile** (optioneel, voor lokale SEO)
   - https://www.google.com/business
   - Voeg bedrijf toe
   - Link naar website

4. **Social Media**
   - LinkedIn profile updaten met website link
   - GitHub bio updaten met website link
   - Facebook page aanmaken (optioneel)

---

## 📊 Maandelijkse Checklist

### Elke Maand Check:
- [ ] Google Search Console → Traffic trends
- [ ] Google Analytics → Top pages
- [ ] PageSpeed Score → Nog steeds snel?
- [ ] Broken links? → Use Screaming Frog (gratis)
- [ ] Nieuwe content gepost? → Blog artikel schrijven

---

## 🎯 Keyword Tracking

### Jouw Focus Keywords:
1. "Full-stack developer Nederland"
2. "WordPress plugin development"
3. "API integratie specialist"
4. "Custom software development"
5. "Web automation systemen"

### Track ranking:
- **Gratis**: Google Search Console (posities)
- **Betaald**: Ahrefs, SEMrush (concurrent analyse)

---

## 💡 Content Ideeën (SEO Blog Posts)

Schrijf over wat je klanten zoeken:

1. **"WordPress Custom Plugin Development: Ultimate Guide"**
   - Target: "WordPress plugin development"
   - Length: 2000+ woorden
   
2. **"API Integration Best Practices for Business Automation"**
   - Target: "API integration specialist"
   - Length: 1500+ woorden

3. **"How to Automate Your Business Processes with Custom Software"**
   - Target: "business process automation"
   - Length: 1800+ woorden

4. **"Full-Stack vs Front-End Developer: What's Best for Your Project?"**
   - Target: "full-stack developer hire"
   - Length: 1200+ woorden

5. **"Top 10 WordPress Plugins We Built for Clients (Case Studies)"**
   - Target: "custom WordPress plugins"
   - Length: 2500+ woorden

**Publiceer**: 1 blog post per maand minimum!

---

## 🔗 Link Building Strategy

### Internal Links (Doe Nu):
Van homepage naar:
- ✅ /diensten
- ✅ /about  
- ✅ /contact

Van diensten naar:
- ✅ /contact
- ✅ Specifieke service secties

### External Links (Na Launch):
1. **LinkedIn Post** → Link naar website
2. **GitHub Projects** → Link in README
3. **Guest Blogging** → Schrijf voor andere blogs
4. **Directory Listings**:
   - Clutch.co
   - GoodFirms
   - Sortlist
   - WordPress Experts (wpexperts.io)

---

## 🎨 Image SEO

### Checklist Voor Elke Image:
```tsx
<Image 
  src="/image.jpg"
  alt="Descriptive text with keyword"  // ← ALTIJD!
  width={1200}
  height={630}
  loading="lazy"  // ← Voor performance
  quality={85}    // ← Compressie (85 = goed genoeg)
/>
```

### Alt Text Formule:
`[What it is] + [keyword if relevant]`

**Goed**:
- ✅ "Full-stack developer working on WordPress plugin code"
- ✅ "API integration diagram showing data flow"

**Slecht**:
- ❌ "image1.jpg"
- ❌ "DSC_0042"

---

## ⚡ Performance Checklist

Google ranking = snelheid belangrijk!

### Quick Wins:
- [ ] Comprimeer images → tinypng.com
- [ ] Use Next.js `<Image>` component (niet `<img>`)
- [ ] Enable caching (Vercel doet dit automatisch)
- [ ] Lazy load images (Next.js doet dit automatisch)
- [ ] Minimize JavaScript (Next.js build doet dit)

### Target Scores (PageSpeed Insights):
- **Desktop**: >90
- **Mobile**: >80 (moeilijker!)

---

## 📱 Mobile SEO

Google = Mobile-first indexing!

### Test Op:
- [ ] iPhone (Safari)
- [ ] Android (Chrome)
- [ ] Tablet (iPad)

### Check:
- [ ] Buttons klikbaar? (niet te klein!)
- [ ] Tekst leesbaar? (min 16px)
- [ ] Images passen op scherm?
- [ ] Formulier werkt smooth?
- [ ] WhatsApp button werkt?

---

## 🆘 Common SEO Mistakes

### ❌ Vermijd Dit:

1. **Keyword Stuffing**
   ```
   BAD: "WordPress development WordPress developer WordPress plugins WordPress"
   GOOD: "Expert WordPress development services, including custom plugins"
   ```

2. **Duplicate Content**
   - Elke pagina unieke content
   - Geen copy-paste van andere sites
   - Canonical URLs instellen

3. **Broken Links**
   - Test maandelijks
   - Fix direct (bad for SEO!)

4. **Missing Alt Text**
   - Elke image moet alt hebben
   - Decorative images: `alt=""`

5. **Slow Website**
   - >3 seconden = mensen vertrekken
   - Comprimeer, optimize, cache!

---

## ✅ Huidige SEO Status

**✅ DONE:**
- robots.txt (search engines welkom)
- sitemap.xml (alle pagina's indexed)
- Meta tags (title, description, keywords)
- Open Graph (social media previews)
- Twitter Cards (Twitter previews)
- JSON-LD Structured Data (Google Rich Snippets)
- SEO Helper Library (easy per-page SEO)

**🔲 TODO (Pre-Launch):**
- Domein kopen & URLs updaten
- OG image maken (1200x630)
- Favicon toevoegen
- Social media links toevoegen aan schema

**🔲 TODO (Post-Launch):**
- Google Search Console setup
- Submit sitemap
- Start blog (1 post/maand)
- Build backlinks
- Monthly monitoring

---

## 🎓 SEO Learning Resources

### Gratis Courses:
1. **Google SEO Starter Guide**
   - https://developers.google.com/search/docs/beginner/seo-starter-guide

2. **Moz Beginner's Guide to SEO**
   - https://moz.com/beginners-guide-to-seo

3. **Ahrefs SEO Course** (YouTube)
   - https://www.youtube.com/playlist?list=PLvJ_dXFSpd2t7cFd1qmzYXJ-Pc4Caz1T8

### Blogs to Follow:
- Search Engine Journal
- Moz Blog
- Ahrefs Blog
- Backlinko (Brian Dean)

---

## 📞 Hulp Nodig?

### Copilot Prompts:

```
"Check mijn website SEO en geef top 5 verbeterpunten"

"Schrijf een blog post over [topic] geoptimaliseerd voor keyword [keyword]"

"Voeg structured data toe aan mijn [component] voor Google Rich Snippets"

"Analyseer mijn concurrenten en suggereer keywords om op te targeten"

"Verbeter de page speed van mijn website"
```

---

**Laatste Tip**: SEO = Geduld + Goede Content + Technical Foundation

Je hebt nu de technical foundation ✅  
Nu: maak goede content & wacht 3-6 maanden voor resultaten! 🚀
