import { NextResponse } from "next/server";
import { getOrder } from "@/lib/orders";
import { markPaidAndFulfill } from "@/lib/fulfill";
import { stripeConfigured } from "@/lib/env";

export async function POST(request: Request) {
  if (stripeConfigured() && process.env.ALLOW_MOCK_PAY !== "true") {
    return NextResponse.json(
      { error: "Mock payment is disabled while Stripe is configured." },
      { status: 403 }
    );
  }
  const body = await request.json().catch(() => ({}));
  const orderId = String(body.orderId || "");
  const order = await getOrder(orderId);
  if (!order) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }
  if (order.status === "pending_payment") {
    await markPaidAndFulfill(order.id);
  }
  return NextResponse.json({ ok: true, orderId: order.id });
}
