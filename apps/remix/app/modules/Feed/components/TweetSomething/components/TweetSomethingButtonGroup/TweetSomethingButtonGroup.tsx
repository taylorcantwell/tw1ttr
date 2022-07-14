import { PhotographIcon } from '@heroicons/react/solid';
import type { ReplyPermission } from '@twitter-clone/prisma';
import clsx from 'clsx';
import { PrimaryButton } from '~/modules/shared';
import { useAuthGuard } from '~/hooks';
import PermissionsPopup from './PermissionsPopup';

type TweetSomethingButtons = {
  openImagePicker: () => void;
  setReplyPermissions: (replyPermission: ReplyPermission) => void;
  replyPermissions: 'EVERYONE' | 'FOLLOWERS';
  disabled?: boolean;
  tweetCharacterCount: number;
  isFetching: boolean;
  isUploadingImages: boolean;
};

export function TweetSomethingButtonGroup({
  openImagePicker,
  setReplyPermissions,
  replyPermissions,
  tweetCharacterCount,
  isFetching,
  isUploadingImages,
}: TweetSomethingButtons) {
  const authGuard = useAuthGuard();

  return (
    <div className="flex items-end justify-between">
      <div className="flex items-end">
        <button
          type="button"
          onClick={() => {
            const user = authGuard();

            if (!user) {
              return null;
            }

            openImagePicker();
          }}
        >
          <PhotographIcon className="mr-5 cursor-pointer h-7 text-twitterBlue hover:text-blue-800" />
        </button>
        <PermissionsPopup
          setReplyPermissions={setReplyPermissions}
          replyPermissions={replyPermissions}
        />
      </div>

      <div className="flex items-end">
        <div
          className={clsx('mr-5 hidden md:block', tweetCharacterCountStyling(tweetCharacterCount))}
        >
          {tweetCharacterCount} / 50
        </div>

        <PrimaryButton
          disabled={isUploadingImages || tweetCharacterCount === 0}
          type="submit"
          loading={isFetching}
          className="h-10 w-[99px]"
        >
          Tweet
        </PrimaryButton>
      </div>
    </div>
  );
}

const tweetCharacterCountStyling = (count: number) => {
  if (count === 50) {
    return 'text-red-700';
  }

  if (count >= 40) {
    return 'text-orange-600';
  }

  if (count >= 30) {
    return 'text-orange-500';
  }

  if (count >= 15) {
    return 'text-green-600';
  }

  if (count < 15) {
    return 'text-green-700';
  }
};
