import CoffeeChat from "../components/CoffeeChat";



function RandomCoffeePage() {
  return (
    <div className="py-6">
    <p className="pageName">Random Coffee</p>
      <div>
        <p className=" text-lg  mt-6 mb-20">
          <span className="rounded-full bg-blueAccent text-white py-1 px-3 mr-1">
            Random Coffee is 
          </span>
          a service for random meetings with strangers, but it is not a dating
          app.
        </p>
        <CoffeeChat />
      </div>
    </div>
  );
}

export default RandomCoffeePage;
