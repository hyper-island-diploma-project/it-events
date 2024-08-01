const TabBar = () => {
  return (
    <header className="grid w-full grid-cols-[120px_auto] grid-rows-1 items-center justify-between border-b-[1px] border-stone-200 py-6">
      <img src="/logo-header.svg" alt="logo" />
      <nav>
        <ul className="grid w-full grid-cols-[auto_auto_auto_auto_auto] grid-rows-1 gap-12 text-sm text-stone-400">
          <li className="tabBarItem">
            <img
              src="/icon-events.svg"
              alt="events icon"
              className="h-7 w-7"
            ></img>
            <p>Events</p>
          </li>
          <li className="tabBarItem">
            <img
              src="/icon-random-coffe.svg"
              alt="random coffe icon"
              className="h-7 w-7"
            ></img>
            <p>Random Coffe</p>
          </li>
          <li className="tabBarItem">
            <img
              src="/icon-notifications.svg"
              alt="notification icon"
              className="h-7 w-7"
            ></img>
            <p>Notifications</p>
          </li>
          <li className="tabBarItem">
            <img
              src="/icon-favorites.svg"
              alt="favorite events icon"
              className="h-7 w-7"
            ></img>
            <p>Favorites</p>
          </li>
          <li className="tabBarItem">
            <img
              src="/icon-profile.svg"
              alt="profile icon"
              className="h-7 w-7"
            ></img>
            <p>Profile</p>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default TabBar;
