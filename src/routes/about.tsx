import { createFileRoute, Link } from "@tanstack/react-router";
import { site } from "@/config/site";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { Reveal } from "@/components/brand/Reveal";
import { BallMark } from "@/components/brand/Logo";
import { whatsappMessages } from "@/lib/whatsapp";
import founderPortrait from "@/assets/founder-portrait.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: `About the Founder — ${site.brand.name}` },
      {
        name: "description",
        content:
          "Meet the founder of Violet Rally — fashion curator, lash artist and tennis lover on a mission to help women express their confidence.",
      },
      {
        property: "og:title",
        content: `About the Founder — ${site.brand.name}`,
      },
      {
        property: "og:description",
        content:
          "Fashion curator, lash artist and tennis lover — meet the woman behind Violet Rally.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:image", content: `${site.url}${founderPortrait}` },
      { name: "twitter:image", content: `${site.url}${founderPortrait}` },
    ],
    links: [{ rel: "canonical", href: `${site.url}/about` }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      {/* Header + portrait */}
      <section className="bg-lilac pb-20 pt-28 lg:pt-36">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:px-8">
          <Reveal>
            <div className="mx-auto max-w-sm overflow-hidden rounded-4xl border border-white/60 shadow-2xl shadow-lavender/40">
              <img
                src={founderPortrait}
                alt="Portrait of the founder on a tennis court"
                width={1024}
                height={1280}
                fetchPriority="high"
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
            <p className="mt-3 text-center text-xs text-muted-foreground">
              Placeholder portrait — the founder's real photograph will replace this.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <SectionHeading
              as="h1"
              align="left"
              eyebrow="About"
              title="The woman behind the rally"
              className="max-w-none"
            />
            {/* NOTE: editable placeholder copy. No name, qualifications,
                personal history or achievements are invented here — the
                owner can replace this copy with her real story. */}
            <div className="mt-8 max-w-xl space-y-5 leading-relaxed text-muted-foreground">
              <p>
                Fashion came first — the thrill of finding that one perfect piece that feels like it
                was always yours. Thrifting isn't just shopping; it's a treasure hunt with an eye
                for quality, colour and story.
              </p>
              <p>
                Beauty followed naturally. A beautiful set of lashes does something no outfit can:
                it stays with you from the first coffee to the last set change. Learning the craft
                of lash art became a way to hand that feeling to other women.
              </p>
              <p>
                And then there's tennis — the discipline, the footwork, the quiet confidence of
                showing up match after match. It shapes how she runs this brand: with consistency,
                care and a bit of court-side flair.
              </p>
              <p>
                Everything at {site.brand.name} comes back to one belief: every woman deserves to
                express her individuality loudly, softly and unapologetically — her style, her glow,
                her court.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-2">
              {[
                "Passion for fashion",
                "Lash artistry",
                "Tennis love",
                "Confidence for every woman",
              ].map((chip) => (
                <span
                  key={chip}
                  className="rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-charcoal shadow-sm"
                >
                  {chip}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8" aria-labelledby="values">
        <Reveal>
          <SectionHeading eyebrow="What we stand for" title="Four things, one brand" id="values" />
        </Reveal>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "Fashion",
              text: "One-of-one thrifted pieces, curated with an editorial eye and checked piece by piece.",
            },
            {
              title: "Beauty",
              text: "Lash sets tailored to your eye shape and lifestyle — never one-size-fits-all.",
            },
            {
              title: "Tennis",
              text: "The spirit of the game: discipline, playfulness and grace under pressure.",
            },
            {
              title: "Confidence",
              text: "The real product. Everything here is designed to help you walk taller.",
            },
          ].map((value, i) => (
            <Reveal key={value.title} delay={i * 80}>
              <div className="h-full rounded-3xl border border-border bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:border-lavender hover:shadow-xl hover:shadow-lavender/25">
                <BallMark className="h-8 w-8 text-primary" />
                <h3 className="mt-4 font-display text-xl font-semibold text-charcoal">
                  {value.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{value.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-4xl bg-plum px-6 py-14 text-center text-primary-foreground sm:px-12">
            <BallMark
              className="pointer-events-none absolute -right-14 -bottom-14 h-56 w-56 text-lavender/20"
              aria-hidden="true"
            />
            <h2 className="mx-auto max-w-xl font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              Come say hello
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-primary-foreground/75">
              Whether it's a fit, a lash set or a rally — we'd love to hear from you.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <WhatsAppButton variant="lime" message={whatsappMessages.general()}>
                WhatsApp the studio
              </WhatsAppButton>
              <Link
                to="/shop"
                className="inline-flex items-center justify-center rounded-full border border-white/25 px-7 py-3 text-sm font-semibold transition-colors hover:border-lime hover:text-lime"
              >
                Shop the collection
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
