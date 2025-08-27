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
        <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
          {/* Brand */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-4">
              <Link href="/" aria-label="Green Irony — Home" className="inline-flex items-center">
                <Image src="/logos/green-irony/green-logo-long.png" alt="Green Irony" width={140} height={28} className="h-7 w-auto" />
              </Link>
              <Image
                src="/images/salesforce-partner-badge.png"
                alt="Salesforce Partner"
                width={200}
                height={60}
                className="h-10 w-auto"
              />
            </div>
            <p className="mt-4 max-w-sm text-sm text-gi-gray">
              Offshore economics.<br/>Onshore expertise.<br/>At the speed of AI.
            </p>
            <div className="mt-3 relative inline-block text-sm font-semibold text-gi-text">
              Turning AI into Actual Intelligence™
              <UnderlinePink />
            </div>
          </div>

          {/* Link columns */}
          <div className="md:col-span-4 grid grid-cols-1 gap-8 sm:grid-cols-2">
            <div>
              <div className="text-sm font-semibold text-gi-text">Company</div>
              <ul className="mt-3 space-y-2 text-sm">
                <li><Link href="/about/" className={linkUnderline}>About</Link></li>
                
                <li><Link href="/services/mulesoft/" className={linkUnderline}>Services</Link></li>
                <li><Link href="/contact/" className={linkUnderline}>Contact</Link></li>
              </ul>
            </div>
            <div>
              <div className="text-sm font-semibold text-gi-text">Resources</div>
              <ul className="mt-3 space-y-2 text-sm">
                <li><Link href="/customer-stories/" className={linkUnderline}>Customer Stories</Link></li>
                <li><Link href="/insights/" className={linkUnderline}>Insights</Link></li>
                <li><Link href="/agentforce-job-description/" className={linkUnderline}>8-Week Agent Launch Plan</Link></li>
                <li><Link href="/mulesoft-reviver/" className={linkUnderline}>MuleSoft Reviver</Link></li>
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
            <div className="flex items-center gap-3">
              <a
                href="https://www.linkedin.com/company/green-irony"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-gi-gray hover:text-gi-text"
              >
                <LinkedInIcon className="h-5 w-5" />
              </a>
              <a
                href="https://www.youtube.com/@GreenIrony-SI"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="text-gi-gray hover:text-gi-text"
              >
                <YouTubeIcon className="h-5 w-5" />
              </a>
            </div>
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

function LinkedInIcon({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden className={className}>
      <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708C16 15.487 15.474 16 14.825 16H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.219c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.539-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zM13.458 13.394V9.359c0-2.158-1.152-3.162-2.688-3.162-1.24 0-1.797.68-2.106 1.157V6.169H6.263c.03.68 0 7.225 0 7.225h2.401v-4.035c0-.216.016-.432.08-.586.176-.432.576-.88 1.249-.88.88 0 1.232.664 1.232 1.64v3.861h2.233z" />
    </svg>
  );
}

function TwitterIcon({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden className={className}>
      <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.01-.422A6.673 6.673 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.084.797A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.431 3.289 3.289 0 0 0 1.018 4.381A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
    </svg>
  );
}

function FacebookIcon({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden className={className}>
      <path d="M16 8.049C16 3.604 12.418 0 8 0S0 3.604 0 8.049C0 12.06 2.925 15.396 6.75 16v-5.624H4.72V8.05H6.75V6.275c0-2.02 1.195-3.132 3.022-3.132.875 0 1.791.157 1.791.157v1.98h-1.01c-.996 0-1.307.62-1.307 1.258V8.05h2.223l-.355 2.327H9.246V16C13.075 15.396 16 12.06 16 8.049z" />
    </svg>
  );
}

function YouTubeIcon({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M23.499 6.203a3.01 3.01 0 0 0-2.12-2.128C19.6 3.5 12 3.5 12 3.5s-7.6 0-9.379.575A3.01 3.01 0 0 0 .5 6.203 31.64 31.64 0 0 0 0 12a31.64 31.64 0 0 0 .5 5.797 3.01 3.01 0 0 0 2.121 2.128C4.4 20.5 12 20.5 12 20.5s7.6 0 9.379-.575a3.01 3.01 0 0 0 2.121-2.128A31.64 31.64 0 0 0 24 12a31.64 31.64 0 0 0-.501-5.797ZM9.75 15.5V8.5l6 3.5-6 3.5Z" />
    </svg>
  );
}