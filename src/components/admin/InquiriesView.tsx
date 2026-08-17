"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Badge } from "./ui/Badge";
import { Card } from "./ui/Card";
import { TabBar } from "./ui/TabBar";
import { SearchIcon } from "./icons";
import { InquiryDetailModal } from "./InquiryDetailModal";
import type { AdminInquiry, AdminInquiryStatus } from "@/content/admin/inquiries";

type StatusFilter = AdminInquiryStatus | "all";

type InquiriesViewProps = {
  initialInquiries: AdminInquiry[];
};

const filterOptions: { label: string; value: StatusFilter }[] = [
  { label: "All", value: "all" },
  { label: "New", value: "new" },
  { label: "In progress", value: "in-progress" },
  { label: "Closed", value: "closed" },
];

export function InquiriesView({ initialInquiries }: InquiriesViewProps) {
  const searchParams = useSearchParams();
  const [inquiries, setInquiries] = useState(initialInquiries);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedInquiry = inquiries.find((inquiry) => inquiry.id === selectedId) ?? null;

  // Lets a notification link jump straight to a specific inquiry, e.g. /admin/inquiries?inquiryId=inq-1
  useEffect(() => {
    const inquiryId = searchParams.get("inquiryId");
    if (inquiryId) setSelectedId(inquiryId);
  }, [searchParams]);

  useEffect(() => {
    if (!selectedInquiry) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setSelectedId(null);
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedInquiry]);

  const filteredInquiries = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return inquiries.filter((inquiry) => {
      const matchesStatus = statusFilter === "all" || inquiry.status === statusFilter;
      const matchesQuery =
        query.length === 0 ||
        inquiry.name.toLowerCase().includes(query) ||
        inquiry.email.toLowerCase().includes(query) ||
        inquiry.message.toLowerCase().includes(query);
      return matchesStatus && matchesQuery;
    });
  }, [inquiries, statusFilter, searchQuery]);

  function handleStatusChange(id: string, status: AdminInquiryStatus) {
    setInquiries((current) => current.map((inquiry) => (inquiry.id === id ? { ...inquiry, status } : inquiry)));
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-semibold text-brand-forest-900">Inquiries</h2>
        <p className="mt-1 text-sm text-brand-forest-400">Contact form submissions from the public site.</p>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <TabBar
          options={filterOptions}
          value={statusFilter}
          onChange={(value) => setStatusFilter(value as StatusFilter)}
        />

        <div className="relative w-full sm:w-64">
          <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-forest-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search inquiries..."
            aria-label="Search inquiries"
            className="w-full rounded-full border border-brand-forest-100 bg-white py-2 pl-9 pr-4 text-sm text-brand-forest-900 placeholder:text-brand-forest-400 focus:outline-none focus:ring-2 focus:ring-brand-gold"
          />
        </div>
      </div>

      {filteredInquiries.length === 0 ? (
        <Card>
          <p className="text-center text-sm text-brand-forest-400">No inquiries match your filters.</p>
        </Card>
      ) : (
        <>
          <Card className="hidden overflow-hidden p-0 md:block">
            <table className="w-full text-left text-sm">
              <thead className="bg-brand-forest-50 text-xs uppercase tracking-wide text-brand-forest-400">
                <tr>
                  <th className="px-6 py-3 font-medium">#</th>
                  <th className="px-6 py-3 font-medium">Name</th>
                  <th className="px-6 py-3 font-medium">Email</th>
                  <th className="px-6 py-3 font-medium">Message</th>
                  <th className="px-6 py-3 font-medium">Date</th>
                  <th className="px-6 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-forest-100">
                {filteredInquiries.map((inquiry, index) => (
                  <tr
                    key={inquiry.id}
                    onClick={() => setSelectedId(inquiry.id)}
                    className="cursor-pointer transition-colors hover:bg-brand-forest-50"
                  >
                    <td className="px-6 py-3 text-brand-forest-400">{index + 1}</td>
                    <td className="px-6 py-3 font-medium text-brand-forest-900">{inquiry.name}</td>
                    <td className="px-6 py-3 text-brand-forest-700">{inquiry.email}</td>
                    <td className="max-w-xs truncate px-6 py-3 text-brand-forest-700">{inquiry.message}</td>
                    <td className="px-6 py-3 text-brand-forest-400">{inquiry.submittedAt}</td>
                    <td className="px-6 py-3">
                      <Badge status={inquiry.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>

          <div className="flex flex-col gap-4 md:hidden">
            {filteredInquiries.map((inquiry) => (
              <Card
                key={inquiry.id}
                onClick={() => setSelectedId(inquiry.id)}
                className="flex cursor-pointer flex-col gap-2 transition-colors hover:bg-brand-forest-50"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-brand-forest-900">{inquiry.name}</p>
                    <p className="truncate text-sm text-brand-forest-400">{inquiry.email}</p>
                  </div>
                  <Badge status={inquiry.status} />
                </div>
                <p className="text-sm text-brand-forest-700">{inquiry.message}</p>
                <p className="text-xs text-brand-forest-400">{inquiry.submittedAt}</p>
              </Card>
            ))}
          </div>
        </>
      )}

      {selectedInquiry && (
        <InquiryDetailModal
          inquiry={selectedInquiry}
          onClose={() => setSelectedId(null)}
          onStatusChange={handleStatusChange}
        />
      )}
    </div>
  );
}
