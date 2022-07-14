import type { ActionFunction } from '@remix-run/node';
import { logoutMutation } from '~/modules/Shell/shell.server';
import { getCookie, unpackRequest } from '~/helpers';

export const action: ActionFunction = async ({ request }) => {
  const cookie = getCookie(request);

  return await logoutMutation(cookie);
};
