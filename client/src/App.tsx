import { BrowserRouter, Route, Routes } from 'react-router-dom';
import EventsProvider from './providers/EventsProvider/EventsProvider';
import Root from './pages/Root';
import MainPage from './pages/MainPage';
import EventPage from './pages/EventPage';
import RandomCoffePage from './pages/RandomCoffePage';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';

function App() {
  return (
    <div>
      <BrowserRouter>
        <EventsProvider>
          <Routes>
            <Route path="/" element={<Root />}>
              <Route index element={<MainPage />} />
              <Route path='/event/:id' element={<EventPage />} />
              <Route path='/random-coffe' element={<RandomCoffePage />} />
              <Route path='/favorites' element={<Favorites />} />
              <Route path='/profile' element={<Profile />} />
            </Route>
          </Routes>
        </EventsProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
