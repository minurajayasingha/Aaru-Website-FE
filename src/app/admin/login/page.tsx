"use client";

import { useState } from "react";
import { Button } from "@/components/admin/ui/Button";
import { Input } from "@/components/admin/ui/Input";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-brand-forest-50 px-4">
      <div className="w-full max-w-sm rounded-xl border border-brand-forest-100 bg-white p-8 shadow-sm">
        <div className="mb-6 text-center">
          <p className="text-lg font-semibold text-brand-forest-900">
            AARU <span className="text-brand-gold">Admin</span>
          </p>
          <p className="mt-1 text-sm text-brand-forest-400">Sign in to manage the site</p>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            label="Email"
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@aaru.com"
            required
          />
          <Input
            label="Password"
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />
          <Button type="submit" className="mt-2 w-full">
            Sign in
          </Button>
        </form>
      </div>
    </div>
  );
}
