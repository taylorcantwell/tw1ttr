import { useLoaderData, useParams } from '@remix-run/react';
import type { LoaderFunction } from 'index';
import invariant from 'tiny-invariant';
import { getFollowees } from '~/modules/Profile';
import { UserDialog } from '~/modules/shared/UserDialog';
import { getCookie } from '~/helpers';

export const loader: LoaderFunction = async ({ request, params }) => {
  const cookie = getCookie(request);
  const username = params.username;
  invariant(username, `params.username is required`);

  return await getFollowees(username, cookie);
};

export default function Following() {
  const users = useLoaderData();
  const { username } = useParams();
  invariant(username, `params.username is required`);

  return (
    <UserDialog
      username={username}
      variant="following"
      users={users}
    />
  );
}
