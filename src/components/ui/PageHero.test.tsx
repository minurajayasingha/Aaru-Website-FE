import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { PageHero } from "@/components/ui/PageHero";

describe("PageHero", () => {
  it("renders the title as an h1", () => {
    render(<PageHero title="Gallery" imageSrc="/images/hero/gallery.jpg" imageAlt="Alt text" />);
    expect(screen.getByRole("heading", { level: 1, name: "Gallery" })).toBeInTheDocument();
  });

  it("renders the subtitle when provided", () => {
    render(
      <PageHero
        title="Gallery"
        subtitle="Discover Aaru through stunning visual stories"
        imageSrc="/images/hero/gallery.png"
        imageAlt="Alt text"
      />,
    );
    expect(screen.getByText("Discover Aaru through stunning visual stories")).toBeInTheDocument();
  });

  it("does not render a subtitle element when omitted", () => {
    const { container } = render(
      <PageHero title="Gallery" imageSrc="/images/hero/gallery.png" imageAlt="Alt text" />,
    );
    expect(container.querySelector("p")).not.toBeInTheDocument();
  });

  it("renders the image with the correct alt text", () => {
    render(<PageHero title="Gallery" imageSrc="/images/hero/gallery.png" imageAlt="Alt text" />);
    expect(screen.getByAltText("Alt text")).toBeInTheDocument();
  });

  it("applies the h-[50vh] class when height is sm", () => {
    const { container } = render(
      <PageHero title="Gallery" imageSrc="/images/hero/gallery.png" imageAlt="Alt text" height="sm" />,
    );
    expect(container.querySelector("section")).toHaveClass("h-[50vh]");
  });

  it("applies the h-[60vh] class when height is md", () => {
    const { container } = render(
      <PageHero title="Gallery" imageSrc="/images/hero/gallery.png" imageAlt="Alt text" height="md" />,
    );
    expect(container.querySelector("section")).toHaveClass("h-[60vh]");
  });

  it("applies the h-[75vh] class when height is lg", () => {
    const { container } = render(
      <PageHero title="Gallery" imageSrc="/images/hero/gallery.png" imageAlt="Alt text" height="lg" />,
    );
    expect(container.querySelector("section")).toHaveClass("h-[75vh]");
  });

  it("defaults to the h-[60vh] class when height is omitted", () => {
    const { container } = render(
      <PageHero title="Gallery" imageSrc="/images/hero/gallery.png" imageAlt="Alt text" />,
    );
    expect(container.querySelector("section")).toHaveClass("h-[60vh]");
  });
});
