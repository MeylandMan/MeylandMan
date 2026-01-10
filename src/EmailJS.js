/*
 * EmailJS helper utilities (customized for your env vars)
 * - Uses @emailjs/browser (modern EmailJS SDK)
 * - Reads the following env vars (non-Vite names supported):
 *   - SERVICE_ID         (required)
 *   - TEMPLATE_ADMIN     (required)
 *   - TEMPLATE_USER      (required)
 *   - ADMIN_EMAIL        (required for admin sends)
 *   - (optional) PUBLIC_KEY / VITE_EMAILJS_PUBLIC_KEY
 *
 * Expected behavior:
 * - sendAdminNotification: sends your message to ADMIN_EMAIL using TEMPLATE_ADMIN
 * - sendUserConfirmation: sends a confirmation mail to the sender using TEMPLATE_USER
 * - sendContactFlow: convenience that sends admin first, then (if possible) user
 *
 * Note: If you're using Vite and want values available in the client bundle, ensure env vars are prefixed with VITE_ or injected at build time.
 * Install dependency: npm install @emailjs/browser
 */

import { init, send, sendForm } from "@emailjs/browser";

const PUBLIC_KEY = process.env.PUBLIC_KEY;
const SERVICE_ID = process.env.SERVICE_ID;
const TEMPLATE_ADMIN = process.env.TEMPLATE_ADMIN;
const TEMPLATE_USER = process.env.TEMPLATE_USER;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

/**
 * Initialize EmailJS (optional)
 */
export const initEmailJS = (publicKey = PUBLIC_KEY) => {
  if (!publicKey) {
    console.warn(
      "No EmailJS public key provided. If you rely on client-side init, set PUBLIC_KEY or VITE_EMAILJS_PUBLIC_KEY or call initEmailJS(publicKey)."
    );
    return;
  }
  init(publicKey);
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
    const res = await send(serviceId, templateId, templateParams);
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
