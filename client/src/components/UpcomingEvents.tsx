// import { useState } from 'react';
import useEventsList from '../providers/EventsProvider/EventsProvider.hook'
import EventCard from './EventCard';
// import EventModel from '../models/EventModel';

const UpcomingEvents = () => {
  // const [eventList, setEventList] = useState<EventModel[]>([]);
const {eventList} = useEventsList();

  return (
    <section>
      <h2>Upcoming events</h2>
      <ul className="grid grid-cols-4 gap-5">
        {eventList.length === 0 ? (
          <li>No events</li>
        ) : (
          eventList && eventList.map((event) => <EventCard key={event.id} event={event} />)
        )}
      </ul>
    </section>
  );
};

export default UpcomingEvents;
