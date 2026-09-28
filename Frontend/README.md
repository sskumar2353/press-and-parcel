# Press & Parcel

Press & Parcel is a React + Vite customer-facing print, branding, packaging, merchandise and event-materials platform.

## MVP architecture

The first backend version intentionally stays simple:

1. Customer fills the Get a Quote form.
2. React sends the form to the Node backend.
3. Backend sends an email to the Press & Parcel business email containing the complete enquiry.
4. Backend sends a confirmation email to the customer.
5. The team contacts the customer by phone and completes the quotation/deal manually.

There is no database, customer login, payment system or automated quotation engine in this MVP.

## Frontend

```bash
npm install
npm run dev
```

Create `.env` if needed:

```env
VITE_API_URL=http://localhost:5000
```

## Backend

Open another terminal:

```bash
cd backend
npm install
```

Copy:

```text
backend/.env.example
```

to:

```text
backend/.env
```

Then configure your SMTP credentials.

Start:

```bash
npm run dev
```

or:

```bash
npm start
```

## Gmail SMTP example

For a Gmail/Google Workspace mailbox:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=your-business-email@gmail.com
SMTP_PASS=your-Google-App-Password
OWNER_EMAIL=your-business-email@gmail.com
BUSINESS_NAME=Press & Parcel
FRONTEND_URL=http://localhost:5173
```

Use a Google App Password rather than your normal Google account password.

## Production

Deploy the frontend and backend separately.

Set:

```env
VITE_API_URL=https://your-backend-domain.com
```

on the frontend.

Set the backend environment variables on the backend hosting service.

Do not put SMTP credentials in the React frontend.

## Next phase

When the MVP is validated, the same backend can later be expanded with:

- Quote records
- Customer records
- Artwork/file uploads
- Admin dashboard
- Order status
- Pricing rules
- Product management
- WhatsApp integration
- Payments
- Delivery tracking
