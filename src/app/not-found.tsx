import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-lg px-4 py-24 text-center">
      <p className="font-heading text-3xl">This aisle is empty</p>
      <p className="mt-3 text-sm text-[color:var(--mist)]">
        The piece you asked for is not in the catalog.
      </p>
      <Link href="/" className="mt-6 inline-block text-sm text-[color:var(--gilt)]">
        Return to the house
      </Link>
    </div>
  );
}
