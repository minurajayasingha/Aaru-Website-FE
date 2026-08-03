import type { Metadata } from "next";
import { Badge } from "@/components/admin/ui/Badge";
import { Card } from "@/components/admin/ui/Card";
import { sampleInquiries } from "@/content/admin/inquiries";

export const metadata: Metadata = {
  title: "Inquiries",
};

export default function AdminInquiriesPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-semibold text-brand-forest-900">Inquiries</h2>
        <p className="mt-1 text-sm text-brand-forest-400">Contact form submissions from the public site.</p>
      </div>

      <Card className="hidden overflow-hidden p-0 md:block">
        <table className="w-full text-left text-sm">
          <thead className="bg-brand-forest-50 text-xs uppercase tracking-wide text-brand-forest-400">
            <tr>
              <th className="px-6 py-3 font-medium">Name</th>
              <th className="px-6 py-3 font-medium">Email</th>
              <th className="px-6 py-3 font-medium">Message</th>
              <th className="px-6 py-3 font-medium">Date</th>
              <th className="px-6 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-forest-100">
            {sampleInquiries.map((inquiry) => (
              <tr key={inquiry.id}>
                <td className="px-6 py-4 font-medium text-brand-forest-900">{inquiry.name}</td>
                <td className="px-6 py-4 text-brand-forest-700">{inquiry.email}</td>
                <td className="max-w-xs truncate px-6 py-4 text-brand-forest-700">{inquiry.message}</td>
                <td className="px-6 py-4 text-brand-forest-400">{inquiry.submittedAt}</td>
                <td className="px-6 py-4">
                  <Badge status={inquiry.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <div className="flex flex-col gap-4 md:hidden">
        {sampleInquiries.map((inquiry) => (
          <Card key={inquiry.id} className="flex flex-col gap-2">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
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
    </div>
  );
}
