import { withZod } from '@remix-validated-form/with-zod';
import { ValidatedForm } from 'remix-validated-form';
import { z } from 'zod';
import { SubmitButton, ValidatedInput, Fade } from '~/modules/shared';
import { useActionData } from '@remix-run/react';

export function Register() {
  const registerResult = useActionData();

  return (
    <Fade>
      <ValidatedForm
        method="post"
        action="/register"
        validator={registerValidator}
        noValidate
      >
        <div className="flex flex-col mb-5">
          <ValidatedInput
            className="px-3 py-1 text-black rounded-md "
            placeholder="Username"
            name="username"
            label="Username"
          />

          <ValidatedInput
            className="px-3 py-1 text-black rounded-md "
            placeholder="Password"
            name="password"
            label="Password"
          />
          <span className="h-5 mb-1 text-red-500">
            {registerResult?.message ? registerResult.message : ''}
          </span>
        </div>

        <SubmitButton className="w-full py-2 mb-8 font-bold text-white bg-blue-500 rounded-3xl hover:bg-blue-700" />
      </ValidatedForm>
    </Fade>
  );
}

const registerValidator = withZod(
  z.object({
    username: z
      .string()
      .nonempty('Username is required')
      .min(5, 'Username should at least 5 characters')
      .max(20, 'Username should have max 20 characters'),
    password: z
      .string()
      .nonempty('Password is required')
      .min(5, 'Password should at least 5 characters')
      .max(20, 'Password should have max 20 characters'),
  }),
);
