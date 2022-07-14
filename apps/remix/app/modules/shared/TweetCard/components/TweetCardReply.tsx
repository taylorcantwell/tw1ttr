import { useFetcher, useLocation } from '@remix-run/react';
import clsx from 'clsx';
import React, { useEffect } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { useOptionalUser, useAuthGuard } from '~/hooks';
import { PrimaryButton } from '../../Buttons';
import { UserAvatar } from '../../UserAvatar';

type TweetCardReplyProps = {
  tweetId: number;
  replyRef: React.MutableRefObject<HTMLTextAreaElement | undefined>;
  focusReply: () => void;
  clearReply: () => void;
};

export function TweetCardReply({ tweetId, replyRef, focusReply, clearReply }: TweetCardReplyProps) {
  const fetcher = useFetcher();
  const location = useLocation();
  const { user } = useOptionalUser();
  const authGuard = useAuthGuard();
  const locationState = location.state as { commenting?: boolean };
  const autoFocusCommentInput = locationState?.commenting;
  const isFetching = fetcher.state !== 'idle';
  const submittedReply = fetcher.type === 'done';

  const onSubmit = async (e) => {
    e.preventDefault();
    const user = authGuard();

    if (!user) {
      return null;
    }

    const form = new FormData(e.target);
    const comment = form.get('comment') as string;
    if (!comment) return null;

    fetcher.submit(
      {
        tweetId: tweetId.toString(),
        comment,
        actionType: 'comment',
      },
      { method: 'post' },
    );
  };

  useEffect(() => {
    if (autoFocusCommentInput) {
      focusReply();
    }
  }, [focusReply, autoFocusCommentInput]);

  useEffect(() => {
    if (submittedReply) {
      clearReply();
    }
  }, [clearReply, submittedReply]);

  return (
    <fetcher.Form
      onSubmit={onSubmit}
      className="flex my-3 justify-items-stretch"
    >
      <div className="w-8 h-8 mr-3 md:w-10 md:h-10">
        <UserAvatar
          avatarUrl={user?.profile?.avatarUrl}
          username={user?.username}
        />
      </div>

      <TextareaAutosize
        className={clsx(
          'flex-grow p-2 border rounded-md resize-none bg-lightGray border-grayHover transition',
          isFetching && 'opacity-50 cursor-auto',
        )}
        ref={replyRef}
        name="comment"
      />

      <PrimaryButton
        className=" ml-1 md:ml-5 h-10 md:w-[96px]"
        loading={isFetching}
        type="submit"
      >
        Reply
      </PrimaryButton>
    </fetcher.Form>
  );
}
