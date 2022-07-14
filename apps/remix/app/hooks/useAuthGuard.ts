import { useNavigate } from '@remix-run/react';
import { useOptionalUser } from './useOptionalUser';
import { links } from '~/helpers';

type useAuthGuardOptions = {
  redirect?: boolean;
  redirectUrl?: string;
};

export function useAuthGuard(options: useAuthGuardOptions = {}) {
  const user = useOptionalUser();
  const navigator = useNavigate();
  const redirect = options.redirect || true;
  const redirectUrl = options.redirectUrl;
  const defaultRedirectUrl = links.login;

  return () => {
    if (redirect && !user) {
      navigator(redirectUrl || defaultRedirectUrl);
    }

    return user;
  };
}
