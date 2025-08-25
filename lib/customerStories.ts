import fs from 'fs';
import path from 'path';

export type StoryTag = string;

export type StorySeo = {
  title?: string;
  description?: string;
  ogImage?: string;
  canonical?: string;
  locale?: string; // GEO
  faqs?: Array<{ q: string; a: string }>;
  breadcrumbs?: Array<{ name: string; href: string }>;
};

export type StoryHero = {
  title: string;
  subhead?: string;
  image?: { src: string; alt?: string };
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
};

export type StorySection =
  | { type: 'richText'; html: string }
  | { type: 'challenge'; title?: string; body: string; promises?: string[]; align?: 'center' | 'left' }
  | { type: 'objectives'; body?: string; items?: Array<string | { title: string; body?: string; iconSrc?: string; iconAlt?: string; iconNode?: any }> }
  | { type: 'solutionSteps'; steps: Array<{ title: string; body: string; icon?: string }> }
  | { type: 'architectureHighlights'; items: string[] }
  | { type: 'kpis'; items: Array<{ label: string; value?: string }> }
  | { type: 'results'; items: string[]; title?: string; bg?: 'white' | 'navy' | 'pink' | 'green'; text?: 'white' | 'navy' | 'pink' | 'green' }
  | { type: 'testimonial'; quote: string; author: string; role?: string; logoSrc?: string; portraitSrc?: string }
  | { type: 'whyUs'; title?: string; bullets?: string[] }
  | { type: 'deliverables'; heading?: string; items: Array<{ title: string; body: string }> }
  | { type: 'media'; kind: 'image' | 'video' | 'embed'; src?: string; alt?: string; embedHtml?: string }
  | { type: 'ctaBanner'; title: string; body?: string; primaryCta?: { label: string; href: string }; secondaryCta?: { label: string; href: string } }
  | { type: 'faq'; items: Array<{ q: string; a: string }> }
  | { type: 'relatedLinks'; items: Array<{ label: string; href: string }> }
  | { type: 'solution'; title?: string; subhead?: string; image?: { src: string; alt?: string }; imageSide?: 'left' | 'right'; bullets?: Array<{ title?: string; body: string }>; bg?: 'white' | 'navy' | 'pink' | 'green'; textPrimary?: 'white' | 'navy' | 'pink' | 'green'; textSecondary?: 'white' | 'navy' | 'pink' | 'green'; bodyBefore?: string; bodyAfter?: string }
  | { type: 'titleBullets'; title?: string; bullets: string[]; bg?: 'white' | 'navy' | 'pink' | 'green'; text?: 'white' | 'navy' | 'pink' | 'green'; center?: boolean };

export type CustomerStory = {
  slug: string;
  brand: string;
  title: string;
  image?: { src: string; alt?: string };
  excerpt?: string;
  tags?: StoryTag[];
  vertical?: string;
  products?: string[];
  datePublished?: string;
  hero?: StoryHero;
  sections?: StorySection[];
  seo?: StorySeo;
};

const DATA_DIR = path.join(process.cwd(), 'data', 'customer-stories');

export function loadAllStories(): CustomerStory[] {
  try {
    const entries = fs.readdirSync(DATA_DIR, { withFileTypes: true });
    const files = entries.filter((e) => e.isFile() && e.name.endsWith('.json')).map((e) => path.join(DATA_DIR, e.name));
    return files.map((file) => JSON.parse(fs.readFileSync(file, 'utf8')) as CustomerStory).sort((a, b) => a.brand.localeCompare(b.brand));
  } catch (e) {
    return [];
  }
}

export function loadStoryBySlug(slug: string): CustomerStory | null {
  const fp = path.join(DATA_DIR, `${slug}.json`);
  try {
    const raw = fs.readFileSync(fp, 'utf8');
    return JSON.parse(raw) as CustomerStory;
  } catch (e) {
    return null;
  }
}


