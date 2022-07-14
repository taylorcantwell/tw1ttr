import { redirect } from '@remix-run/node';
import { apiEndpoints, composeRequestInit } from '~/helpers';

export async function logoutMutation(cookie: string) {
  console.log('🚀 ~ file: shell.server.ts ~ line 5 ~ logoutMutation ~ cookie', cookie);
  await fetch(apiEndpoints.auth.logout, composeRequestInit({ cookie, method: 'POST' }));

  return redirect('/login');
}
