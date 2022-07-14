import { UserCard } from './UserCard';
import type { UserInfoBasic } from '@twitter-clone/shared';

type UserCardListProps = {
  users: UserInfoBasic[];
};

export function UserCardList({ users }: UserCardListProps) {
  if (!users || users.length === 0) {
    return <p className="mx-auto">Nothing to show</p>;
  }
  return (
    <>
      {users?.map((user) => (
        <UserCard
          key={user.id}
          user={user}
        />
      ))}
    </>
  );
}
