import { NextResponse } from "next/server";
import { getOrder, publicOrder } from "@/lib/orders";

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const order = await getOrder(id);
  if (!order) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }
  return NextResponse.json(publicOrder(order));
}
