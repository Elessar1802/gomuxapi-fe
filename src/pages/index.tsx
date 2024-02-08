import React from 'react'
import Login from './login'

interface Route {
  path: string,
  element: React.ReactElement | undefined,
  children: Route[] | undefined
}

const routes : Route[] = [
  { path: "/", element: undefined, children: undefined },
  { path: "/login", element: <Login />, children: undefined }
]

export default routes
