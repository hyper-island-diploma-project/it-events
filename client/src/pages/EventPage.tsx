import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import EventModel from '../models/EventModel';
import useEvents from '../providers/EventsProvider/EventsProvider.hook';
import HeroEvent from '../components/HeroEvent';
import EventDetails from '../components/EventDetails';

function EventPage() {
  const { id } = useParams<{ id: string }>();

  const [event, setEvent] = useState<EventModel | undefined>(undefined);
  const { getOneEvent } = useEvents();

  useEffect(() => {
    if (id !== undefined) {
      getOneEvent(id).then((fetchedEvent) => {
        if (fetchedEvent) {
          setEvent(fetchedEvent);
        }
      });
    }
  }, [id, getOneEvent]);

  return (
    <>
      <p className="pageName">Add go back</p>
      {event ? (
        <>
          <HeroEvent event={event} />
          <EventDetails event={event} />
        </>
      ) : (
        <p>Event not found</p>
      )}
    </>
  );
}

export default EventPage;
