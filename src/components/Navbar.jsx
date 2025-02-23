'use client';

import { cn } from '@/lib/utils';
import { buttonVariants } from './ui/button';

export default function Navbar() {
  return (
    <div className="flex w-full justify-center p-4">
      <ul className="flex w-full max-w-3xl items-center gap-2">
        <a className="mr-auto flex items-center gap-1" href="/">
          <img alt="gim" src="/favicon.ico" width="30" />
          <div className="font-pixel text-[0.7rem] leading-3">
            MIT
            <br />
            GDG
          </div>
        </a>
        <NavItemLink href="/the-game">The Game</NavItemLink>
        <NavItemLink href="/style-guide">Style Guide</NavItemLink>
        <NavItemLink href="/officers">Officers</NavItemLink>
      </ul>
    </div>
  );
}

function NavItemLink({ children, href }) {
  return (
    <li>
      <a
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          'font-medium tracking-tight',
        )}
        href={href}
      >
        {children}
      </a>
    </li>
  );
}

// className="px-5 py-2 transition-all hover:bg-neutral-800 hover:text-white hover:shadow-sm dark:hover:bg-white dark:hover:text-black"
