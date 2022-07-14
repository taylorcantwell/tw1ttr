import { Outlet } from '@remix-run/react';
import { NavBar, MobileFooter } from '~/modules/Shell';

export default function AppShell() {
  return (
    <>
      <NavBar>
        <Outlet />
      </NavBar>
      <MobileFooter />
    </>
  );
}
