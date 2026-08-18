import { render, screen, fireEvent, waitFor, within } from "@testing-library/react";
import { describe, it, expect, vi, afterEach } from "vitest";
import { GalleryView } from "./GalleryView";
import type { AdminGalleryImage } from "@/content/admin/gallery";

const categories: { id: "residential" | "interior" | "lifestyle" | "maps"; label: string }[] = [
  { id: "residential", label: "Residential" },
  { id: "interior", label: "Interior" },
];

const sampleImage: AdminGalleryImage = {
  id: "1",
  src: "/images/gallery/residential/sunset-view.jpg",
  name: "Sunset View",
  category: "residential",
  width: 1600,
  height: 1200,
  status: "active",
};

describe("GalleryView status toggle", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("optimistically toggles status and persists it via PATCH", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal("fetch", fetchMock);

    render(<GalleryView initialImages={[sampleImage]} categories={categories} />);
    fireEvent.click(within(screen.getByRole("table")).getByText("Active"));

    await waitFor(() =>
      expect(fetchMock).toHaveBeenCalledWith(
        "/api/admin/gallery/1",
        expect.objectContaining({ method: "PATCH" })
      )
    );
    const [, requestInit] = fetchMock.mock.calls[0];
    expect(JSON.parse(requestInit.body as string)).toEqual({ status: "inactive" });
  });

  it("reverts the status when the PATCH request fails", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: false });
    vi.stubGlobal("fetch", fetchMock);

    render(<GalleryView initialImages={[sampleImage]} categories={categories} />);
    fireEvent.click(within(screen.getByRole("table")).getByText("Active"));

    await waitFor(() => expect(fetchMock).toHaveBeenCalled());
    await waitFor(() => {
      expect(within(screen.getByRole("table")).getByText("Active")).toBeInTheDocument();
    });
  });
});

describe("GalleryView upload", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("opens the upload modal and adds the returned image to the list on success", async () => {
    const createdImage: AdminGalleryImage = {
      id: "2",
      src: "/images/gallery/residential/new-photo.jpg",
      name: "New Photo",
      category: "residential",
      width: 1200,
      height: 900,
      status: "active",
    };
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, json: async () => createdImage });
    vi.stubGlobal("fetch", fetchMock);

    render(<GalleryView initialImages={[sampleImage]} categories={categories} />);
    fireEvent.click(screen.getByRole("button", { name: "Upload image" }));

    const file = new File(["fake"], "new-photo.jpg", { type: "image/jpeg" });
    fireEvent.change(screen.getByLabelText("Image file"), { target: { files: [file] } });
    fireEvent.click(screen.getByRole("button", { name: "Upload" }));

    await waitFor(() =>
      expect(fetchMock).toHaveBeenCalledWith("/api/admin/gallery", expect.objectContaining({ method: "POST" }))
    );
    expect(await within(screen.getByRole("table")).findByText("New Photo")).toBeInTheDocument();
  });
});
