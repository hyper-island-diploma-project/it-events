import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../utils/utils';

import EventModel from '../models/EventModel';
import { formatInTimeZone } from 'date-fns-tz';
import EventFormat from './EventFormat';
import EventRegisterButton from './EventRegisterButton';

const BASE_URL = API_URL;

interface EventProps {
  event: EventModel;
}

const EventCard: FC<EventProps> = ({ event }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/event/${event.eventId}?isSaved=${event.isSaved}`);
  };

  const eventDate = new Date(event.date);

  const formattedDate = formatInTimeZone(eventDate, 'UTC', 'dd-MM-yyyy');

  const isEventPage = false;

  const keyWordList = event.keywords;

  const cardBackground = () => {
    if (event.format_online && event.format_onsite) {
      return '#1D6BF3';
    } else if (!event.format_online && event.format_onsite) {
      return '#1A1B22';
    } else if (event.format_online && !event.format_onsite) {
      return '#FFFFFF';
    }
    return null;
  };

  const cardTextColor = () => {
    if (event.format_online && event.format_onsite) {
      return '#FFFFFF';
    } else if (!event.format_online && event.format_onsite) {
      return '#FFFFFF';
    } else if (event.format_online && !event.format_onsite) {
      return '#000000';
    }
    return null;
  };

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
    <li
      style={{
        background: cardBackground(),
        color: cardTextColor(),
      }}
      className="relative flex h-[267px] cursor-pointer flex-col justify-between rounded-[20px] border-[0.5px] border-stone-300 p-3"
    >
      <div onClick={handleClick} className="flex flex-col">
        <div className="mb-3 flex w-full items-center text-sm">
          <EventFormat event={event} />
        </div>
        <h5 className="text-2xl">{event.title}</h5>
      </div>
      <div className="flex flex-col gap-3">
        <div className=' mb-2'>
        {keyWordList.length === 0 ? (
          <p>No keywords</p>
        ) : (
          <ul className=' flex flex-col'>
            {keyWordList &&
              keyWordList.map((item, index) => {
                return <li className=' text-sm' key={index}>{item}</li>;
              })}
          </ul>
        )}
        </div>
        <p className="text-[16px]">{formattedDate}</p>
        <div className="item-center flex">
          <EventRegisterButton
            isSaved={event.isSaved}
            event={event}
            isEventPage={isEventPage}
            cardTextColor={cardTextColor}
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
