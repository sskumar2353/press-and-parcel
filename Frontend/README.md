# Press & Parcel Frontend

React + Vite frontend for the Press & Parcel website.

## Folder structure

```text
Frontend/
├── public/
│   ├── _redirects
│   └── press-and-parcel-logo.png
├── src/
│   ├── components/
│   │   ├── Footer.jsx
│   │   ├── Header.jsx
│   │   ├── PageHero.jsx
│   │   ├── QuoteForm.jsx
│   │   └── ScrollToTop.jsx
│   ├── data/
│   │   └── catalog.js
│   ├── pages/
│   │   ├── About.jsx
│   │   ├── Contact.jsx
│   │   ├── Home.jsx
│   │   ├── Industries.jsx
│   │   ├── Products.jsx
│   │   └── Quote.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── styles.css
├── .env.example
├── index.html
├── package.json
└── package-lock.json
```

## Install

```bash
npm install
```

## Run locally

```bash
npm run dev
```

## EmailJS configuration

The quote form is prepared for EmailJS. Create a local `.env` file from `.env.example` and add the values from EmailJS:

```env
VITE_EMAILJS_SERVICE_ID=service_xxxxxxx
VITE_EMAILJS_OWNER_TEMPLATE_ID=template_xxxxxxx
VITE_EMAILJS_CUSTOMER_TEMPLATE_ID=template_xxxxxxx
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

The form sends two emails:

1. Quote notification to `pressndparcel@gmail.com`.
2. Confirmation to the customer's submitted email address.

No EmailJS private API secret is placed in the frontend.

## Production build

```bash
npm run build
```

For Netlify, use:

- Base directory: `Frontend` (if deploying from the repository root)
- Build command: `npm run build`
- Publish directory: `dist`

The `public/_redirects` file keeps React Router routes working on direct page refreshes.
