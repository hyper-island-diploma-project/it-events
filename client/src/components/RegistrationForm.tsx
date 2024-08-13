// import { FC } from 'react';
// import { useForm } from 'react-hook-form';

const RegistrationForm = () => {
  return (
    <div
      id="container"
      className="fixed inset-0 flex h-full w-full cursor-pointer items-center justify-center bg-black bg-opacity-70"
    >
      <div className="h-screen/80 relative grid w-[300px] cursor-default content-start overflow-auto rounded-2xl bg-white p-5 md:w-[700px] md:px-10 dark:bg-stone-800">
        <form className="flex flex-col">
          <button>Save</button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
