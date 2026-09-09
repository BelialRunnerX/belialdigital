import { Suspense } from "react";
import { MockPay } from "@/components/mock-pay";

export const metadata = { title: "Mock payment — Belial Digital" };

export default function MockCheckoutPage() {
  return (
    <Suspense fallback={<p className="px-4 py-24 text-center">Opening payment…</p>}>
      <MockPay />
    </Suspense>
  );
}
