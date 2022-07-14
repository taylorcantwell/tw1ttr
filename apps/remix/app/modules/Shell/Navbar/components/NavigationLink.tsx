import { NavLink, useNavigate } from '@remix-run/react';
import clsx from 'clsx';
import { useAuthGuard } from '~/hooks';

interface NavigationLinkProps {
  label: string;
  to: string;
  className?: string;
}

export function NavigationLink({ restricted, to, label, className }: NavigationLinkProps) {
  const navigator = useNavigate();
  const authGuard = useAuthGuard();

  if (restricted) {
    return (
      <button
        className={({ isActive }) => clsx({ 'text-twitterBlue': isActive }, className)}
        onClick={() => {
          const user = authGuard();

          if (!user) {
            return null;
          }

          navigator(to);
        }}
      >
        {label}
      </button>
    );
  }

  return (
    <NavLink
      className={({ isActive }) => clsx({ 'text-twitterBlue': isActive }, className)}
      to={to}
    >
      {label}
    </NavLink>
  );
}
