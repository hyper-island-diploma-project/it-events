const HeroMain = () => {
  return (
    <section className="relative w-full rounded-[20px] bg-black p-8 overflow-hidden mb-6">
      <img src="/hero-img.svg" alt="" className="absolute -bottom-[50px] -right-[100px] " />
      <div className="flex gap-6 flex-col text-white max-w-[700px]">
        <h3 className=" text-xl font-medium">With IT Events you can:</h3>
        <ul className=" flex gap-6 flex-col text-lg">
          <li>
            <span className=" text-yellow font-medium">* Participate in various events:</span> whether it is an online conference,
            webinar, workshop, social gathering with friends, or just a friendly
            chat
          </li>
          <li>
            <span className=" text-yellow font-medium">* Easily find interesting events:</span> by topic, date, time, location, or
            even by mood
          </li>
          <li>
            <span className=" text-yellow font-medium">* Communicate with people from all over the world:</span> share your
            interests, meet new friends, and connect with like-minded
            individuals
          </li>
        </ul>
      </div>
    </section>
  );
};

export default HeroMain;
