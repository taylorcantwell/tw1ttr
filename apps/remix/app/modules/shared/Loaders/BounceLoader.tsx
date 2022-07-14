import clsx from 'clsx';

export function BounceLoader({ className }: { className?: string }) {
  return (
    <div className={clsx('flex', className)}>
      <div className={`${circleCommonClasses} mr-1 animate-bounce`}></div>
      <div className={`${circleCommonClasses} mr-1 animate-bounce200`}></div>
      <div className={`${circleCommonClasses} animate-bounce400`}></div>
    </div>
  );
}

const circleCommonClasses = 'h-2.5 w-2.5 bg-twitterBlue rounded-full';
