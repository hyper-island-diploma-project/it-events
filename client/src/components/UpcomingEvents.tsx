import useEventsList from '../providers/EventsProvider/EventsProvider.hook';
import EventCard from './EventCard';
import FilterItems from './FilterItems';

const UpcomingEvents = () => {
  const { upcomingEvents } = useEventsList();

  return (
    <>
      <FilterItems />
      <section className=' mb-6'>
        <h2>Upcoming events</h2>
        <ul className="grid grid-cols-4 gap-5">
          {upcomingEvents.length === 0 ? (
            <li>No events</li>
          ) : (
            upcomingEvents &&
            upcomingEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))
          )}
        </ul>
      </section>
    </>
  );
};

export default UpcomingEvents;
