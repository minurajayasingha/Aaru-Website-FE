import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { WhoLeadsSection } from "@/components/about/WhoLeadsSection";
import { StoryProfileSection } from "@/components/about/StoryProfileSection";
import { PartnersSection } from "@/components/about/PartnersSection";
import { OtherPartiesSection } from "@/components/about/OtherPartiesSection";

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
        title="Who"
        titleAccent="Leads"
        paragraph="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
        imageSrc="/images/about/team.png"
        imageAlt="Aaru Living's leadership team"
        members={[
          { name: "Name Surname", position: { x: 31, y: 6 } },
          { name: "Name Surname", position: { x: 50, y: 24 } },
          { name: "Name Surname", position: { x: 70, y: 6 } },
        ]}
      />

      <StoryProfileSection
        eyebrow="The Story Of"
        title="Architect"
        paragraph="Aaru is designed by UJ Architects, a Colombo-based design studio founded in 2010 by Chartered Architect Udaya Jayasekera. Over the past decade, the practice has built a portfolio spanning residences, hospitality, institutional and mixed-use work across Sri Lanka from private homes to landmark high-rise developments such as Proxima, a 40-storey mixed-use tower on the Port City Colombo skyline.
                   <br> UJ Architects works from a simple conviction: the quality of a space shapes the quality of a life. Their approach, rooted in what they call the ' elegance of simplicity ' favours restraint over spectacle buildings that are functional first, and beautiful because of it. It's a philosophy that finds a natural home at Aaru, where the same instinct shows up in the low-rise silhouette that defers to the horizon, and in materials chosen to weather honestly alongside the lagoon they sit beside. The result is architecture that doesn't compete with Arugam Bay's landscape, but completes it."
        ctaLabel="Contact Us"
        ctaHref="/contact"
        imageSrc="/images/about/architect.jpg"
        imageAlt="Aaru Living's lead architect"
        imagePosition="left"
      />

      <PartnersSection
        partner={{
          name: "Perigon Lanka",
          paragraphs: [
            "Aaru's delivery is overseen by Perigon Lanka, a Colombo-based engineering, cost and project management consultancy established in 1999. The firm is led by a board of Chartered Engineers and an Architect, headed by Managing Director Hussein Fazleabas a Chartered Engineer with over 38 years of civil and structural engineering experience across Sri Lanka, the USA, India, the Maldives and East Africa alongside Raj Christopher Loganathan, Director of Engineering, with over 45 years as a Chartered Civil Engineer and Project Manager. Perigon Lanka is affiliated with Perigon Engineering Inc. in the United States.",
            "Over more than two decades, Perigon Lanka has built a niche in hospitality project management across Sri Lanka and the Maldives, with a portfolio that includes Cape Weligama Resort, Ceylon Tea Trails, Wild Coast Tented Lodge, Amanwella, Hilton Colombo, Cheval Blanc Randheli and W Maldives alongside major commercial and institutional work such as Colombo City Center and multiple developments for SLIIT. It's this depth of experience delivering luxury coastal resorts to international standard that underpins the execution of Aaru, from cost control and contractor selection through to final handover.",
          ],
          logoSrc: "/images/about/partners/perigon-lanka.png",
          logoAlt: "Perigon Lanka logo",
        }}
      />

      {/*<OtherPartiesSection
        title="Other Parties"
        items={Array.from({ length: 8 }, () => ({ headline: "Headline", name: "Company Name" }))}
      />*/}
    </>
  );
}
