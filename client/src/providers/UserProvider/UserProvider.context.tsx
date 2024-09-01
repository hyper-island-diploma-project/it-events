import { createContext } from 'react';
import RegisterModel from '../../models/RegisterModel'
import LoginModel from '../../models/LoginModel';
import UserModel from '../../models/UserModel';
import UserEventModel from '../../models/UserEventModel';

interface IUserProvider {
  isLoggedIn: boolean;
  currentUser: UserModel | null;
  registration: (data: RegisterModel) => void;
  login: (data: LoginModel) => void;
  checkToken:() => void;
  logOut:() => void;
  // registerEvent: (data: UserEventModel) => void;
}

const UserContext = createContext<IUserProvider>({
  isLoggedIn: false,
  currentUser: null,
  registration: () => {},
  login: () => {},
  checkToken: () => {},
  logOut: () => {},
  // registerEvent: () => {}
});

export default UserContext;
