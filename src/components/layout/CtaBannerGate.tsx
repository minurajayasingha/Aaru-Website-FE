"use client";

import { usePathname } from "next/navigation";
import { CtaBanner } from "./CtaBanner";

export function CtaBannerGate() {
  const pathname = usePathname();
  if (pathname === "/contact") {
    return null;
  }
  return <CtaBanner />;
}
