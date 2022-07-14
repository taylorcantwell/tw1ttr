import { Link, useFetcher } from '@remix-run/react';
import type { UserProfile } from '@twitter-clone/shared';
import { PrimaryButton } from '~/modules/shared';
import { links } from '~/helpers';
import { useAuthGuard } from '~/hooks';

type ProfileBannerProps = {
  profile: UserProfile;
};

export function ProfileBanner({ profile }: ProfileBannerProps) {
  const authGuard = useAuthGuard();
  const fetcher = useFetcher();
  const isFollowMutationLoading = fetcher.state !== 'idle';

  return (
    <>
      <div className="relative h-64 bg-twitterBlue">
        {profile.bannerUrl ? (
          <img
            className="object-cover object-center w-full h-full"
            src={profile.bannerUrl}
            alt="profile banner"
          />
        ) : (
          <div className="object-cover object-center w-full h-full" />
        )}
      </div>
      <div className="px-3">
        <div className="container relative flex justify-between p-6 mx-auto -mt-20 bg-white rounded-xl">
          <div className="flex flex-col justify-between w-full md:flex-row">
            <div className="relative self-center flex-shrink-0 w-40 h-40 -mt-32 rounded-lg md:self-start">
              {profile.avatarUrl ? (
                <img
                  className="object-cover w-full h-full rounded-lg bg-twitterBlue"
                  src={profile.avatarUrl}
                  alt="profile avatar"
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full text-6xl font-light transition-colors rounded-lg bg-gray4 text-twitterBlue">
                  ?
                </div>
              )}
            </div>

            <div className="w-full text-center md:ml-10 md:text-left">
              <div className="flex flex-col justify-center mt-5 mb-3 md:justify-start md:items-center md:mt-0 md:flex-row ">
                <p className="mt-5 text-2xl font-semibold md:mt-0 md:mr-6">{profile.username}</p>
                <div className="flex justify-center">
                  <Link
                    state={{ disableScroll: true }}
                    replace={true}
                    to={links.dialogs.following}
                    className="flex mr-5 transition-colors hover:text-twitterBlue"
                  >
                    <p className="mr-1">{profile.followeeCount}</p>
                    <p>Following</p>
                  </Link>
                  <Link
                    state={{ disableScroll: true }}
                    replace={true}
                    to={links.dialogs.followers}
                    className="flex transition-colors hover:text-twitterBlue"
                  >
                    <p className="mr-1">{profile.followerCount}</p>
                    <p>Followers</p>
                  </Link>
                </div>
              </div>
              <div className="flex">
                <p className="max-w-sm mx-auto mb-6 text-lg font-light text-center md:text-left md:mx-0 md:max-w-lg text-gray3">
                  {profile.bio}
                </p>
              </div>
            </div>

            <PrimaryButton
              disabled={isFollowMutationLoading}
              onClick={() => {
                const user = authGuard();

                if (!user) {
                  return null;
                }

                fetcher.submit(
                  { followeeId: profile.id.toString(), actionType: 'follow' },
                  { method: 'post' },
                );
              }}
            >
              {profile.isFollowing ? 'Following' : 'Follow'}
            </PrimaryButton>
          </div>
        </div>
      </div>
    </>
  );
}
