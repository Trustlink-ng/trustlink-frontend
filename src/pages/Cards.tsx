export default function Cards() {
  return (
    <div className="w-full flex-col gap-6 p-6 text-primary my-24 flex items-center justify-center">
      <div className="flex flex-wrap text-center flex-col gap-6 justify-center items-center">
        <h2 className="text-3xl lg:text-4xl font-semibold">Virtual Cards Coming Soon!</h2>
        <p className="text-xl">Get ready for safer, smarter payments. Stay tuned!</p>
      </div>
      <div className="w-64 lg:w-96">
        <img src="./virtual-card.svg" alt="Virtual Cards"/>
      </div>
    </div>
  );
}
