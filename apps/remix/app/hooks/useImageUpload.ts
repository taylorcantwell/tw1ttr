import { useCallback, useState } from 'react';
import { apiEndpointsClient, composeRequestInit } from '~/helpers';
import { v4 as uuidv4 } from 'uuid';
import { useDropzone } from 'react-dropzone';
import { useMethods } from 'react-use';
import type { DropzoneOptions, FileError, FileRejection } from 'react-dropzone';

export type Image = {
  id: string;
  url: string;
  previewUrl: string;
  uploading: boolean;
  abortUpload: () => void;
};

type Options = DropzoneOptions & {
  overwrite?: boolean;
};

export function useImageUpload(options: Options) {
  const [images, methods] = useMethods<ReturnType<typeof createMethods>, Image[]>(
    createMethods,
    [],
  );
  const [errors, setErrors] = useState<undefined | string>();

  const onDrop = useCallback(
    (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      setErrors('');

      if (options.maxFiles && images.length >= options.maxFiles && !options.overwrite) {
        setErrors('Max files reached');
        return;
      }

      fileRejections.forEach((file: FileRejection) => {
        file.errors.forEach((err: FileError) => {
          if (err.code === 'file-too-large') {
            setErrors(err.message);
          }

          if (err.code === 'file-invalid-type') {
            setErrors(err.message);
          }
        });
      });

      acceptedFiles.forEach((file) => {
        const abortController = new AbortController();
        const id = uuidv4();

        const image = {
          id,
          previewUrl: URL.createObjectURL(file),
          uploading: true,
          url: '',
          abortUpload: () => {
            abortController.abort();
            methods.removeImage({ id });
            setErrors('');
          },
        };

        if (options?.overwrite) {
          methods.replaceImage({ image });
        } else {
          methods.addImage({ image });
        }

        blobToBase64(file).then((base64) => {
          return fetch(
            apiEndpointsClient.cloudinary.upload,
            composeRequestInit({
              body: { data: base64 },
              signal: abortController.signal,
              method: 'POST',
            }),
          )
            .then((res) => res.json())
            .then(({ url }) => {
              console.log('🚀 ~ file: useImageUpload.ts ~ line 81 ~ .then ~ url', url);

              methods.uploadComplete({ id: image.id, url });
            })
            .catch((err) => {
              if (err.name !== 'AbortError') {
                methods.removeImage({ id });
              }
            });
        });
      });
    },
    [images],
  );

  const dropzone = useDropzone({
    onDrop,
    accept: ['image/jpeg', 'image/png'],
    noClick: true,
    ...options,
  });

  const loading = images.some((image) => image.uploading);

  if (options.maxFiles === 1) {
    return { images: images[0], loading, errors, dropzone };
  }

  return { images, clearImages: methods.clearImages as () => void, loading, errors, dropzone };
}

function createMethods(state: Image[] | []) {
  return {
    removeImage({ id }: { id: string }) {
      return [...state.filter((img) => img.id !== id)];
    },
    addImage({ image }: { image: Image }) {
      return [...state, image];
    },
    uploadComplete({ id, url }: { id: string; url: string }) {
      return [
        ...state.map((image) => (image.id === id ? { ...image, uploading: false, url } : image)),
      ];
    },
    replaceImage({ image }: { image: Image }) {
      return [image];
    },
    clearImages() {
      return [];
    },
  };
}

function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, _) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string | PromiseLike<string>);
    reader.readAsDataURL(blob);
  });
}
