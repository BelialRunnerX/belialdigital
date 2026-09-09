export const metadata = { title: "Size guide — Belial Digital" };

const rows = [
  ["XS", "32–34", "25–26", "32"],
  ["S", "35–37", "27–29", "32"],
  ["M", "38–40", "30–32", "33"],
  ["L", "41–43", "33–35", "33"],
  ["XL", "44–47", "36–38", "34"],
  ["2XL", "48–51", "39–42", "34"],
];

export default function SizeGuidePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="font-heading text-4xl">Size guide</h1>
      <p className="mt-3 text-sm text-[color:var(--mist)]">
        Unisex Printful blanks. Measurements in inches, body — not garment.
        Studio coats and trousers follow the same chest / waist language.
      </p>
      <div className="mt-8 overflow-x-auto rounded-xl border border-white/10">
        <table className="w-full min-w-[420px] text-left text-sm">
          <thead className="bg-[color:var(--crypt)] text-[11px] tracking-[0.18em] text-[color:var(--gilt)] uppercase">
            <tr>
              <th className="px-4 py-3">Size</th>
              <th className="px-4 py-3">Chest</th>
              <th className="px-4 py-3">Waist</th>
              <th className="px-4 py-3">Inseam</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row[0]} className="border-t border-white/10">
                {row.map((cell) => (
                  <td key={cell} className="px-4 py-3">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-6 text-sm text-[color:var(--mist)]">
        Caps, beanies, totes, posters, and jewelry are one size unless noted.
        Joggers use S–2XL, not waist numbers.
      </p>
    </div>
  );
}
