"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";

type FormState = {
  fullName: string;
  email: string;
  phone: string;
  interestedIn: string;
  message: string;
};

const initialState: FormState = {
  fullName: "",
  email: "",
  phone: "",
  interestedIn: "garden-condos",
  message: "",
};

const interestOptions = [
  { value: "garden-condos", label: "Garden Condo" },
  { value: "elevated-condos", label: "Elevated Condo" },
  { value: "private-villas", label: "Private Villa" },
  { value: "commercial-space", label: "Commercial Space" },
];

export function ContactForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  function validate(values: FormState) {
    const nextErrors: Partial<Record<keyof FormState, string>> = {};
    if (!values.fullName.trim()) nextErrors.fullName = "Full name is required";
    if (!values.email.trim()) nextErrors.email = "Email is required";
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
        body: JSON.stringify(form),
      });
      if (!response.ok) throw new Error("Request failed");
      setStatus("success");
      setForm(initialState);
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <Input
        label="Full Name"
        id="fullName"
        name="fullName"
        value={form.fullName}
        onChange={(e) => setForm({ ...form, fullName: e.target.value })}
        error={errors.fullName}
      />
      <Input
        label="Email"
        id="email"
        name="email"
        type="email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        error={errors.email}
      />
      <Input
        label="Phone / WhatsApp"
        id="phone"
        name="phone"
        value={form.phone}
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
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
      />
      <Button type="submit" variant="primary" disabled={status === "submitting"}>
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
