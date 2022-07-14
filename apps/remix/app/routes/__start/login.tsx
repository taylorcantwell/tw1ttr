import { type ActionFunction } from '@remix-run/node';
import { Login, loginMutation } from '~/modules/Start';
import { unpackRequest } from '~/helpers';

export let action: ActionFunction = async ({ request }): Promise<any> => {
  const { username, password } = await unpackRequest(request);

  return await loginMutation({ username, password });
};

export default function LoginRoute() {
  return <Login />;
}
