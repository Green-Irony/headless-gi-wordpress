import React, { useEffect } from 'react';

export default function ArticleBody({ html }: { html: string }) {
  useEffect(() => {
    // No-op placeholder for future embed normalization if needed
  }, []);

  return (
    <section className="prose prose-lg gi-prose mx-auto max-w-3xl px-6">
      {/* eslint-disable-next-line react/no-danger */}
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </section>
  );
}


