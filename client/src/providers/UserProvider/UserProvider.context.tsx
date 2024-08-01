import { createContext } from 'react';
import RegisterModel from '../../models/RegisterModel'
import LoginModel from '../../models/LoginModel';
import UserModel from '../../models/UserModel';
import EditProfileModel from '../../models/EditProfileModel';

interface IUserProvider {
  isLoggedIn: boolean;
  currentUser: UserModel | null;
  registration: (data: RegisterModel) => void;
  login: (data: LoginModel) => void;
  editUserData: (data: EditProfileModel) => void;
  signout:() => void;
  checkToken:() => void;
}

const UserContext = createContext<IUserProvider>({
  isLoggedIn: false,
  currentUser: null,
  registration: () => {},
  login: () => {},
  editUserData: () => {},
  signout: () => {},
  checkToken: () => {},
});

export default UserContext;
