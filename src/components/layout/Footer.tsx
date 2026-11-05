import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Mail, MapPin, MessageCircle, Instagram } from "lucide-react";
import { site } from "@/config/site";
import { buildWhatsAppLink, whatsappMessages } from "@/lib/whatsapp";
import { Logo } from "@/components/brand/Logo";
import { navLinks } from "@/components/layout/Navbar";

export function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");
    setMessage("");
    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = (await response.json()) as { success?: boolean; message?: string };
      if (response.ok && data.success) {
        setStatus("success");
        setMessage(data.message ?? "You're on the list!");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.message ?? "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <footer className="bg-plum text-primary-foreground">
      {/* VIP list */}
      <div className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:items-center">
            <div>
              <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                Get drop &amp; restock alerts
              </h2>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-primary-foreground/75">
                Be first to know about new thrifted pieces and lash appointment openings. No spam —
                just the good stuff.
              </p>
            </div>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-3 sm:flex-row sm:items-start"
              aria-label="Email subscription"
              noValidate
            >
              <div className="flex-1">
                <label htmlFor="vip-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="vip-email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status !== "idle") setStatus("idle");
                  }}
                  placeholder="you@example.com"
                  aria-label="Email address"
                  disabled={status === "loading" || status === "success"}
                  className="w-full rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm text-primary-foreground placeholder:text-primary-foreground/50 focus:border-lime focus:outline-none focus:ring-2 focus:ring-lime/40 disabled:opacity-60"
                />
                {status === "error" && message && (
                  <p className="mt-2 text-xs text-lime" role="alert">
                    {message}
                  </p>
                )}
                {status === "success" && message && (
                  <p className="mt-2 text-xs text-lime" role="status">
                    {message}
                  </p>
                )}
              </div>
              <button
                type="submit"
                disabled={status === "loading" || status === "success" || !email.trim()}
                className="inline-flex items-center justify-center rounded-full bg-lime px-6 py-3 text-sm font-semibold text-charcoal transition-all hover:-translate-y-0.5 hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === "loading"
                  ? "Subscribing…"
                  : status === "success"
                    ? "You're on the list!"
                    : "Subscribe"}
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <Logo className="text-primary-foreground" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-primary-foreground/75">
              {site.brand.supportingMessage}
            </p>
            <div className="mt-6 flex items-center gap-4 text-sm">
              <a
                href={site.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary-foreground/80 transition-colors hover:text-lime"
              >
                <Instagram className="h-4 w-4" aria-hidden="true" />
                Instagram
              </a>
              <a
                href={site.social.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-foreground/80 transition-colors hover:text-lime"
              >
                TikTok
              </a>
            </div>
          </div>

          {/* Explore */}
          <nav aria-label="Footer navigation">
            <h3 className="eyebrow text-lime">Explore</h3>
            <ul className="mt-4 space-y-3 text-sm">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-primary-foreground/80 transition-colors hover:text-lime"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h3 className="eyebrow text-lime">Get in touch</h3>
            <ul className="mt-4 space-y-3 text-sm text-primary-foreground/80">
              <li>
                <a
                  href={buildWhatsAppLink(whatsappMessages.general())}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 transition-colors hover:text-lime"
                >
                  <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.contact.email}`}
                  className="inline-flex items-center gap-2 transition-colors hover:text-lime"
                >
                  <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
                  {site.contact.email}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                <span>
                  {site.contact.location.line1}
                  <br />
                  {site.contact.location.line2}
                </span>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h3 className="eyebrow text-lime">Opening hours</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-primary-foreground/80">
              {site.contact.hours.map((row) => (
                <li key={row.days} className="flex justify-between gap-4">
                  <span>{row.days}</span>
                  <span className="text-primary-foreground/60">{row.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <hr className="my-10 border-white/10" />

        <div className="flex flex-col items-center justify-between gap-3 text-xs text-primary-foreground/60 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {site.brand.name}. All rights reserved.
          </p>
          <p className="font-display italic">{site.brand.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
