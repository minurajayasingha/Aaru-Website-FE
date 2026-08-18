import { render, screen, fireEvent, waitFor, within } from "@testing-library/react";
import { describe, it, expect, vi, afterEach } from "vitest";
import { InquiriesView } from "./InquiriesView";
import type { AdminInquiry } from "@/content/admin/inquiries";

const { refresh } = vi.hoisted(() => ({ refresh: vi.fn() }));

vi.mock("next/navigation", () => ({
  useSearchParams: () => new URLSearchParams(),
  useRouter: () => ({ refresh }),
}));

const sampleInquiry: AdminInquiry = {
  id: "1",
  name: "Jane Doe",
  email: "jane@example.com",
  message: "Interested in a garden condo.",
  submittedAt: "2026-08-01",
  status: "new",
};

describe("InquiriesView status updates", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    refresh.mockClear();
  });

  it("optimistically updates status and persists it via PATCH", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal("fetch", fetchMock);

    render(<InquiriesView initialInquiries={[sampleInquiry]} />);
    fireEvent.click(within(screen.getByRole("table")).getByText("Jane Doe"));
    // Two "In progress" buttons exist: the TabBar filter tab (rendered first)
    // and the modal's status option (rendered last) — the modal's is always last in DOM order.
    const inProgressButtons = screen.getAllByRole("button", { name: "In progress" });
    fireEvent.click(inProgressButtons[inProgressButtons.length - 1]);

    await waitFor(() =>
      expect(fetchMock).toHaveBeenCalledWith(
        "/api/admin/inquiries/1",
        expect.objectContaining({ method: "PATCH" })
      )
    );
    const [, requestInit] = fetchMock.mock.calls[0];
    expect(JSON.parse(requestInit.body as string)).toEqual({ status: "in-progress" });
  });

  it("refreshes the router after a successful status change, so the notification bell updates", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal("fetch", fetchMock);

    render(<InquiriesView initialInquiries={[sampleInquiry]} />);
    fireEvent.click(within(screen.getByRole("table")).getByText("Jane Doe"));
    const inProgressButtons = screen.getAllByRole("button", { name: "In progress" });
    fireEvent.click(inProgressButtons[inProgressButtons.length - 1]);

    await waitFor(() => expect(refresh).toHaveBeenCalled());
  });

  it("reverts the status in the table when the PATCH request fails", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: false });
    vi.stubGlobal("fetch", fetchMock);

    render(<InquiriesView initialInquiries={[sampleInquiry]} />);
    fireEvent.click(within(screen.getByRole("table")).getByText("Jane Doe"));
    const inProgressButtons = screen.getAllByRole("button", { name: "In progress" });
    fireEvent.click(inProgressButtons[inProgressButtons.length - 1]);

    await waitFor(() => expect(fetchMock).toHaveBeenCalled());
    await waitFor(() => {
      expect(within(screen.getByRole("table")).getByText("New")).toBeInTheDocument();
    });
    expect(refresh).not.toHaveBeenCalled();
  });
});
