import "dotenv/config";
import http from "node:http";
import nodemailer from "nodemailer";

const PORT = Number(process.env.PORT || 5000);
const BUSINESS_NAME = process.env.BUSINESS_NAME || "Press & Parcel";
const OWNER_EMAIL = process.env.OWNER_EMAIL;
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;
const SMTP_HOST = process.env.SMTP_HOST || "smtp.gmail.com";
const SMTP_PORT = Number(process.env.SMTP_PORT || 465);
const SMTP_SECURE = String(process.env.SMTP_SECURE ?? "true") === "true";
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

const allowedOrigins = new Set([
  FRONTEND_URL,
  "http://localhost:5173",
  "http://localhost:5174"
]);

for (const key of ["OWNER_EMAIL", "SMTP_USER", "SMTP_PASS"]) {
  if (!process.env[key]) {
    console.warn(`[config] Missing ${key}. Quote emails cannot be sent until .env is configured.`);
  }
}

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: SMTP_SECURE,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS
  }
});

const requestLog = new Map();
const WINDOW_MS = 15 * 60 * 1000;
const MAX_REQUESTS = 8;

function clientIp(req) {
  const forwarded = req.headers["x-forwarded-for"];
  return (forwarded ? String(forwarded).split(",")[0].trim() : req.socket.remoteAddress) || "unknown";
}

function isRateLimited(ip) {
  const now = Date.now();
  const recent = (requestLog.get(ip) || []).filter(time => now - time < WINDOW_MS);
  if (recent.length >= MAX_REQUESTS) {
    requestLog.set(ip, recent);
    return true;
  }
  recent.push(now);
  requestLog.set(ip, recent);
  return false;
}

function getOrigin(req) {
  const origin = req.headers.origin;
  return allowedOrigins.has(origin) ? origin : FRONTEND_URL;
}

function corsHeaders(req) {
  return {
    "Access-Control-Allow-Origin": getOrigin(req),
    "Access-Control-Allow-Methods": "POST, OPTIONS, GET",
    "Access-Control-Allow-Headers": "Content-Type",
    "Vary": "Origin"
  };
}

function sendJson(res, req, status, body) {
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    ...corsHeaders(req)
  });
  res.end(JSON.stringify(body));
}

function clean(value, max = 2000) {
  return String(value ?? "").trim().slice(0, max);
}

function escapeHtml(value) {
  return clean(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  }[char]));
}

function readJson(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", chunk => {
      body += chunk;
      if (body.length > 100000) {
        reject(new Error("Request body too large."));
        req.destroy();
      }
    });
    req.on("end", () => {
      try {
        resolve(JSON.parse(body || "{}"));
      } catch {
        reject(new Error("Invalid JSON."));
      }
    });
    req.on("error", reject);
  });
}

function emailRows(data) {
  const rows = [
    ["Name", data.name],
    ["Company / Organisation", data.company || "Not provided"],
    ["Phone", data.phone],
    ["Email", data.email],
    ["Industry", data.industry || "Not selected"],
    ["Product / Category", data.product || "Not specified"],
    ["Quantity", data.quantity || "Not specified"],
    ["Required by", data.deadline || "Not specified"],
    ["Project Details", data.details || "Not provided"]
  ];

  return rows.map(([label, value]) => `
    <tr>
      <td style="padding:10px 12px;border:1px solid #dbe4ec;font-weight:700;color:#12385f;width:210px;">${escapeHtml(label)}</td>
      <td style="padding:10px 12px;border:1px solid #dbe4ec;color:#40566b;">${escapeHtml(value).replace(/\n/g, "<br>")}</td>
    </tr>
  `).join("");
}

function buildCustomerEmail(data) {
  return {
    subject: `We received your enquiry — ${BUSINESS_NAME}`,
    text: `Hi ${data.name},

Thank you for contacting ${BUSINESS_NAME}.

We have received your enquiry for ${data.product || "your printing/branding requirement"}.

Our team will review the details and contact you soon to discuss your requirement and quotation.

Regards,
${BUSINESS_NAME}
Print. Brand. Deliver.`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:680px;margin:auto;color:#172333;">
        <div style="background:#12385f;padding:24px 28px;color:#fff;">
          <h2 style="margin:0;">${BUSINESS_NAME}</h2>
          <div style="margin-top:5px;color:#bfeaf2;">Print. Brand. Deliver.</div>
        </div>
        <div style="padding:30px 28px;">
          <h2>Thank you, ${escapeHtml(data.name)}.</h2>
          <p>We have received your enquiry successfully.</p>
          <p>Our team will review your requirement and contact you soon to discuss the project and quotation.</p>
          <p style="margin-top:28px;padding:16px;background:#f4f8fb;border-radius:10px;">
            <strong>Requirement:</strong><br>
            ${escapeHtml(data.product || "Printing / branding requirement")}
          </p>
        </div>
      </div>
    `
  };
}

function buildOwnerEmail(data) {
  return {
    subject: `New Quote Enquiry — ${data.name}${data.company ? ` | ${data.company}` : ""}`,
    text: `New Press & Parcel enquiry

Name: ${data.name}
Company: ${data.company || "Not provided"}
Phone: ${data.phone}
Email: ${data.email}
Industry: ${data.industry || "Not selected"}
Product / Category: ${data.product || "Not specified"}
Quantity: ${data.quantity || "Not specified"}
Required by: ${data.deadline || "Not specified"}

Project Details:
${data.details || "Not provided"}
`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:760px;margin:auto;color:#172333;">
        <div style="background:#12385f;padding:24px 28px;color:#fff;">
          <h2 style="margin:0;">New Quote Enquiry</h2>
          <div style="margin-top:5px;color:#bfeaf2;">${BUSINESS_NAME}</div>
        </div>
        <div style="padding:28px;">
          <p>A new customer has submitted the quotation form.</p>
          <table style="border-collapse:collapse;width:100%;font-size:14px;">
            ${emailRows(data)}
          </table>
          <p style="margin-top:20px;color:#64748b;font-size:12px;">Reply to this email to contact the customer directly.</p>
        </div>
      </div>
    `
  };
}

async function handleQuote(req, res) {
  const ip = clientIp(req);

  if (isRateLimited(ip)) {
    return sendJson(res, req, 429, { message: "Too many requests. Please try again later." });
  }

  if (!OWNER_EMAIL || !SMTP_USER || !SMTP_PASS) {
    return sendJson(res, req, 500, {
      message: "Email service is not configured. Check the backend .env file."
    });
  }

  let body;
  try {
    body = await readJson(req);
  } catch (error) {
    return sendJson(res, req, 400, { message: error.message });
  }

  const data = {
    name: clean(body.name, 120),
    company: clean(body.company, 160),
    phone: clean(body.phone, 60),
    email: clean(body.email, 180),
    industry: clean(body.industry, 100),
    product: clean(body.product, 180),
    quantity: clean(body.quantity, 80),
    deadline: clean(body.deadline, 40),
    details: clean(body.details, 4000)
  };

  if (!data.name || !data.phone || !data.email) {
    return sendJson(res, req, 400, {
      message: "Name, phone and email are required."
    });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return sendJson(res, req, 400, {
      message: "Please provide a valid email address."
    });
  }

  try {
    const customer = buildCustomerEmail(data);
    const owner = buildOwnerEmail(data);

    await transporter.sendMail({
      from: `"${BUSINESS_NAME}" <${SMTP_USER}>`,
      to: OWNER_EMAIL,
      replyTo: data.email,
      subject: owner.subject,
      text: owner.text,
      html: owner.html
    });

    await transporter.sendMail({
      from: `"${BUSINESS_NAME}" <${SMTP_USER}>`,
      to: data.email,
      replyTo: OWNER_EMAIL,
      subject: customer.subject,
      text: customer.text,
      html: customer.html
    });

    return sendJson(res, req, 200, {
      success: true,
      message: "Your request was submitted successfully."
    });
  } catch (error) {
    console.error("Email sending failed:", error);
    return sendJson(res, req, 500, {
      message: "The request could not be emailed right now. Please try again."
    });
  }
}

const server = http.createServer(async (req, res) => {
  if (req.method === "OPTIONS") {
    res.writeHead(204, corsHeaders(req));
    return res.end();
  }

  if (req.method === "GET" && req.url === "/api/health") {
    return sendJson(res, req, 200, {
      status: "ok",
      service: BUSINESS_NAME,
      emailConfigured: Boolean(OWNER_EMAIL && SMTP_USER && SMTP_PASS)
    });
  }

  if (req.method === "POST" && req.url === "/api/quote") {
    return handleQuote(req, res);
  }

  return sendJson(res, req, 404, { message: "Route not found." });
});

server.listen(PORT, () => {
  console.log(`${BUSINESS_NAME} backend running on http://localhost:${PORT}`);
});
