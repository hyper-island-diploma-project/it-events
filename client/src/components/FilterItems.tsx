const FilterItems = () => {
  return (
    <section className="flex max-w-[1000px] text-sm mb-6 mt-12">
      <ul className="grid w-full grid-cols-[150px_150px_150px_150px_150px_150px_150px] grid-rows-1 items-center gap-3">
        <li className="flex items-center justify-center rounded-full bg-blueAccent py-[6px] text-white">
          <button>All</button>
        </li>
        <li className="filterButton">
          <button>Frontend</button>
        </li>
        <li className="filterButton">
          <button>Backend</button>
        </li>
        <li className="filterButton">
          <button>AI</button>
        </li>
        <li className="filterButton">
          <button>DevOps</button>
        </li>
        <li className="filterButton">
          <button>Onsite</button>
        </li>
        <li className="filterButton">
          <button>Online</button>
        </li>
      </ul>
    </section>
  );
};

export default FilterItems;
