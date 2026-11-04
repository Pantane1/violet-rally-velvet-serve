/**
 * Pure validation helpers for the Lash appointment request form.
 *
 * Kept free of React and side effects so the rules can be unit-tested in
 * isolation and reused by any future booking surface (admin, API, etc.).
 */

export interface BookingForm {
  name: string;
  phone: string;
  service: string;
  date: string;
  time: string;
}

export type BookingErrors = Partial<Record<keyof BookingForm, string>>;

/**
 * Validate a booking form and return a map of field -> error message.
 * An empty object means the form is valid.
 */
export function validateBookingForm(form: BookingForm): BookingErrors {
  const errors: BookingErrors = {};

  if (!form.name.trim()) {
    errors.name = "Please enter your name.";
  }

  if (!/^[+\d][\d\s-]{6,}$/.test(form.phone.trim())) {
    errors.phone = "Please enter a valid contact number.";
  }

  if (!form.service) {
    errors.service = "Please choose a service.";
  }

  if (!form.date) {
    errors.date = "Please pick a preferred date.";
  }

  if (!form.time) {
    errors.time = "Please pick a preferred time.";
  }

  return errors;
}

/** Convenience predicate: true when the form has no validation errors. */
export function isBookingFormValid(form: BookingForm): boolean {
  return Object.keys(validateBookingForm(form)).length === 0;
}
