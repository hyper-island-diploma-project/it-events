import { FC, useState } from 'react';
import EventModel from '../models/EventModel';
import useUser from '../providers/UserProvider/UserProvider.hook';
import useEvents from '../providers/EventsProvider/EventsProvider.hook';
import InfoPopup from './InfoPopup';

interface EventProps {
  event: EventModel;
}

const EventRegisterButton: FC<EventProps> = ({
  event,
  isSaved,
  isEventPage,
  cardTextColor,
}) => {
  const [isInfoPopupOpen, setIsInfoPopupOpen] = useState(false);
  const [isRegistered, setIsRegistered] = useState(isSaved);

  const { isLoggedIn, currentUser } = useUser();
  const { unregisterEvent, registerEvent } = useEvents();

  const handleButtonClick = (): void => {
    if (isLoggedIn && currentUser && event) {
      if (isRegistered) {
        unregisterEvent(event.id);
        setIsRegistered(false)
      } else {
        // registerEvent({ userId: currentUser.id, eventId: event.id });
        registerEvent({ userId: currentUser.id, eventId: event.eventId });
        setIsRegistered(true)
      }
    } else {
      setIsInfoPopupOpen(true);
    }
  };

  const registeredMessage = () => {
    if (isSaved) {
      return (
        <p className="text-sm mb-3">
          You are already registered for the event. Would you like to cancel
          your registration?
        </p>
      );
    } else return null;
  };

  const buttonType = () => {
    if (isEventPage) {
      return (
        <div className="my-16 flex flex-col items-center justify-center border-y border-dashed border-blueAccent py-8">
          {registeredMessage()}
          <button className="rounded-full border bg-blueAccent px-8 py-2 text-center text-3xl font-normal text-white hover:bg-opacity-90">
            {isSaved ? 'Cancel registration' : 'Register for event'}
          </button>
        </div>
      );
    } else {
      return (
        <>
          {' '}
          <button
            onClick={handleButtonClick}
            style={{
              borderColor: cardTextColor()
            }}
            className="mr-2 w-auto rounded-full border px-[14px] py-1"
          >
            {isRegistered ? 'CANCEL' : 'REGISTER'}
          </button>
          {isInfoPopupOpen && <InfoPopup isOpen={isInfoPopupOpen} />}
        </>
      );
    }
  };
  return <> {buttonType()}</>;
};

export default EventRegisterButton;

