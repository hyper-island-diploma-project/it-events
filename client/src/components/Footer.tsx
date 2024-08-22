
const Footer = () => {
  return (
    <footer className="grid grid-cols-[500px_auto] grid-rows-1 mt-24">
      <section className="rounded-3xl bg-lightGray py-12 pl-4 pr-8">
        <div className="mb-4 flex flex-col">
          <p>
            IT Events<span className="font-medium"> Newsletter:</span>{' '}
          </p>

          <p>
            the main events of the week:
            <span className="font-medium"> delivered to your inbox</span>
          </p>
        </div>
        <form className="grid w-full grid-cols-[300px_auto] grid-rows-1 gap-2 text-[16px]">
          <input
            placeholder="Your email"
            className="rounded-lg border border-stone-200 bg-lightGray px-4 py-2 text-stone-500"
          />
          <button className="rounded-lg bg-blueAccent px-4 py-2 text-white">
            Subscribe
          </button>
        </form>
      </section>
      <section className="flex flex-col justify-between rounded-3xl bg-lightGray py-12 pl-8 pr-4 text-stone-500">
        <ul className="mb-6 flex gap-12 text-[16px] font-medium">
          <li>About us</li>
          <li>Feedback</li>
          <li>Frequently asked questions</li>
        </ul>
        <p className="text-sm">
          © 1999–2024 IT Events Company. All rights reserved. For individuals
          18 and older. User Agreement, Privacy Policy.
        </p>
      </section>
    </footer>
  );
};

export default Footer;
