import { Link } from '@remix-run/react';
import { stopPropagation } from '~/helpers';
import { AvatarPlaceHolder } from './AvatarPlaceHolder';

type UserAvatarProps = {
  avatarUrl?: string;
  className?: string;
  username: string;
};

export function UserAvatar({ avatarUrl, username }: UserAvatarProps) {
  if (!username) {
    return <AvatarPlaceHolder />;
  }

  return (
    <Link
      onClick={(e) => {
        stopPropagation(e);
      }}
      to={'/' + username}
      className="relative self-center flex-shrink-0 w-8 h-8 mr-5 rounded-md md:w-10 md:h-10 md:self-start"
    >
      {avatarUrl ? (
        <img
          className="object-cover w-full h-full rounded-lg"
          src={avatarUrl}
          alt="avatar"
        />
      ) : (
        <AvatarPlaceHolder />
      )}
    </Link>
  );
}
