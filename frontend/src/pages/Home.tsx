import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAllProductsQuery } from "../app/api/postAPI";
import { useAppSelector } from "../app/hook";
import PostCard from "../components/PostCard";

const Home = () => {
  const { data, refetch } = useAllProductsQuery();
  const { user } = useAppSelector((state) => state.userReducer);
  useEffect(() => {
    if (user) {
      refetch();
    }
  }, [user, refetch]);
  console.log(data?.data.posts);
  return (
    <div className="flex justify-between p-5">
      <div>
        {data?.data.posts?.map((post) => (
          <Link to={`/post/${post._id}`}>
            <PostCard
              title={post.title}
              description={post.description}
              id={post._id}
            />
          </Link>
        ))}
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
        <div className="mt-5">
          <h5>who to follow</h5>
          <div className="flex flex-col items-center justify-between gap-4 p-4 rounded-lg sm:flex-row">
            <img
              src=""
              alt="image"
              className="object-cover w-16 h-16 border-2 rounded-full"
            />
            <div className="flex flex-col flex-grow text-center sm:text-left">
              <h4 className="text-lg font-semibold text-gray-800">Name</h4>
              <p className="max-w-xs text-sm text-gray-600">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Perferendis minima, veritatis non repudiandae enim mollitia
                laborum iure dolore vel saepe sed aperiam cum corrupti
                doloremque? Rerum saepe nemo ex doloribus.
              </p>
            </div>
            <button className="px-4 py-2 text-sm font-medium text-white bg-black rounded-full hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black">
              Follow
            </button>
          </div>
        </div>
        <div className="mt-5">
          <h5>Recently Saved</h5>
          <div className="flex flex-col items-center justify-between gap-4 p-4 rounded-lg sm:flex-row">
            <img
              src=""
              alt="image"
              className="object-cover w-16 h-16 border-2 rounded-full"
            />
            <div className="flex flex-col flex-grow text-center sm:text-left">
              <h4 className="text-lg font-semibold text-gray-600">Name</h4>
              <Link
                to="/post/:id"
                className="max-w-xs text-lg font-bold text-black"
              >
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Perferendis minima, veritatis non repudiandae enim mollitia
                laborum iure dolore vel saepe sed aperiam cum corrupti
                doloremque? Rerum saepe nemo ex doloribus.
              </Link>
              <p className="max-w-xs text-sm text-gray-600">date</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
