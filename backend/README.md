# Press & Parcel Backend — MVP

This backend does only what the current MVP needs:

1. Customer submits the quotation form.
2. Backend receives the form.
3. An email containing the full enquiry is sent to Press & Parcel.
4. A confirmation email is sent to the customer.
5. You contact the customer manually and make the quotation/deal over the phone.

There is no database, login, payment or order-management system in this MVP.

## 1. Install

Open PowerShell inside this `backend` folder:

```powershell
npm install
```

You should see both `dotenv` and `nodemailer` installed.

## 2. Environment

This folder includes `.env` configured with the SMTP details supplied for this project.

**Do not upload or commit `.env` to GitHub.** It is already included in `.gitignore`.

## 3. Start

```powershell
npm run dev
```

Expected output:

```text
Press & Parcel backend running on http://localhost:5000
```

You should NOT see:

```text
[config] Missing OWNER_EMAIL
[config] Missing SMTP_USER
[config] Missing SMTP_PASS
```

## 4. Test the backend

Open this in your browser:

```text
http://localhost:5000/api/health
```

You should receive JSON showing:

```json
{
  "status": "ok",
  "service": "Press & Parcel",
  "emailConfigured": true
}
```

## 5. Frontend

The React frontend should point to:

```text
VITE_API_URL=http://localhost:5000
```

The backend accepts both common Vite development origins:

```text
http://localhost:5173
http://localhost:5174
```

## 6. Gmail / Google Workspace

The SMTP password should be a Google App Password, not the normal Google account password.

If the supplied SMTP credential is changed, update `.env` and restart the backend.

## Security

The `.env` file contains a mail credential. Keep it private. If that credential has ever been exposed publicly, rotate/revoke it in the email provider and put the new App Password into `.env`.
