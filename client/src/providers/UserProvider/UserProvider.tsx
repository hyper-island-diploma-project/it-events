import { useState, FC, ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserProviderContext from './UserProvider.context';
import * as userApi from '../../api/userApi';
import RegisterModel from '../../models/RegisterModel';
import LoginModel from '../../models/LoginModel';
import UserModel from '../../models/UserModel';

const UserProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoggedIn, setisLoggedIn] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<UserModel | null>(null);

  const navigate = useNavigate();

  const registration = ({
    first_name,
    last_name,
    email,
    password,
    job_title,
    workplace,
    experience,
  }: RegisterModel) => {
    userApi
      .register(
        first_name,
        last_name,
        email,
        password,
        job_title,
        workplace,
        experience,
      )
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
          first_name: res.user.first_name,
          last_name: res.user.last_name,
          email: res.user.email,
          job_title: res.user.job_title,
          workplace: res.user.workplace,
          experience: res.user.experience,
          id: res.user.id,
        });

        // navigate('/dashboard');
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
            first_name: res.user.first_name,
            last_name: res.user.last_name,
            email: res.user.email,
            job_title: res.user.job_title,
            workplace: res.user.workplace,
            experience: res.user.experience,
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

  const value = {
    isLoggedIn,
    currentUser,
    registration,
    login,
    checkToken,
  };

  return (
    <UserProviderContext.Provider value={value}>
      {children}
    </UserProviderContext.Provider>
  );
};

export default UserProvider;
