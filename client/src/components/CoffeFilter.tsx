import { useState } from 'react';

const CoffeFilter = () => {
  const [statusState, setStatusState] = useState('All');

  return (
    <section>
      <p className="text-lg mt-6 mb-4">To find a conversation partner, choose:</p>
      <form className=' flex gap-3 text-gray-500 text-lg '>
        <div className="relative inline-block w-48">
          <select
            className="appearance-none border border-gray-400 rounded-full py-2 px-6 w-full bg-transparent"
            defaultValue={statusState}
            onChange={(e) => {
              const selectedStatus = e.target.value;
              setStatusState(selectedStatus);
            }}
          >
            <option value="all">All</option>
            <option value="frontend">Frontend</option>
            <option value="backend">Backend</option>
            <option value="ux/ui">UX/UI</option>
            <option value="ai">AI</option>
            <option value="full-stack">Full-stack</option>
            <option value="qa">QA</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
            <svg
              className="fill-current text-gray-400 h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
            </svg>
          </div>
        </div>
        <button className=' rounded-full py-2 px-6 text-white bg-blueAccent'>Search</button>
        <button className=' rounded-full py-2 px-6 border border-gray-400'>Resert</button>
      </form>
    </section>
  );
};

export default CoffeFilter;

