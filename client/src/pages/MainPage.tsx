import HeroMain from '../components/HeroMain';
import UpcomingEvents from '../components/UpcomingEvents';
import PastEvents from '../components/PastEvents';

function MainPage() {
  return (
    <>
      <p className="pageName">Events</p>
      <HeroMain />
      <UpcomingEvents />
      <PastEvents />
    </>
  );
}

export default MainPage;
