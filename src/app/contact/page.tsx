import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import { siteConfig } from "@/content/site";
import { ContactForm } from "@/components/contact/ContactForm";
import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = buildMetadata({
  title: "Contact Us",
  description: "Connect with Aaru Living for residences, commercial spaces and investment enquiries.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Contact Us"
        subtitle="Connect with Aaru Living for residences, commercial spaces and investment enquiries."
        imageSrc="/images/hero/contact.jpg"
        imageAlt="Aaru's residences along the coastline at sunset"
        height="sm"
      />

      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-24 md:grid-cols-2">
        <div>
          <h2 className="mb-6 font-display text-3xl text-brand-forest-900">Register Your Interest</h2>
          <ContactForm />
        </div>
        <div className="flex flex-col gap-6">
          <h2 className="font-display text-2xl text-brand-forest-900">Contact Information</h2>
          <p className="font-body text-brand-forest-700">Sales Enquiries</p>
          <p className="font-body text-brand-forest-900">{siteConfig.contactEmail}</p>
          <p className="font-body text-brand-forest-900">{siteConfig.contactPhone}</p>
          <Button href={`https://wa.me/${siteConfig.contactPhone.replace(/\s|\+/g, "")}`} variant="primary" className="w-fit">
            WhatsApp
          </Button>
        </div>
      </section>
    </>
  );
}
