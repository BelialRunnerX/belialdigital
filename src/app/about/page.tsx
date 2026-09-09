export const metadata = {
  title: "About — Belial Digital",
  description: "How Belial Digital prints, pays, and ships.",
};

export default function AboutPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <p className="text-[11px] tracking-[0.28em] text-[color:var(--gilt)] uppercase">
        The house
      </p>
      <h1 className="font-heading mt-3 text-4xl sm:text-5xl">About Belial Digital</h1>
      <div className="mt-8 space-y-5 text-[15px] leading-relaxed text-[color:var(--mist)]">
        <p>
          Belial Digital began as a static gothic clothing storefront: catalog, size
          chips, a bag in localStorage, and a mock till. This rebuild keeps the
          house — void black, gilt, bone — and wires the till to Stripe and the
          printer to Printful.
        </p>
        <p>
          You browse. You choose a size. Stripe (or a local mock when keys are
          absent) takes the card. On <code>checkout.session.completed</code> the
          server builds a Printful order from catalog variant IDs and print files.
          Cloaks, wide trousers, scarves, and jewelry are marked studio-made and
          queue separately, because Printful does not cut those blanks.
        </p>
        <p>
          Nothing is held in stock. A paid order is a print job plus, when needed,
          a studio ticket. Tracking returns through the Printful webhook and shows
          on the order page.
        </p>
        <p>
          The original catalog&apos;s digital affiliate kits are not sold here. This
          house sells cloth, metal, and paper.
        </p>
      </div>
    </article>
  );
}
