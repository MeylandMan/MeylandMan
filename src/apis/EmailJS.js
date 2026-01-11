import { init, send, sendForm } from "@emailjs/browser";

// Safe environment access compatible with Vite (import.meta.env) and Node (process.env)
// Also sanitize common formatting issues (quotes, trailing semicolons, whitespace)
const sanitize = (val) => {
  if (typeof val !== "string") return val;
  let s = val.trim();
  // remove surrounding quotes
  if ((s.startsWith("'") && s.endsWith("'")) || (s.startsWith('"') && s.endsWith('"'))) {
    s = s.slice(1, -1).trim();
  }
  // remove trailing semicolon
  if (s.endsWith(";")) s = s.slice(0, -1).trim();
  return s;
};

export const getEnv = (name) => {
  const candidates = [];
  // Vite exposes import.meta.env in the bundled client — access it safely
  try {
    const meta = import.meta && import.meta.env;
    if (meta) {
      candidates.push(
        meta[name],
        meta[`VITE_${name}`],
        meta[`VITE_${name.toUpperCase()}`],
        meta[`VITE_EMAILJS_${name.toUpperCase()}`]
      );
    }
  } catch (e) {
    // import.meta may not be accessible in some bundlers/environments; ignore
  }

  // Fallback for Node.js environments
  if (typeof process !== "undefined" && process.env) {
    candidates.push(process.env[name], process.env[`VITE_${name}`]);
  }

  const found = candidates.find((v) => v !== undefined && v !== null);
  return sanitize(found);
};


const PUBLIC_KEY = getEnv("PUBLIC_KEY") || getEnv("EMAILJS_PUBLIC_KEY") || getEnv("VITE_EMAILJS_PUBLIC_KEY") || null;
const SERVICE_ID = getEnv("SERVICE_ID") || null;
const TEMPLATE_ADMIN = getEnv("TEMPLATE_ADMIN") || null;
const TEMPLATE_USER = getEnv("TEMPLATE_USER") || null;
const ADMIN_EMAIL = getEnv("ADMIN_EMAIL") || null;

/**
 * Initialize EmailJS (optional)
 */
export const initEmailJS = (publicKey = PUBLIC_KEY) => {
  const pk = sanitize(publicKey || PUBLIC_KEY);
  if (!pk) {
    console.warn(
      "No EmailJS public key provided. If you rely on client-side init, set VITE_PUBLIC_KEY or VITE_EMAILJS_PUBLIC_KEY or call initEmailJS(publicKey)."
    );
    return;
  }

  // Dev-only: show masked key information and warn about suspicious chars
  if (typeof process !== "undefined" && process.env && process.env.NODE_ENV !== "production") {
    try {
      const masked = `${pk.slice(0, 6)}...${pk.slice(-4)}`;
      console.info(`EmailJS public key detected (masked): ${masked} (length: ${pk.length})`);
      if (/['";\s]/.test(pk)) {
        console.warn("Public key contains suspicious characters (quotes/semicolon/whitespace). Check your .env formatting.");
      }

      // Also print presence (masked) of other required env variables to help debugging
      const mask = (v) => (v ? `${String(v).slice(0, 6)}...${String(v).slice(-4)}` : 'MISSING');
      console.info(`EmailJS env: SERVICE_ID=${SERVICE_ID ? mask(SERVICE_ID) : 'MISSING'}, TEMPLATE_ADMIN=${TEMPLATE_ADMIN ? mask(TEMPLATE_ADMIN) : 'MISSING'}, TEMPLATE_USER=${TEMPLATE_USER ? mask(TEMPLATE_USER) : 'MISSING'}, ADMIN_EMAIL=${ADMIN_EMAIL ? ADMIN_EMAIL : 'MISSING'}`);

      if (!SERVICE_ID) console.warn("SERVICE_ID missing. Check VITE_SERVICE_ID in your .env and restart the dev server.");
      if (!TEMPLATE_ADMIN) console.warn("TEMPLATE_ADMIN missing. Check VITE_TEMPLATE_ADMIN in your .env and restart the dev server.");
      if (!TEMPLATE_USER) console.warn("TEMPLATE_USER missing. Check VITE_TEMPLATE_USER in your .env and restart the dev server.");
    } catch (e) {
      // ignore masking errors
    }
  }

  init(pk);
};

/**
 * Generic send helper (thin wrapper around emailjs send)
 */
export const sendContactEmail = async (templateParams = {}, opts = {}) => {
  const serviceId = opts.serviceId || SERVICE_ID;
  const templateId = opts.templateId || opts.template || TEMPLATE_USER; // default to user template if not given

  if (!serviceId) {
    throw new Error("EmailJS SERVICE_ID is not set. Please set SERVICE_ID in your environment.");
  }
  if (!templateId) {
    throw new Error("No EmailJS template id provided. Set TEMPLATE_USER or TEMPLATE_ADMIN in env or pass via opts.templateId.");
  }

  try {
    // normalize common template fields so templates receive expected names
    const paramsToSend = { ...templateParams };
    if (paramsToSend.email && !paramsToSend.from_email) paramsToSend.from_email = paramsToSend.email;
    if (paramsToSend.name && !paramsToSend.from_name) paramsToSend.from_name = paramsToSend.name;

    const res = await send(serviceId, templateId, paramsToSend);
    return res;
  } catch (err) {
    console.error("EmailJS send() error:", err);
    throw err;
  }
};

/**
 * Send a form element directly (uses sendForm)
 */
export const sendContactForm = async (formEl, opts = {}) => {
  if (!formEl || typeof formEl.submit !== "function") {
    throw new TypeError("sendContactForm expects a HTMLFormElement as the first argument.");
  }

  const serviceId = opts.serviceId || SERVICE_ID;
  const templateId = opts.templateId || TEMPLATE_USER;

  if (!serviceId || !templateId) {
    throw new Error("Missing SERVICE_ID or template id for sendContactForm.");
  }

  try {
    const res = await sendForm(serviceId, templateId, formEl);
    return res;
  } catch (err) {
    console.error("EmailJS sendForm error:", err);
    throw err;
  }
};

/**
 * Send message to the ADMIN using TEMPLATE_ADMIN. Merges ADMIN_EMAIL into params under admin_email and to_email.
 * @param {Object} params - expected to include name, email, message, etc.
 */
export const sendAdminNotification = async (params = {}, opts = {}) => {
  const serviceId = opts.serviceId || SERVICE_ID;
  const templateId = opts.templateId || TEMPLATE_ADMIN;

  if (!serviceId || !templateId) {
    throw new Error("Missing SERVICE_ID or TEMPLATE_ADMIN for admin notification. Set TEMPLATE_ADMIN in your env or pass via opts.templateId.");
  }
  if (!ADMIN_EMAIL) {
    console.warn("ADMIN_EMAIL not set in environment; admin notification will proceed but template might not have a recipient.");
  }

  const templateParams = {
    admin_email: ADMIN_EMAIL,
    to_email: ADMIN_EMAIL,
    from_name: params.name || params.from_name || "",
    from_email: params.email || params.from_email || "",
    message: params.message || params.body || "",
    ...params,
  };

  return sendContactEmail(templateParams, { serviceId, templateId });
};

/**
 * Send confirmation to the user who submitted the contact form using TEMPLATE_USER.
 * Requires the sender's email (params.email or params.to_email)
 */
export const sendUserConfirmation = async (params = {}, opts = {}) => {
  const serviceId = opts.serviceId || SERVICE_ID;
  const templateId = opts.templateId || TEMPLATE_USER;

  if (!serviceId || !templateId) {
    throw new Error("Missing SERVICE_ID or TEMPLATE_USER for user confirmation. Set TEMPLATE_USER in your env or pass via opts.templateId.");
  }

  const recipientEmail = params.email || params.to_email || params.recipient_email || params.recipient;
  if (!recipientEmail) {
    throw new Error("No recipient email provided for user confirmation. Include 'email' (sender email) in params.");
  }

  const templateParams = {
    to_email: recipientEmail,
    to_name: params.name || params.to_name || "",
    from_name: params.from_name || "",
    message: params.message || params.body || "",
    ...params,
  };

  return sendContactEmail(templateParams, { serviceId, templateId });
};

/**
 * Convenience: send admin notification then, if sender email exists, send user confirmation.
 * Returns { admin, user } responses
 */
export const sendContactFlow = async (params = {}, opts = {}) => {
  const result = { admin: null, user: null };

  result.admin = await sendAdminNotification(params, opts);

  if (params.email || params.to_email || params.recipient_email) {
    result.user = await sendUserConfirmation(params, opts);
  }

  return result;
};

export default {
  initEmailJS,
  sendContactEmail,
  sendContactForm,
  sendAdminNotification,
  sendUserConfirmation,
  sendContactFlow,
};
