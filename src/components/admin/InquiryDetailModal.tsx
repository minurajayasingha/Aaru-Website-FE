"use client";

import { cn } from "@/lib/cn";
import { statusClasses, statusLabels } from "./ui/Badge";
import type { AdminInquiry, AdminInquiryStatus } from "@/content/admin/inquiries";
import { CloseIcon } from "./icons";

type InquiryDetailModalProps = {
  inquiry: AdminInquiry;
  onClose: () => void;
  onStatusChange: (id: string, status: AdminInquiryStatus) => void;
};

const statusOptions: AdminInquiryStatus[] = ["new", "in-progress", "closed"];

export function InquiryDetailModal({ inquiry, onClose, onStatusChange }: InquiryDetailModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onClick={onClose}>
      <div
        className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-4 flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="truncate text-lg font-semibold text-brand-forest-900">{inquiry.name}</h3>
            <p className="truncate text-sm text-brand-forest-400">{inquiry.email}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="shrink-0 rounded-lg p-1.5 text-brand-forest-400 hover:bg-brand-forest-50 hover:text-brand-forest-700"
          >
            <CloseIcon />
          </button>
        </div>

        <div className="border-t border-brand-forest-100 pt-4">
          <p className="text-sm text-brand-forest-700">{inquiry.message}</p>
          <p className="mt-3 text-xs text-brand-forest-400">Submitted {inquiry.submittedAt}</p>
        </div>

        <div className="mt-5 border-t border-brand-forest-100 pt-4">
          <span className="text-xs font-medium uppercase tracking-wide text-brand-forest-400">Status</span>
          <div className="mt-2 flex flex-wrap gap-2">
            {statusOptions.map((status) => (
              <button
                key={status}
                type="button"
                onClick={() => onStatusChange(inquiry.id, status)}
                className={cn(
                  "rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
                  status === inquiry.status
                    ? statusClasses[status]
                    : "border border-brand-forest-200 bg-white text-brand-forest-400 hover:bg-brand-forest-50"
                )}
              >
                {statusLabels[status]}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
