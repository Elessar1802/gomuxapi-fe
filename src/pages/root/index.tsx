import {
  UserIcon,
  HomeIcon,
  AtSymbolIcon,
  ArchiveBoxIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline';
import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import './index.scss';

export default function App(): React.ReactNode {
  function expandSidebar() {
    const element = document.getElementById('sidebar__texts') as HTMLElement;
    if (element.classList.contains('hidden')) {
      element.classList.remove('hidden');
    }
    element.classList.remove('sidebar__texts--hide');
    element.classList.add('sidebar__texts--show');
  }

  function closeSidebar() {
    const element = document.getElementById('sidebar__texts') as HTMLElement;
    element.classList.remove('sidebar__texts--show');
    element.classList.add('sidebar__texts--hide');
  }

  interface NavLinks {
    expander?: boolean;
    spacer?: boolean;
    path: string;
    icon?: React.ReactNode;
    about: string;
  }

  const navlinks: NavLinks[] = [
    { path: '/profile', icon: <UserIcon />, about: 'Profile' },
    { spacer: true, path: '1', about: '' },
    { path: '/dashboard', icon: <HomeIcon />, about: 'Dashboard' },
    { path: '/contacts', icon: <AtSymbolIcon />, about: 'Contacts' },
    { path: '/records', icon: <ArchiveBoxIcon />, about: 'Records' },
    { expander: true, path: '2', about: '' },
    { path: '/logout', icon: <XCircleIcon />, about: 'Logout' },
  ];

  return (
    <>
      <nav className="min-h-screen fixed top-0 left-0 overflow-visible">
        <div className="sidebar flex min-h-screen">
          <div
            className="sidebar__icons flex flex-col items-center"
            onMouseOver={expandSidebar}
            onFocus={expandSidebar}
            onMouseLeave={closeSidebar}
          >
            {navlinks.map((el) => {
              if (el.expander) {
                return (
                  <div key={el.path} className="flex-grow">
                    &nbsp;
                  </div>
                );
              }
              if (el.spacer) {
                return <div key={el.path} className="pt-6" />;
              }
              return (
                <NavLink key={el.path} to={el.path} className="sidebar__link">
                  <div className="h-6 w-full flex justify-center">{el.icon}</div>
                </NavLink>
              );
            })}
          </div>
          <div id="sidebar__texts" className="sidebar__texts sidebar__texts--hide hidden">
            <div className="flex flex-col h-full">
              {navlinks.map((el) => {
                if (el.expander) {
                  return (
                    <div key={el.path} className="flex-grow">
                      &nbsp;
                    </div>
                  );
                }
                if (el.spacer) {
                  return <div key={el.path} className="pt-6" />;
                }
                return (
                  <span key={el.path} className="text-xl sidebar__link">
                    {el.about}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </nav>
      {/* this will display the children paths if they match  */}
      <div className="pl-16 h-full w-full overflow-y-auto">
        <Outlet />
      </div>
    </>
  );
}
