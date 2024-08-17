import { createContext } from 'react';
import RegisterModel from '../../models/RegisterModel'
import LoginModel from '../../models/LoginModel';
import UserModel from '../../models/UserModel';

interface IUserProvider {
  isLoggedIn: boolean;
  currentUser: UserModel | null;
  registration: (data: RegisterModel) => void;
  login: (data: LoginModel) => void;
  checkToken:() => void;
}

const UserContext = createContext<IUserProvider>({
  isLoggedIn: false,
  currentUser: null,
  registration: () => {},
  login: () => {},
  checkToken: () => {},
});

export default UserContext;
