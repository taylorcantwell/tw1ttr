import { useState } from 'react';

export function useUpdateProfile({ defaults }) {
  const { bio } = defaults;

  const [profileForm, setUpdateForm] = useState({
    bio,
    profileImage: null,
    errors: { username: null, bio: null },
  });

  const setProfileField = (e) => {
    setUpdateForm({
      ...profileForm,
      [e.target.name]: e.target.value,
      errors: {
        ...profileForm.errors,
        [e.target.name]: validateUpdateProfile(e.target.name, e.target.value),
      },
    });
  };

  return {
    profileForm,
    setProfileField,
    isFormValidated: !Object.values(profileForm.errors).some((x) => !!x),
  };
}

const validateUpdateProfile = (name, value) => {
  switch (name) {
    case 'bio':
      return validateBio(value);

    default:
      break;
  }
};

const validateBio = (bio: string) => {
  if (typeof bio !== 'string' || bio.length < 3) {
    return `Bio must be at least 3 characters long`;
  }
  if (bio.length > 50) {
    return `Bio must be less than 50 characters long`;
  }
};
