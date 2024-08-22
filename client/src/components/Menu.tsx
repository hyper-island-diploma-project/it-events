import { Link, useLocation } from 'react-router-dom';
import useUser from '../providers/UserProvider/UserProvider.hook';

const Menu = () => {
  const { isLoggedIn, currentUser } = useUser();

  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const menuMode = () => {
    if (isLoggedIn) {
      return (
        <ul className="grid w-full grid-cols-[auto_auto_auto_auto_auto] grid-rows-1 gap-12 text-sm text-stone-400">
          <li>
            <Link
              to="/"
              className="tabBarItem cursor-pointer"
              style={{ color: isActive('/') ? '#1D6BF3' : '#a8a29e' }}
            >
              <img
                src={
                  isActive('/') ? '/icon-events-active.svg' : '/icon-events.svg'
                }
                alt="events icon"
                className="h-7 w-7"
              ></img>
              Events
            </Link>
          </li>
          <li>
            <Link
              to="/random-coffe"
              className="tabBarItem cursor-pointer"
              style={{
                color: isActive('/random-coffe') ? '#1D6BF3' : '#a8a29e',
              }}
            >
              <img
                src={
                  isActive('/random-coffe')
                    ? '/icon-random-coffe-active.svg'
                    : '/icon-random-coffe.svg'
                }
                alt="events icon"
                className="h-7 w-7"
              ></img>
              Random Coffe
            </Link>
          </li>
          <li>
            <Link
              to="/favorites"
              className="tabBarItem cursor-pointer"
              style={{ color: isActive('/favorites') ? '#1D6BF3' : '#a8a29e' }}
            >
              <img
                src={
                  isActive('/favorites')
                    ? '/icon-favorites-active.svg'
                    : '/icon-favorites.svg'
                }
                alt="favorite events icon"
                className="h-7 w-7"
              ></img>
              Favorites
            </Link>
          </li>
          <li>
            <Link
              to="/profile"
              className="tabBarItem cursor-pointer"
              style={{ color: isActive('/profile') ? '#1D6BF3' : '#a8a29e' }}
            >
              <img
                src={
                  isActive('/profile')
                    ? '/icon-profile-active.svg'
                    : '/icon-profile.svg'
                }
                alt="favorite events icon"
                className="h-7 w-7"
              ></img>
              {currentUser?.first_name}
            </Link>
          </li>
        </ul>
      );
    } else {
      return (
        <ul className="grid w-full grid-cols-[auto_auto] grid-rows-1 gap-12 text-sm text-stone-600">
          <li>
            <Link
              to="/"
              className="tabBarItem cursor-pointer"
              style={{ color: isActive('/') ? '#1D6BF3' : '#57534e' }}
            >
              <img
                src={
                  isActive('/') ? '/icon-events-active.svg' : '/icon-events.svg'
                }
                alt="events icon"
                className="h-7 w-7"
              ></img>
              Events
            </Link>
          </li>
          <li>
            <Link
              to="/profile"
              className="tabBarItem cursor-pointer"
              style={{ color: isActive('/profile') ? '#1D6BF3' : '#a8a29e' }}
            >
              <img
                src={
                  isActive('/profile')
                    ? '/icon-profile-active.svg'
                    : '/icon-profile.svg'
                }
                alt="favorite events icon"
                className="h-7 w-7"
              ></img>
              Profile
            </Link>
          </li>
        </ul>
      );
    }
  };

  return (
    <header className="grid w-full grid-cols-[120px_auto] grid-rows-1 items-center justify-between border-b-[1px] border-stone-200 py-6">
      <Link to="/">
        <img src="/logo-header.svg" alt="logo" />
      </Link>
      <nav>{menuMode()}</nav>
    </header>
  );
};

export default Menu;
