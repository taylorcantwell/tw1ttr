import type { ActionFunction } from '@remix-run/node';
import { Register, registerMutation } from '~/modules/Start';
import { unpackRequest } from '~/helpers';

export const action: ActionFunction = async ({ request }): Promise<any> => {
  const { username, password } = await unpackRequest(request);
  return await registerMutation({ username, password });
};

export default function RegisterRoute() {
  return <Register />;
}
