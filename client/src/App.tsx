import { BrowserRouter, Route, Routes } from 'react-router-dom';
import EventsProvider from './providers/EventsProvider/EventsProvider';
import UserProvider from './providers/UserProvider/UserProvider.tsx';
import ProtectedRoute from './routeProtection/ProtectedRoute.tsx';
import Root from './pages/Root';
import MainPage from './pages/MainPage';
import EventPage from './pages/EventPage';
import RandomCoffeePage from './pages/RandomCoffeePage.tsx';
import Favorites from './pages/Favorites';
import ProfilePage from './pages/ProfilePage.tsx';
import ErrorPage from './pages/ErrorPage.tsx';

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
                  element={<ProtectedRoute element={<RandomCoffeePage />} />}
                />
                <Route
                  path="/favorites"
                  element={<ProtectedRoute element={<Favorites />} />}
                />
                <Route
                  path="/profile"
                  element={<ProtectedRoute element={<ProfilePage />} />}
                />
              </Route>
              <Route path="/error" element={<ErrorPage />} />
            </Routes>
          </EventsProvider>
        </UserProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
