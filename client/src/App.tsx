import { BrowserRouter, Route, Routes } from 'react-router-dom';
import EventsProvider from './providers/EventsProvider/EventsProvider';
import UserProvider from './providers/UserProvider/UserProvider.tsx';
import ProtectedRoute from './routeProtection/ProtectedRoute.tsx';
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
        <UserProvider>
          <EventsProvider>
            <Routes>
              <Route path="/" element={<Root />}>
                <Route index element={<MainPage />} />
                <Route path="/event/:id" element={<EventPage />} />
                <Route
                  path="/random-coffe"
                  element={<ProtectedRoute element={<RandomCoffePage />} />}
                />
                <Route
                  path="/favorites"
                  element={<ProtectedRoute element={<Favorites />} />}
                />
                <Route
                  path="/profile"
                  element={<ProtectedRoute element={<Profile />} />}
                />
              </Route>
            </Routes>
          </EventsProvider>
        </UserProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
