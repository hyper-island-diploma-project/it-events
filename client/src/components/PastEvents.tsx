import useEvents from '../providers/EventsProvider/EventsProvider.hook';
import PastEventCard from './PastEventCard';

const PastEvents = () => {
  const { pastEvents } = useEvents();

  const lastTwoEvents = pastEvents.slice(-2);

  return (
    <>
      <section>
        <h2>Past events</h2>
        <ul className="grid grid-cols-2 gap-5">
          {lastTwoEvents.length === 0 ? (
            <li>No events</li>
          ) : (
            lastTwoEvents &&
            lastTwoEvents.map((event) => (
              <PastEventCard key={event.id} event={event} eventId={event.id} />
            ))
          )}
        </ul>
      </section>
    </>
  );
};

export default PastEvents;
