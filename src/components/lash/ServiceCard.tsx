import { formatPrice } from "@/lib/format";
import { whatsappMessages } from "@/lib/whatsapp";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import type { LashService } from "@/data/services";

export function ServiceCard({ service }: { service: LashService }) {
  return (
    <article className="group flex h-full flex-col rounded-3xl border border-border bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:border-lavender hover:shadow-xl hover:shadow-lavender/25">
      {service.popular && (
        <span className="mb-4 inline-flex w-fit items-center rounded-full bg-lime px-3 py-1 text-xs font-semibold text-charcoal">
          Most loved
        </span>
      )}
      <h3 className="font-display text-2xl font-semibold text-charcoal">{service.name}</h3>
      <p className="mt-2.5 flex-1 text-sm leading-relaxed text-muted-foreground">
        {service.description}
      </p>
      <div className="mt-6 flex items-end justify-between gap-4 border-t border-border pt-5">
        <div>
          <p className="font-display text-xl font-semibold text-primary">
            {formatPrice(service.price)}
          </p>
          <p className="mt-0.5 text-xs text-muted-foreground">Approx. {service.duration}</p>
        </div>
        <WhatsAppButton
          variant="outline"
          className="px-4 py-2 text-xs"
          message={whatsappMessages.lashAppointment({ service: service.name })}
        >
          Book
        </WhatsAppButton>
      </div>
    </article>
  );
}
