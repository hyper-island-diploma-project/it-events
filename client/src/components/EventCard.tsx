import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../utils/utils';

import EventModel from '../models/EventModel';
import { CiHeart } from 'react-icons/ci';
import { formatInTimeZone } from 'date-fns-tz';
import EventFormat from './EventFormat';

const BASE_URL = API_URL;

interface EventProps {
  event: EventModel;
}

const EventCard: FC<EventProps> = ({ event }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/event/${event.id}`);
  };

  const eventDate = new Date(event.date);

  const formattedDate = formatInTimeZone(eventDate, 'UTC', 'dd-MM-yyyy');

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
    <li
      onClick={handleClick}
      style={{
        background: `${event.bg_color}`,
        color: `${event.text_color}`,
      }}
      className="relative flex h-[267px] cursor-pointer flex-col justify-between rounded-[20px] border-[0.5px] border-stone-300 p-3"
    >
      <div className="flex flex-col">
        <div className="mb-3 flex w-full items-center text-sm">
          <EventFormat event={event} />
        </div>
        <h5 className="text-xl">{event.title}</h5>
      </div>
      <div className="flex flex-col">
        <p className="mb-1 text-[12px]">
          Expert <span>Anton Ivanov</span>
        </p>
        <p className="mb-3 text-[12px]">Lead frontend dev</p>
        <p className="mb-3 text-[16px]">
          {formattedDate}
        </p>
        <div className="item-center z-10 flex">
          <button
            style={{
              borderColor: `${event.text_color}`,
            }}
            className="mr-2 w-[130px] rounded-full border px-2 py-1"
          >
            REGISTER
          </button>
          <CiHeart
            style={{
              borderColor: `${event.text_color}`,
            }}
            className="rounded-full border border-white p-[2px] text-4xl"
          />
        </div>
      </div>
      <img
        src={`${BASE_URL}/${event.image}`}
        alt="event icon"
        className="absolute bottom-0 right-0"
      />
    </li>
  );
};

export default EventCard;
