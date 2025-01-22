import PostCard from "../components/PostCard";

const Home = () => {
  return (
    <div className="flex justify-between p-5">
      <div>
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
      </div>
      <div className="px-5 text-center w-[400px]">
        <p>Recommended Topics</p>
        <div className="flex flex-row flex-wrap gap-3 md:gap-5 lg:gap-1 w-100 ">
          <button className="flex p-3 bg-gray-300 rounded-full">
            Productivity
          </button>
          <button className="flex p-3 bg-gray-300 rounded-full">Science</button>{" "}
          <button className="flex p-3 bg-gray-300 rounded-full">
            Productivity
          </button>
          <button className="flex p-3 bg-gray-300 rounded-full">
            Productivity
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
