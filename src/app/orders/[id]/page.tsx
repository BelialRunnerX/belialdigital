import { OrderCard } from "@/components/order-lookup";
import { getOrder, publicOrder } from "@/lib/orders";
import { notFound } from "next/navigation";

export const metadata = { title: "Order — Belial Digital" };
export const dynamic = "force-dynamic";

export default async function OrderDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ paid?: string }>;
}) {
  const { id } = await params;
  const { paid } = await searchParams;
  const order = await getOrder(id);
  if (!order) notFound();
  return <OrderCard order={publicOrder(order)} paidNotice={paid === "1"} />;
}
