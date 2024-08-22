import { useState, useCallback, FC } from 'react';
import AuthContainer from './AuthContainer';
import useUser from '../providers/UserProvider/UserProvider.hook';

interface InfoPopupProps {
  isOpen: boolean;
}

const InfoPopup: FC<InfoPopupProps> = ({isOpen}) => {
  const [loginFormIsOpen, setLoginFormIsOpen] = useState(false);
  const [infoPopupIsOpen, setInfoPopupIsOpen] = useState(isOpen);

  const { isLoggedIn } = useUser();

  const onLoginFormOpen = useCallback(() => {
    setLoginFormIsOpen(true);
  }, []);

  const closePopup = () => {
    setInfoPopupIsOpen(false);
  };

  const popupMode = () => {
    if (!infoPopupIsOpen) {
      return null;
    } else if (!loginFormIsOpen) {
      return (
        !isLoggedIn && (
          <div className=" z-20 fixed inset-0 flex h-full w-full items-center justify-center bg-neutral-950 bg-opacity-90">
            <div className="bg-blackDark flex w-[698px] flex-col items-center rounded-[32px] px-8 pb-8 pt-10 text-white">
              <h4 className="mb-4 text-2xl">
                To register for the event, you need to log in.
              </h4>
              <p className="text-center text-[14px] font-light">
                After logging in, you will have the opportunity to{' '}
                <span className="text-blueAccent">register for events</span>,{' '}
                <span className="text-blueAccent">save events</span> to your
                favorites,{' '}
                <span className="text-blueAccent">find like-minded people</span>{' '}
                , and communicate with them through Random Coffee.
              </p>
              <div className="mt-12 grid w-full grid-cols-2 gap-4 text-[16px]">
                <button
                  onClick={onLoginFormOpen}
                  className="cursor-pointer rounded-[12px] bg-blueAccent py-2 hover:bg-opacity-90"
                >
                  Log in
                </button>
                <button
                  onClick={closePopup}
                  className="cursor-pointer rounded-[12px] bg-zinc-700 py-2 text-center hover:bg-opacity-90"
                >
                  Not now
                </button>
              </div>
            </div>
          </div>
        )
      );
    } else {
      return !isLoggedIn ? <AuthContainer /> : <></>;
    }
  };

  return <>{popupMode()}</>;
};
export default InfoPopup;
