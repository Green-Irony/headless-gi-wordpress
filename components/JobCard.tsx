import React from 'react';

type Job = {
  id: number;
  title: string;
  absolute_url: string;
  updated_at?: string | null;
  requisition_id?: string | null;
  location?: {
    name?: string | null;
  } | null;
};

type JobCardProps = {
  job: Job;
};

function formatUpdatedAt(updatedAt?: string | null): string | null {
  if (!updatedAt) return null;
  try {
    const d = new Date(updatedAt);
    if (Number.isNaN(d.getTime())) return null;
    return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
  } catch {
    return null;
  }
}

export default function JobCard({ job }: JobCardProps) {
  const locationName = job?.location?.name || 'Remote';
  const updatedLabel = formatUpdatedAt(job?.updated_at);

  return (
    <li className="flex items-center justify-between gap-4 rounded-xl border border-gi-fog bg-white p-5 shadow-gi">
      <div className="min-w-0">
        <h3 className="truncate text-lg font-semibold text-gi-text">{job.title}</h3>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          {locationName ? (
            <span className="inline-flex items-center rounded-full bg-gi-green/15 px-2 py-0.5 text-[11px] font-semibold text-gi-text ring-1 ring-gi-fog">
              {locationName}
            </span>
          ) : null}
          {updatedLabel ? (
            <span className="inline-flex items-center rounded-full bg-gi-green/15 px-2 py-0.5 text-[11px] font-semibold text-gi-text ring-1 ring-gi-fog">
              Updated {updatedLabel}
            </span>
          ) : null}
        </div>
      </div>
      <div className="shrink-0">
        <a
          href={job.absolute_url}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary whitespace-nowrap"
          aria-label={`View ${job.title} on Greenhouse`}
        >
          View role
        </a>
      </div>
    </li>
  );
}


