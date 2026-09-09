import { CatalogGrid } from "@/components/catalog-grid";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <section className="hero-veil">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
          <div>
            <p className="text-[11px] tracking-[0.32em] text-[color:var(--gilt)] uppercase">
              Dark devotion clothing
            </p>
            <h1 className="font-heading mt-4 text-4xl leading-tight sm:text-6xl">
              Printed in the dark,
              <br />
              shipped from the printer.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-[color:var(--mist)]">
              Belial Digital is a gothic house with no warehouse. Pay with Stripe.
              Tees, hoodies, caps, posters, and mugs go to Printful. Cloaks,
              trousers, and jewelry leave the studio.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="#catalog" className="btn-primary inline-flex h-11 items-center rounded-full px-6 text-sm">
                Open the catalog
              </Link>
              <Link
                href="/about"
                className="inline-flex h-11 items-center rounded-full border border-white/15 px-6 text-sm"
              >
                How fulfillment works
              </Link>
            </div>
          </div>
          <div className="ritual-border overflow-hidden rounded-2xl bg-[color:var(--crypt)]">
            <img
              src="/products/vespers-tee.svg"
              alt="Vespers Black Tee mockup"
              className="w-full"
            />
          </div>
        </div>
      </section>
      <div className="section-rule" />
      <CatalogGrid />
    </>
  );
}
