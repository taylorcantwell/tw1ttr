import { NavLink, Outlet } from '@remix-run/react';
import clsx from 'clsx';

export function StartShell() {
  return (
    <div className="flex h-screen bg-black bg-gray-600">
      <div className="relative hidden w-1/2 h-full md:block">
        <div className="w-full h-full bg-twitterBlue" />
      </div>
      <main className="flex justify-center w-full px-12 py-20 text-white md:justify-start md:w-1/2">
        <div className="max-w-sm">
          <p className="text-2xl font-bold transition-colors text-twitterBlue hover:opacity-50">
            Tw1ttr
          </p>
          <h1 className="mb-4 text-3xl font-bold">Join Tw1ttr today.</h1>
          <Outlet />
          <div className="h-[1px] rounded-2xl bg-gray4 mb-7" />
          <NavLink
            to="register"
            replace
            className={({ isActive }) => clsx(commonStyles, isActive && activeFormStyle)}
          >
            <span className="block">Register</span>
          </NavLink>

          <p className="my-2 text-center">Or</p>

          <NavLink
            to="login"
            replace
            className={({ isActive }) => clsx(commonStyles, isActive && activeFormStyle)}
          >
            Sign In
          </NavLink>
        </div>
      </main>
    </div>
  );
}

const commonStyles =
  'rounded-3xl w-full py-2 bg-transparent border md:mx-0 font-bold text-twitterBlue hover:text-white grid place-items-center';

const activeFormStyle = '!text-white !bg-blue-500 !cursor-default';
