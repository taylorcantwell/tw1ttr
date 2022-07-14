import clsx from 'clsx';

export const AvatarPlaceHolder = ({ className }: { className?: string }) => {
  return (
    <div
      className={clsx(
        'flex items-center justify-center w-full h-full  transition-colors bg-opacity-50 rounded-lg bg-twitterBlue text-twitterBlue hover:bg-opacity-70 text-sm md:text-3xl',
        className,
      )}
    >
      ?
    </div>
  );
};
