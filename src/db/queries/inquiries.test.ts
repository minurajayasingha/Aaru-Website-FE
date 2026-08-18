import { describe, it, expect, vi, beforeEach } from "vitest";
import { createInquiry, getAllInquiries, getNewInquiries, updateInquiryStatus } from "./inquiries";
import { getDb } from "../client";

vi.mock("../client");

const sampleInput = {
  firstName: "Jane",
  lastName: "Doe",
  dialCode: "+94",
  phone: "771234567",
  email: "jane@example.com",
  countryOfResidence: "Sri Lanka",
  interestedIn: "garden-condos",
  hearAboutUs: "social-media",
  message: "Interested in a 2-bedroom garden condo.",
};

describe("createInquiry", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("inserts a new inquiry row", async () => {
    const values = vi.fn().mockResolvedValue(undefined);
    const insert = vi.fn().mockReturnValue({ values });
    vi.mocked(getDb).mockReturnValue({ insert } as never);

    await createInquiry(sampleInput);

    expect(insert).toHaveBeenCalled();
    expect(values).toHaveBeenCalledWith(sampleInput);
  });
});

describe("getAllInquiries", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns all inquiries ordered newest-first", async () => {
    const rows = [{ id: 1, ...sampleInput, status: "new", submittedAt: new Date() }];
    const orderBy = vi.fn().mockResolvedValue(rows);
    const from = vi.fn().mockReturnValue({ orderBy });
    const select = vi.fn().mockReturnValue({ from });
    vi.mocked(getDb).mockReturnValue({ select } as never);

    const result = await getAllInquiries();

    expect(select).toHaveBeenCalled();
    expect(result).toEqual(rows);
  });
});

describe("getNewInquiries", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns only inquiries with status 'new', newest-first", async () => {
    const rows = [{ id: 1, ...sampleInput, status: "new", submittedAt: new Date() }];
    const orderBy = vi.fn().mockResolvedValue(rows);
    const where = vi.fn().mockReturnValue({ orderBy });
    const from = vi.fn().mockReturnValue({ where });
    const select = vi.fn().mockReturnValue({ from });
    vi.mocked(getDb).mockReturnValue({ select } as never);

    const result = await getNewInquiries();

    expect(select).toHaveBeenCalled();
    expect(result).toEqual(rows);
  });
});

describe("updateInquiryStatus", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("updates the status for the given id", async () => {
    const where = vi.fn().mockResolvedValue(undefined);
    const set = vi.fn().mockReturnValue({ where });
    const update = vi.fn().mockReturnValue({ set });
    vi.mocked(getDb).mockReturnValue({ update } as never);

    await updateInquiryStatus(1, "in-progress");

    expect(update).toHaveBeenCalled();
    expect(set).toHaveBeenCalledWith({ status: "in-progress" });
  });
});
