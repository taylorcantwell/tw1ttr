import { Close, Content, Portal, Root } from '@radix-ui/react-dialog';
import { useNavigate } from '@remix-run/react';
import { UserCardList } from './components/UserCardList';
import type { UserInfoBasic } from '@twitter-clone/shared';

type UserDialogVariants = 'saves' | 'followers' | 'following' | 'likes' | 'retweets';

type UserDialogProps = {
  username?: string;
  variant: UserDialogVariants;
  users: UserInfoBasic[];
};

export function UserDialog({ username = '', variant, users }: UserDialogProps) {
  console.log('🚀 ~ file: UserDialog.tsx ~ line 15 ~ UserDialog ~ users', users);
  const navigator = useNavigate();

  return (
    <Root
      defaultOpen={true}
      onOpenChange={() => navigator('..', { replace: true, state: { disableScroll: true } })}
    >
      <Portal>
        <Content className="flex items-center justify-center ">
          <div className="fixed flex flex-col w-full max-w-md p-5 mx-auto transform -translate-x-1/2 -translate-y-1/2 bg-transparent md:max-w-3xl lg:max-w-4xl sm:rounded-3xl left-1/2 top-1/2">
            <div className="p-5 bg-white border-2 rounded-lg shadow-md border-twitterBlue animate-fade">
              <div className="flex items-center justify-between mb-5 text-twitterBlue">
                <div>{composeDialogTitle(variant, username)}</div>
                <Close className="flex flex-col items-center justify-center text-gray-100 duration-200 bg-gray-900 bg-opacity-50 outline-none cursor-pointer hover:bg-opacity-100 lg:bg-transparent lg:hover:opacity-30">
                  Close
                </Close>
              </div>
              <UserCardList users={users} />
            </div>
          </div>
        </Content>
      </Portal>
    </Root>
  );
}

function composeDialogTitle(variant: UserDialogVariants, username: string) {
  return {
    retweets: `Retweeted By:`,
    likes: 'Liked By:',
    saves: 'Saved by:',
    followers: `${username} is followed by:`,
    following: `${username} is following:`,
  }[variant];
}
