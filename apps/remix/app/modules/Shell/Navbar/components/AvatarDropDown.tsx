import { ChevronDownIcon, GlobeIcon, LogoutIcon } from '@heroicons/react/outline';
import { Close, Content, Root, Trigger } from '@radix-ui/react-popover';
import { useFetcher, useNavigate } from '@remix-run/react';
import clsx from 'clsx';
import { links } from '~/helpers';
import type { UserInfoMin } from '@twitter-clone/shared';

export function AvatarDropDown({ user }: { user: UserInfoMin }) {
  const fetcher = useFetcher();
  const navigator = useNavigate();

  return (
    <Root>
      <Trigger
        className="justify-end"
        asChild
      >
        <button
          className="flex items-center px-5 py-2 border border-white rounded-lg hover:border-twitterBlue"
          aria-label="main menu"
        >
          <div className="relative w-10 h-10 mr-3">
            {user?.profile?.avatarUrl ? (
              <img
                className="object-cover w-full h-full rounded-lg"
                src={user?.profile?.avatarUrl}
                alt="avatar"
              />
            ) : (
              <div className="flex items-center justify-center w-full h-full text-3xl bg-opacity-50 rounded-lg bg-twitterBlue text-twitterBlue">
                ?
              </div>
            )}
          </div>
          <div>{user.username}</div>
          <ChevronDownIcon className="w-5 h-5" />
        </button>
      </Trigger>

      <Content className="w-56 p-3 mt-5 ml-auto text-sm bg-white border-2 shadow-sm rounded-xl border-grayHover animate-slideUpAndFade">
        <Close
          onClick={() => navigator(links.profile(user.username))}
          className={buttonStyles}
        >
          <GlobeIcon className="w-4 h-4 mr-2" />
          My Profile
        </Close>
        <div className="h-[1px] my-3 bg-gray4" />
        <Close
          onClick={() =>
            fetcher.submit({ actionType: 'logout' }, { method: 'post', action: '/logout' })
          }
          className={clsx(buttonStyles, 'text-red-900')}
        >
          <LogoutIcon className="w-4 h-4 mr-2" />
          Logout
        </Close>
      </Content>
    </Root>
  );
}

const buttonStyles =
  'w-full transition duration-200 flex items-center px-2 py-3 rounded-lg bg-grayHover hover:bg-gray4';
