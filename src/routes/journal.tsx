import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Instagram } from "lucide-react";
import { site } from "@/config/site";
import {
  journalEntries,
  journalKindLabels,
  type JournalKind,
} from "@/data/journal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/brand/Reveal";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/journal")({
  head: () => ({
    meta: [
      { title: `Brand Journal — ${site.brand.name}` },
      {
        name: "description",
        content:
          "New thrift drops, lash transformations, styling inspiration and tennis-inspired moments from the Violet Rally world.",
      },
      { property: "og:title", content: `Brand Journal — ${site.brand.name}` },
      {
        property: "og:description",
        content:
          "New drops, lash transformations and styling inspiration from the Violet Rally world.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: JournalPage,
});

function JournalPage() {
  const [kind, setKind] = useState<"all" | JournalKind>("all");
  const kinds = [...new Set(journalEntries.map((e) => e.kind))];
  const filtered =
    kind === "all" ? journalEntries : journalEntries.filter((e) => e.kind === kind);

  return (
    <>
      <section className="bg-lilac pb-6 pt-28 lg:pt-36">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              align="left"
              eyebrow="Brand journal"
              title="Life between the fitting room and the court"
              description="New drops, lash transformations, styling inspiration and behind-the-scenes moments. Follow along on Instagram and TikTok for the daily view."
            />
            <p className="mt-4 text-xs text-muted-foreground">
              Sample entries shown — the owner's real content and photography
              will replace these. No social-feed integration is used; links
              open the profiles directly.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Kind filter chips */}
      <section className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8" aria-label="Filter journal by type">
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setKind("all")}
            aria-pressed={kind === "all"}
            className={cn(
              "rounded-full px-4 py-2 text-xs font-semibold transition-colors",
              kind === "all"
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-charcoal hover:bg-accent",
            )}
          >
            All
          </button>
          {kinds.map((k) => (
            <button
              key={k}
              type="button"
              onClick={() => setKind(k)}
              aria-pressed={kind === k}
              className={cn(
                "rounded-full px-4 py-2 text-xs font-semibold transition-colors",
                kind === k
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-charcoal hover:bg-accent",
              )}
            >
              {journalKindLabels[k]}
            </button>
          ))}
        </div>
      </section>

      {/* Gallery grid */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((entry, i) => (
            <Reveal key={entry.id} delay={(i % 3) * 90}>
              <article className="group overflow-hidden rounded-3xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-lavender/25">
                <div className="relative overflow-hidden">
                  <img
                    src={entry.image}
                    alt={entry.title}
                    width={1024}
                    height={1280}
                    loading="lazy"
                    className="aspect-[4/5] w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-lime px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-wide text-charcoal">
                    {journalKindLabels[entry.kind]}
                  </span>
                </div>
                <div className="p-6">
                  <h2 className="font-display text-xl font-semibold text-charcoal">
                    {entry.title}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {entry.caption}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Social CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-4xl bg-plum px-6 py-14 text-center text-primary-foreground sm:px-12">
            <h2 className="mx-auto max-w-xl font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              Follow the rally
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-primary-foreground/75">
              Daily drops, lash looks and court-side style — it all happens on
              Instagram and TikTok first.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a
                href={site.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-lime px-7 py-3 text-sm font-semibold text-charcoal transition-all hover:-translate-y-0.5 hover:brightness-95"
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
