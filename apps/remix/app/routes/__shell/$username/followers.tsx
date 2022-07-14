import { type LoaderFunction } from '@remix-run/node';
import { useLoaderData, useParams } from '@remix-run/react';
import invariant from 'tiny-invariant';
import { getFollowers } from '~/modules/Profile';
import { UserDialog } from '~/modules/shared/UserDialog';
import { getCookie } from '~/helpers';

export const loader: LoaderFunction = async ({ request, params }) => {
  const cookie = getCookie(request);
  const username = params.username;
  invariant(username, `params.username is required`);

  return await getFollowers(username, cookie);
};

export default function Followers() {
  const followers = useLoaderData();
  const { username } = useParams();
  invariant(username, `params.username is required`);

  return (
    <UserDialog
      username={username}
      variant="followers"
      users={followers}
    />
  );
}
