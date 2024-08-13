import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import EventModel from '../models/EventModel';
import useEvents from '../providers/EventsProvider/EventsProvider.hook';
import HeroEvent from '../components/HeroEvent';
import EventDetails from '../components/EventDetails';
import EventHosts from '../components/EventHosts';
import EventProgram from '../components/EventProgram';
import EventLocation from '../components/EventLocation';
import EventRegistrationButton from '../components/EventRegistrationButton';
import RegistrationForm from '../components/RegistrationForm';

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
          <EventHosts event={event} />
          <EventProgram event={event} />
          <EventLocation event={event} />
          <EventRegistrationButton />
          <RegistrationForm />
        </>
      ) : (
        <p>Event not found</p>
      )}
    </>
  );
}

export default EventPage;
