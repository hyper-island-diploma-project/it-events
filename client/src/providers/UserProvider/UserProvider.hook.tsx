import { useContext } from 'react';
import UserProviderContext from './UserProvider.context';

const useUser = () => {
  return useContext(UserProviderContext);
};

export default useUser;