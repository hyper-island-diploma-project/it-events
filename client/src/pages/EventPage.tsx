import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import EventModel from '../models/EventModel';
import useEvents from '../providers/EventsProvider/EventsProvider.hook';
import HeroEvent from '../components/HeroEvent';
import EventDetails from '../components/EventDetails';
import EventHosts from '../components/EventHosts';
import EventProgram from '../components/EventProgram';
import EventLocation from '../components/EventLocation';
import EventRegisterButton from '../components/EventRegisterButton';

function EventPage() {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const isSaved = queryParams.get('isSaved') === 'true';
  const isEventPage = true;

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
          <EventHosts event={event} />
          <EventProgram event={event} />
          <EventLocation event={event} />
          <EventRegisterButton event={event} isSaved={isSaved} isEventPage={isEventPage} />
        </>
      ) : (
        <p>Event not found</p>
      )}
    </>
  );
}

export default EventPage;
