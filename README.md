# Full-Stack Software Engineer Portfolio Website

A modern, conversion-focused portfolio website built with Next.js, TypeScript, and Tailwind CSS.

## 🎯 About This Website

This is a professional portfolio website for a full-stack software engineer specializing in:
- Custom WordPress & WooCommerce plugins
- API integrations & automation systems
- Full-stack web applications
- Technical consulting

## 🚀 Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Deployment:** Ready for Vercel, Netlify, or any hosting platform

## 📁 Project Structure

```
website/
├── src/
│   ├── app/              # Next.js App Router pages
│   │   ├── page.tsx      # Homepage (story-led structure)
│   │   ├── services/     # Services page
│   │   ├── about/        # About page
│   │   └── contact/      # Contact page
│   └── components/       # Reusable components
│       ├── Navigation.tsx
│       ├── Hero.tsx
│       ├── Challenge.tsx
│       ├── Solution.tsx
│       ├── Process.tsx
│       ├── FAQ.tsx
│       ├── CTA.tsx
│       └── Footer.tsx
├── public/               # Static assets
└── package.json
```

## 🛠️ Development

### Prerequisites
- Node.js 18+ installed
- npm or yarn

### Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 📝 Customization

### 1. Update Your Name & Branding
Replace "YourName" in:
- `src/components/Navigation.tsx`
- `src/components/Footer.tsx`

### 2. Add Your Contact Information
Update the contact form in:
- `src/app/contact/page.tsx`

Add your form submission logic (e.g., email service, form backend).

### 3. Update Content
Personalize the copy in all components to match your:
- Services
- Experience
- Pricing
- Location
- Portfolio projects (if you want to add them)

### 4. Add Your Portfolio (Optional)
Create a new portfolio section or page showcasing your work.

### 5. Configure SEO
Update metadata in:
- `src/app/layout.tsx`
- Each page's metadata export

## 🎨 Design Features

- **Premium Corporate Style:** Professional blues, grays, and gold accents
- **Story-Led Structure:** Challenge → Solution → Process → CTA
- **Mobile Responsive:** Works perfectly on all devices
- **Bold & Confident Copy:** Conversion-focused messaging
- **Smooth Animations:** Subtle hover effects and transitions

## 🚢 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Deploy!

### Deploy to Netlify

1. Push your code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Connect your repository
4. Build command: `npm run build`
5. Publish directory: `.next`
6. Deploy!

### Other Hosting

Build the project:
```bash
npm run build
```

Then deploy the `.next` folder to your preferred hosting platform.

## 📧 Contact Form Setup

The contact form is currently set up with a simulated submission. To make it functional:

1. **Option 1:** Use a service like [Formspree](https://formspree.io/) or [EmailJS](https://www.emailjs.com/)
2. **Option 2:** Create your own API endpoint in `src/app/api/contact/route.ts`
3. **Option 3:** Use a third-party form backend like [Getform](https://getform.io/)

## 🔧 Configuration

### Tailwind CSS
Configuration is in `tailwind.config.ts`. Customize colors, fonts, and breakpoints there.

### TypeScript
TypeScript configuration is in `tsconfig.json`.

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Support

For questions or issues, please open an issue in the repository.

---

**Built with ❤️ using Next.js and Tailwind CSS**


First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
