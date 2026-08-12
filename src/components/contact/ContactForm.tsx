"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { dialCodes } from "@/content/dialCodes";
import { cn } from "@/lib/cn";

type FormState = {
  firstName: string;
  lastName: string;
  dialCode: string;
  phone: string;
  email: string;
  countryOfResidence: string;
  interestedIn: string;
  message: string;
  hearAboutUs: string;
};

const initialState: FormState = {
  firstName: "",
  lastName: "",
  dialCode: "+94|Sri Lanka",
  phone: "",
  email: "",
  countryOfResidence: "",
  interestedIn: "garden-condos",
  message: "",
  hearAboutUs: "",
};

const interestOptions = [
  { value: "garden-condos", label: "Garden Condo" },
  { value: "condos", label: "Condo" },
  { value: "private-villas", label: "Private Villa" },
];

const hearAboutUsOptions = [
  { value: "", label: "Please select" },
  { value: "social-media", label: "Social Media" },
  { value: "google-search", label: "Google Search" },
  { value: "referral", label: "Referral / Word of Mouth" },
  { value: "property-portal", label: "Property Portal" },
  { value: "advertisement", label: "Advertisement" },
  { value: "other", label: "Other" },
];

export function ContactForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  function validate(values: FormState) {
    const nextErrors: Partial<Record<keyof FormState, string>> = {};
    if (!values.firstName.trim()) nextErrors.firstName = "First name is required";
    if (!values.lastName.trim()) nextErrors.lastName = "Second name is required";
    if (!values.phone.trim()) nextErrors.phone = "Phone number is required";
    if (!values.email.trim()) nextErrors.email = "Email is required";
    if (!values.countryOfResidence.trim()) nextErrors.countryOfResidence = "Country of residence is required";
    if (!values.hearAboutUs.trim()) nextErrors.hearAboutUs = "Please tell us how you heard about us";
    return nextErrors;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const nextErrors = validate(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("submitting");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, dialCode: form.dialCode.split("|")[0] }),
      });
      if (!response.ok) throw new Error("Request failed");
      setStatus("success");
      setForm(initialState);
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8 w-full max-w-xl">
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="First Name*"
          id="firstName"
          name="firstName"
          value={form.firstName}
          onChange={(e) => setForm({ ...form, firstName: e.target.value })}
          error={errors.firstName}
        />
        <Input
          label="Second Name*"
          id="lastName"
          name="lastName"
          value={form.lastName}
          onChange={(e) => setForm({ ...form, lastName: e.target.value })}
          error={errors.lastName}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="phone" className="font-body text-para-xxs pl-4 font-light text-black">
          Phone*
        </label>
        <div className="flex gap-2">
          <select
            id="dialCode"
            name="dialCode"
            value={form.dialCode}
            onChange={(e) => setForm({ ...form, dialCode: e.target.value })}
            aria-label="Country dial code"
            className="w-36 shrink-0 truncate rounded-input border border-brand-forest-500 bg-brand-cream-dark/40 px-2 py-2.5 font-body text-sm text-black font-thin focus:outline-none focus:ring-1 focus:ring-black/70"
          >
            {dialCodes.map(({ code, country }) => (
              <option key={country} value={`${code}|${country}`}>
                {code} {country}
              </option>
            ))}
          </select>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "phone-error" : undefined}
            className={cn(
              "flex-1 min-w-0 rounded-input border bg-brand-cream-dark/40 px-4 py-2.5 font-body text-sm text-black font-thin focus:outline-none focus:ring-1 focus:ring-black/70",
              errors.phone ? "border-red-500" : "border-brand-forest-500"
            )}
          />
        </div>
        {errors.phone && (
          <span id="phone-error" className="text-sm text-red-600" role="alert">
            {errors.phone}
          </span>
        )}
      </div>

      <Input
        label="Email*"
        id="email"
        name="email"
        type="email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        error={errors.email}
      />

      <Input
        label="Country of Residence*"
        id="countryOfResidence"
        name="countryOfResidence"
        value={form.countryOfResidence}
        onChange={(e) => setForm({ ...form, countryOfResidence: e.target.value })}
        error={errors.countryOfResidence}
      />

      <Select
        label="Interested In"
        id="interestedIn"
        name="interestedIn"
        value={form.interestedIn}
        onChange={(e) => setForm({ ...form, interestedIn: e.target.value })}
        options={interestOptions}
      />

      <Textarea
        label="Message"
        id="message"
        name="message"
        value={form.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
        maxLength={150}
      />

      <Select
        label="Where did you hear Us*"
        id="hearAboutUs"
        name="hearAboutUs"
        value={form.hearAboutUs}
        onChange={(e) => setForm({ ...form, hearAboutUs: e.target.value })}
        options={hearAboutUsOptions}
        error={errors.hearAboutUs}
      />

      <Button type="submit" variant="primary" className="w-full" disabled={status === "submitting"}>
        Submit
      </Button>
      {status === "success" && (
        <p className="font-body text-sm text-brand-forest-700" role="status">
          Thank you — we'll be in touch shortly.
        </p>
      )}
      {status === "error" && (
        <p className="font-body text-sm text-red-600" role="alert">
          Something went wrong. Please try again or contact us via WhatsApp.
        </p>
      )}
    </form>
  );
}
