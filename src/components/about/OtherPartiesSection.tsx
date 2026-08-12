import { Reveal } from "@/components/ui/Reveal";
import { Container } from "@/components/ui/Container";

export type OtherPartyEntry = {
  headline: string;
  name: string;
};

type OtherPartiesSectionProps = {
  title: string;
  items: OtherPartyEntry[];
};

export function OtherPartiesSection({ title, items }: OtherPartiesSectionProps) {
  return (
    <Reveal as="section" className="bg-white py-16">
      <Container>
        <h2 className="mb-6 font-heading font-light text-h-02 text-black">{title}</h2>
        <p className="font-body text-para-sm font-light leading-loose text-brand-forest-700">
          {items.map((item, index) => (
            <span key={index}>
              {item.headline} <span className="font-semibold text-black">{item.name}</span>
              {index < items.length - 1 && <span className="mx-2 text-brand-forest-300">.</span>}
            </span>
          ))}
        </p>
      </Container>
    </Reveal>
  );
}
