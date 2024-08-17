import { useForm } from 'react-hook-form';
import useUser from '../providers/UserProvider/UserProvider.hook';
import RegisterModel from '../models/RegisterModel';
import { FC } from 'react';
import { GoChevronLeft } from 'react-icons/go';

type FormData = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  job_title: string;
  workplace: string;
  experience: string;
};

interface RegistrationFormProps {
  toggleForm: () => void;
}

const RegistrationForm: FC<RegistrationFormProps> = ({ toggleForm }) => {
  const { registration } = useUser();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    mode: 'onChange',
  });

  const onSubmit = (data: RegisterModel) => {
    console.log(data);
    registration(data);
  };

  return (
    <div className="fixed inset-0 flex h-full w-full items-center justify-center bg-neutral-950 bg-opacity-90">
      <div className="relative flex flex-col items-center rounded-[12px] bg-white px-12 py-6">
        <div className="absolute -top-20 flex flex-col items-center justify-center gap-1 text-xl text-white">
          <img
            src="/logo-header-white.svg"
            alt="header logo"
            className="h-[40px] w-[160px]"
          />
          <p>Unified profile for all events</p>
        </div>
        <div className="grid grid-cols-[10px_auto] text-xl items-center mb-6 w-full">
          <GoChevronLeft />
          <h4 className=" text-center">Registration</h4>
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
              {...register('first_name', {
                required: {
                  value: true,
                  message: 'Name is required!',
                },
                minLength: {
                  value: 1,
                  message: 'Minimum length is 1',
                },
                maxLength: {
                  value: 40,
                  message: 'Maximum length is 40',
                },
                pattern: {
                  value: /^[a-zA-Z\s'-]+$/,
                  message: 'Please enter a valid name',
                },
              })}
              type="text"
              placeholder="first name"
            />
            {errors?.first_name && (
              <div className="md:text-md text-sm text-red-500">
                {errors.first_name.message}
              </div>
            )}
          </div>

          <div className="relative flex flex-col items-start">
            <input
              className="input_auth_form"
              {...register('last_name', {
                required: {
                  value: true,
                  message: 'Last name is required!',
                },
                minLength: {
                  value: 1,
                  message: 'Minimum length is 1',
                },
                maxLength: {
                  value: 40,
                  message: 'Maximum length is 40',
                },
                pattern: {
                  value:  /^[a-zA-Z\s'-]+$/,
                  message: 'Please enter a valid last name',
                },
              })}
              type="text"
              placeholder="last name"
            />
            {errors?.last_name && (
              <div className="md:text-md text-sm text-red-500">
                {errors.last_name.message}
              </div>
            )}
          </div>

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

          <div className="relative flex flex-col items-start">
            <input
              className="input_auth_form"
              {...register('job_title', {
                required: {
                  value: true,
                  message: 'Job title is required!',
                },
                minLength: {
                  value: 1,
                  message: 'Minimum length is 3',
                },
                maxLength: {
                  value: 40,
                  message: 'Maximum length is 40',
                },
                pattern: {
                  value:  /^[a-zA-Z0-9._\s-]+$/,
                  message: 'Please enter a valid job title',
                },
              })}
              type="text"
              placeholder="job title"
            />
            {errors?.job_title && (
              <div className="md:text-md text-sm text-red-500">
                {errors.job_title.message}
              </div>
            )}
          </div>

          <div className="relative flex flex-col items-start">
            <input
              className="input_auth_form"
              {...register('workplace', {
                required: {
                  value: true,
                  message: 'Workplace is required!',
                },
                minLength: {
                  value: 1,
                  message: 'Minimum length is 2',
                },
                maxLength: {
                  value: 40,
                  message: 'Maximum length is 40',
                },
                pattern: {
                  value:  /^[a-zA-Z0-9._\s-]+$/,
                  message: 'Please enter a valid workplace',
                },
              })}
              type="text"
              placeholder="workplace"
            />
            {errors?.workplace && (
              <div className="md:text-md text-sm text-red-500">
                {errors.workplace.message}
              </div>
            )}
          </div>

          <div className="relative flex flex-col items-start">
            <input
              className="input_auth_form"
              {...register('experience', {
                required: {
                  value: true,
                  message: 'Experience is required!',
                },
                minLength: {
                  value: 1,
                  message: 'Minimum length is 1',
                },
                maxLength: {
                  value: 40,
                  message: 'Maximum length is 20',
                },
                pattern: {
                  value: /^[a-zA-Z0-9._\s-]+$/,
                  message: 'Please enter a valid experience',
                },
              })}
              type="text"
              placeholder="experience"
            />
            {errors?.experience && (
              <div className="md:text-md text-sm text-red-500">
                {errors.experience.message}
              </div>
            )}
          </div>

          <button
            disabled={!isValid}
            className="button_auth_form"
            aria-label="Send result"
          >
            Register
          </button>
        </form>

        <div className="flex w-full items-center justify-center text-sm">
          <p className="mr-3 text-stone-600">Already registered?</p>
          <button
            onClick={toggleForm}
            className="cursor-pointer text-blueAccent"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};
export default RegistrationForm;
