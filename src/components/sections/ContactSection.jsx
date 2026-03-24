import { useMemo, useState } from "react";
import emailjs from "@emailjs/browser";
import { MotionReveal } from "@/components/motion/MotionReveal";
import { SectionShell } from "@/components/site/SectionShell";
import { portfolio } from "@/data/portfolio";

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export function ContactSection() {
  const [state, setState] = useState({ title: "", name: "", email: "", message: "" });
  const [isSending, setIsSending] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: "idle", message: "" });
  const [showErrors, setShowErrors] = useState(false);

  const errors = useMemo(() => {
    const e = {};
    if (!state.title.trim()) e.title = "Please enter a subject.";
    if (!state.name.trim()) e.name = "Please enter your name.";
    if (!state.email.trim()) e.email = "Please enter your email.";
    else if (!isEmail(state.email)) e.email = "Please enter a valid email.";
    if (state.message.trim().length < 10) e.message = "Please write at least 10 characters.";
    return e;
  }, [state.email, state.message, state.name, state.title]);

  const onSubmit = async (ev) => {
    ev.preventDefault();
    setShowErrors(true);
    
    if (Object.keys(errors).length > 0) return;

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID ?? "service_fxhnj2f";
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID ?? "template_icw98yp";
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY ?? "20i-DdLGLcY1Hdhe0";

    setIsSending(true);
    setSubmitStatus({ type: "idle", message: "" });

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          title: state.title,
          name: state.name,
          user_name: state.name,
          user_email: state.email,
          message: state.message,
        },
        { publicKey }
      );

      setSubmitStatus({ type: "success", message: "Message sent successfully. I’ll get back to you soon." });
      setState({ title: "", name: "", email: "", message: "" });
      setShowErrors(false);
    } catch {
      setSubmitStatus({
        type: "error",
        message: "Message not sent. Please try again or email me directly.",
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <SectionShell id="contact" title="Contact" eyebrow="Get in touch">
      <div className="grid gap-6 lg:grid-cols-2">
        <MotionReveal>
          <div className="surface p-6 sm:p-8">
            <div className="text-sm font-semibold">Let’s build something</div>
            <p className="mt-3 text-sm text-[hsl(var(--text-muted))]">
              Send me a message directly from this form, or reach me via social links.
            </p>

            <div className="mt-6 space-y-3">
              {portfolio.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={s.href.startsWith("mailto:") ? undefined : "noreferrer"}
                  className="flex items-center justify-between rounded-2xl border bg-white/60 px-4 py-3 text-sm transition hover:bg-black/5 dark:bg-white/5 dark:hover:bg-white/10"
                  style={{ borderColor: "hsl(var(--border))" }}
                >
                  <span className="inline-flex items-center gap-2">
                    <s.Icon className="h-4 w-4" />
                    {s.label}
                  </span>
                  <span className="text-xs text-[hsl(var(--text-muted))]">Open</span>
                </a>
              ))}
            </div>

            {submitStatus.type === "success" ? (
              <div
                className="mt-6 rounded-2xl border bg-white/60 px-4 py-3 text-sm text-[hsl(var(--text-muted))] dark:bg-white/5"
                style={{ borderColor: "hsl(var(--border))" }}
              >
                {submitStatus.message}
              </div>
            ) : submitStatus.type === "error" ? (
              <div
                className="mt-6 rounded-2xl border bg-white/60 px-4 py-3 text-sm text-[hsl(var(--text-muted))] dark:bg-white/5"
                style={{ borderColor: "hsl(var(--border))" }}
              >
                {submitStatus.message} Email:{" "}
                <a className="font-medium" href={`mailto:${portfolio.email}`} style={{ color: "hsl(var(--accent))" }}>
                  {portfolio.email}
                </a>
                .
              </div>
            ) : null}
          </div>
        </MotionReveal>

        <MotionReveal delay={0.05}>
          <form className="surface p-6 sm:p-8" onSubmit={onSubmit}>
            <div className="grid gap-4">
              <div>
                <label className="text-sm font-medium" htmlFor="title">
                  Subject
                </label>
                <input
                  id="title"
                  value={state.title}
                  onChange={(e) => setState((s) => ({ ...s, title: e.target.value }))}
                  className="mt-2 w-full rounded-xl border bg-transparent px-3 py-2 text-sm outline-none focus:ring-2"
                  style={{ borderColor: "hsl(var(--border))", outlineColor: "hsl(var(--accent))" }}
                  placeholder="Hiring / Project / Question..."
                />
                {showErrors && errors.title ? <div className="mt-2 text-xs text-red-500">{errors.title}</div> : null}
              </div>
              <div>
                <label className="text-sm font-medium" htmlFor="name">
                  Name
                </label>
                <input
                  id="name"
                  value={state.name}
                  onChange={(e) => setState((s) => ({ ...s, name: e.target.value }))}
                  className="mt-2 w-full rounded-xl border bg-transparent px-3 py-2 text-sm outline-none focus:ring-2"
                  style={{ borderColor: "hsl(var(--border))", outlineColor: "hsl(var(--accent))" }}
                  placeholder="Jane Doe"
                />
                {showErrors && errors.name ? <div className="mt-2 text-xs text-red-500">{errors.name}</div> : null}
              </div>
              <div>
                <label className="text-sm font-medium" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={state.email}
                  onChange={(e) => setState((s) => ({ ...s, email: e.target.value }))}
                  className="mt-2 w-full rounded-xl border bg-transparent px-3 py-2 text-sm outline-none focus:ring-2"
                  style={{ borderColor: "hsl(var(--border))", outlineColor: "hsl(var(--accent))" }}
                  placeholder="jane@example.com"
                />
                {showErrors && errors.email ? <div className="mt-2 text-xs text-red-500">{errors.email}</div> : null}
              </div>
              <div>
                <label className="text-sm font-medium" htmlFor="message">
                  Message
                </label>
                <textarea
                  id="message"
                  value={state.message}
                  onChange={(e) => setState((s) => ({ ...s, message: e.target.value }))}
                  rows={4}
                  className="mt-2 w-full resize-none rounded-xl border bg-transparent px-3 py-2 text-sm outline-none focus:ring-2"
                  style={{ borderColor: "hsl(var(--border))", outlineColor: "hsl(var(--accent))" }}
                  placeholder="Tell me about your project..."
                />
                {showErrors && errors.message ? <div className="mt-2 text-xs text-red-500">{errors.message}</div> : null}
              </div>
              <button type="submit" className="btn btn-primary mt-2" disabled={isSending}>
                {isSending ? "Sending..." : "Send Message"}
              </button>
            </div>
          </form>
        </MotionReveal>
      </div>
    </SectionShell>
  );
}
