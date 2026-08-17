import type { Metadata } from "next";
import { ContactDetailsForm } from "@/components/admin/ContactDetailsForm";

export const metadata: Metadata = {
  title: "Settings",
};

export default function AdminSettingsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-semibold text-brand-forest-900">Settings</h2>
        <p className="mt-1 text-sm text-brand-forest-400">Manage site-wide configuration.</p>
      </div>

      <ContactDetailsForm />
    </div>
  );
}
