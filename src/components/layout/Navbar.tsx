import { useEffect, useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { Menu, X, Instagram } from "lucide-react";
import { site } from "@/config/site";
import { buildWhatsAppLink, whatsappMessages } from "@/lib/whatsapp";
import { Logo } from "@/components/brand/Logo";
import { cn } from "@/lib/utils";

export const navLinks = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop the Fits" },
  { to: "/lash", label: "Lash Studio" },
  { to: "/about", label: "About" },
  { to: "/journal", label: "Journal" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (to: string) =>
    to === "/" ? location.pathname === "/" : location.pathname.startsWith(to);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          scrolled && "glass border-b border-border/70 shadow-sm",
        )}
      >
        <nav
          className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
          aria-label="Main navigation"
        >
          <Link to="/" className="text-charcoal transition-opacity hover:opacity-80">
            <Logo />
          </Link>

          <ul className="hidden items-center gap-7 lg:flex">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className={cn(
                    "relative text-sm font-medium transition-colors hover:text-primary",
                    isActive(link.to) ? "text-primary" : "text-charcoal",
                  )}
                >
                  {link.label}
                  {isActive(link.to) && (
                    <span
                      className="absolute -bottom-1.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-lime"
                      aria-hidden="true"
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <a
              href={buildWhatsAppLink(whatsappMessages.general())}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-lg sm:inline-flex"
            >
              WhatsApp Us
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-charcoal transition-colors hover:bg-accent lg:hidden"
              aria-label="Open menu"
              aria-expanded={open}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu overlay */}
      <div
        className={cn(
          "fixed inset-0 z-[60] flex flex-col bg-plum text-primary-foreground transition-all duration-300 lg:hidden",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile menu"
        hidden={!open}
      >
        <div className="flex h-16 items-center justify-between px-4 sm:px-6">
          <Logo className="text-primary-foreground" />
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-white/10"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav
          className="flex flex-1 flex-col justify-center gap-1 px-8"
          aria-label="Mobile navigation"
        >
          {navLinks.map((link, i) => (
            <Link
              key={link.to}
              to={link.to}
              className={cn(
                "border-b border-white/10 py-4 font-display text-3xl font-medium transition-all duration-500 hover:pl-2 hover:text-lime",
                isActive(link.to) && "text-lime",
              )}
              style={{ transitionDelay: open ? `${i * 40}ms` : "0ms" }}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="px-8 pb-10">
          <a
            href={buildWhatsAppLink(whatsappMessages.general())}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center rounded-full bg-lime px-6 py-3.5 text-sm font-semibold text-charcoal transition-transform hover:-translate-y-0.5"
          >
            WhatsApp Us
          </a>
          <div className="mt-5 flex items-center justify-center gap-6 text-sm">
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
      </div>
    </>
  );
}
