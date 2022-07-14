import { Link, useFetcher } from '@remix-run/react';
import type { User } from '@twitter-clone/prisma';
import clsx from 'clsx';
import TextareaAutosize from 'react-textarea-autosize';
import { useAuthGuard, useImageUpload } from '~/hooks';
import { UserAvatar } from '~/modules/shared';
import { TweetSomethingButtonGroup } from './components/TweetSomethingButtonGroup';
import { TweetSomethingImagePreviews } from './components/TweetSomethingImagePreviews';
import { useResetTweet } from './hooks/useResetTweet';
import { useTweetSomethingForm } from './hooks/useTweetSomethingForm';

export function TweetSomething({ user }: { user: User }) {
  console.log('🚀 ~ file: TweetSomethings.tsx ~ line 12 ~ TweetSomething ~ user', user);
  const fetcher = useFetcher();
  const {
    images,
    clearImages,
    dropzone,
    loading: uploadingImages,
    errors,
  } = useImageUpload({ maxFiles: 3 });

  const authGuard = useAuthGuard({ redirect: true });

  const {
    tweetSomethingFormData: { content, replyPermissions },
    setContent,
    clearContent,
    setReplyPermissions,
    backspaceContent,
  } = useTweetSomethingForm();

  const tweetContentRef = useResetTweet(fetcher, clearContent, clearImages as () => void);
  const isFetching = fetcher.state !== 'idle';
  const tweetCharacterCount = content.length;

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isFetching) {
      return null;
    }

    const user = authGuard();
    if (!user) {
      return;
    }

    const imageIds = images.map(({ url }) => url);

    fetcher.submit(
      {
        content,
        replyPermissions,
        ...(imageIds?.length > 0 && { imageIds }),
        actionType: 'create',
      } as unknown as FormData,
      { method: 'post' },
    );
  };

  return (
    <div className="self-start p-5 bg-white shadow-sm b rounded-2xl">
      <div className="h-8 border-b border-[#f2f2f2] mb-3">
        <h2 className="md:text-md text-sm  leading-5 text-[#4F4F4F]">Tweet Something</h2>
      </div>

      <div className="flex">
        <Link
          to={user ? user.username : '/login'}
          className="relative w-10 h-10 md:w-14 md:h-14"
        >
          <UserAvatar
            avatarUrl={user?.profile?.avatarUrl}
            username={user.username}
          />
        </Link>

        <form
          className="w-full ml-3 md:ml-5 sm:mt-0 md:mt-4"
          onSubmit={onSubmit}
        >
          <div
            className={`border border-dashed border-white ${
              dropzone.isDragActive ? 'border-gray3' : ''
            }`}
            {...dropzone.getRootProps()}
          >
            <input {...dropzone.getInputProps()} />
            <TextareaAutosize
              className={clsx(
                'w-full h-24 pb-12 text-md md:text-lg font-light outline-none resize-none placeholder:md:text-lg placeholder-gray4',
                isFetching && 'opacity-50 cursor-auto',
              )}
              placeholder="What’s happening?"
              name="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onKeyDown={(e) => backspaceContent(e.key)}
              ref={tweetContentRef}
              disabled={isFetching}
            />
            <TweetSomethingImagePreviews images={images} />
          </div>
          {errors ? <p className="text-red-700">{errors}</p> : null}

          <TweetSomethingButtonGroup
            tweetCharacterCount={tweetCharacterCount}
            openImagePicker={dropzone.open}
            setReplyPermissions={setReplyPermissions}
            replyPermissions={replyPermissions}
            isFetching={isFetching}
            isUploadingImages={uploadingImages}
          />
        </form>
      </div>
    </div>
  );
}
