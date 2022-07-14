import { PencilAltIcon } from '@heroicons/react/outline';
import { Link, useFetcher } from '@remix-run/react';
import type { UserProfile } from '@twitter-clone/shared';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { BounceLoader, Fade } from '~/modules/shared';
import { links } from '~/helpers';
import { useImageUpload } from '~/hooks/useImageUpload';
import { useUpdateProfile } from '../hooks/useUpdateProfile';
import { ImageUploadButton } from './ImageUploadButton';

type UpdateProfileBannerProps = {
  profile: UserProfile;
};

export function UpdateProfileBanner({ profile }: UpdateProfileBannerProps) {
  const fetcher = useFetcher();
  const isSavingProfile = fetcher.state !== 'idle';
  const { profileForm, setProfileField, isFormValidated } = useUpdateProfile({
    defaults: {
      bio: profile.bio,
    },
  });

  const {
    images: bannerImage,
    loading: loadingBanner,
    dropzone: bannerUpload,
    errors: bannerError,
  } = useImageUpload({ maxFiles: 1, multiple: false, overwrite: true });

  const {
    images: uploadedAvatarImage,
    loading: loadingProfile,
    dropzone: profileUpload,
    error: profileError,
  } = useImageUpload({ maxFiles: 1, multiple: false, overwrite: true });

  const isUploadingImages = loadingBanner || loadingProfile;
  const hasProfileBeenUpdated =
    profileForm.bio !== profile.bio || bannerImage?.url || uploadedAvatarImage?.url;
  const isSubmissionDisabled = isUploadingImages || !isFormValidated;
  const avatarImage = uploadedAvatarImage?.previewUrl || profile.avatarUrl;

  return (
    <>
      <input {...bannerUpload.getInputProps()} />
      <input {...profileUpload.getInputProps()} />
      <AnimatePresence>
        <div className="relative h-64 bg-twitterBlue">
          {bannerImage?.previewUrl || profile.bannerUrl ? (
            <img
              className="object-cover object-center w-full h-full"
              src={bannerImage?.previewUrl || profile.bannerUrl}
              alt="profile banner"
            />
          ) : (
            <div className="object-cover object-center w-full h-full" />
          )}
          <div className="absolute w-5 h-5 rounded-md bottom-[50%] left-[50%] translate-x-1/2">
            <ImageUploadButton
              onClick={bannerUpload.open}
              abort={bannerImage?.abortUpload}
              loading={bannerImage?.uploading}
            />
            {bannerError ? <p className="mt-10 text-sm text-red-700">{bannerError}</p> : null}
          </div>
        </div>
        <div className="px-3">
          <div className="container relative flex justify-between p-6 mx-auto -mt-20 bg-white rounded-xl">
            <div className="flex flex-col justify-between w-full md:flex-row">
              <div className="relative self-center flex-shrink-0 w-40 h-40 -mt-32 rounded-lg md:self-start">
                {avatarImage ? (
                  <img
                    className="object-cover w-full h-full rounded-lg bg-twitterBlue"
                    src={avatarImage}
                    alt="profile avatar"
                  />
                ) : (
                  <div className="flex items-center justify-center w-full h-full text-6xl font-light transition-colors rounded-lg bg-gray4 text-twitterBlue">
                    ?
                  </div>
                )}

                <ImageUploadButton
                  onClick={profileUpload.open}
                  abort={uploadedAvatarImage?.abortUpload}
                  loading={uploadedAvatarImage?.uploading}
                />

                {profileError && <Fade className="mt-2 text-sm text-red-700">{profileError}</Fade>}
              </div>

              <div className="w-full text-center md:ml-10 md:text-left">
                <div className="flex flex-col justify-center mt-5 mb-3 md:justify-start md:items-center md:mt-0 md:flex-row ">
                  <p className="p-1 mt-5 text-2xl font-semibold md:mt-0 md:mr-6">
                    {profile.username}
                  </p>
                  <div className="flex justify-center">
                    <Link
                      to={links.dialogs.following}
                      className="flex mr-5 transition-colors hover:text-twitterBlue"
                    >
                      <p className="mr-1">{profile.followeeCount}</p>
                      <p>Following</p>
                    </Link>
                    <Link
                      to={links.dialogs.followers}
                      className="flex transition-colors hover:text-twitterBlue"
                    >
                      <p className="mr-1">{profile.followerCount}</p>
                      <p>Followers</p>
                    </Link>
                  </div>
                </div>
                <div className="flex md:items-center">
                  <label
                    className="hidden cursor-pointer md:block"
                    htmlFor="bio"
                  >
                    <PencilAltIcon className="w-5 h-5 mr-2" />
                  </label>
                  <input
                    id="bio"
                    aria-label="update your bio"
                    value={profileForm.bio}
                    name="bio"
                    placeholder="Add a bio..."
                    onChange={setProfileField}
                    className="w-2/3 p-1 mx-auto text-lg font-light text-center md:text-left md:mx-0 text-gray3"
                  />
                </div>
                <div className="h-3 mt-3 text-xs text-red-700">
                  {profileForm.errors.bio ? (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      {profileForm.errors.bio}
                    </motion.p>
                  ) : (
                    ''
                  )}
                </div>
              </div>

              {hasProfileBeenUpdated ? (
                <Fade className="flex items-center justify-center w-full mt-5 md:mt-0 md:w-36 text-twitterBlue">
                  <button
                    className={clsx(
                      isSubmissionDisabled && 'opacity-50 cursor-auto',
                      `transition-colors flex items-center justify-center cursor-pointer   text-twitterBlue`,
                    )}
                    disabled={isSubmissionDisabled}
                    onClick={() => {
                      fetcher.submit(
                        {
                          actionType: 'updateProfile',
                          bio: profileForm.bio,
                          ...(bannerImage?.url && { bannerUrl: bannerImage?.url }),
                          ...(uploadedAvatarImage?.url && { avatarUrl: uploadedAvatarImage?.url }),
                        },
                        { method: 'post' },
                      );
                    }}
                  >
                    {isSavingProfile ? <BounceLoader /> : 'Save Profile Updates'}
                  </button>
                </Fade>
              ) : (
                <div className="w-36" />
              )}
            </div>
          </div>
        </div>
      </AnimatePresence>
    </>
  );
}
