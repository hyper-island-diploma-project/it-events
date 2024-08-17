import { useState } from 'react';
import LoginForm from './LoginForm';
import RegistrationForm from './RegistrationForm';

const AuthContainer = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const toggleForm = () => {
    setIsRegistering(!isRegistering);
  };
  return (
    <>
      {isRegistering ? (
        <RegistrationForm toggleForm={toggleForm} />
      ) : (
        <LoginForm toggleForm={toggleForm} />
      )}
    </>
  );
};

export default AuthContainer;
