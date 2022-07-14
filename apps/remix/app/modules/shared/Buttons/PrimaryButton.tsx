import clsx from 'clsx';
import { BounceLoader } from '../Loaders';

type PrimaryButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit';
  className?: string;
  disabled?: boolean;
  loading?: boolean;
};

export function PrimaryButton({
  children,
  onClick,
  className,
  disabled,
  type = 'button',
  loading,
}: PrimaryButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      loading={loading}
      onClick={onClick}
      className={clsx(
        `self-center py-2 text-xs md:text-sm text-white transition border-2 border-white rounded-lg md:px-7 px-3  bg-twitterBlue hover:text-twitterBlue hover:bg-white hover:border-twitterBlue`,
        disabled &&
          !loading &&
          'opacity-50 hover:!text-white hover:border-white hover:bg-twitterBlue',
        loading &&
          'bg-transparent border-2 hover:bg-transparent border-twitterBlue hover:border-twitterBlue hover:border-2',
        className,
      )}
    >
      {loading ? <BounceLoader className={'mt-1'} /> : children}
    </button>
  );
}
