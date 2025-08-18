import React, { useEffect } from 'react';

export default function ArticleBody({ html, tableOfContents }: { html: string; tableOfContents?: Array<{ id: string; text: string }> }) {
  useEffect(() => {
    // No-op placeholder for future embed normalization if needed
  }, []);

  return (
    <section className="relative gi-prose-container">
      <article className="prose prose-lg gi-prose mx-auto max-w-3xl px-6">
        {/* eslint-disable-next-line react/no-danger */}
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </article>
      {Array.isArray(tableOfContents) && tableOfContents.length > 0 ? (
        <aside className="hidden xl:block fixed top-24 right-8 w-64">
          <div className="rounded-xl border border-gi-fog bg-white p-4 shadow-gi">
            <h4 className="mb-2 text-sm font-semibold text-gi-text">On this page</h4>
            <ul className="space-y-1 text-sm text-gi-gray">
              {tableOfContents.map((h) => (
                <li key={h.id}>
                  <a className="hover:text-gi-text" href={`#${h.id}`}>{h.text}</a>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      ) : null}
    </section>
  );
}


