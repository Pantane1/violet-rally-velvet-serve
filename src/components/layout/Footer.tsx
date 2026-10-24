import { Link } from "@tanstack/react-router";
import { Mail, MapPin, MessageCircle, Instagram } from "lucide-react";
import { site } from "@/config/site";
import { buildWhatsAppLink, whatsappMessages } from "@/lib/whatsapp";
import { Logo } from "@/components/brand/Logo";
import { navLinks } from "@/components/layout/Navbar";

export function Footer() {
  return (
    <footer className="bg-plum text-primary-foreground">
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
