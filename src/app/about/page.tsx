import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { WhoLeadsSection } from "@/components/about/WhoLeadsSection";
import { StoryProfileSection } from "@/components/about/StoryProfileSection";
import { PartnersSection } from "@/components/about/PartnersSection";

export const metadata: Metadata = buildMetadata({
  title: "About Us",
  description: "Meet the team and partners behind Aaru Living, Arugam Bay's first luxury residential real estate experience.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", path: "/" }, { name: "About Us", path: "/about" }]} />

      <WhoLeadsSection
        title="Who Leads"
        paragraph="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
        imageSrc="/images/about/team.png"
        imageAlt="Aaru Living's leadership team"
        members={[{ name: "Name Surname" }, { name: "Name Surname" }, { name: "Name Surname" }]}
      />

      <StoryProfileSection
        eyebrow="The Story Of"
        title="Architect"
        paragraph="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since 1966, when designers at Letraset and James Mosley, the librarian at St Bride Printing Library in London, took a 1914 Cicero translation and scrambled it to make dummy text for Letraset's Body Type sheets. It has survived not only many decades, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised thanks to these sheets and more recently with desktop publishing software like Aldus PageMaker and Microsoft Word including versions of Lorem Ipsum."
        ctaLabel="Contact Us"
        ctaHref="/contact"
        imageSrc="/images/about/architect.jpg"
        imageAlt="Aaru Living's lead architect"
        imagePosition="left"
      />

      <PartnersSection
        items={[
          {
            id: "perigon-lanka",
            name: "Perigon Lanka",
            description:
              "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since 1966, when designers at Letraset and James Mosley, the librarian at St Bride Printing ",
            logoSrc: "/images/about/partners/perigon-lanka.svg",
            logoAlt: "Perigon Lanka logo",
          },
          {
            id: "company-name",
            name: "Company Name",
            description:
              "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since 1966, when designers at Letraset and James Mosley, the librarian at St Bride Printing ",
            logoSrc: "/images/about/partners/company-name.svg",
            logoAlt: "Company Name logo",
          },
        ]}
      />
    </>
  );
}
