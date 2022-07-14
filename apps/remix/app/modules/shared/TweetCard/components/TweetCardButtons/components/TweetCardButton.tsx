import clsx from 'clsx';
import { useFetcher } from '@remix-run/react';
import { useAuthGuard } from '~/hooks';
import { stopPropagation } from '~/helpers';

//make overloaded
type TweetCardButtonProps = {
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  label?: number | null;
  Icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
  actionType?: 'like' | 'retweet' | 'save';
  tweetId?: string;
  isPressed?: boolean;
  focusReply?: () => void;
};

type MouseClickEvent = React.MouseEvent<HTMLButtonElement, MouseEvent>;

export function TweetCardButton({
  Icon,
  label,
  actionType,
  tweetId,
  onClick,
  isPressed,
  focusReply,
}: TweetCardButtonProps) {
  const fetcher = useFetcher();
  const disabled = fetcher.state !== 'idle';
  const authGuard = useAuthGuard();

  const clickHandler = onClick
    ? (e: MouseClickEvent) => {
        e.stopPropagation();
        if (!focusReply) return null;
        focusReply();

        onClick(e);
      }
    : (e: MouseClickEvent) => {
        stopPropagation(e);
        if (!tweetId || !actionType) return null;
        const user = authGuard();

        if (!user) {
          return null;
        }

        fetcher.submit({ tweetId, actionType }, { method: 'post' });
      };

  return (
    <button
      disabled={disabled}
      onClick={clickHandler}
      className={clsx(
        disabled && 'opacity-50',
        'flex items-center px-2  md:px-8 py-2 rounded-lg hover:bg-grayHover transition',
      )}
    >
      <Icon className={clsx(isPressed && 'text-twitterBlue', 'inline w-6 h-6')} />
      <span className="ml-3">{label}</span>
    </button>
  );
}
