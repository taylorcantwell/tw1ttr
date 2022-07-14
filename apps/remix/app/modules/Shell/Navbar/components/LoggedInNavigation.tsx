import { Link } from '@remix-run/react';
import type { UserInfoMin } from '@twitter-clone/shared';
import { links } from '~/helpers';
import { AvatarDropDown } from './AvatarDropDown';
import { NavigationLink } from './NavigationLink';

export function LoggedInNavigation({ user }: { user: UserInfoMin }) {
  return (
    <>
      <div className="w-1/3">
        <Link
          to={links.home}
          className="text-2xl font-bold transition-colors text-twitterBlue hover:opacity-50"
        >
          Tw1ttr
        </Link>
      </div>
      <nav className="hidden w-1/3 md:block">
        <ul className="flex justify-between text-twitterGrey ">
          {navLinks.map(({ label, to, restricted }) => (
            <NavigationLink
              key={label}
              to={to}
              label={label}
              restricted={restricted}
            />
          ))}
        </ul>
      </nav>
      <div className="flex justify-end w-1/3 cursor-pointer">
        <AvatarDropDown user={user} />
      </div>
    </>
  );
}

const navLinks = [
  { to: links.home, label: 'Home' },
  { to: links.explore, label: 'Explore' },
  { to: links.bookmarks, label: 'Bookmarks', restricted: true },
];
