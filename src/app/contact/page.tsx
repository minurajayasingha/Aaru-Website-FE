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
        imageSrc="/images/hero/contact.png" 
        imageAlt="Aaru's residences along the coastline at sunset"
        height="lg"
      />

      <section className="mx-auto grid gap-10 px-6 py-16 grid-cols-1 md:grid-cols-1 justify-center items-center">
        <div className="flex flex-col gap-6 justify-center items-center">
          <h2 className="font-heading font-normal text-h-02 md:text-h-02 text-black text-center">Register Your Interest</h2>
          <p className="font-body text-para-sm font-light text-brand-forest-700 md:w-7/12 text-center pb-8">
We’re here to help you find the perfect property or space. Share your details and our team  will get in touch to assist you with your enquiry.
        </p>
          <ContactForm />
        </div>
        <div className="flex flex-col gap-6 ">
          <h2 className="font-heading font-bold text-heading-sm text-black">Contact Information</h2>
          <p className="font-body text-para-lg text-brand-forest-700">Sales Enquiries</p>
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
