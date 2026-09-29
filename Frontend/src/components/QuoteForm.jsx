import { useState } from "react";
import { Check, Send } from "lucide-react";
import emailjs from "@emailjs/browser";
import { industries } from "../data/catalog";

const initialForm = {
  name: "",
  company: "",
  phone: "",
  email: "",
  industry: "",
  product: "",
  quantity: "",
  deadline: "",
  details: ""
};

export default function QuoteForm({ compact = false }) {
  const params = new URLSearchParams(window.location.search);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    ...initialForm,
    industry: params.get("industry") || "",
    product: params.get("product") || ""
  });

  const update = (key, value) => setForm((previous) => ({ ...previous, [key]: value }));

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("sending");
    setError("");

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const ownerTemplateId = import.meta.env.VITE_EMAILJS_OWNER_TEMPLATE_ID;
    const customerTemplateId = import.meta.env.VITE_EMAILJS_CUSTOMER_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !ownerTemplateId || !customerTemplateId || !publicKey) {
      setError("Email service is not configured yet. Please try again after the EmailJS settings are added.");
      setStatus("error");
      return;
    }

    try {
      const formElement = event.currentTarget;

      await emailjs.sendForm(serviceId, ownerTemplateId, formElement, {
        publicKey
      });

      await emailjs.sendForm(serviceId, customerTemplateId, formElement, {
        publicKey
      });

      setStatus("success");
    } catch (err) {
      console.error("EmailJS quote error:", err);
      setError(err?.text || err?.message || "Unable to send your request right now. Please try again later.");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="success-box">
        <div className="success-icon"><Check /></div>
        <h2>Request received.</h2>
        <p>Thank you for contacting Press & Parcel. A confirmation email has been sent to you, and our team has received your requirement. We’ll contact you soon to discuss the project.</p>
        <button className="button primary" onClick={() => { setForm(initialForm); setStatus("idle"); }}>
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <form className={compact ? "quote-form compact" : "quote-form"} onSubmit={handleSubmit}>
      <div className="form-grid">
        <label>
          Name
          <input name="customer_name" required value={form.name} onChange={(event) => update("name", event.target.value)} placeholder="Your name" />
        </label>
        <label>
          Company / Organisation
          <input name="company" value={form.company} onChange={(event) => update("company", event.target.value)} placeholder="Company name" />
        </label>
        <label>
          Phone
          <input name="phone" required value={form.phone} onChange={(event) => update("phone", event.target.value)} placeholder="+91" />
        </label>
        <label>
          Email
          <input name="customer_email" required type="email" value={form.email} onChange={(event) => update("email", event.target.value)} placeholder="you@company.com" />
        </label>
        <label>
          Industry
          <select name="industry" value={form.industry} onChange={(event) => update("industry", event.target.value)}>
            <option value="">Select industry</option>
            {Object.values(industries).flat().map((item) => <option key={item}>{item}</option>)}
          </select>
        </label>
        <label>
          Product / Category
          <input name="product" value={form.product} onChange={(event) => update("product", event.target.value)} placeholder="e.g. product labels" />
        </label>
        <label>
          Quantity
          <input name="quantity" value={form.quantity} onChange={(event) => update("quantity", event.target.value)} placeholder="e.g. 500" />
        </label>
        <label>
          Required by
          <input name="required_by" type="date" value={form.deadline} onChange={(event) => update("deadline", event.target.value)} />
        </label>
      </div>

      <label>
        Project details
        <textarea name="project_details" rows="5" value={form.details} onChange={(event) => update("details", event.target.value)} placeholder="Tell us about size, material, artwork, finish, delivery and any other requirement..." />
      </label>

      {status === "error" && <div className="form-error">{error}</div>}

      <button className="button primary submit-btn" type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Sending Request..." : "Send Quote Request"}
        {status !== "sending" && <Send size={17} />}
      </button>
    </form>
  );
}
