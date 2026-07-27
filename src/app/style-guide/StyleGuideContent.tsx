"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { Badge } from "@/components/ui/Badge";
import { Tabs } from "@/components/ui/Tabs";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { ResidenceCard } from "@/components/ui/ResidenceCard";
import { Reveal } from "@/components/ui/Reveal";
import { residences } from "@/content/residences";

const forestShades: Array<{ token: string; className: string; hex: string }> = [
  { token: "forest.50", className: "bg-brand-forest-50", hex: "#eef2f0" },
  { token: "forest.100", className: "bg-brand-forest-100", hex: "#d7e0da" },
  { token: "forest.200", className: "bg-brand-forest-200", hex: "#aec1b5" },
  { token: "forest.300", className: "bg-brand-forest-300", hex: "#84a290" },
  { token: "forest.400", className: "bg-brand-forest-400", hex: "#5c826b" },
  { token: "forest.500", className: "bg-brand-forest-500", hex: "#3c5c46" },
  { token: "forest.600", className: "bg-brand-forest-600", hex: "#2b4834" },
  { token: "forest.700", className: "bg-brand-forest-700", hex: "#1c3524" },
  { token: "forest.800", className: "bg-brand-forest-800", hex: "#122a1c" },
  { token: "forest.900", className: "bg-brand-forest-900", hex: "#173329" },
];

const otherSwatches: Array<{ token: string; className: string; hex: string }> = [
  { token: "cream", className: "bg-brand-cream", hex: "#f4f2ee" },
  { token: "cream-dark", className: "bg-brand-cream-dark", hex: "#e9e4d8" },
  { token: "gold", className: "bg-brand-gold", hex: "#b5915d" },
  { token: "gold-light", className: "bg-brand-gold-light", hex: "#d4b483" },
];

const spacingScale: Array<{ token: string; className: string; rem: string }> = [
  { token: "18", className: "w-18 h-18", rem: "4.5rem" },
  { token: "22", className: "w-22 h-22", rem: "5.5rem" },
  { token: "30", className: "w-30 h-30", rem: "7.5rem" },
];

const radiusScale: Array<{ token: string; className: string; rem: string }> = [
  { token: "button", className: "rounded-button", rem: "0.375rem" },
  { token: "input", className: "rounded-input", rem: "0.375rem" },
  { token: "card", className: "rounded-card", rem: "0.75rem" },
];

const shadowScale: Array<{ token: string; className: string; value: string }> = [
  {
    token: "shadow-card",
    className: "shadow-card",
    value: "0 4px 24px 0 rgba(11, 32, 22, 0.08)",
  },
];

const sampleResidence = residences[0];

function Swatch({ token, className, hex }: { token: string; className: string; hex: string }) {
  return (
    <div className="flex flex-col gap-2">
      <div className={`h-16 w-full rounded-input border border-brand-forest-200 ${className}`} />
      <p className="font-body text-xs text-brand-forest-900">{token}</p>
      <p className="font-body text-xs text-brand-forest-700">{hex}</p>
    </div>
  );
}

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mx-auto max-w-7xl border-t border-brand-forest-100 px-6 py-16">
      <h2 className="mb-8 font-heading font-bold text-heading-sm text-black">{title}</h2>
      {children}
    </section>
  );
}

export function StyleGuideContent() {
  const [inputValue, setInputValue] = useState("");
  const [textareaValue, setTextareaValue] = useState("");
  const [selectValue, setSelectValue] = useState("garden-condos");
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <>
      <section className="bg-brand-forest-900 px-6 py-16 text-center text-brand-cream">
        <h1 className="font-heading text-h-02 md:text-h-02">Style Guide</h1>
        <p className="mx-auto mt-4 max-w-2xl font-body text-brand-cream/80">
          Internal design-system reference for the Aaru Living site. Not linked from navigation and
          excluded from search indexing.
        </p>
      </section>

      <Section id="colors" title="Colors">
        <p className="mb-4 font-body text-sm text-brand-forest-700">brand.forest.50 – 900</p>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
          {forestShades.map((s) => (
            <Swatch key={s.token} {...s} />
          ))}
        </div>
        <p className="mb-4 mt-10 font-body text-sm text-brand-forest-700">cream / gold</p>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {otherSwatches.map((s) => (
            <Swatch key={s.token} {...s} />
          ))}
        </div>
      </Section>

      <Section id="typography" title="Typography">
        <p className="mb-6 font-body text-sm text-brand-forest-700">
          Three font roles. Change the actual typeface for any role in one place —
          <code className="mx-1 rounded bg-brand-forest-50 px-1.5 py-0.5 text-xs">src/app/layout.tsx</code>
          (which Google Font loads into each CSS variable) — and every element using that role's class updates
          automatically. Sizes work the same way: change a
          <code className="mx-1 rounded bg-brand-forest-50 px-1.5 py-0.5 text-xs">tailwind.config.ts</code>
          fontSize value once and every <code className="rounded bg-brand-forest-50 px-1 py-0.5 text-xs">sm</code>/
          <code className="rounded bg-brand-forest-50 px-1 py-0.5 text-xs">md</code>/
          <code className="rounded bg-brand-forest-50 px-1 py-0.5 text-xs">lg</code> usage of that size updates too.
        </p>
        <div className="flex flex-col gap-8">
          <div>
            <span className="font-subheading text-subh-02 uppercase text-brand-gold">
              A New Standard For
            </span>
            <p className="mt-1 font-body text-xs text-brand-forest-700">
              font-subheading — Marcellus SC — eyebrow / label text above a heading
            </p>
          </div>
          <p className="font-body text-xs text-brand-forest-700">
            Headings are always font-bold and text-black (never the brand green) on light backgrounds — use a light
            color (e.g. text-brand-cream) only when a heading sits on a dark/photo background.
          </p>
          <div className="flex flex-col gap-3">
            <div>
              <p className="font-heading font-bold text-heading-sm text-black">Arugam Bay</p>
              <p className="mt-1 font-body text-xs text-brand-forest-700">
                font-heading font-bold text-black — Fraunces — text-heading-sm
              </p>
            </div>
            <div>
              <p className="font-heading font-bold text-h-02 text-black">Arugam Bay</p>
              <p className="mt-1 font-body text-xs text-brand-forest-700">
                font-heading font-bold text-black — Fraunces — text-h-02
              </p>
            </div>
            <div>
              <p className="font-heading font-bold text-h-02 text-black">Arugam Bay</p>
              <p className="mt-1 font-body text-xs text-brand-forest-700">
                font-heading font-bold text-black — Fraunces — text-h-02
              </p>
            </div>
          </div>
          <div>
            <p className="font-body text-base text-brand-forest-900">
              Body text — Inter — class: font-body. Aaru Living residences are set among lagoon gardens in
              Arugam Bay.
            </p>
            <p className="mt-1 font-body text-xs text-brand-forest-700">Paragraph — Inter — class: font-body text-base</p>
          </div>
          <div>
            <p className="font-body text-sm text-brand-forest-700">
              Small / caption text — Inter — class: font-body text-sm.
            </p>
            <p className="mt-1 font-body text-xs text-brand-forest-700">Caption — Inter — class: font-body text-sm</p>
          </div>
        </div>
      </Section>

      <Section id="font-weight" title="Font Weight">
        <p className="mb-6 font-body text-sm text-brand-forest-700">
          Three weights, usable on any font role: <code className="rounded bg-brand-forest-50 px-1 py-0.5 text-xs">font-thin</code> (200),{" "}
          <code className="rounded bg-brand-forest-50 px-1 py-0.5 text-xs">font-normal</code> (400),{" "}
          <code className="rounded bg-brand-forest-50 px-1 py-0.5 text-xs">font-bold</code> (700) — mix and match with any{" "}
          <code className="rounded bg-brand-forest-50 px-1 py-0.5 text-xs">font-heading</code> /{" "}
          <code className="rounded bg-brand-forest-50 px-1 py-0.5 text-xs">font-subheading</code> /{" "}
          <code className="rounded bg-brand-forest-50 px-1 py-0.5 text-xs">font-body</code> class, e.g. a bold heading
          above a thin paragraph, or the reverse. Note: Marcellus SC (font-subheading) only ships one weight from
          Google — font-thin / font-bold have no visible effect on it, only on font-heading (Fraunces) and font-body
          (Inter).
        </p>
        <div className="flex flex-col gap-6">
          <div>
            <p className="font-heading font-thin text-heading-sm text-brand-forest-900">Arugam Bay</p>
            <p className="mt-1 font-body text-xs text-brand-forest-700">font-heading font-thin (200)</p>
          </div>
          <div>
            <p className="font-heading font-normal text-heading-sm text-brand-forest-900">Arugam Bay</p>
            <p className="mt-1 font-body text-xs text-brand-forest-700">font-heading font-normal (400)</p>
          </div>
          <div>
            <p className="font-heading font-bold text-heading-sm text-brand-forest-900">Arugam Bay</p>
            <p className="mt-1 font-body text-xs text-brand-forest-700">font-heading font-bold (700)</p>
          </div>
          <div>
            <p className="font-body font-thin text-brand-forest-900">
              Body text at font-thin (200) — Aaru Living residences are set among lagoon gardens in Arugam Bay.
            </p>
            <p className="mt-1 font-body text-xs text-brand-forest-700">font-body font-thin (200)</p>
          </div>
          <div>
            <p className="font-body font-normal text-brand-forest-900">
              Body text at font-normal (400) — Aaru Living residences are set among lagoon gardens in Arugam Bay.
            </p>
            <p className="mt-1 font-body text-xs text-brand-forest-700">font-body font-normal (400)</p>
          </div>
          <div>
            <p className="font-body font-bold text-brand-forest-900">
              Body text at font-bold (700) — Aaru Living residences are set among lagoon gardens in Arugam Bay.
            </p>
            <p className="mt-1 font-body text-xs text-brand-forest-700">font-body font-bold (700)</p>
          </div>
        </div>
      </Section>

      <Section id="spacing-radius" title="Spacing & Radius">
        <p className="mb-4 font-body text-sm text-brand-forest-700">Spacing scale</p>
        <div className="mb-10 flex flex-wrap items-end gap-6">
          {spacingScale.map((s) => (
            <div key={s.token} className="flex flex-col items-center gap-2">
              <div className={`${s.className} rounded bg-brand-forest-200`} />
              <p className="font-body text-xs text-brand-forest-700">
                {s.token} ({s.rem})
              </p>
            </div>
          ))}
        </div>
        <p className="mb-4 font-body text-sm text-brand-forest-700">Border radius scale</p>
        <div className="flex flex-wrap items-end gap-6">
          {radiusScale.map((r) => (
            <div key={r.token} className="flex flex-col items-center gap-2">
              <div className={`h-16 w-16 bg-brand-forest-200 ${r.className}`} />
              <p className="font-body text-xs text-brand-forest-700">
                {r.token} ({r.rem})
              </p>
            </div>
          ))}
        </div>
        <p className="mb-4 mt-10 font-body text-sm text-brand-forest-700">Shadows</p>
        <div className="flex flex-wrap items-end gap-6">
          {shadowScale.map((s) => (
            <div key={s.token} className="flex flex-col items-center gap-2">
              <div className={`h-24 w-24 rounded-card bg-white ${s.className}`} />
              <p className="font-body text-xs text-brand-forest-700">{s.token}</p>
              <p className="font-body text-xs text-brand-forest-700">{s.value}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="buttons" title="Buttons">
        <div className="flex flex-col gap-8">
          {(["primary", "secondary", "ghost"] as const).map((variant) => (
            <div key={variant} className="flex flex-col gap-3">
              <p className="font-body text-xs uppercase tracking-widest text-brand-forest-700">
                {variant}
              </p>
              <div className="flex flex-wrap items-center gap-4">
                {(["sm", "md", "lg"] as const).map((size) => (
                  <Button key={size} variant={variant} size={size}>
                    Button {size}
                  </Button>
                ))}
                <Button variant={variant} disabled>
                  Disabled
                </Button>
                <Button variant={variant} href="/style-guide">
                  As Link
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section id="form-fields" title="Form Fields">
        <div className="grid max-w-2xl gap-6">
          <Input
            label="Full Name"
            id="sg-name"
            name="name"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <Input
            label="Email"
            id="sg-email"
            name="email"
            value=""
            onChange={() => {}}
            error="Email is required"
          />
          <Textarea
            label="Message"
            id="sg-message"
            name="message"
            value={textareaValue}
            onChange={(e) => setTextareaValue(e.target.value)}
          />
          <Textarea
            label="Message (error)"
            id="sg-message-error"
            name="message-error"
            value=""
            onChange={() => {}}
            error="Message is required"
          />
          <Select
            label="Interested In"
            id="sg-interest"
            name="interest"
            value={selectValue}
            onChange={(e) => setSelectValue(e.target.value)}
            options={[
              { value: "garden-condos", label: "Garden Condos" },
              { value: "elevated-condos", label: "Elevated Condos" },
              { value: "private-villas", label: "Private Villas" },
            ]}
          />
          <Select
            label="Interested In (error)"
            id="sg-interest-error"
            name="interest-error"
            value=""
            onChange={() => {}}
            options={[{ value: "garden-condos", label: "Garden Condos" }]}
            error="Please select an option"
          />
        </div>
      </Section>

      <Section id="badges-tabs" title="Badges & Tabs">
        <div className="mb-10 flex flex-wrap gap-3">
          <Badge>3 Unit</Badge>
          <Badge>16 Unit</Badge>
          <Badge className="bg-brand-gold text-brand-forest-900">Custom Class</Badge>
        </div>
        <div className="rounded-card bg-brand-forest-900 p-6">
          <Tabs
            tabs={[
              { id: "overview", label: "Overview" },
              { id: "amenities", label: "Amenities" },
              { id: "gallery", label: "Gallery" },
            ]}
            activeId={activeTab}
            onChange={setActiveTab}
          />
        </div>
      </Section>

      <Section id="section-headers" title="Section Header">
        <div className="mb-12">
          <p className="mb-2 font-body text-xs uppercase tracking-widest text-brand-forest-700">
            level=&quot;h1&quot;
          </p>
          <SectionHeader
            level="h1"
            eyebrow="Eyebrow Label"
            title="H1 Section Header Example"
            description="This is the h1-level SectionHeader used for page hero titles."
          />
        </div>
        <div>
          <p className="mb-2 font-body text-xs uppercase tracking-widest text-brand-forest-700">
            level=&quot;h2&quot;
          </p>
          <SectionHeader
            level="h2"
            eyebrow="Eyebrow Label"
            title="H2 Section Header Example"
            description="This is the h2-level SectionHeader used for in-page section titles."
          />
        </div>
      </Section>

      <Section id="cards" title="Cards">
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <p className="mb-3 font-body text-xs uppercase tracking-widest text-brand-forest-700">
              Card (generic)
            </p>
            <Card className="p-6">
              <p className="font-body text-brand-forest-900">
                Plain Card wrapper with padding, radius, and shadow supplied by children.
              </p>
            </Card>
          </div>
          <div>
            <p className="mb-3 font-body text-xs uppercase tracking-widest text-brand-forest-700">
              ResidenceCard (sample data: {sampleResidence.name})
            </p>
            <ResidenceCard
              slug={sampleResidence.slug}
              name={sampleResidence.name}
              floorLabel={sampleResidence.floorLabel}
              unitBadge={sampleResidence.unitBadge}
              bedroomLabel={sampleResidence.bedroomLabel}
              sizeLabel={sampleResidence.sizeLabel}
              imageSrc={sampleResidence.heroImage.src}
              imageAlt={sampleResidence.heroImage.alt}
            />
          </div>
        </div>
      </Section>

      <Section id="motion" title="Motion">
        <p className="mb-4 font-body text-sm text-brand-forest-700">
          Reveal — scroll into view to see the fade-up animation (scroll this section back out of
          view and back in to replay in a real browser).
        </p>
        <Reveal className="rounded-card bg-brand-forest-50 p-8">
          <p className="font-body text-brand-forest-900">
            This content fades and slides up into view via the shared Reveal component.
          </p>
        </Reveal>
      </Section>
    </>
  );
}
