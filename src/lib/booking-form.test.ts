import { describe, expect, it } from "vitest";

import { isBookingFormValid, validateBookingForm } from "@/lib/booking-form";

const validForm = {
  name: "Jane Doe",
  phone: "+254 712 345 678",
  service: "Classic Set",
  date: "2025-02-14",
  time: "10:30",
};

describe("validateBookingForm", () => {
  it("returns no errors for a fully valid form", () => {
    expect(validateBookingForm(validForm)).toEqual({});
    expect(isBookingFormValid(validForm)).toBe(true);
  });

  it("flags a missing name", () => {
    const errors = validateBookingForm({ ...validForm, name: "   " });
    expect(errors.name).toBe("Please enter your name.");
    expect(isBookingFormValid({ ...validForm, name: "   " })).toBe(false);
  });

  it("flags an empty contact number", () => {
    const errors = validateBookingForm({ ...validForm, phone: "" });
    expect(errors.phone).toBe("Please enter a valid contact number.");
  });

  it("flags a malformed contact number", () => {
    const errors = validateBookingForm({ ...validForm, phone: "abc" });
    expect(errors.phone).toBe("Please enter a valid contact number.");
  });

  it("flags a missing service", () => {
    const errors = validateBookingForm({ ...validForm, service: "" });
    expect(errors.service).toBe("Please choose a service.");
  });

  it("flags a missing preferred date", () => {
    const errors = validateBookingForm({ ...validForm, date: "" });
    expect(errors.date).toBe("Please pick a preferred date.");
  });

  it("flags a missing preferred time", () => {
    const errors = validateBookingForm({ ...validForm, time: "" });
    expect(errors.time).toBe("Please pick a preferred time.");
  });

  it("returns all five errors when every field is empty", () => {
    const errors = validateBookingForm({
      name: "",
      phone: "",
      service: "",
      date: "",
      time: "",
    });
    expect(Object.keys(errors).sort()).toEqual(["date", "name", "phone", "service", "time"].sort());
  });

  it("trims whitespace before validating the phone", () => {
    const errors = validateBookingForm({ ...validForm, phone: "  +254 712 345 678  " });
    expect(errors.phone).toBeUndefined();
  });
});
