import type { Metadata } from "next";
import Image from "next/image";
import { buildMetadata } from "@/lib/metadata";
import { siteConfig } from "@/content/site";
import { ContactForm } from "@/components/contact/ContactForm";
import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";

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

      <Reveal
        as="section"
        once={false}
        className="mx-auto grid gap-10 py-16 grid-cols-1 md:grid-cols-1 justify-center items-center px-section-x"
      >
        <div className="flex flex-col gap-6 justify-center items-center">
          <h2 className="font-heading font-light text-h-02 md:text-h-01 text-black text-center">Register Your Interest</h2>
          <p className="font-body text-para-sm font-light text-brand-forest-700 md:w-7/12 text-center pb-8">
            We’re here to help you find the perfect property or space. Share your details and our team  will get in touch to assist you with your enquiry.
          </p>
          <ContactForm />
        </div>
      </Reveal>
      <Reveal
        as="section"
        once={false}
        className="mx-auto grid gap-10 py-16 grid-cols-1 md:grid-cols-1 justify-center items-center px-section-x bg-white"
      >
        <h2 className="font-heading font-light text-h-02 md:text-h-01 text-black text-left md:pl-16">Contact Information</h2>
        <div className="flex flex-col md:flex-row gap-10 pt-1 md:items-center md:gap-1">
          <div className="flex flex-col items-start gap-6 text-center md:items-start md:text-left w-full md:w-3/6 md:pl-16">
            <div className="flex flex-col gap-4">
              <p className="font-heading font-light text-h-03 text-brand-forest-700">Sales Enquiries</p>
              <div className="flex items-center gap-3">
                <Image src="/images/icons/black-email.svg" alt="" width={18} height={18} />
                <p className="font-body font-thin text-brand-forest-900">{siteConfig.contactEmail}</p>
              </div>
              <div className="flex items-center gap-3">
                <Image src="/images/icons/black-whatsapp.svg" alt="" width={18} height={18} />
                <p className="font-body font-thin text-brand-forest-900">{siteConfig.contactPhone}</p>
              </div>
            </div>
            <Button href={`https://wa.me/${siteConfig.contactPhone.replace(/\s|\+/g, "")}`} variant="primary" className="w-fit">
              WhatsApp
            </Button>
          </div>
          <div className="relative aspect-[4/3]  overflow-hidden rounded-card w-full md:w-3/6">
            <Image
              src="/images/contact/map.png"
              alt="Map showing Aaru Living's location in Arugam Bay, Sri Lanka"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain"
            />
          </div>
        </div>
      </Reveal>
    </>
  );
}
