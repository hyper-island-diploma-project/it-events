function ErrorPage() {
  return (
    <div className=" text-accent h-screen pt-16 flex flex-col">
      <img src="/dots.svg" alt="dots" className=" w-[123px] h-[123px]" />
      <div className=" flrx flex-col text-3xl font-semibold mb-12">
        <p>There is a server-side issue.</p>
        <p>We are working to resolve it as quickly as possible.</p>
      </div>
      <button className=" text-white bg-accent py-2 w-40">Refresh</button>
    </div>
  );
}

export default ErrorPage;
