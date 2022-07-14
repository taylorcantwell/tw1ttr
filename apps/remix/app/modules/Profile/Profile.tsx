import { Outlet, useLoaderData } from '@remix-run/react';
import type { Tweet, UserProfile } from '@twitter-clone/shared';
import { AsideMenu, PrimaryLayoutContainer, TweetList } from '~/modules/shared';
import { useOptionalUser } from '~/hooks';
import { ProfileBanner } from './components/ProfileBanner';
import { UpdateProfileBanner } from './components/UpdateProfileBanner';

type ProfileLoaderData = {
  profile: UserProfile;
  tweets: Tweet[];
};

export function Profile() {
  const { profile, tweets } = useLoaderData<ProfileLoaderData>();
  console.log('🚀 ~ file: Profile.tsx ~ line 15 ~ Profile ~ profile', profile);
  const user = useOptionalUser();
  const isViewingOwnProfile = user?.username === profile?.username;

  return (
    <div className="relative font-poppins">
      {isViewingOwnProfile ? (
        <UpdateProfileBanner profile={profile} />
      ) : (
        <ProfileBanner profile={profile} />
      )}
      <PrimaryLayoutContainer>
        <AsideMenu
          ariaLabel="filter tweets"
          items={asideMenuItems}
        />
        <main className="self-start h-full -mt-10">
          <TweetList
            tweets={tweets}
            variant="profile"
          />
        </main>
      </PrimaryLayoutContainer>
      <Outlet />
    </div>
  );
}

const asideMenuItems = [
  { description: 'Tweet', url: 'test' },
  { description: 'Tweets & replies', url: 'test' },
  { description: 'Media', url: 'test' },
  { description: 'Likes', url: 'test' },
];
