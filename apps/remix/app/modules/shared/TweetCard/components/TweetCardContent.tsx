import { useNavigate } from '@remix-run/react';
import { formatDate, links, stopPropagation } from '~/helpers';
import { UserAvatar } from '../../UserAvatar';
import { useParams } from '@remix-run/react';

type TweetCardContentProps = {
  content: string;
  createdAt: Date;
  author: string;
  avatarUrl: string;
};

export function TweetCardContent({ createdAt, content, author, avatarUrl }: TweetCardContentProps) {
  const navigator = useNavigate();
  const { username } = useParams();

  return (
    <div>
      <div className="flex">
        <UserAvatar
          username={author}
          avatarUrl={avatarUrl}
        />

        <div>
          <button
            onClick={(e) => {
              stopPropagation(e);
              if (username === author) {
                return null;
              }
              navigator(links.profile(author));
            }}
            className="font-sans text-black transition-all cursor-pointer hover:underline"
          >
            {author}
          </button>

          <p className="text-sm text-gray4">{formatDate(createdAt)}</p>
        </div>
      </div>
      <p className="py-4 font-extralight">{content}</p>
    </div>
  );
}
