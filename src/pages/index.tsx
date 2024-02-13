import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginPage from './login';
import Logout from './logout';
import Error from '../components/error';
import App from './root';
import Dashboard from './root/dashboard';
import Profile from './root/profile';
import Contacts from './root/contacts';
import Contact from './root/contacts/contact';
import Records from './root/records';
import { GET } from '../utils/utils';
import Spinner from '../components/spinner';

interface Route {
  path: string;
  element: React.ReactElement | undefined;
  children: Route[] | undefined;
  errorElement?: React.ReactNode;
}

function AuthenticatedRoute({ children } : { children: React.ReactNode }): React.ReactNode {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      const result = await GET('validate');
      setLoading(false);
      if (!result.success) {
        navigate('/login');
      }
    })();
  }, [navigate]);

  if (loading) {
    return <Spinner />;
  }
  return children;
}

const routes: Route[] = [
  {
    path: '/',
    element: undefined,
    children: [
      { path: '/login', element: <LoginPage />, children: undefined },
      {
        path: '/',
        element: <App />,
        children: [
          { path: 'profile', element: <Profile />, children: undefined },
          { path: 'dashboard', element: <Dashboard />, children: undefined },
          { path: 'contacts/:id', element: <Contact />, children: undefined },
          { path: 'contacts', element: <Contacts />, children: undefined },
          { path: 'records', element: <Records />, children: undefined },
        ].map((el: Route) => (
          {
            // wrap the element in a authenticatedRoute component
            // that verfies if the user is authenticated
            ...el,
            element: (<AuthenticatedRoute>{el.element}</AuthenticatedRoute>),
          }
        )),
      },
      { path: '/logout', element: <Logout />, children: undefined },
    ],
    errorElement: <Error />,
  },
];

export default routes;
