const http = require("http");
const crypto = require("crypto");
require("dotenv").config();

const PORT = process.env.PORT || 5000;
const OWNER_EMAIL = process.env.OWNER_EMAIL;
const BUSINESS_NAME = process.env.BUSINESS_NAME || "Press & Parcel";
const FRONTEND_URL = process.env.FRONTEND_URL || "*";
const RESEND_API_KEY = process.env.RESEND_API_KEY;

const RESEND_FROM =
  process.env.RESEND_FROM ||
  `${BUSINESS_NAME} <onboarding@resend.dev>`;

const RATE_LIMIT_WINDOW = 15 * 60 * 1000;
const RATE_LIMIT_MAX = 8;

const rateLimitStore = new Map();

function sendJson(res, req, statusCode, data) {
  const origin = req.headers.origin;

  let allowedOrigin = FRONTEND_URL;

  if (FRONTEND_URL === "*" || !FRONTEND_URL) {
    allowedOrigin = origin || "*";
  }

  res.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Credentials": "true",
    "Vary": "Origin"
  });

  res.end(JSON.stringify(data));
}

function sendText(res, req, statusCode, message) {
  const origin = req.headers.origin;

  let allowedOrigin = FRONTEND_URL;

  if (FRONTEND_URL === "*" || !FRONTEND_URL) {
    allowedOrigin = origin || "*";
  }

  res.writeHead(statusCode, {
    "Content-Type": "text/plain; charset=utf-8",
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Credentials": "true",
    "Vary": "Origin"
  });

  res.end(message);
}

function getClientIp(req) {
  const forwarded = req.headers["x-forwarded-for"];

  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }

  return (
    req.socket.remoteAddress ||
    "unknown"
  );
}

function isRateLimited(ip) {
  const now = Date.now();

  const existing = rateLimitStore.get(ip);

  if (!existing) {
    rateLimitStore.set(ip, {
      count: 1,
      firstRequest: now
    });

    return false;
  }

  if (now - existing.firstRequest > RATE_LIMIT_WINDOW) {
    rateLimitStore.set(ip, {
      count: 1,
      firstRequest: now
    });

    return false;
  }

  existing.count += 1;

  return existing.count > RATE_LIMIT_MAX;
}

function cleanupRateLimitStore() {
  const now = Date.now();

  for (const [ip, record] of rateLimitStore.entries()) {
    if (now - record.firstRequest > RATE_LIMIT_WINDOW) {
      rateLimitStore.delete(ip);
    }
  }
}

setInterval(cleanupRateLimitStore, 30 * 60 * 1000);

function readJson(req) {
  return new Promise((resolve, reject) => {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;

      if (body.length > 1024 * 1024) {
        reject(new Error("Request body too large."));
        req.destroy();
      }
    });

    req.on("end", () => {
      try {
        if (!body.trim()) {
          resolve({});
          return;
        }

        resolve(JSON.parse(body));
      } catch (error) {
        reject(new Error("Invalid JSON."));
      }
    });

    req.on("error", (error) => {
      reject(error);
    });
  });
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function normalize(value) {
  if (value === undefined || value === null) {
    return "";
  }

  return String(value).trim();
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone) {
  const digits = phone.replace(/\D/g, "");

  return digits.length >= 7 && digits.length <= 15;
}

async function sendEmail({ to, subject, html, replyTo }) {
  if (!RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY is not configured.");
  }

  const payload = {
    from: RESEND_FROM,
    to: [to],
    subject,
    html
  };

  if (replyTo) {
    payload.reply_to = replyTo;
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${RESEND_API_KEY}`
    },
    body: JSON.stringify(payload)
  });

  let data;

  try {
    data = await response.json();
  } catch {
    data = {};
  }

  if (!response.ok) {
    console.error("Resend API error:", data);

    throw new Error(
      data.message ||
        data.error ||
        `Resend request failed with status ${response.status}`
    );
  }

  console.log("Email sent successfully:", data.id || data);

  return data;
}

function createInternalEmail({
  name,
  company,
  phone,
  email,
  industry,
  product,
  quantity,
  requiredBy,
  details
}) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>New Quote Request</title>
</head>

<body style="
  margin: 0;
  padding: 0;
  background: #f4f6f8;
  font-family: Arial, Helvetica, sans-serif;
">

  <div style="
    max-width: 680px;
    margin: 30px auto;
    background: #ffffff;
    border-radius: 10px;
    overflow: hidden;
    border: 1px solid #e5e7eb;
  ">

    <div style="
      background: #111827;
      color: #ffffff;
      padding: 24px;
    ">
      <h1 style="
        margin: 0;
        font-size: 24px;
      ">
        New Quote Request
      </h1>

      <p style="
        margin: 8px 0 0;
        color: #d1d5db;
      ">
        ${escapeHtml(BUSINESS_NAME)}
      </p>
    </div>

    <div style="padding: 24px;">

      <h2 style="
        font-size: 18px;
        margin-top: 0;
        color: #111827;
      ">
        Customer Details
      </h2>

      <table style="
        width: 100%;
        border-collapse: collapse;
        font-size: 15px;
      ">

        <tr>
          <td style="padding: 10px 0; font-weight: bold; width: 180px;">
            Name
          </td>
          <td style="padding: 10px 0;">
            ${escapeHtml(name)}
          </td>
        </tr>

        <tr>
          <td style="padding: 10px 0; font-weight: bold;">
            Company / Organisation
          </td>
          <td style="padding: 10px 0;">
            ${escapeHtml(company || "-")}
          </td>
        </tr>

        <tr>
          <td style="padding: 10px 0; font-weight: bold;">
            Phone
          </td>
          <td style="padding: 10px 0;">
            ${escapeHtml(phone)}
          </td>
        </tr>

        <tr>
          <td style="padding: 10px 0; font-weight: bold;">
            Email
          </td>
          <td style="padding: 10px 0;">
            ${escapeHtml(email)}
          </td>
        </tr>

        <tr>
          <td style="padding: 10px 0; font-weight: bold;">
            Industry
          </td>
          <td style="padding: 10px 0;">
            ${escapeHtml(industry || "-")}
          </td>
        </tr>

      </table>

      <hr style="
        border: 0;
        border-top: 1px solid #e5e7eb;
        margin: 24px 0;
      ">

      <h2 style="
        font-size: 18px;
        color: #111827;
      ">
        Requirement
      </h2>

      <table style="
        width: 100%;
        border-collapse: collapse;
        font-size: 15px;
      ">

        <tr>
          <td style="padding: 10px 0; font-weight: bold; width: 180px;">
            Product / Category
          </td>
          <td style="padding: 10px 0;">
            ${escapeHtml(product || "-")}
          </td>
        </tr>

        <tr>
          <td style="padding: 10px 0; font-weight: bold;">
            Quantity
          </td>
          <td style="padding: 10px 0;">
            ${escapeHtml(quantity || "-")}
          </td>
        </tr>

        <tr>
          <td style="padding: 10px 0; font-weight: bold;">
            Required By
          </td>
          <td style="padding: 10px 0;">
            ${escapeHtml(requiredBy || "-")}
          </td>
        </tr>

      </table>

      <div style="
        margin-top: 20px;
        padding: 18px;
        background: #f9fafb;
        border-radius: 8px;
      ">

        <h3 style="
          margin-top: 0;
          color: #111827;
        ">
          Project Details
        </h3>

        <p style="
          margin-bottom: 0;
          line-height: 1.6;
          color: #374151;
          white-space: pre-wrap;
        ">
          ${escapeHtml(details || "-")}
        </p>

      </div>

      <div style="
        margin-top: 25px;
        padding-top: 18px;
        border-top: 1px solid #e5e7eb;
        color: #6b7280;
        font-size: 13px;
      ">
        This enquiry was submitted through the ${escapeHtml(
          BUSINESS_NAME
        )} website.
      </div>

    </div>

  </div>

</body>
</html>
`;
}

function createCustomerConfirmationEmail({ name }) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Request Received</title>
</head>

<body style="
  margin: 0;
  padding: 0;
  background: #f4f6f8;
  font-family: Arial, Helvetica, sans-serif;
">

  <div style="
    max-width: 600px;
    margin: 30px auto;
    background: #ffffff;
    border-radius: 10px;
    overflow: hidden;
    border: 1px solid #e5e7eb;
  ">

    <div style="
      background: #111827;
      color: #ffffff;
      padding: 28px;
      text-align: center;
    ">

      <h1 style="
        margin: 0;
        font-size: 25px;
      ">
        ${escapeHtml(BUSINESS_NAME)}
      </h1>

      <p style="
        margin: 8px 0 0;
        color: #d1d5db;
      ">
        Brand. Print. Deliver.
      </p>

    </div>

    <div style="padding: 30px;">

      <h2 style="
        margin-top: 0;
        color: #111827;
      ">
        Request Received
      </h2>

      <p style="
        color: #374151;
        line-height: 1.7;
      ">
        Hello ${escapeHtml(name)},
      </p>

      <p style="
        color: #374151;
        line-height: 1.7;
      ">
        Thank you for contacting
        <strong>${escapeHtml(BUSINESS_NAME)}</strong>.
      </p>

      <p style="
        color: #374151;
        line-height: 1.7;
      ">
        We have received your requirement successfully.
        Our team will review the details and contact you shortly.
      </p>

      <div style="
        margin: 25px 0;
        padding: 18px;
        background: #f9fafb;
        border-radius: 8px;
        color: #374151;
      ">
        <strong>What happens next?</strong>

        <p style="
          margin-bottom: 0;
          line-height: 1.6;
        ">
          Our team will contact you to discuss your requirement,
          quantity, specifications, pricing and delivery details.
        </p>
      </div>

      <p style="
        color: #374151;
        line-height: 1.7;
      ">
        Regards,<br>
        <strong>${escapeHtml(BUSINESS_NAME)}</strong><br>
        Brand. Print. Deliver.
      </p>

    </div>

    <div style="
      padding: 18px 30px;
      background: #f9fafb;
      border-top: 1px solid #e5e7eb;
      color: #6b7280;
      font-size: 13px;
      text-align: center;
    ">
      This is an automated confirmation email.
    </div>

  </div>

</body>
</html>
`;
}

const server = http.createServer(async (req, res) => {
  try {
    const pathname = new URL(
      req.url,
      "http://localhost"
    ).pathname;

    if (req.method === "OPTIONS") {
      const origin = req.headers.origin;

      let allowedOrigin = FRONTEND_URL;

      if (FRONTEND_URL === "*" || !FRONTEND_URL) {
        allowedOrigin = origin || "*";
      }

      res.writeHead(204, {
        "Access-Control-Allow-Origin": allowedOrigin,
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Max-Age": "86400",
        "Vary": "Origin"
      });

      res.end();

      return;
    }

    if (req.method === "GET" && pathname === "/") {
      return sendJson(res, req, 200, {
        status: "ok",
        service: BUSINESS_NAME,
        message: `${BUSINESS_NAME} backend is running.`
      });
    }

    if (req.method === "GET" && pathname === "/api/health") {
      return sendJson(res, req, 200, {
        status: "ok",
        service: BUSINESS_NAME,
        emailConfigured: Boolean(
          RESEND_API_KEY &&
          OWNER_EMAIL
        )
      });
    }

    if (req.method === "POST" && pathname === "/api/quote") {
      const clientIp = getClientIp(req);

      if (isRateLimited(clientIp)) {
        return sendJson(res, req, 429, {
          message:
            "Too many requests. Please try again later."
        });
      }

      const body = await readJson(req);

      const name = normalize(body.name);
      const company = normalize(
        body.company ||
        body.organisation ||
        body.organization
      );
      const phone = normalize(body.phone);
      const email = normalize(body.email).toLowerCase();
      const industry = normalize(body.industry);
      const product = normalize(
        body.product ||
        body.category
      );
      const quantity = normalize(body.quantity);
      const requiredBy = normalize(
        body.requiredBy ||
        body.required_by ||
        body.requiredDate
      );
      const details = normalize(
        body.details ||
        body.projectDetails ||
        body.message
      );

      if (!name) {
        return sendJson(res, req, 400, {
          message: "Name is required."
        });
      }

      if (!phone) {
        return sendJson(res, req, 400, {
          message: "Phone number is required."
        });
      }

      if (!email) {
        return sendJson(res, req, 400, {
          message: "Email is required."
        });
      }

      if (!isValidEmail(email)) {
        return sendJson(res, req, 400, {
          message: "Please provide a valid email address."
        });
      }

      if (!isValidPhone(phone)) {
        return sendJson(res, req, 400, {
          message: "Please provide a valid phone number."
        });
      }

      if (!OWNER_EMAIL) {
        console.error(
          "OWNER_EMAIL is not configured."
        );

        return sendJson(res, req, 500, {
          message:
            "The email service is not configured correctly."
        });
      }

      if (!RESEND_API_KEY) {
        console.error(
          "RESEND_API_KEY is not configured."
        );

        return sendJson(res, req, 500, {
          message:
            "The email service is not configured correctly."
        });
      }

      const internalEmailHtml = createInternalEmail({
        name,
        company,
        phone,
        email,
        industry,
        product,
        quantity,
        requiredBy,
        details
      });

      const customerEmailHtml =
        createCustomerConfirmationEmail({
          name
        });

      try {
        await sendEmail({
          to: OWNER_EMAIL,
          subject:
            `New Quote Request - ${BUSINESS_NAME}`,
          html: internalEmailHtml,
          replyTo: email
        });

        await sendEmail({
          to: email,
          subject:
            `We received your request - ${BUSINESS_NAME}`,
          html: customerEmailHtml
        });

        console.log(
          `Quote request processed successfully for ${email}`
        );

        return sendJson(res, req, 200, {
          success: true,
          message: "Request received"
        });
      } catch (emailError) {
        console.error(
          "Email sending failed:",
          emailError
        );

        return sendJson(res, req, 500, {
          message:
            "Unable to send your request right now. Please try again later."
        });
      }
    }

    return sendJson(res, req, 404, {
      message: "Route not found."
    });

  } catch (error) {
    console.error(
      "Server error:",
      error
    );

    return sendJson(res, req, 500, {
      message: "Internal server error."
    });
  }
});

server.listen(PORT, () => {
  console.log(
    `${BUSINESS_NAME} backend running on port ${PORT}`
  );

  console.log(
    `Email provider: ${RESEND_API_KEY ? "Resend configured" : "Resend NOT configured"}`
  );

  console.log(
    `Owner email: ${OWNER_EMAIL ? "configured" : "NOT configured"}`
  );
});