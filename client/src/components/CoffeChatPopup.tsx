import { useState } from 'react';

const CoffeChatPopup = () => {
  const [isPopupClose, setIsPopupClose] = useState<boolean>(() => {
    const storedValue = localStorage.getItem('isChatPopupClose');
    return storedValue === 'true';
  });

  const handleClose = () => {
    setIsPopupClose(true);
    localStorage.setItem('isChatPopupClose', 'true');
  };

  return isPopupClose === false ? (
    <div className="fixed inset-0 flex h-full w-full items-center justify-center">
      <div className="flex w-[485px] flex-col items-center rounded-[20px] bg-black p-6 text-white opacity-100 shadow-2xl">
        <p className="mb-6 text-2xl font-semibold">Welcome to the chat!</p>
        <p className="mb-8 text-center">
          Welcome to chat with your chosen Random Coffee meeting partner! We
          invite you to get acquainted and make an appointment at a time
          convenient for you. You can also agree on how you will carry it out -
          this is your decision. Good luck!
        </p>
        <button
          onClick={handleClose}
          className="rounded-[12px] bg-blueAccent px-32 py-2"
        >
          I see
        </button>
      </div>
    </div>
  ) : null;
};

export default CoffeChatPopup;
