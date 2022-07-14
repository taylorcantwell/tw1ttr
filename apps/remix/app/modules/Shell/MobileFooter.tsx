import { BookmarkIcon, EyeIcon, HomeIcon } from '@heroicons/react/solid';
import { NavLink } from '@remix-run/react';
import clsx from 'clsx';
import { links } from '~/helpers';
import { useAuthGuard } from '~/hooks';

export function MobileFooter() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 flex items-center h-20 bg-white shadow-[0px_-1px_2px_0px_#0000000d] md:hidden text-gray3 border-t-gray">
      <ul className="flex justify-between w-full">
        {mobileLinks.map(({ id, icon, to, restricted }) => (
          <MobileLink
            key={id}
            Icon={icon}
            to={to}
            restricted={restricted}
          />
        ))}
      </ul>
    </div>
  );
}

const MobileLink = ({
  Icon,
  to,
  restricted,
}: {
  to: string;
  Icon: JSX.Element;
  restricted: boolean;
}) => {
  const authGuard = useAuthGuard();

  return (
    <NavLink
      className={({ isActive }) =>
        clsx(
          isActive && 'text-twitterBlue',
          'w-1/3 py-2 mx-4 text-center rounded-lg hover:bg-grayHover',
        )
      }
      to={to}
      onClick={(e) => {
        if (restricted) {
          const user = authGuard();

          if (!user) {
            e.preventDefault();
            return null;
          }
        }
      }}
    >
      <div className="w-full">
        <Icon className="mx-auto w-7 h-7" />
      </div>
    </NavLink>
  );
};

const mobileLinks = [
  { id: 1, icon: HomeIcon, to: links.home },
  { id: 2, icon: EyeIcon, to: links.explore },
  { id: 3, icon: BookmarkIcon, to: links.bookmarks, restricted: true },
];
