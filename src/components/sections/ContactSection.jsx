import { useMemo, useState } from "react";
import { MotionReveal } from "@/components/motion/MotionReveal";
import { SectionShell } from "@/components/site/SectionShell";
import { portfolio } from "@/data/portfolio";
import { buildMailtoLink } from "@/utils/mailto";

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export function ContactSection() {
  const [state, setState] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [showErrors, setShowErrors] = useState(false);

  const errors = useMemo(() => {
    const e = {};
    if (!state.name.trim()) e.name = "Please enter your name.";
    if (!state.email.trim()) e.email = "Please enter your email.";
    else if (!isEmail(state.email)) e.email = "Please enter a valid email.";
    if (state.message.trim().length < 10) e.message = "Please write at least 10 characters.";
    return e;
  }, [state.email, state.message, state.name]);

  const onSubmit = (ev) => {
    ev.preventDefault();
    setShowErrors(true);
    
    if (Object.keys(errors).length > 0) return;

    const mailto = buildMailtoLink({
      to: portfolio.email,
      subject: `Portfolio inquiry from ${state.name}`,
      body: `Name: ${state.name}\nEmail: ${state.email}\n\n${state.message}`,
    });

    setSubmitted(true);
    window.location.href = mailto;
  };

  return (
    <SectionShell id="contact" title="Contact" eyebrow="Get in touch">
      <div className="grid gap-6 lg:grid-cols-2">
        <MotionReveal>
          <div className="surface p-6 sm:p-8">
            <div className="text-sm font-semibold">Let’s build something</div>
            <p className="mt-3 text-sm text-[hsl(var(--text-muted))]">
              The form opens your email client with a pre-filled message. You can also reach me via
              social links.
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

            {submitted ? (
              <div
                className="mt-6 rounded-2xl border bg-white/60 px-4 py-3 text-sm text-[hsl(var(--text-muted))] dark:bg-white/5"
                style={{ borderColor: "hsl(var(--border))" }}
              >
                Email client opened. If it didn’t, copy and email me at {portfolio.email}.
              </div>
            ) : null}
          </div>
        </MotionReveal>

        <MotionReveal delay={0.05}>
          <form className="surface p-6 sm:p-8" onSubmit={onSubmit}>
            <div className="grid gap-4">
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
              <button type="submit" className="btn btn-primary mt-2">
                Send Message
              </button>
            </div>
          </form>
        </MotionReveal>
      </div>
    </SectionShell>
  );
}
