import type { LoaderFunction } from '@remix-run/node';
import { StartShell, authQuery } from '~/modules/Start';
import { getCookie } from '~/helpers';

export const loader: LoaderFunction = async ({ request }) => {
  const cookie = getCookie(request);
  return await authQuery(cookie);
};

export default function Start() {
  return <StartShell />;
}
