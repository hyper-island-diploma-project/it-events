import TabBar from './components/TabBar';
import Hero from './components/Hero';
import UpcomingEvents from './components/UpcomingEvents';
import EventsProvider from './providers/EventsProvider/EventsProvider';

function App() {
  return (
    <EventsProvider>
      <TabBar />
      <Hero />
      <UpcomingEvents />
    </EventsProvider>
  );
}

export default App;
