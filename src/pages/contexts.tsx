import { createContext } from 'react';
import { User } from '../types';

const UserContext = createContext<User>({
  id: -1,
  name: '',
  phone: '',
  role: '',
});

export default UserContext;
