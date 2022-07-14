import { XCircleIcon } from '@heroicons/react/solid';
import clsx from 'clsx';

export function TweetSomethingImagePreviews({ images }) {
  if (images.length < 0) {
    return null;
  }

  return (
    <div className="flex mb-5 max-h-64 max-w-96">
      {images.map(({ id, previewUrl, abortUpload, uploading }) => {
        return (
          <div
            className="relative"
            key={id}
          >
            <img
              className="object-cover mr-5 rounded-lg max-w-64 max-h-64"
              src={previewUrl}
              alt={'images to add to tweet'}
            />

            <button
              type="button"
              aria-label="Remove image"
              className="bg-[#0000008a] rounded-full absolute h-10 w-10 top-5 left-5 cursor-pointer grid place-content-center"
              onClick={abortUpload}
            >
              <XCircleIcon className="w-6 h-6 text-white" />
            </button>

            <div
              className={clsx(
                'absolute border-t-2 rounded-full w-14 h-14 top-3 left-3  border-transparent animate-spin transition-colors pointer-events-none',
                uploading && '!border-twitterBlue',
              )}
            />
          </div>
        );
      })}
    </div>
  );
}
