import { FC } from 'react';
import UserModel from '../models/UserModel';
import EventModel from '../models/EventModel';
import useUser from '../providers/UserProvider/UserProvider.hook';
import { BASE_URL } from '../api/userEventsApi';
// import useEvents from '../providers/EventsProvider/EventsProvider.hook';

interface heroProfileProps {
  user: UserModel[];
  upcomingEvents: EventModel[];
}

const HeroProfile: FC<heroProfileProps> = ({ user, upcomingEvents }) => {
  const { logOut } = useUser();
  // const {cleanRegisteredEvents}= useEvents();
  
  const onLogOut = () => {
    logOut();
    // cleanRegisteredEvents();
  };

  return (
    <section className="relative my-[80px] flex w-full justify-between rounded-[20px] bg-black py-4 pl-[320px]">
      <img
        src={`${BASE_URL}/${user.image}`}
        alt="user avatar"
        className="absolute -top-[42px] left-[60px] h-[200px] w-[200px] rounded-full object-cover"
      />
      <div className="flex flex-col text-white">
        <p className="mb-[1px] text-xl">
          {user.first_name} {user.last_name}
        </p>
        <p className="mb-2 text-sm text-stone-300">{user.email}</p>
        <p className="text-lg">
          Number of your upcoming events <span>{upcomingEvents?.length}</span>
        </p>
      </div>
      <div className="mr-8 mt-1 flex gap-8">
        <button>
          <img
            src="/icon-settings.svg"
            alt="icon settings"
            className="h-6 w-6 cursor-pointer"
          />
        </button>
        <button onClick={onLogOut}>
          <img
            src="/icon-log-out.svg"
            alt="icon log out"
            className="h-6 w-6 cursor-pointer"
          />
        </button>
      </div>
    </section>
  );
};

export default HeroProfile;
