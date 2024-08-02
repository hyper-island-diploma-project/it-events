import { FC } from 'react';
import { API_URL } from '../utils/utils';

import EventModel from '../models/EventModel';
import { CiHeart } from 'react-icons/ci';
// import { format } from 'date-fns';
import {formatInTimeZone} from 'date-fns-tz'


const BASE_URL = API_URL;

interface EventProps {
  event: EventModel;
}

const EventCard: FC<EventProps> = ({ event }) => {
  // Исходная дата в формате ISO
const eventDate = new Date(event.date);

const formattedDate = formatInTimeZone(eventDate, 'UTC',  'dd-MM-yyyy')
// Преобразование даты в нужный формат
// const formattedDate = format(eventDate, 'yyyy-MM-dd');

  const onlineFormat = () => {
    if (event.format_online === false) {
      return null;
    } else {
      return (
        <div className="mr-3 flex items-center">
          <div className="mr-1 h-2 w-2 rounded-full bg-green-500"></div>
          <p>Online</p>
        </div>
      );
    }
  };

  const onsiteFormat = () => {
    if (event.format_onsite === false) {
      return null;
    } else {
      return (
        <div className="mr-3 flex items-center">
          <div className="mr-1 h-2 w-2 rounded-full bg-red-600"></div>
          <p>{event.city}</p>
        </div>
      );
    }
  };

  const amountOfPlaces = () => {
    if (event.available_seats === 0) {
      return null;
    } else {
      return (
        <div className="flex items-center">
          <div className="mr-1 h-2 w-2 rounded-full bg-orange-600"></div>
          <p>
            <span>{event.available_seats}</span> places left
          </p>
        </div>
      );
    }
  };

  return (

    <li
      style={{
        background: `${event.bg_color}`,
        color: `${event.text_color}`,
      }}
      className="relative flex h-[267px] w-[305px] flex-col justify-between rounded-[20px] border-[0.5px] border-stone-300 p-3"
    >
      <div className="flex flex-col">
        <div className="mb-3 flex w-full items-center text-sm">
          {onsiteFormat()}
          {onlineFormat()}
          {amountOfPlaces()}
        </div>
        <h5 className="text-xl">{event.title}</h5>
      </div>
      <div className="flex flex-col">
        <p className="mb-1 text-[12px]">
          Expert <span>Anton Ivanov</span>
        </p>
        <p className="mb-3 text-[12px]">Lead frontend dev</p>
        <p className="mb-3 text-[16px]">
          {/* {new Date(event.date).toLocaleDateString()} */}
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
