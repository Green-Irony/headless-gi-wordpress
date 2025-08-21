import React, { useEffect } from 'react';

export default function PageBody({ html }: { html: string }) {
  useEffect(() => {
    // hook for future client-side enhancements (e.g., embed normalization)
  }, []);

  return (
    <section className="mx-auto max-w-7xl px-6 py-12">
      <div className="prose prose-lg gi-prose mx-auto max-w-3xl">
        {/* eslint-disable-next-line react/no-danger */}
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </section>
  );
}


