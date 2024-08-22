import useEvents from '../providers/EventsProvider/EventsProvider.hook';
import PastEventCard from './PastEventCard';

const PastEvents = () => {
  const { pastEvents } = useEvents();

  return (
    <>
      <section>
        <h2>Past events</h2>
        <ul className="grid grid-cols-2 gap-5">
          {pastEvents.length === 0 ? (
            <li>No events</li>
          ) : (
            pastEvents &&
            pastEvents.map((event) => (
              <PastEventCard key={event.id} event={event} />
            ))
          )}
        </ul>
      </section>
    </>
  );
};

export default PastEvents;
