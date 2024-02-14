import { createContext } from 'react';
import User from '../repo/User';

const UserContext = createContext<User | null>(null);

export default UserContext;
