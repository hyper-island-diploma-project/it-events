import { ReactNode, FC } from 'react';
import useUser from '../providers/UserProvider/UserProvider.hook';
import AuthContainer from '../components/AuthContainer';

interface ProtectedRouteProps {
  element: ReactNode;
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ element }) => {
  const { isLoggedIn } = useUser();

  const result = isLoggedIn ? element : <AuthContainer />;
  return result;
};

export default ProtectedRoute;
