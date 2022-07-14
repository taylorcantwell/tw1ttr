import clsx from 'clsx';
import { useState } from 'react';

interface AsideMenuProps {
  items: { description: string; url: string }[];
  ariaLabel: string;
}

export function AsideMenu({ items, ariaLabel }: AsideMenuProps) {
  const [active, setActive] = useState<string>('');

  return (
    <nav
      aria-label={ariaLabel}
      className="relative items-start hidden px-5 bg-white shadow-sm rounded-2xl h-60 py-7 md:flex md:flex-col md:justify-between "
    >
      {items.map(({ description, url }) => {
        const isActive = active === description;

        return (
          <button
            aria-current={isActive ? 'page' : undefined}
            onClick={() => setActive(description)}
            key={description}
            className={clsx(
              isActive &&
                'before:absolute before:w-1 before:h-7 before:left-0 before:rounded-2xl before:align-[50%] before:bg-twitterBlue',
              commonStyles,
            )}
          >
            {description}
          </button>
        );
      })}
    </nav>
  );
}

const commonStyles = 'flex justify-center py-3 text-sm text-gray3';
