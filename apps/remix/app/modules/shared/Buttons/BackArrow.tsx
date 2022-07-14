import { ArrowLeftIcon } from '@heroicons/react/solid';
import { useNavigate } from '@remix-run/react';

export function BackArrow({ className }: { className?: string }) {
  const navigator = useNavigate();
  return (
    <div className="container px-5 mx-auto">
      <button
        onClick={() => navigator(-1)}
        className={`flex items-center !my-5 text-twitterBlue w-min hover:opacity-80 transition-colors ${className}`}
      >
        <ArrowLeftIcon className={`w-5 h-5 mr-3`} />
        <p>Back</p>
      </button>
    </div>
  );
}
