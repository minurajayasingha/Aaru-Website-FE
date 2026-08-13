"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { dialCodes } from "@/content/dialCodes";
import { cn } from "@/lib/cn";
import {
  UserFieldIcon,
  PhoneFieldIcon,
  EmailFieldIcon,
  GlobeFieldIcon,
  BuildingFieldIcon,
  MessageFieldIcon,
  MegaphoneFieldIcon,
  ChevronDownIcon,
} from "@/components/contact/icons";

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
    <form onSubmit={handleSubmit} className="flex w-full max-w-xl flex-col gap-6 rounded-card bg-white p-6 shadow-card md:p-10">
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="First Name*"
          id="firstName"
          name="firstName"
          value={form.firstName}
          onChange={(e) => setForm({ ...form, firstName: e.target.value })}
          error={errors.firstName}
          icon={<UserFieldIcon />}
        />
        <Input
          label="Second Name*"
          id="lastName"
          name="lastName"
          value={form.lastName}
          onChange={(e) => setForm({ ...form, lastName: e.target.value })}
          error={errors.lastName}
          icon={<UserFieldIcon />}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="phone" className="font-body text-para-xxs pl-4 font-light text-black">
          Phone*
        </label>
        <div className="flex gap-3">
          <div className="relative w-40 shrink-0 sm:w-56">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-brand-forest-500">
              <PhoneFieldIcon />
            </span>
            <select
              id="dialCode"
              name="dialCode"
              value={form.dialCode}
              onChange={(e) => setForm({ ...form, dialCode: e.target.value })}
              aria-label="Country dial code"
              className="w-full appearance-none truncate rounded-input border border-brand-forest-200 bg-brand-cream-dark/30 py-2.5 pl-11 pr-9 font-body text-sm text-black font-thin focus:outline-none focus:ring-1 focus:ring-black/70"
            >
              {dialCodes.map(({ code, country }) => (
                <option key={`${code}-${country}`} value={`${code}|${country}`}>
                  {code} {country}
                </option>
              ))}
            </select>
            <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-brand-forest-500" />
          </div>
          <div className="relative min-w-0 flex-1">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-brand-forest-500">
              <PhoneFieldIcon />
            </span>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={errors.phone ? "phone-error" : undefined}
              className={cn(
                "min-w-0 w-full rounded-input border bg-brand-cream-dark/30 py-2.5 pl-11 pr-4 font-body text-sm text-black font-thin focus:outline-none focus:ring-1 focus:ring-black/70",
                errors.phone ? "border-red-500" : "border-brand-forest-200"
              )}
            />
          </div>
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
        icon={<EmailFieldIcon />}
      />

      <Input
        label="Country of Residence*"
        id="countryOfResidence"
        name="countryOfResidence"
        value={form.countryOfResidence}
        onChange={(e) => setForm({ ...form, countryOfResidence: e.target.value })}
        error={errors.countryOfResidence}
        icon={<GlobeFieldIcon />}
      />

      <Select
        label="Interested In"
        id="interestedIn"
        name="interestedIn"
        value={form.interestedIn}
        onChange={(e) => setForm({ ...form, interestedIn: e.target.value })}
        options={interestOptions}
        icon={<BuildingFieldIcon />}
      />

      <Textarea
        label="Message"
        id="message"
        name="message"
        value={form.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
        maxLength={150}
        icon={<MessageFieldIcon />}
      />

      <Select
        label="Where did you hear Us*"
        id="hearAboutUs"
        name="hearAboutUs"
        value={form.hearAboutUs}
        onChange={(e) => setForm({ ...form, hearAboutUs: e.target.value })}
        options={hearAboutUsOptions}
        error={errors.hearAboutUs}
        icon={<MegaphoneFieldIcon />}
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
