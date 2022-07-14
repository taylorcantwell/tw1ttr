import { useNavigate } from '@remix-run/react';
import { formatDate, links, stopPropagation } from '~/helpers';
import type { Comment } from '@twitter-clone/shared';
import LikeButton from './components/TweetCardLikeButton';
import { motion } from 'framer-motion';
import { UserAvatar } from '~/modules/shared/UserAvatar';

export function TweetCardComments({ tweetComments }: { tweetComments: Comment[] }) {
  const navigator = useNavigate();

  if (tweetComments?.length === 0) {
    return null;
  }

  return (
    <>
      {tweetComments.map(
        ({ id: commentId, comment, username, createdAt, likeCount, isLiked, avatarUrl }) => {
          return (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              key={commentId}
              className="flex py-5 border-t border-grayHover"
            >
              <button
                onClick={(e) => {
                  stopPropagation(e);
                  navigator(links.profile(username));
                }}
                className="flex mr-3 md:w-10 md:h-10 w-8 h-8"
              >
                <UserAvatar
                  username={username}
                  avatarUrl={avatarUrl}
                />
              </button>
              <div className="w-full">
                <div className="p-4 rounded-md bg-lightGray">
                  <button
                    onClick={(e) => {
                      stopPropagation(e);
                      navigator(links.profile(username));
                    }}
                    className="mr-3 font-sans text-black transition-all hover:underline"
                  >
                    {username}
                  </button>
                  <span className="text-sm font-noto text-gray4">{formatDate(createdAt)}</span>
                  <div className="py-3 font-noto">{comment}</div>
                  <LikeButton
                    commentId={commentId}
                    isLiked={isLiked}
                    likeCount={likeCount}
                  />
                </div>
              </div>
            </motion.div>
          );
        },
      )}
    </>
  );
}
