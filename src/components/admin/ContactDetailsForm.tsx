"use client";

import { useState } from "react";
import { Card } from "./ui/Card";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";

interface ContactDetailsFormProps {
  initialPhone: string;
  initialEmail: string;
}

export function ContactDetailsForm({ initialPhone, initialEmail }: ContactDetailsFormProps) {
  const [phone, setPhone] = useState(initialPhone);
  const [email, setEmail] = useState(initialEmail);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setStatus("saving");
    setError(null);

    try {
      const response = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contactPhone: phone, contactEmail: email }),
      });

      if (!response.ok) {
        const body = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(body?.error ?? "Something went wrong. Please try again.");
      }

      setStatus("saved");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  return (
    <Card className="max-w-md">
      <h3 className="text-base font-semibold text-brand-forest-900">Contact details</h3>
      <p className="mt-1 text-sm text-brand-forest-400">Phone number and email shown across the public site.</p>

      <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-4">
        <Input
          label="Phone number"
          id="contact-phone"
          name="contact-phone"
          type="tel"
          value={phone}
          onChange={(event) => {
            setPhone(event.target.value);
            setStatus("idle");
          }}
          placeholder="+94 77 018 3334"
          required
        />
        <Input
          label="Email"
          id="contact-email"
          name="contact-email"
          type="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            setStatus("idle");
          }}
          placeholder="sales@aaruliving.com"
          required
        />

        <div className="mt-2 flex items-center gap-3">
          <Button type="submit" disabled={status === "saving"}>
            {status === "saving" ? "Saving..." : "Save changes"}
          </Button>
          {status === "saved" && <span className="text-sm font-medium text-brand-forest-600">Saved</span>}
          {status === "error" && <span className="text-sm font-medium text-red-600">{error}</span>}
        </div>
      </form>
    </Card>
  );
}
