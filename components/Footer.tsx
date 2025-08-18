import Link from 'next/link';
import Image from 'next/image';
import React from 'react';

const linkUnderline =
  'relative text-gi-gray hover:text-gi-text bg-no-repeat bg-left-bottom bg-[linear-gradient(to_right,#5AAD5A,#C40084,#5AAD5A)] bg-[length:0%_2px] hover:bg-[length:100%_2px] transition-[background-size] duration-200';

export default function Footer() {
  return (
    <footer className="relative bg-white overflow-hidden">
      {/* Top wave accent */}
      <svg
        aria-hidden
        className="absolute -top-[6px] left-0 right-0 h-[8px] w-full"
        viewBox="0 0 100 8"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="footerWaveGrad" x1="0" x2="1">
            <stop offset="0" stopColor="#C40084" />
            <stop offset="1" stopColor="#5AAD5A" />
          </linearGradient>
        </defs>
        <path
          d="M0 6 C 12 0, 16 8, 24 6 S 60 0, 48 6 64 8, 80 6 92 0, 100 6"
          fill="none"
          stroke="url(#footerWaveGrad)"
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {/* top divider */}
      <div className="h-px w-full bg-gi-line" />

      {/* subtle grid background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-20 opacity-[0.04] [background-image:linear-gradient(#141415_1px,transparent_1px),linear-gradient(90deg,#141415_1px,transparent_1px)] [background-size:28px_28px] [background-position:center]"
      />

      {/* glow accents */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[12%] top-[30%] h-[320px] w-[320px] -translate-x-1/2 rounded-full bg-gi-green opacity-[0.10] blur-[120px]" />
        <div className="absolute right-[10%] bottom-[12%] h-[260px] w-[260px] translate-x-1/3 rounded-full bg-gi-pink opacity-[0.10] blur-[120px]" />
      </div>

      <div className="mx-auto max-w-7xl px-6 pt-16 pb-10">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          {/* Brand */}
          <div className="md:col-span-4">
            <Link href="/" aria-label="Green Irony — Home" className="inline-flex items-center gap-2">
              <Image src="/logos/green-irony/green-logo-long.png" alt="Green Irony" width={140} height={28} className="h-7 w-auto" />
            </Link>
            <p className="mt-4 max-w-sm text-sm text-gi-gray">
              Offshore economics.<br/>Onshore expertise.<br/>At the speed of AI.
            </p>
          </div>

          {/* Link columns */}
          <div className="md:col-span-5 grid grid-cols-2 gap-8 sm:grid-cols-3">
            <div>
              <div className="text-sm font-semibold text-gi-text">Company</div>
              <ul className="mt-3 space-y-2 text-sm">
                <li><Link href="/about" className={linkUnderline}>About</Link></li>
                <li><Link href="/customer-stories" className={linkUnderline}>Customer Stories</Link></li>
                <li><Link href="/insights" className={linkUnderline}>Insights</Link></li>
                <li><Link href="/contact" className={linkUnderline}>Contact</Link></li>
              </ul>
            </div>
            <div>
              <div className="text-sm font-semibold text-gi-text">Services</div>
              <ul className="mt-3 space-y-2 text-sm">
                <li><Link href="/services#agentforce" className={linkUnderline}>AI & Digital Labor</Link></li>
                <li><Link href="/services#mulesoft" className={linkUnderline}>MuleSoft Integration</Link></li>
                <li><Link href="/services#salesforce" className={linkUnderline}>Salesforce Optimization</Link></li>
                <li><Link href="/services#data" className={linkUnderline}>Data & Migrations</Link></li>
              </ul>
            </div>
            <div>
              <div className="text-sm font-semibold text-gi-text">Resources</div>
              <ul className="mt-3 space-y-2 text-sm">
                <li><Link href="/#plan" className={linkUnderline}>8-Week Agent Launch Plan</Link></li>
                <li><Link href="/privacy" className={linkUnderline}>Privacy</Link></li>
                <li><Link href="/terms" className={linkUnderline}>Terms</Link></li>
              </ul>
            </div>
          </div>

          {/* Newsletter */}
          <div className="md:col-span-3">
            <div className="relative inline-block text-sm font-semibold text-gi-text">
              Practical AI updates for operators
              <UnderlinePink />
            </div>
            <p className="mt-3 text-sm text-gi-gray">Monthly notes on launching real AI outcomes.</p>
            <form className="mt-4 flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                required
                placeholder="Work email"
                className="w-full rounded-md border border-gi-fog bg-white px-3 py-2 text-sm outline-none ring-0 focus:border-gi-green"
              />
              <button type="submit" className="btn-primary whitespace-nowrap">Subscribe</button>
            </form>
            <p className="mt-2 text-[11px] text-gi-gray">No spam. Unsubscribe anytime.</p>
          </div>
        </div>

        {/* bottom bar */}
        <div className="mt-12 h-px w-full bg-gi-line" />
        <div className="mt-4 flex flex-col items-center justify-between gap-3 text-xs text-gi-gray sm:flex-row">
          <p>© {new Date().getFullYear()} Green Irony. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className={linkUnderline}>Privacy</Link>
            <Link href="/terms" className={linkUnderline}>Terms</Link>
            <a href="#top" className={linkUnderline} aria-label="Back to top">Back to top</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function UnderlinePink() {
  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute -bottom-1 left-0 right-0 h-[8px] w-full"
      viewBox="0 0 100 8"
      preserveAspectRatio="none"
    >
      <defs>
        <filter id="footerPinkBlur" x="-5%" y="-150%" width="110%" height="400%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="0.4" />
        </filter>
      </defs>
      <path
        d="M0 5 C 10 1, 20 7, 30 5 S 50 1, 60 5 80 7, 100 5"
        stroke="#C40084"
        strokeWidth="1.8"
        fill="none"
        filter="url(#footerPinkBlur)"
      />
    </svg>
  );
} 