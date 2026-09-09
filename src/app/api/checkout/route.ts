import { NextResponse } from "next/server";
import { CheckoutError, quoteCart, validateShipping } from "@/lib/checkout";
import { getAppUrl, stripeConfigured } from "@/lib/env";
import { newOrderId, saveOrder } from "@/lib/orders";
import { getStripe } from "@/lib/stripe";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const shipping = validateShipping(body.shipping ?? {});
    const quote = quoteCart(body.items ?? [], shipping.country);
    const order = await saveOrder({
      id: newOrderId(),
      createdAt: new Date().toISOString(),
      status: "pending_payment",
      items: quote.items,
      shipping,
      subtotalCents: quote.subtotalCents,
      shippingCents: quote.shippingCents,
      totalCents: quote.totalCents,
      fulfillment: [],
    });

    const origin = getAppUrl();
    const stripe = getStripe();

    if (!stripe || !stripeConfigured()) {
      return NextResponse.json({
        orderId: order.id,
        mode: "mock",
        url: `${origin}/checkout/mock?order=${order.id}`,
      });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: shipping.email,
      client_reference_id: order.id,
      metadata: {
        orderId: order.id,
      },
      success_url: `${origin}/orders/${order.id}?paid=1`,
      cancel_url: `${origin}/checkout?cancelled=1`,
      line_items: [
        ...quote.items.map((item) => ({
          quantity: item.quantity,
          price_data: {
            currency: "usd",
            unit_amount: Math.round(item.unitPrice * 100),
            product_data: {
              name: `${item.name} — ${item.size}`,
              description: item.fulfillment === "printful" ? "Print on demand" : "Studio made",
            },
          },
        })),
        ...(quote.shippingCents > 0
          ? [
              {
                quantity: 1,
                price_data: {
                  currency: "usd",
                  unit_amount: quote.shippingCents,
                  product_data: { name: "Shipping" },
                },
              },
            ]
          : []),
      ],
    });

    await saveOrder({ ...order, stripeSessionId: session.id });

    return NextResponse.json({
      orderId: order.id,
      mode: "stripe",
      url: session.url,
    });
  } catch (error) {
    const status = error instanceof CheckoutError ? error.status : 400;
    const message = error instanceof Error ? error.message : "Checkout failed";
    return NextResponse.json({ error: message }, { status });
  }
}
