import {
  UserIcon,
  HomeIcon,
  AtSymbolIcon,
  ArchiveBoxIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { GET } from '../../utils/utils';
import User from '../../repo/User';
import './index.scss';
import UserContext from '../contexts';
import Spinner from '../../components/spinner';

export default function App(): React.ReactNode {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    (async () => {
      let res = await GET('validate');
      if (!res.success) {
        navigate('/login');
        return;
      }
      res = await GET(`users/${res.payload}`);
      if (!res.success) {
        navigate('/login');
        return;
      }
      setUser(res.payload);
    })();
  }, [navigate]);

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

  return user === null ? (
    <main className="min-h-screen w-full flex justify-center items-center">
      <Spinner />
    </main>
  ) : (
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
      <UserContext.Provider value={user}>
        <div className="pl-16 h-full w-full overflow-y-auto">
          <Outlet />
        </div>
      </UserContext.Provider>
    </>
  );
}
