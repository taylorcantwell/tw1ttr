import { NavigationLink } from './NavigationLink';
import { links } from '~/helpers';

export function LoggedOutNavigation() {
  return (
    <nav className="md:block">
      <ul className="flex justify-start text-twitterGrey ">
        {navLinks.map(({ label, to }) => (
          <NavigationLink
            className="transition-colors hover:text-twitterBlue"
            key={label}
            to={to}
            label={label}
          />
        ))}
      </ul>
    </nav>
  );
}

const navLinks = [{ to: links.login, label: 'Sign In Or Register' }];
