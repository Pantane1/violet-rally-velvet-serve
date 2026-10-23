import { describe, expect, it } from "vitest";
import { buildWhatsAppLink, whatsappMessages } from "./whatsapp";

describe("whatsapp message helpers", () => {
  it("product order message includes the product name and selected size", () => {
    const msg = whatsappMessages.productOrder("Satin Cloud Blouse", "M");
    expect(msg).toContain("Satin Cloud Blouse");
    expect(msg).toContain("size M");
  });

  it("product order message works without a size", () => {
    const msg = whatsappMessages.productOrder("Satin Cloud Blouse");
    expect(msg).toContain("Satin Cloud Blouse");
    expect(msg).not.toContain("size undefined");
  });

  it("appointment request includes service, date, time and name", () => {
    const msg = whatsappMessages.lashAppointment({
      service: "Volume Set",
      name: "Amara",
      date: "2026-11-02",
      time: "14:00",
    });
    expect(msg).toContain("Volume Set");
    expect(msg).toContain("2026-11-02");
    expect(msg).toContain("14:00");
    expect(msg).toContain("Amara");
    expect(msg).toContain("request a lash appointment");
  });

  it("builds a wa.me link with the message url-encoded", () => {
    const link = buildWhatsAppLink("Hi there & hello");
    expect(link).toMatch(/^https:\/\/wa\.me\/\d+\?text=/);
    expect(link).toContain(encodeURIComponent("Hi there & hello"));
  });
});
