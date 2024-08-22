import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import useUser from '../providers/UserProvider/UserProvider.hook';
import LoginModel from '../models/LoginModel';
import { FC } from 'react';
import { GoChevronLeft } from 'react-icons/go';

type FormData = {
  email: string;
  password: string;
};

interface LoginFormProps {
  toggleForm: () => void;
}

const LoginForm: FC<LoginFormProps> = ({ toggleForm }) => {
  const { login } = useUser();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    mode: 'onChange',
  });

  const onSubmit = (data: LoginModel) => {
    console.log(data);
    login(data);
  };

  return (
    <div className="z-20 fixed inset-0 flex h-full w-full items-center justify-center bg-neutral-950 bg-opacity-90">
      <div className="flex flex-col items-center rounded-[12px] bg-white px-20 py-16">
        <div className="absolute top-[120px] flex flex-col items-center justify-center gap-1 text-xl text-white">
          <img
            src="/logo-header-white.svg"
            alt="header logo"
            className="h-[40px] w-[160px]"
          />
          <p>Unified profile for all events</p>
        </div>
        <div className="mb-6 grid w-full grid-cols-[10px_auto] items-center text-xl">
          <Link to="/" className="w-full">
            <GoChevronLeft className="transform text-2xl transition-transform duration-300 hover:scale-125" />
          </Link>

          <h4 className="text-center">Please log in</h4>
        </div>

        <form
          className="grid w-[398px] grid-cols-1 gap-6"
          onSubmit={handleSubmit(onSubmit)}
          name="loginForm"
          noValidate
        >
          <div className="relative flex flex-col items-start">
            <input
              className="input_auth_form"
              {...register('email', {
                required: {
                  value: true,
                  message: 'Email is required!',
                },
                minLength: {
                  value: 3,
                  message: 'Minimum length is 3',
                },
                maxLength: {
                  value: 40,
                  message: 'Maximum length is 40',
                },
                pattern: {
                  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                  message: 'Please enter a valid email',
                },
              })}
              type="text"
              placeholder="email"
            />
            {errors?.email && (
              <div className="md:text-md text-sm text-red-500">
                {errors.email.message}
              </div>
            )}
          </div>

          <div className="relative flex flex-col items-start">
            <input
              className="input_auth_form"
              {...register('password', {
                required: {
                  value: true,
                  message: 'Password is required!',
                },
                minLength: {
                  value: 8,
                  message: 'Minimum length is 8',
                },
                maxLength: {
                  value: 40,
                  message: 'Maximum length is 200',
                },
              })}
              type="password"
              placeholder="password"
            />
            {errors?.password && (
              <div className="md:text-md text-sm text-red-500">
                {errors.password.message}
              </div>
            )}
          </div>

          <button
            disabled={!isValid}
            className="button_auth_form hover:bg-opacity-90"
            aria-label="Send result"
          >
            Login
          </button>
        </form>

        <div className="flex w-full items-center justify-center text-sm">
          <p className="mr-3 text-stone-600">Not registered yet?</p>
          <button
            onClick={toggleForm}
            className="transform cursor-pointer text-blueAccent transition-transform duration-300 hover:scale-125"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};
export default LoginForm;
