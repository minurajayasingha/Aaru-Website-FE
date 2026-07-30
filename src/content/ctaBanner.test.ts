import { describe, it, expect } from "vitest";
import { getCtaBannerContent, defaultCtaBanner, ctaBannerByRoute } from "./ctaBanner";

describe("getCtaBannerContent", () => {
  it("returns the default content for a route with no override", () => {
    expect(getCtaBannerContent("/some-unlisted-page")).toEqual(defaultCtaBanner);
  });

  it("returns an overridden route's content for an exact path match", () => {
    ctaBannerByRoute["/test-route"] = {
      imageSrc: "/images/cta/test.png",
      imageAlt: "Test",
      heading: "Test Heading",
      paragraph: "Test paragraph.",
    };

    expect(getCtaBannerContent("/test-route")).toEqual(ctaBannerByRoute["/test-route"]);
    delete ctaBannerByRoute["/test-route"];
  });

  it("returns an overridden route's content for a nested sub-path", () => {
    ctaBannerByRoute["/test-route"] = {
      imageSrc: "/images/cta/test.png",
      imageAlt: "Test",
      heading: "Test Heading",
      paragraph: "Test paragraph.",
    };

    expect(getCtaBannerContent("/test-route/child")).toEqual(ctaBannerByRoute["/test-route"]);
    delete ctaBannerByRoute["/test-route"];
  });

  it("gives each residence detail page its own image instead of the generic /residences one", () => {
    expect(getCtaBannerContent("/residences/garden-condos").imageSrc).toBe(
      "/images/cta/residences-garden-condos.png",
    );
    expect(getCtaBannerContent("/residences/condos").imageSrc).toBe(
      "/images/cta/residences-condos.png",
    );
    expect(getCtaBannerContent("/residences/private-villas").imageSrc).toBe(
      "/images/cta/residences-private-villas.png",
    );
    expect(getCtaBannerContent("/residences").imageSrc).toBe("/images/cta/residences.png");
  });
});
