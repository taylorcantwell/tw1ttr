import { useActionData, useSearchParams } from '@remix-run/react';
import { withZod } from '@remix-validated-form/with-zod';
import { ValidatedForm } from 'remix-validated-form';
import { z } from 'zod';
import { Fade, SubmitButton, ValidatedInput } from '~/modules/shared';

export function Login() {
  const [searchParams] = useSearchParams();
  const loginResult = useActionData();
  const hasRegistered = searchParams.get('registered');

  return (
    <Fade>
      <ValidatedForm
        method="post"
        action="/login"
        validator={loginValidator}
        noValidate
      >
        <div className="flex flex-col mb-5">
          <ValidatedInput
            className="px-3 py-1 text-black rounded-md"
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
        </div>

        <div className="h-5 mb-1">
          {hasRegistered ? (
            <span className="text-green-500">Registered successfully. Now you can login.</span>
          ) : (
            <span className="text-red-500">{loginResult?.message ? loginResult.message : ''}</span>
          )}
        </div>

        <SubmitButton className="w-full py-2 mb-8 font-bold text-white bg-blue-500 rounded-3xl hover:bg-blue-700" />
      </ValidatedForm>
    </Fade>
  );
}

const loginValidator = withZod(
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
