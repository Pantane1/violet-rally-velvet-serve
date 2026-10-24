import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, Clock, MapPin } from "lucide-react";
import lashHero from "@/assets/lash-hero.jpg";
import { site } from "@/config/site";
import { aftercareSteps, lashServices } from "@/data/services";
import { buildWhatsAppLink, whatsappMessages } from "@/lib/whatsapp";
import { ServiceCard } from "@/components/lash/ServiceCard";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/brand/Reveal";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/lash")({
  head: () => ({
    meta: [
      { title: `Lash Studio — ${site.brand.name}` },
      {
        name: "description",
        content:
          "Classic, volume and mega-volume lash sets, refills and lash lifts. Request your appointment on WhatsApp and leave with lashes that catch the light.",
      },
      { property: "og:title", content: `Lash Studio — ${site.brand.name}` },
      {
        property: "og:description",
        content:
          "Luxury lash services — classic, volume, mega volume, refills and lifts. Request an appointment on WhatsApp.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LashPage,
});

/** Local calendar date as YYYY-MM-DD, matching what <input type="date"> produces. */
function todayIso(): string {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

interface BookingForm {
  name: string;
  phone: string;
  service: string;
  date: string;
  time: string;
}

function LashPage() {
  const [form, setForm] = useState<BookingForm>({
    name: "",
    phone: "",
    service: lashServices[0]?.name ?? "",
    date: "",
    time: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof BookingForm, string>>>({});
  const [sent, setSent] = useState(false);

  const set = (field: keyof BookingForm, value: string) =>
    setForm((f) => ({ ...f, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Partial<Record<keyof BookingForm, string>> = {};
    if (!form.name.trim()) errs.name = "Please enter your name.";
    if (!/^[+\d][\d\s-]{6,}$/.test(form.phone.trim()))
      errs.phone = "Please enter a valid contact number.";
    if (!form.service) errs.service = "Please choose a service.";
    if (!form.date) errs.date = "Please pick a preferred date.";
    else if (form.date < todayIso()) errs.date = "Please pick today or a future date.";
    if (!form.time) errs.time = "Please pick a preferred time.";
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    // The form prepares an appointment REQUEST and hands it to WhatsApp.
    // It is not a confirmed booking until the studio replies.
    window.open(
      buildWhatsAppLink(whatsappMessages.lashAppointment(form)),
      "_blank",
      "noopener,noreferrer",
    );
    setSent(true);
  };

  const inputClass = (field: keyof BookingForm) =>
    cn(
      "w-full rounded-2xl border bg-card px-4 py-3 text-sm text-charcoal transition-colors",
      errors[field] ? "border-destructive" : "border-input focus:border-primary",
    );

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-plum text-primary-foreground">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 pb-16 pt-28 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8 lg:pb-24 lg:pt-36">
          <Reveal>
            <p className="eyebrow text-lime">Lash studio</p>
            <h1 className="mt-5 font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Wake up with <span className="italic text-lime">perfect lashes</span>
            </h1>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-primary-foreground/80">
              Every set is mapped to your eye shape, your lifestyle and your glow. Soft and natural,
              or full editorial volume — the choice is yours.
            </p>
            <div className="mt-9">
              <a
                href="#appointment"
                className="inline-flex items-center justify-center rounded-full bg-lime px-7 py-3.5 text-sm font-semibold text-charcoal shadow-lg shadow-charcoal/25 transition-all hover:-translate-y-0.5 hover:brightness-95"
              >
                Request an appointment
              </a>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <div className="overflow-hidden rounded-4xl shadow-2xl shadow-charcoal/40">
              <img
                src={lashHero}
                alt="Close-up of a beautifully applied volume lash set"
                width={1024}
                height={1280}
                fetchPriority="high"
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Services */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8" aria-labelledby="services">
        <Reveal>
          <SectionHeading
            eyebrow="The menu"
            title="Lash services & pricing"
            description="Prices are sample values — the real service menu is coming soon. Every appointment includes a patch-test-friendly consultation."
          />
        </Reveal>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {lashServices.map((service, i) => (
            <Reveal key={service.id} delay={(i % 3) * 90}>
              <ServiceCard service={service} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Before & after gallery */}
      <section className="bg-lilac" aria-labelledby="gallery">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="The proof"
              title="Before & after"
              description="Real client transformations will live here — sample imagery is shown until the studio's photography is ready."
            />
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:max-w-3xl lg:mx-auto">
            <Reveal>
              <figure className="lg:mx-auto lg:max-w-md">
                <div className="overflow-hidden rounded-3xl border border-border">
                  <img
                    src={lashHero}
                    alt="Sample volume lash set, shown until real before and after photos are added"
                    width={1024}
                    height={1280}
                    loading="lazy"
                    className="aspect-square w-full object-cover"
                  />
                </div>
                <figcaption className="mt-2 text-center text-xs text-muted-foreground">
                  Sample imagery — real before &amp; after photos coming soon
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Appointment request */}
      <section
        id="appointment"
        className="mx-auto max-w-7xl scroll-mt-24 px-4 py-20 sm:px-6 lg:px-8"
        aria-labelledby="appointment-heading"
      >
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-start">
          <Reveal>
            <SectionHeading
              align="left"
              eyebrow="Appointments"
              title="Request your lash appointment"
              description="Fill in your details and we'll open WhatsApp with your request pre-filled. This is an appointment request — it becomes a confirmed booking only once the studio replies to confirm."
              className="max-w-none"
            />
            <ul className="mt-8 space-y-4 text-sm text-muted-foreground">
              <li className="flex items-start gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                Reply times are fastest during opening hours.
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                {site.contact.location.line1}, {site.contact.location.line2}
              </li>
            </ul>
            <div className="mt-8 rounded-3xl border border-border bg-secondary p-6">
              <h3 className="eyebrow text-primary">Opening hours</h3>
              <ul className="mt-3 space-y-2 text-sm">
                {site.contact.hours.map((row) => (
                  <li key={row.days} className="flex justify-between gap-4">
                    <span className="text-charcoal">{row.days}</span>
                    <span className="text-muted-foreground">{row.time}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={120}>
            {sent ? (
              <div
                className="rounded-3xl border border-lime bg-secondary p-8 text-center"
                role="status"
              >
                <CheckCircle2 className="mx-auto h-12 w-12 text-primary" aria-hidden="true" />
                <h3 className="mt-4 font-display text-2xl font-semibold text-charcoal">
                  Request prepared in WhatsApp
                </h3>
                <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
                  Your appointment request has been handed to WhatsApp with all your details.{" "}
                  <strong>Please send the message there</strong> — your booking is only confirmed
                  once the studio replies.
                </p>
                <button
                  type="button"
                  onClick={() => setSent(false)}
                  className="mt-6 inline-flex items-center justify-center rounded-full border border-primary/30 px-6 py-3 text-sm font-semibold text-primary transition-colors hover:bg-secondary"
                >
                  Make another request
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="rounded-3xl border border-border bg-card p-6 shadow-xl shadow-lavender/20 sm:p-8"
                aria-label="Lash appointment request form"
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="appt-name" className="text-sm font-semibold text-charcoal">
                      Name
                    </label>
                    <input
                      id="appt-name"
                      type="text"
                      value={form.name}
                      onChange={(e) => set("name", e.target.value)}
                      aria-invalid={!!errors.name}
                      className={cn(inputClass("name"), "mt-2")}
                      placeholder="Your name"
                    />
                    {errors.name && (
                      <p className="mt-1.5 text-xs text-destructive" role="alert">
                        {errors.name}
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="appt-phone" className="text-sm font-semibold text-charcoal">
                      Contact number
                    </label>
                    <input
                      id="appt-phone"
                      type="tel"
                      value={form.phone}
                      onChange={(e) => set("phone", e.target.value)}
                      aria-invalid={!!errors.phone}
                      className={cn(inputClass("phone"), "mt-2")}
                      placeholder="+254 7XX XXX XXX"
                    />
                    {errors.phone && (
                      <p className="mt-1.5 text-xs text-destructive" role="alert">
                        {errors.phone}
                      </p>
                    )}
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="appt-service" className="text-sm font-semibold text-charcoal">
                      Requested service
                    </label>
                    <select
                      id="appt-service"
                      value={form.service}
                      onChange={(e) => set("service", e.target.value)}
                      aria-invalid={!!errors.service}
                      className={cn(inputClass("service"), "mt-2")}
                    >
                      {lashServices.map((s) => (
                        <option key={s.id} value={s.name}>
                          {s.name}
                        </option>
                      ))}
                    </select>
                    {errors.service && (
                      <p className="mt-1.5 text-xs text-destructive" role="alert">
                        {errors.service}
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="appt-date" className="text-sm font-semibold text-charcoal">
                      Preferred date
                    </label>
                    <input
                      id="appt-date"
                      type="date"
                      min={todayIso()}
                      value={form.date}
                      onChange={(e) => set("date", e.target.value)}
                      aria-invalid={!!errors.date}
                      className={cn(inputClass("date"), "mt-2")}
                    />
                    {errors.date && (
                      <p className="mt-1.5 text-xs text-destructive" role="alert">
                        {errors.date}
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="appt-time" className="text-sm font-semibold text-charcoal">
                      Preferred time
                    </label>
                    <input
                      id="appt-time"
                      type="time"
                      value={form.time}
                      onChange={(e) => set("time", e.target.value)}
                      aria-invalid={!!errors.time}
                      className={cn(inputClass("time"), "mt-2")}
                    />
                    {errors.time && (
                      <p className="mt-1.5 text-xs text-destructive" role="alert">
                        {errors.time}
                      </p>
                    )}
                  </div>
                </div>
                <button
                  type="submit"
                  className="mt-7 inline-flex w-full items-center justify-center rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-plum/25 transition-all hover:-translate-y-0.5 hover:bg-primary/90"
                >
                  Request via WhatsApp
                </button>
                <p className="mt-3 text-center text-xs text-muted-foreground">
                  A request, not a confirmed booking — the studio confirms by replying on WhatsApp.
                </p>
              </form>
            )}
          </Reveal>
        </div>
      </section>

      {/* Aftercare */}
      <section className="bg-lilac" aria-labelledby="aftercare">
        <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="Keep them perfect"
              title="Lash aftercare"
              description="Sample aftercare guidance — the studio's real aftercare instructions can replace these."
            />
            <ol className="mt-10 space-y-4">
              {aftercareSteps.map((step, i) => (
                <li
                  key={i}
                  className="flex items-start gap-4 rounded-3xl border border-border bg-card p-5"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary font-display text-sm font-semibold text-primary-foreground">
                    {i + 1}
                  </span>
                  <p className="pt-1 text-sm leading-relaxed text-muted-foreground">{step}</p>
                </li>
              ))}
            </ol>
            <div className="mt-10 text-center">
              <WhatsAppButton message={whatsappMessages.general()} variant="outline">
                Ask an aftercare question
              </WhatsAppButton>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
