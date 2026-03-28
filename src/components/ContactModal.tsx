import type { FormEvent } from "react";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { submitContactForm } from "../services/contactForm";

type ContactModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

type FormState = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  message: string;
};

const initialState: FormState = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  message: "",
};

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) {
      setErrors({});
      setStatus("idle");
      setFeedback("");
    }
  }, [isOpen]);

  const emailPattern = useMemo(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/, []);

  const validate = () => {
    const nextErrors: Partial<Record<keyof FormState, string>> = {};

    if (!form.firstName.trim()) {
      nextErrors.firstName = "First name is required.";
    }

    if (!form.phone.trim() && !form.email.trim()) {
      nextErrors.phone = "Phone or email is required.";
      nextErrors.email = "Phone or email is required.";
    }

    if (form.email.trim() && !emailPattern.test(form.email.trim())) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (!form.message.trim()) {
      nextErrors.message = "Message is required.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const updateField = (field: keyof FormState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
    if (status !== "idle") {
      setStatus("idle");
      setFeedback("");
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!validate()) return;

    setStatus("submitting");
    setFeedback("");

    try {
      await submitContactForm({
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        phone: form.phone.trim(),
        email: form.email.trim(),
        message: form.message.trim(),
      });

      setStatus("success");
      setFeedback("Your message has been sent. We will get back to you soon.");
      setForm(initialState);
    } catch (error) {
      setStatus("error");
      setFeedback(error instanceof Error ? error.message : "Sending failed. Please try again.");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] flex items-center justify-center overflow-y-auto bg-[#02060d]/74 px-4 py-6 backdrop-blur-sm sm:py-8"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.98 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="relative my-auto w-full max-w-2xl overflow-hidden rounded-[1.7rem] border border-white/10 bg-[linear-gradient(180deg,rgba(10,17,29,0.96),rgba(6,10,18,0.98))] shadow-[0_28px_80px_rgba(0,0,0,0.42)] sm:max-h-[calc(100vh-4rem)]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-industrial-accent/60 to-transparent" />

            <div className="flex items-start justify-between gap-6 border-b border-white/8 px-5 pb-5 pt-5 sm:px-8 sm:pt-6">
              <div>
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.32em] text-industrial-accent">Contact us</p>
                <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-white sm:text-[2rem]">
                  Tell us how you would like us to contact you.
                </h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full border border-white/10 bg-white/[0.03] p-2 text-slate-300 transition-colors hover:text-white"
                aria-label="Close contact form"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="max-h-[calc(100vh-12rem)] overflow-y-auto px-5 pb-5 pt-5 sm:max-h-[calc(100vh-15rem)] sm:px-8 sm:pb-7 sm:pt-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  label="First name"
                  value={form.firstName}
                  onChange={(value) => updateField("firstName", value)}
                  placeholder="First name"
                  error={errors.firstName}
                />
                <Field
                  label="Last name"
                  value={form.lastName}
                  onChange={(value) => updateField("lastName", value)}
                  placeholder="Last name"
                  error={errors.lastName}
                />
                <Field
                  label="Phone"
                  value={form.phone}
                  onChange={(value) => updateField("phone", value)}
                  placeholder="Phone"
                  error={errors.phone}
                />
                <Field
                  label="Email"
                  value={form.email}
                  onChange={(value) => updateField("email", value)}
                  placeholder="Email"
                  error={errors.email}
                  type="email"
                />
              </div>

              <div className="mt-4">
                <label className="mb-2 block text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-slate-300">
                  Message / Notes
                </label>
                <textarea
                  value={form.message}
                  onChange={(event) => updateField("message", event.target.value)}
                  placeholder="What would you like to discuss? When is it convenient for us to contact you?"
                  className="h-32 w-full resize-none rounded-[1rem] border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition-all placeholder:text-slate-500 focus:border-industrial-accent/70"
                />
                {errors.message && <p className="mt-2 text-sm text-[#ff9a8b]">{errors.message}</p>}
              </div>

              {feedback && (
                <div
                  className={`mt-5 rounded-[1rem] border px-4 py-3 text-sm ${
                    status === "success"
                      ? "border-emerald-400/25 bg-emerald-400/10 text-emerald-100"
                      : "border-[#ff9a8b]/25 bg-[#ff9a8b]/10 text-[#ffd0c7]"
                  }`}
                >
                  {feedback}
                </div>
              )}

              <div className="sticky bottom-0 mt-6 flex flex-col items-start justify-between gap-4 border-t border-white/8 bg-[linear-gradient(180deg,rgba(10,17,29,0.88),rgba(6,10,18,0.98))] pb-1 pt-5 sm:flex-row sm:items-center">
                <p className="text-sm leading-6 text-slate-400">
                  Website source will be sent automatically as <span className="text-slate-200">starostaindustrial.com</span>.
                </p>
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="inline-flex w-full min-w-[11rem] items-center justify-center rounded-sm bg-industrial-accent px-8 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-industrial-dark transition-all duration-300 hover:bg-white disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                >
                  {status === "submitting" ? "Sending..." : "Send"}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

type FieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  error?: string;
  type?: string;
};

function Field({ label, value, onChange, placeholder, error, type = "text" }: FieldProps) {
  return (
    <div>
      <label className="mb-2 block text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-slate-300">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full rounded-[1rem] border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition-all placeholder:text-slate-500 focus:border-industrial-accent/70"
      />
      {error && <p className="mt-2 text-sm text-[#ff9a8b]">{error}</p>}
    </div>
  );
}
