import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, afterEach } from "vitest";
import { ResidenceLayoutCard } from "./ResidenceLayoutCard";
import type { AdminResidence } from "@/content/admin/residences";

const sampleResidence: AdminResidence = {
  slug: "private-villas",
  name: "Private Villas",
  unitsAvailableLabel: "3 Units",
  sizeLabel: "5,700+ sqft",
  priceLabel: "1,734,000 USD",
  layoutImages: [
    { id: 1, src: "/images/residences/private-villas/layout-1.png", alt: "Private Villas unit layout plan" },
    { id: 2, src: "/images/residences/private-villas/layout-2.png", alt: "Private Villas unit layout, alternate view" },
  ],
};

describe("ResidenceLayoutCard stat editing", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("optimistically updates a stat and persists it via PATCH", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal("fetch", fetchMock);

    render(<ResidenceLayoutCard residence={sampleResidence} />);
    fireEvent.click(screen.getByText("3 Units"));
    const input = screen.getByDisplayValue("3 Units");
    fireEvent.change(input, { target: { value: "2 Units" } });
    fireEvent.keyDown(input, { key: "Enter" });

    await waitFor(() =>
      expect(fetchMock).toHaveBeenCalledWith(
        "/api/admin/residences/private-villas",
        expect.objectContaining({ method: "PATCH" })
      )
    );
    const [, requestInit] = fetchMock.mock.calls[0];
    expect(JSON.parse(requestInit.body as string)).toEqual({ unitsAvailableLabel: "2 Units" });
    expect(screen.getByText("2 Units")).toBeInTheDocument();
  });

  it("reverts the stat when the PATCH request fails", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: false });
    vi.stubGlobal("fetch", fetchMock);

    render(<ResidenceLayoutCard residence={sampleResidence} />);
    fireEvent.click(screen.getByText("3 Units"));
    const input = screen.getByDisplayValue("3 Units");
    fireEvent.change(input, { target: { value: "2 Units" } });
    fireEvent.keyDown(input, { key: "Enter" });

    await waitFor(() => expect(fetchMock).toHaveBeenCalled());
    await waitFor(() => {
      expect(screen.getByText("3 Units")).toBeInTheDocument();
    });
  });
});

describe("ResidenceLayoutCard image replace", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("replaces an image and persists it via POST", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ id: 1, src: "/images/residences/private-villas/layout.jpg", width: 800, height: 600 }),
    });
    vi.stubGlobal("fetch", fetchMock);

    render(<ResidenceLayoutCard residence={sampleResidence} />);
    const file = new File(["fake"], "new-layout.jpg", { type: "image/jpeg" });
    const fileInput = screen.getByLabelText("Replace Private Villas unit layout plan");
    fireEvent.change(fileInput, { target: { files: [file] } });

    await waitFor(() =>
      expect(fetchMock).toHaveBeenCalledWith(
        "/api/admin/residences/layout-images/1/replace",
        expect.objectContaining({ method: "POST" })
      )
    );
  });
});
