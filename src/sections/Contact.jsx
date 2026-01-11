import { useState, useRef, useEffect } from "react";
import Button from "@components/Button";
import { sendContactFlow, initEmailJS } from "@apis/EmailJS";

const isValidEmail = (email) => {
  // simple, practical email validation
  return /^[\w-.+]+@[\w-]+\.[\w-.]+$/.test(email);
};

const Contact = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState(null); // { type: 'success'|'error', text }
  const formRef = useRef(null);
  
  useEffect(() => {
    try {
      initEmailJS();
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn("EmailJS initialization failed:", e);
    }
  }, []);

  const canSend = email.trim().length >= 1 && message.trim().length >= 1 && isValidEmail(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);

    if (!canSend) {
      setStatus({ type: "error", text: "Please enter a valid email and a message." });
      return;
    }

    setSending(true);
    try {
      await sendContactFlow({ email, message });
      setStatus({ type: "success", text: "Message sent — thank you!" });
      setEmail("");
      setMessage("");
      // reset form if we have a ref
      if (formRef.current) formRef.current.reset();
    } catch (err) {
      console.error("Contact send error:", err);
      const message = err?.message || err?.text || "Something went wrong. Please try again later.";
      setStatus({ type: "error", text: message });
    } finally {
      setSending(false);
    }
  }; 

  return (
    <section id="contact" className="min-h-screen w-full relative">
      <div className="w-full mx-auto c-space flex flex-col gap-6 sm:pt-36 pt-20">
        <h2 className="head-text text-center">Contact</h2>

        <div className="mx-auto w-full max-w-2xl">
          <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-4">
            <label className="text-sm text-gray-300">Your email</label>
            <input
              aria-label="Your email"
              aria-required
              aria-invalid={!isValidEmail(email) && email.length > 0}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-md bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-[#4ade80]"
              placeholder="you@example.com"
            />

            <label className="text-sm text-gray-300">Message</label>
            <textarea
              aria-label="Message"
              aria-required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-3 rounded-md bg-gray-900 text-white min-h-[140px] focus:outline-none focus:ring-2 focus:ring-[#4ade80]"
              placeholder="Write your message here..."
            />

            {status && (
              <div
                role="status"
                className={`text-sm ${status.type === "success" ? "text-green-400" : "text-red-400"}`}
              >
                {status.text}
              </div>
            )}

            <div className="w-full mt-2 flex items-center justify-center">
              <Button
                type="submit"
                name={sending ? "Sending..." : "Send"}
                containerClass={`${canSend && !sending ? "" : "opacity-50 pointer-events-none"} sm:w-fit w-full`}
              />
            </div>
          </form>
        </div>

      </div>
    </section>
  );
};

export default Contact;
