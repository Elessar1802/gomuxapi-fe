import {
  UserIcon,
  HomeIcon,
  AtSymbolIcon,
  ArchiveBoxIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline';
import {
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { GET } from '../../utils/utils';
import { User } from '../../types';
import './index.scss';
import UserContext from '../contexts';
import Spinner from '../../components/spinner';

export default function App(): React.ReactNode {
  const location = useLocation();
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

  const navlinks: (NavLinks | undefined)[] = [
    { path: '/profile', icon: <UserIcon />, about: 'Profile' },
    { spacer: true, path: '1', about: '' },
    { path: '/dashboard', icon: <HomeIcon />, about: 'Dashboard' },
    user?.role === 'principal' ? { path: '/enroll', icon: <UserIcon />, about: 'Add User' } : undefined,
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
      <nav
        className="min-h-screen fixed top-0 left-0 overflow-visible"
        onMouseLeave={closeSidebar}
        onMouseOver={expandSidebar}
        onFocus={expandSidebar}
      >
        <div className="sidebar flex min-h-screen">
          <div className="sidebar__icons flex flex-col">
            {navlinks.map((el) => {
              if (el === undefined) return undefined;
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
                <NavLink
                  key={el.path}
                  to={el.path}
                  className={`sidebar__link flex justify-center items-center ${el.path === location.pathname ? 'sidebar__link--active' : ''}`}
                >
                  <div className="h-6 w-6">{el.icon}</div>
                </NavLink>
              );
            })}
          </div>
          <div id="sidebar__texts" className="sidebar__texts sidebar__texts--hide hidden will-change-transform">
            <div className="flex flex-col h-full">
              {navlinks.map((el) => {
                if (el === undefined) return undefined;
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
                  <NavLink key={el.path} to={el.path} className={`text-xl sidebar__link w-full  ${el.path === location.pathname ? 'sidebar__link--active' : ''}`}>
                    <div className="px-8">{el.about}</div>
                  </NavLink>
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
