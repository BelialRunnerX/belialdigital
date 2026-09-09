import { NextResponse } from "next/server";
import { applyPrintfulWebhook } from "@/lib/printful";
import { listOrders, saveOrder } from "@/lib/orders";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const secret = process.env.PRINTFUL_WEBHOOK_SECRET;
  if (secret) {
    const provided =
      request.headers.get("x-printful-secret") ||
      new URL(request.url).searchParams.get("secret");
    if (provided !== secret) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  const event = await request.json().catch(() => ({}));
  const printfulId = event?.data?.order?.id ? String(event.data.order.id) : "";
  const externalId = event?.data?.order?.external_id as string | undefined;

  const orders = await listOrders();
  const match = orders.find(
    (order) =>
      order.id === externalId ||
      order.fulfillment.some((job) => job.externalId === printfulId)
  );

  if (match) {
    const fulfillment = applyPrintfulWebhook(match.fulfillment, event);
    const shipped = fulfillment.some((job) => job.status === "shipped");
    await saveOrder({
      ...match,
      fulfillment,
      status: shipped ? "shipped" : match.status,
    });
  }

  return NextResponse.json({ received: true });
}
