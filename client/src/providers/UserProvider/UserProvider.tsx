import { useState, FC, ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserProviderContext from './UserProvider.context';
import * as userApi from '../../api/userApi';
import RegisterModel from '../../models/RegisterModel';
import LoginModel from '../../models/LoginModel';
import UserModel from '../../models/UserModel';
import EditProfileModel from '../../models/EditProfileModel';

const UserProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoggedIn, setisLoggedIn] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<UserModel | null>(null);

  const navigate = useNavigate();

  const registration = ({ name, lastName, email, password }: RegisterModel) => {
    userApi
      .register(name, lastName, email, password)
      .then((data) => {
        console.log(data);
        navigate('/login');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const login = ({ password, email }: LoginModel) => {
    userApi
      .login(email, password)
      .then((res) => {
        if (res.token) {
          localStorage.setItem('token', res.token);
        }
        setisLoggedIn(true);
        setCurrentUser({
          name: res.user.first_name,
          email: res.user.email,
          id: res.user.id,
        });
        navigate('/dashboard');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const checkToken = () => {
    const tokenFromLocalStorage = localStorage.getItem('token');
    if (tokenFromLocalStorage) {
      userApi
        .check(tokenFromLocalStorage)
        .then((res) => {
          setisLoggedIn(true);
          setCurrentUser({
            name: res.user.first_name,
            email: res.user.email,
            id: res.user.id,
          });
        })
        .catch((err) => {
          setisLoggedIn(false);
          console.log(err);
        });
    }
  };

  useEffect(() => {
    checkToken();
  }, []);


  const editUserData = ({ name, email }: EditProfileModel) => {
    const jwt = localStorage.getItem('token');
    userApi
      .editProfile(name, email, jwt)
      .then((res) => {
        setCurrentUser({
          name: res.user.first_name,
          email: res.user.email,
          id: res.user.id,
        });
        navigate('/profile');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const signout = () => {
    localStorage.clear();
    setisLoggedIn(false);
    setCurrentUser(null);
    navigate('/login');
  };

  const value = {
    isLoggedIn,
    currentUser,
    registration,
    login,
    editUserData,
    signout,
    checkToken,
  };

  return (
    <UserProviderContext.Provider value={value}>
      {children}
    </UserProviderContext.Provider>
  );
};

export default UserProvider;
