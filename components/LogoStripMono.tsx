import React from 'react';
import Spirit from './logos-mono/SpiritMono';
import UNCCharlotte from './logos-mono/UncCharlotteMono';
import CommonApp from './logos-mono/CommonAppMono';

type Item = {
  name: string;
  Logo: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  scale?: string;
};

const ITEMS: Item[] = [
  { name: 'Spirit Airlines',   Logo: Spirit,       scale: 'scale-[1.05]' },
  { name: 'UNC Charlotte',     Logo: UNCCharlotte, scale: 'scale-[1.22]' },
  { name: 'Common App',        Logo: CommonApp,    scale: 'scale-[1.12]' },
];

export default function LogoStripMono() {
  return (
    <div className="mx-auto max-w-5xl px-6 text-gi-black/85">
      <ul className="grid grid-cols-3 items-center justify-items-center gap-x-12 gap-y-6 md:gap-x-16 lg:gap-x-24">
        {ITEMS.map(({ name, Logo, scale }) => (
          <li key={name} className="w-full">
            <div className="mx-auto h-12 md:h-14 lg:h-16 w-full max-w-[240px] flex items-center justify-center">
              <Logo aria-label={name} className={`h-full w-auto ${scale ?? ''}`} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
} 