import Link from 'next/link';

export default function PreFooterCTA() {
  return (
    <section className="relative isolate">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[620px] w-[620px] rounded-full bg-gi-pink opacity-[0.16] blur-[160px]" />
        <div className="absolute right-[15%] bottom-[10%] h-[300px] w-[300px] rounded-full bg-gi-green opacity-[0.14] blur-[120px]" />
      </div>

      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="rounded-3xl bg-gradient-to-r from-gi-pink/35 via-gi-green/20 to-gi-pink/35 p-[1px]">
          <div className="rounded-[22px] bg-white px-8 py-10 text-center shadow-gi">
            <h2 className="text-2xl md:text-3xl font-semibold text-gi-text">
              Ready to launch <span className="text-gi-text/90">predictable AI outcomes</span>?
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-gi-gray">
              Talk to our team or grab the 8-Week Agent Launch Plan to get your first win on the board.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link href="/contact" className="btn-primary">Talk to an Expert</Link>
              <Link href="/#plan" className="btn-secondary">Get the 8-Week Plan</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 