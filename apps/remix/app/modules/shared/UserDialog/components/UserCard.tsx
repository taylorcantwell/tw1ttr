import type { UserInfoBasic } from '@twitter-clone/shared';
import { Link, useFetcher } from '@remix-run/react';
import { PrimaryButton, UserAvatar } from '~/modules/shared';
import { useAuthGuard } from '~/hooks';

type UserCardProps = Omit<UserInfoBasic, 'id'>;

export function UserCard({ user }: UserCardProps) {
  const authGuard = useAuthGuard();
  const fetcher = useFetcher();

  return (
    <div className="py-5 bg-white border-t border-b border-gray4">
      <div className="flex items-start">
        <UserAvatar
          username={user.username}
          avatarUrl={user.avatarUrl}
        />
        <div className="flex">
          <div className="flex flex-col justify-between mr-3">
            <Link
              className="transition-colors hover:text-twitterBlue"
              to={'/' + user.username}
            >
              {user.username}
            </Link>
            <div>{user.followerCount} followers</div>
          </div>
        </div>
        {/* <PrimaryButton
          onClick={() => {
            const loggedInUser = authGuard();

            if (!loggedInUser) {
              return null;
            }

            fetcher.submit(
              { followeeId: user.id.toString(), actionType: 'follow' },
              { method: 'post', action: '/tweet' },
            );
          }}
          className="ml-auto"
        >
          Follow
        </PrimaryButton> */}
      </div>
      <div className="mt-5">{user.bio}</div>
    </div>
  );
}
