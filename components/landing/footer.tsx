import Link from "next/link";

const footerLinks = {
  Product: ["Features", "Pricing", "Changelog", "Roadmap"],
  Resources: ["Documentation", "API Reference", "Blog", "Support"],
  Company: ["About", "Careers", "Contact", "Legal"],
  Connect: ["Twitter", "GitHub", "Discord", "LinkedIn"],
};

export function Footer() {
  return (
    <footer className="border-t border-forest-500/10 bg-forest-950 py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-8 grid-cols-2 md:grid-cols-5">
          {/* Logo */}
          <div className="md:col-span-1 col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-forest-500">
                <span className="text-lg font-bold text-white">P</span>
              </div>
              <span className="text-lg font-semibold text-white">POS</span>
            </Link>
            <p className="mt-4 text-sm text-forest-400/60">
              The modern point-of-sale platform for intelligent businesses.
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-sm font-semibold text-white">{category}</h4>
              <ul className="mt-4 space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="text-sm text-forest-400/60 transition-colors hover:text-forest-300"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-forest-500/10 pt-8 md:flex-row">
          <p className="text-sm text-forest-400/60">
            © {new Date().getFullYear()} POS System. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="#"
              className="text-sm text-forest-400/60 hover:text-forest-300"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-sm text-forest-400/60 hover:text-forest-300"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
