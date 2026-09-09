import { NextResponse } from "next/server";
import { getAdminSecret } from "@/lib/env";
import { listOrders, publicOrder } from "@/lib/orders";

export async function GET(request: Request) {
  const key =
    request.headers.get("x-admin-secret") ||
    new URL(request.url).searchParams.get("key") ||
    "";
  if (key !== getAdminSecret()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const orders = await listOrders();
  return NextResponse.json(orders.map(publicOrder));
}
