import { FC } from 'react';
import EventModel from '../models/EventModel';
import { CiHeart } from 'react-icons/ci';
import { formatInTimeZone } from 'date-fns-tz';
import { API_URL } from '../utils/utils';
import EventFormat from './EventFormat';

const BASE_URL = API_URL;

interface EventProps {
  event: EventModel;
}

const HeroEvent: FC<EventProps> = ({ event }) => {
  const eventDate = new Date(event.date);

  const formattedDate = formatInTimeZone(eventDate, 'UTC', 'dd-MM-yyyy');

  const info = event.info;
  const description =
    info && info.length > 0 ? info[0].description : 'No description available';

  return (
    <div className="grid grid-cols-[522px_auto] grid-rows-1">
      <div className="relative flex h-[429px] flex-col justify-between overflow-hidden rounded-[60px] bg-black p-8 text-white">
        <div className="flex flex-col">
          <div className="mb-3 flex w-full items-center text-sm">
            <EventFormat event={event} />
          </div>
          <h5 className="text-3xl">{event.title}</h5>
          <p className="mt-8 text-2xl">
            Expert <span>Anton Ivanov</span>
          </p>
          <p className="mb-3 text-2xl">Lead frontend dev</p>
        </div>

        <div className="item-center z-10 flex text-[16px]">
          <p className="mr-2 rounded-full border px-4 py-1">{formattedDate}</p>
          <button className="mr-2 rounded-full border px-8 py-1">
            REGISTER
          </button>
          <CiHeart className="rounded-full border border-white p-[2px] text-4xl" />
        </div>

        <img
          src={`${BASE_URL}/${event.image}`}
          alt="event icon"
          className="absolute bottom-0 right-0"
        />
      </div>
      <p className="flex w-full items-center text-balance rounded-[60px] bg-lightGray px-8 text-2xl font-light leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export default HeroEvent;
