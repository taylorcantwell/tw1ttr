import { useOptionalUser } from '~/hooks';
import { LoggedInNavigation } from './components/LoggedInNavigation';
import { LoggedOutNavigation } from './components/LoggedOutNavigation';

export function NavBar({ children }: { children: React.ReactNode }) {
  const user = useOptionalUser();

  return (
    <>
      <header className="sticky top-0 z-50 p-5 text-lg font-light bg-white shadow-sm md:p-3 translate text-gray3">
        <div className="container flex items-center justify-between h-10 mx-auto md:h-20">
          {user ? <LoggedInNavigation user={user} /> : <LoggedOutNavigation />}
        </div>
      </header>
      {children}
    </>
  );
}
