export type AdminInquiryStatus = "new" | "in-progress" | "closed";

export type AdminInquiry = {
  id: string;
  name: string;
  email: string;
  message: string;
  submittedAt: string;
  status: AdminInquiryStatus;
};

export const sampleInquiries: AdminInquiry[] = [
  {
    id: "inq-1",
    name: "Amara Fernando",
    email: "amara.fernando@example.com",
    message: "Interested in a 2-bedroom garden condo — could I get the floor plans and pricing?",
    submittedAt: "2026-08-01",
    status: "new",
  },
  {
    id: "inq-2",
    name: "James Whitfield",
    email: "james.whitfield@example.com",
    message: "Looking into the commercial space units for a small retail concept near the beach.",
    submittedAt: "2026-07-29",
    status: "in-progress",
  },
  {
    id: "inq-3",
    name: "Priya Rathnayake",
    email: "priya.r@example.com",
    message: "Would like to schedule a site visit for the private villas next month.",
    submittedAt: "2026-07-24",
    status: "in-progress",
  },
  {
    id: "inq-4",
    name: "Liam O'Connor",
    email: "liam.oconnor@example.com",
    message: "Requesting the investment brochure and payment plan details.",
    submittedAt: "2026-07-18",
    status: "closed",
  },
  {
    id: "inq-5",
    name: "Nadia Hassan",
    email: "nadia.hassan@example.com",
    message: "Are pet-friendly units available in the condo blocks?",
    submittedAt: "2026-07-12",
    status: "closed",
  },
];
