import { XCircleIcon, CameraIcon } from '@heroicons/react/solid';
import clsx from 'clsx';

type ImageUploadButtonProps = {
  onClick: () => void;
  abort: () => void;
  loading: boolean;
};

export function ImageUploadButton({ onClick, loading = false, abort }: ImageUploadButtonProps) {
  return (
    <button
      aria-label={loading ? 'Remove Image' : 'Add Image'}
      onClick={loading ? abort : onClick}
      className="absolute flex items-center justify-center w-10 h-10 transition border border-white rounded-full shadow-2xl cursor-pointer bottom-2 left-2 bg-slate-300 hover:border-twitterBlue"
    >
      <div
        className={clsx(
          'absolute border-t-2 rounded-full w-14 h-14 border-transparent animate-spin transition-colors pointer-events-none',
          loading && '!border-twitterBlue',
        )}
      />
      {loading ? (
        <div className="bg-[#0000008a] rounded-full absolute h-10 w-10 cursor-pointer grid place-content-center">
          <XCircleIcon className="w-6 h-6 text-white" />
        </div>
      ) : (
        <CameraIcon className="w-5 h-5 text-slate-600" />
      )}
    </button>
  );
}
