import { redirect } from '@remix-run/node';
import type { LoaderFunction } from '@remix-run/node';
import { composeRequestInit, apiEndpoints, links } from '~/helpers';

type AuthCredentials = {
  username: string;
  password: string;
};

export const registerMutation = async (registerCredentials: AuthCredentials) => {
  const registerResult = await fetch(
    apiEndpoints.auth.register,
    composeRequestInit({ method: 'POST', body: registerCredentials }),
  );

  if (registerResult.status === 201) {
    return redirect('/login?registered=true');
  }

  return registerResult;
};

export const loginMutation = async (loginCredentials: AuthCredentials) => {
  const loginResponse = await fetch(
    apiEndpoints.auth.login,
    composeRequestInit({ method: 'POST', body: loginCredentials }),
  );

  if (loginResponse.status === 201) {
    return redirect(links.home, {
      headers: {
        'Set-Cookie': loginResponse.headers.get('Set-Cookie'),
      },
    });
  }

  return loginResponse;
};

export const authQuery: LoaderFunction = async (cookie) => {
  const user = await fetch(apiEndpoints.auth.me, composeRequestInit({ cookie }));

  // if (user) {
  //   return redirect(links.home);
  // }

  return user;
};
