import React from 'react';
import LoginPage from './login';
import Logout from './logout';
import Error from '../components/error';
import App from './root';
import Dashboard from './root/dashboard';
import Profile from './root/profile';
import Contacts from './root/contacts';
import Contact from './root/contacts/contact';
import Records from './root/records';
import Enroll from './root/enroll';

interface Route {
  path: string;
  element: React.ReactElement | undefined;
  children: Route[] | undefined;
  errorElement?: React.ReactNode;
}

const routes: Route[] = [
  { path: '/login', element: <LoginPage />, children: undefined },
  {
    path: '/',
    element: <App />,
    children: [
      { path: 'profile', element: <Profile />, children: undefined },
      { path: 'dashboard', element: <Dashboard />, children: undefined },
      { path: 'enroll', element: <Enroll />, children: undefined },
      { path: 'contacts/:id', element: <Contact />, children: undefined },
      { path: 'contacts', element: <Contacts />, children: undefined },
      { path: 'records', element: <Records />, children: undefined },
    ],
    errorElement: <Error />,
  },
  { path: '/logout', element: <Logout />, children: undefined },
];

export default routes;
