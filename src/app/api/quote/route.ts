import { NextResponse } from "next/server";
import { CheckoutError, quoteCart } from "@/lib/checkout";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const quote = quoteCart(body.items ?? [], body.country || "US");
    return NextResponse.json({
      subtotalCents: quote.subtotalCents,
      shippingCents: quote.shippingCents,
      totalCents: quote.totalCents,
      items: quote.items.map((item) => ({
        slug: item.slug,
        name: item.name,
        size: item.size,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        fulfillment: item.fulfillment,
      })),
    });
  } catch (error) {
    const status = error instanceof CheckoutError ? error.status : 400;
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Quote failed" },
      { status }
    );
  }
}
