import type { Metadata } from "next";
import Link from "next/link";
import { StatCard } from "@/components/admin/ui/StatCard";
import { Card } from "@/components/admin/ui/Card";
import { Badge } from "@/components/admin/ui/Badge";
import { sampleInquiries } from "@/content/admin/inquiries";
import { InquiriesIcon, ResidencesIcon, GalleryIcon, EyeIcon } from "@/components/admin/icons";

export const metadata: Metadata = {
  title: "Dashboard",
};

const stats = [
  {
    label: "Total Inquiries",
    value: "128",
    icon: InquiriesIcon,
    trend: { direction: "up" as const, value: "12% this week" },
  },
  {
    label: "Listed Residences",
    value: "22",
    icon: ResidencesIcon,
    trend: { direction: "up" as const, value: "4% this month" },
  },
  {
    label: "Gallery Images",
    value: "64",
    icon: GalleryIcon,
    trend: { direction: "up" as const, value: "6% this month" },
  },
  {
    label: "Page Views (30d)",
    value: "9.4K",
    icon: EyeIcon,
    trend: { direction: "up" as const, value: "8% vs. last month" },
  },
];

export default function AdminDashboardPage() {
  const recentInquiries = sampleInquiries.slice(0, 3);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h2 className="text-xl font-semibold text-brand-forest-900">Welcome back</h2>
        <p className="mt-1 text-sm text-brand-forest-400">Here&apos;s what&apos;s happening across the site.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      <Card>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-base font-semibold text-brand-forest-900">Recent inquiries</h3>
          <Link href="/admin/inquiries" className="text-sm font-medium text-brand-forest-600 hover:text-brand-forest-900">
            View all
          </Link>
        </div>
        <ul className="flex flex-col divide-y divide-brand-forest-100">
          {recentInquiries.map((inquiry) => (
            <li
              key={inquiry.id}
              className="flex items-center justify-between gap-4 rounded-lg px-2 py-3 transition-colors hover:bg-brand-forest-50"
            >
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-brand-forest-900">{inquiry.name}</p>
                <p className="truncate text-sm text-brand-forest-400">{inquiry.message}</p>
              </div>
              <Badge status={inquiry.status} />
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
