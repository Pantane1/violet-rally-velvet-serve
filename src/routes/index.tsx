import { createFileRoute, Link } from "@tanstack/react-router";
import { Instagram, MessageCircle } from "lucide-react";
import heroEditorial from "@/assets/hero-editorial.jpg";
import lashHero from "@/assets/lash-hero.jpg";
import tennisEditorial from "@/assets/tennis-editorial.jpg";
import founderPortrait from "@/assets/founder-portrait.jpg";
import { site } from "@/config/site";
import { products } from "@/data/products";
import { lashServices } from "@/data/services";
import { formatPrice } from "@/lib/format";
import { buildWhatsAppLink, whatsappMessages } from "@/lib/whatsapp";
import { ProductCard } from "@/components/shop/ProductCard";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/brand/Reveal";
import { BallMark } from "@/components/brand/Logo";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${site.brand.name} — ${site.brand.tagline}` },
      {
        name: "description",
        content:
          "Discover curated thrifted women's fashion and beautiful lash looks, all in one place. Shop the fits and request your lash appointment today.",
      },
      {
        property: "og:title",
        content: `${site.brand.name} — ${site.brand.tagline}`,
      },
      {
        property: "og:description",
        content: "Curated thrifted fashion and luxury lash services, all in one place.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:image", content: `${site.url}${heroEditorial}` },
      { name: "twitter:image", content: `${site.url}${heroEditorial}` },
    ],
    links: [{ rel: "canonical", href: `${site.url}/` }],
  }),
  component: Index,
});

function Index() {
  const featured = products.filter((p) => p.featured).slice(0, 4);

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-lilac">
        <div
          className="ambient-glow pointer-events-none absolute -right-40 -top-40 h-[36rem] w-[36rem] rounded-full"
          aria-hidden="true"
        />
        {/* Subtle tennis-inspired decoration */}
        <BallMark
          className="pointer-events-none absolute -bottom-28 -left-28 h-96 w-96 text-lavender/25"
          aria-hidden="true"
        />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 pb-16 pt-28 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-10 lg:px-8 lg:pb-24 lg:pt-40">
          <Reveal immediate>
            <p className="eyebrow text-primary">Curated thrift · Lash studio</p>
            <h1 className="mt-5 font-display text-5xl font-semibold leading-[1.05] tracking-tight text-charcoal sm:text-6xl lg:text-[4.4rem]">
              Your style. Your glow. <span className="italic text-primary">Your court.</span>
            </h1>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground">
              Discover curated women's fashion and beautiful lash looks, all in one place.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                to="/shop"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-plum/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-xl"
              >
                Shop the Collection
                <span aria-hidden="true">→</span>
              </Link>
              <Link
                to="/lash"
                className="inline-flex items-center justify-center rounded-full border border-primary/30 bg-white/60 px-7 py-3.5 text-sm font-semibold text-primary transition-all duration-300 hover:-translate-y-0.5 hover:border-primary hover:bg-white"
              >
                Explore Lash Services
              </Link>
            </div>
            <p className="mt-8 font-display text-sm italic text-primary/80">
              {site.brand.supportingMessage}
            </p>
          </Reveal>
          <Reveal immediate delay={150}>
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="overflow-hidden rounded-4xl border border-white/60 shadow-2xl shadow-lavender/40">
                <img
                  src={heroEditorial}
                  alt="Model wearing a curated plum satin blouse and tailored trousers"
                  width={1024}
                  height={1280}
                  fetchPriority="high"
                  className="aspect-[4/5] w-full object-cover"
                />
              </div>
              <span className="absolute -bottom-5 left-6 rounded-full bg-lime px-4 py-2 text-xs font-semibold text-charcoal shadow-lg">
                Curated fits · Beautiful lashes
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Featured fashion collection ──────────────────────── */}
      <section
        className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8"
        aria-labelledby="featured-collection"
      >
        <Reveal>
          <SectionHeading
            id="featured-collection"
            eyebrow="The collection"
            title="Fresh fits, handpicked for you"
            description="Every piece is one-of-one and carefully selected — once it's gone, it's gone."
          />
        </Reveal>
        <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
          {featured.map((product, i) => (
            <Reveal key={product.id} delay={i * 80}>
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 rounded-full border border-primary/30 px-7 py-3 text-sm font-semibold text-primary transition-all hover:-translate-y-0.5 hover:border-primary hover:bg-secondary"
          >
            View all pieces
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      {/* ── Lash services preview ────────────────────────────── */}
      <section className="bg-plum text-primary-foreground" aria-labelledby="lash-preview">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
          <Reveal className="order-2 lg:order-1">
            <div className="overflow-hidden rounded-4xl shadow-2xl shadow-charcoal/40">
              <img
                src={lashHero}
                alt="Close-up of a beautifully applied volume lash set"
                width={1024}
                height={1280}
                loading="lazy"
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={120} className="order-1 lg:order-2">
            <SectionHeading
              id="lash-preview"
              light
              align="left"
              eyebrow="Lash studio"
              title="Beautiful lashes, tailored to you"
              description="From soft everyday definition to full editorial volume — every set is mapped to your eye shape and lifestyle."
            />
            <ul className="mt-8 divide-y divide-white/10">
              {lashServices.slice(0, 3).map((service) => (
                <li key={service.id} className="flex items-baseline justify-between gap-4 py-4">
                  <div>
                    <p className="font-display text-lg font-medium">{service.name}</p>
                    <p className="text-xs text-primary-foreground/60">Approx. {service.duration}</p>
                  </div>
                  <p className="font-display text-lg font-semibold text-lime">
                    {formatPrice(service.price)}
                  </p>
                </li>
              ))}
            </ul>
            <div className="mt-9 flex flex-wrap items-center gap-5">
              <WhatsAppButton
                variant="lime"
                message={whatsappMessages.lashAppointment({
                  service: "Lash appointment enquiry",
                })}
              >
                Book a lash appointment
              </WhatsAppButton>
              <Link
                to="/lash"
                className="text-sm font-semibold text-primary-foreground/80 underline-offset-4 transition-colors hover:text-lime hover:underline"
              >
                View all services
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Meet the founder ─────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8" aria-labelledby="founder">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <Reveal>
            <div className="relative mx-auto max-w-sm">
              <div className="overflow-hidden rounded-4xl border border-border shadow-xl shadow-lavender/30">
                <img
                  src={founderPortrait}
                  alt="Portrait of the founder on a tennis court"
                  width={1024}
                  height={1280}
                  loading="lazy"
                  className="aspect-[4/5] w-full object-cover"
                />
              </div>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <SectionHeading
              id="founder"
              align="left"
              eyebrow="Meet the founder"
              title="Built on confidence, style and a love of the game"
              className="max-w-none"
            />
            <p className="mt-6 max-w-xl leading-relaxed text-muted-foreground">
              {site.brand.name} began with a simple idea: the right top and a beautiful lash can
              change how a woman walks into a room. Between curating one-of-one thrifted finds and
              perfecting lash sets, there's always a racket in the bag — because confidence is a
              sport you practise every day.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {["Fashion", "Beauty", "Tennis", "Confidence"].map((chip) => (
                <span
                  key={chip}
                  className="rounded-full bg-secondary px-4 py-1.5 text-xs font-semibold text-charcoal"
                >
                  {chip}
                </span>
              ))}
            </div>
            <Link
              to="/about"
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary underline-offset-4 transition-all hover:gap-3 hover:underline"
            >
              Read her story
              <span aria-hidden="true">→</span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── Brand story ──────────────────────────────────────── */}
      <section className="bg-lilac" aria-labelledby="brand-story">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
          <Reveal>
            <SectionHeading
              id="brand-story"
              align="left"
              eyebrow="Our story"
              title="Where the fitting room meets the baseline"
              className="max-w-none"
            />
            <div className="drop-cap mt-8 max-w-xl space-y-5 leading-relaxed text-muted-foreground">
              <p>
                Style, beauty and sport share one thing in common: they're all about showing up as
                yourself. A thrifted blouse with a story, a lash set that catches the light on match
                point, the quiet confidence of a woman who knows her own taste — it all belongs to
                the same rally.
              </p>
              <p>
                {site.brand.name} exists so that looking incredible never feels like a compromise.
                Curated pieces, beautiful lashes and a little court-side attitude — unapologetically
                you.
              </p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="overflow-hidden rounded-4xl shadow-xl shadow-lavender/30">
              <img
                src={tennisEditorial}
                alt="Stylish woman in a lilac tennis set seated on a court bench"
                width={1024}
                height={1280}
                loading="lazy"
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Final conversion ─────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-4xl bg-plum px-6 py-16 text-center text-primary-foreground sm:px-12">
            <BallMark
              className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 text-lavender/20"
              aria-hidden="true"
            />
            <h2 className="mx-auto max-w-2xl font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              Ready to serve your best look?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-primary-foreground/75">
              Ask about a piece, plan your next lash set, or just say hello — the fastest way to
              reach the studio is WhatsApp.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <WhatsAppButton variant="lime" message={whatsappMessages.general()}>
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                Chat on WhatsApp
              </WhatsAppButton>
              <a
                href={site.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-3 text-sm font-semibold transition-colors hover:border-lime hover:text-lime"
              >
                <Instagram className="h-4 w-4" aria-hidden="true" />
                Instagram
              </a>
              <a
                href={site.social.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-3 text-sm font-semibold transition-colors hover:border-lime hover:text-lime"
              >
                TikTok
              </a>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
