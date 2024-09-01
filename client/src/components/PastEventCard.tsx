import { FC, useEffect, useState } from 'react';
import { API_URL } from '../utils/utils';
import EventModel from '../models/EventModel';
import { formatInTimeZone } from 'date-fns-tz';
import useEvents from '../providers/EventsProvider/EventsProvider.hook';

const BASE_URL = API_URL;

interface EventProps {
  event: EventModel;
  eventId: number;
}

const PastEventCard: FC<EventProps> = ({ event, eventId }) => {
  const [currentEvent, setCurrentEvent] = useState<EventModel | undefined>(
    undefined,
  );
  const { getOneEvent } = useEvents();

  const id = eventId;

  useEffect(() => {
    if (id !== undefined) {
      getOneEvent(id).then((fetchedEvent) => {
        if (fetchedEvent) {
          setCurrentEvent(fetchedEvent);
        }
      });
    }
  }, [id, getOneEvent]);

  const eventDate = new Date(event.date);

  const formattedDate = formatInTimeZone(eventDate, 'UTC', 'dd-MM-yyyy');

  const info = currentEvent?.info;
  const description =
    info && info.length > 0 ? info[0].description : 'No description available';

  const keyWordList = event.keywords;

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
    <li className="relative flex h-[267px] flex-col justify-between rounded-[20px] border-[0.5px] border-stone-300 bg-black p-5 text-white">
      <div className="flex flex-col">
        <h5 className="mb-5 text-xl">{event.title}</h5>
        {/* <p className="text-sm">{description}</p> */}
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
      </div>
      <div className="flex flex-col">
        <p className="mb-3 text-[16px] text-stone-400">{formattedDate}</p>
      </div>
      <img
        src={`${BASE_URL}/${event.image}`}
        alt="event icon"
        className="absolute bottom-0 right-0"
      />
    </li>
  );
};

export default PastEventCard;
