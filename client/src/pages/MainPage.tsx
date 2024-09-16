import HeroMain from '../components/HeroMain';
import UpcomingEvents from '../components/UpcomingEvents';
import PastEvents from '../components/PastEvents';
import InfoPopup from '../components/InfoPopup';
import useEvents from '../providers/EventsProvider/EventsProvider.hook';
import useUser from '../providers/UserProvider/UserProvider.hook';
import { useEffect } from 'react';

function MainPage() {
  const {
    registeredEvents,
    getRegisteredEvents,
    getAllEvents,
    allEvents,
    getUsersSubscriptions,
  } = useEvents();
  const { currentUser } = useUser();

  useEffect(() => {
    if (registeredEvents || !currentUser?.id) getRegisteredEvents(null);
    else getRegisteredEvents(currentUser.id);
  }, [currentUser]);

  useEffect(() => {
    if (allEvents) return;
    getAllEvents();
    getUsersSubscriptions();
  }, []);

  return (
    <div className="py-6">
      <p className="pageName">Events</p>
      <HeroMain />
      <UpcomingEvents />
      <PastEvents />
      <InfoPopup isOpen={false} />
    </div>
  );
}

export default MainPage;
