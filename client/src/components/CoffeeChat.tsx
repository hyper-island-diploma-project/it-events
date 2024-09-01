// import { useState } from 'react';
import CoffeChatPopup from './CoffeChatPopup';
import { useState } from 'react';

const CoffeeChat = () => {
  const [statusState, setStatusState] = useState('All');

  return (
    <div>
      <p className="mb-4 text-lg">
        To find a conversation partner, choose:
      </p>
      <form className="flex gap-3 text-lg text-gray-500">
        <div className="relative inline-block w-48">
          <select
            className="w-full appearance-none rounded-full border border-gray-400 bg-transparent px-6 py-2"
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
              className="h-6 w-6 fill-current text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
            </svg>
          </div>
        </div>
        <button className="rounded-full bg-blueAccent px-6 py-2 text-white">
          Search
        </button>
        <button className="rounded-full border border-gray-400 px-6 py-2">
          Resert
        </button>
      </form>
      <section className=' my-10 flex items-center gap-10 h-screen/60'>
        <div className=' shadow-lg rounded-xl h-full'>
          <div className=' flex border-b border-gray-200 pt-6 pb-4 justify-center w-[300px]'>
            <img src='/stars.svg' alt='' />
            <p className=' text-lg ml-2'>Random Coffee</p>
          </div>
          <ul className=' py-6 px-4 text-lg flex flex-col gap-2'>
            <li>Alex Petrov</li>
            <li>Max Ivanov</li>
          </ul>
        </div>
        <div className=' flex flex-col w-full h-full'>
          <p className=" flex font-semibold text-xl pt-6 pb-4 ">Chat</p>
          <div className=' h-full'></div>
          <form className=' grid grid-cols-[1fr_130px] w-full gap-4'>
            <input
            className=' rounded-full  px-6 py-2 border border-gray-200'
            placeholder='Send a message'
            ></input>
            <button className='rounded-full bg-blueAccent py-2 text-white'>Send</button>
          </form>
        </div>
      
      </section>
      <CoffeChatPopup />
    </div>
  );
};

export default CoffeeChat;
