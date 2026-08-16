import type { Metadata } from "next";
import Image from "next/image";
import { buildMetadata } from "@/lib/metadata";
import { siteConfig } from "@/content/site";
import { ContactForm } from "@/components/contact/ContactForm";
import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Container } from "@/components/ui/Container";

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
        mobileImageSrc="/images/hero/mobile/contact.jpg"
        imageAlt="Aaru's residences along the coastline at sunset"
        height="lg"
      />

      <Reveal as="section" once={false} className="pt-16 pb-16">
        <Container className="flex flex-col items-center gap-6 text-center">
          <h2 className="font-heading font-light text-h-02 md:text-h-01 text-black text-center">Register Your Interest</h2>
          <p className="font-body text-para-sm font-light text-brand-forest-700 md:w-7/12 text-center">
            We’re here to help you find the perfect property or space. Share your details and our team  will get in touch to assist you with your enquiry.
          </p>
        </Container>
      </Reveal>

      <Reveal as="section" once={false} className="relative overflow-hidden bg-brand-forest-900 py-16 pb-40">
        <Image
          src="/images/hero/contact-form.jpeg"
          alt=""
          fill
          sizes="100vw"
          className="absolute inset-0 hidden object-cover  scale-105 pointer-events-none md:block"
        />
        <Image
          src="/images/hero/mobile/contact-form.jpeg"
          alt=""
          fill
          sizes="100vw"
          className="absolute inset-0 object-cover  scale-105 pointer-events-none md:hidden"
        />
        {/* Dark shade overlay on top of the background image */}
        <div className="absolute inset-0 bg-black/50 pointer-events-none" />
        <Container className="relative z-10 flex justify-center">
          <ContactForm />
        </Container>
      </Reveal>
      <Reveal as="section" once={false} className="py-16 ">
        <Container className="flex flex-col md:flex-row gap-10 md:gap-16 items-start md:items-center justify-between">
          <div className="flex flex-col items-start justify-center gap-6 w-full md:w-1/2">
            <h2 className="font-heading font-light text-h-02 md:text-h-01 text-black text-left">
              Contact Information
            </h2>
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
          <div className="relative aspect-[4/3] overflow-hidden rounded-card w-full md:w-1/2">
            <Image
              src="/images/contact/map.jpg"
              alt="Map showing Aaru Living's location in Arugam Bay, Sri Lanka"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain"
            />
          </div>
        </Container>
      </Reveal>
    </>
  );
}
