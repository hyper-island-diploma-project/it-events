import { BrowserRouter, Route, Routes } from 'react-router-dom';
import EventsProvider from './providers/EventsProvider/EventsProvider';
import Root from './pages/Root';
import MainPage from './pages/MainPage';
import EventPage from './pages/EventPage';

function App() {
  return (
    <div>
      <BrowserRouter>
        <EventsProvider>
          <Routes>
            <Route path="/" element={<Root />}>
              <Route index element={<MainPage />} />
              <Route path='/event/:id' element={<EventPage />} />
            </Route>
          </Routes>
        </EventsProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
