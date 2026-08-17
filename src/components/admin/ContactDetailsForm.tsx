"use client";

import { useState } from "react";
import { Card } from "./ui/Card";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";
import { siteConfig } from "@/content/site";

export function ContactDetailsForm() {
  const [phone, setPhone] = useState(siteConfig.contactPhone);
  const [email, setEmail] = useState(siteConfig.contactEmail);
  const [isSaved, setIsSaved] = useState(false);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setIsSaved(true);
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
            setIsSaved(false);
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
            setIsSaved(false);
          }}
          placeholder="sales@aaruliving.com"
          required
        />

        <div className="mt-2 flex items-center gap-3">
          <Button type="submit">Save changes</Button>
          {isSaved && <span className="text-sm font-medium text-brand-forest-600">Saved</span>}
        </div>
      </form>
    </Card>
  );
}
