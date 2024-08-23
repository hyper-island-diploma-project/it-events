import EventCard from './EventCard';
import PastEventCard from './PastEventCard';
import EventModel from '../models/EventModel';
import { FC, useState } from 'react';

interface UserEventsProps {
  upcomingEvents: EventModel[];
  pastEvents: EventModel[];
}

const UserEvents: FC<UserEventsProps> = ({ upcomingEvents, pastEvents }) => {
  const [filter, setFilter] = useState('upcoming');

  const handleButtonClick = (filterType: string) => {
    setFilter(filterType);
  };

  return (
    <section className="flex w-full flex-col">
      <div className="mb-10 grid w-full grid-cols-2 gap-6 text-lg font-light">
        <button
          onClick={() => handleButtonClick('upcoming')}
          className={`flex transform cursor-pointer items-center justify-center rounded-[20px] py-2 shadow-lg transition-transform duration-300 hover:scale-105 ${
            filter === 'upcoming'
              ? 'bg-blueAccent text-white'
              : 'bg-white text-black'
          }`}
        >
          <img
            src="/play.svg"
            alt="expected events logo"
            className="mr-3 w-[50px]"
          />
          <p>Upcoming events</p>
        </button>
        <button
          onClick={() => handleButtonClick('past')}
          className={`flex transform cursor-pointer items-center justify-center rounded-[20px] py-2 shadow-lg transition-transform duration-300 hover:scale-105 ${
            filter === 'past'
              ? 'bg-blueAccent text-white'
              : 'bg-white text-black'
          }`}
        >
          <img
            src="/star.svg"
            alt="expected events logo"
            className="mr-3 w-[50px]"
          />
          <p>Completed events</p>
        </button>
      </div>
      {filter === 'upcoming' ? (
        <div className="animate-fade">
          <h2>Upcoming events</h2>
          <ul className="animate-fade grid grid-cols-4 gap-5">
            {upcomingEvents?.length === 0 ? (
              <li>No events</li>
            ) : (
              upcomingEvents &&
              upcomingEvents.map((event) => (
                <EventCard event={event} key={event.id} />
              ))
            )}
          </ul>
        </div>
      ) : (
        <div className="">
          <h2>Completed events</h2>
          <ul className="animate-fade grid grid-cols-4 gap-5">
            {pastEvents?.length === 0 ? (
              <li>No events</li>
            ) : (
              pastEvents &&
              pastEvents.map((event) => (
                <PastEventCard event={event} key={event.id} eventId={event.eventId} />
              ))
            )}
          </ul>
        </div>
      )}
    </section>
  );
};

export default UserEvents; 
