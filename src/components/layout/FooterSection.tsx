import { CtaBannerGate } from "./CtaBannerGate";
import { Footer } from "./Footer";

interface FooterSectionProps {
  contactPhone: string;
  contactEmail: string;
}

export function FooterSection({ contactPhone, contactEmail }: FooterSectionProps) {
  return (
    <div>
      <CtaBannerGate />
      <Footer contactPhone={contactPhone} contactEmail={contactEmail} />
    </div>
  );
}
