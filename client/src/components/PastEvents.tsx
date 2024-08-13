import useEvents from '../providers/EventsProvider/EventsProvider.hook';
import EventCard from './EventCard';

const PastEvents = () => {
  const { pastEvents } = useEvents();

  return (
    <>
      <section className=' mb-24'>
        <h2>Completed</h2>
        <ul className="grid grid-cols-2 gap-5">
          {pastEvents.length === 0 ? (
            <li>No events</li>
          ) : (
            pastEvents &&
            pastEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))
          )}
        </ul>
      </section>
    </>
  );
};

export default PastEvents;
