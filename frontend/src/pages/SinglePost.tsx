import { FaRegCirclePlay, FaRegComment } from "react-icons/fa6";
import { IoBookmarkOutline } from "react-icons/io5";
import { PiHandsClappingThin } from "react-icons/pi";
import { useParams } from "react-router-dom";
import { useSinglePostQuery } from "../app/api/postAPI";
import PostComments from "../components/PostComments";
import { useCommentToggle } from "../contexts/CommentToggleProvider";
const SinglePost = () => {
  const { isCommentOpen, toggleComment } = useCommentToggle();

  const params = useParams();

  const { data } = useSinglePostQuery(params.id!);
  if (data) {
    const post = data.data;
    return (
      <div className="min-h-screen text-gray-800 ">
        {/* Header Section */}

        <div className="max-w-4xl mx-auto mt-10">
          <h1 className="text-6xl font-bold leading-tight">
            {/* How to Build a Medium-like Post Page with React */}
            {post.title}
          </h1>
          <div className="flex items-center gap-4 mt-6">
            <img
              src="https://source.unsplash.com/50x50/?portrait"
              alt="Author"
              className="object-cover w-12 h-12 rounded-full"
            />
            <div>
              <div className="flex flex-row ">
                <p className="font-medium text-md">{post.owner}</p>
                <button className="px-2 py-1 ml-2 text-sm text-green-700 hover:text-green-900">
                  • Follow
                </button>
              </div>

              <p className="text-sm text-gray-500">
                {post.readingTime} read • {post.createdAt}{" "}
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto mt-10">
          <hr />
          <div className="flex items-center justify-between ">
            <div className="flex items-center gap-4">
              <button className="flex items-center justify-between gap-1 p-3 text-lg">
                <PiHandsClappingThin />
                Count
              </button>

              <button className="flex p-3 text-lg" onClick={toggleComment}>
                <FaRegComment />
              </button>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative group">
                <button className="flex p-3 text-lg">
                  <IoBookmarkOutline />
                </button>
                <span className="absolute hidden px-2 py-1 text-sm text-white bg-gray-800 rounded-md group-hover:block bottom-12">
                  save
                  <span className="absolute bottom-[-6px] left-1/2 transform -translate-x-1/2 w-3 h-3 bg-gray-800 rotate-45"></span>
                </span>
              </div>
              <div className="relative group">
                <button className="flex p-3 text-lg">
                  <FaRegCirclePlay />
                </button>
                <span className="absolute hidden px-2 py-1 text-sm text-white bg-gray-800 rounded-md group-hover:block bottom-12">
                  Listen
                  <span className="absolute bottom-[-6px] left-1/2 transform -translate-x-1/2 w-3 h-3 bg-gray-800 rotate-45"></span>
                </span>
              </div>
            </div>
          </div>

          <hr />
        </div>
        {/* Content Section */}
        <main className="w-full max-w-4xl mx-auto mt-5 bg-white">
          <img
            src="https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="Post Cover"
            className="w-full h-screen mb-8 rounded-lg"
          />
          <article className="prose prose-lg text-gray-800 max-w-none">
            <p>
              {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
              vel ligula euismod, fermentum nunc at, vehicula augue. Proin a
              dapibus nisl. Aenean vel vestibulum nisi. Integer tristique
              malesuada elit, quis lacinia erat venenatis nec. */}
              {post.description}
            </p>
            <h2>Subheading</h2>
            <p>
              Cras vitae purus sit amet eros pharetra auctor. Sed nec quam a
              arcu tristique vehicula. Suspendisse eget consectetur purus. Duis
              sit amet semper est.
            </p>
            <blockquote>
              "This is a beautifully designed layout that mirrors Medium's clean
              and professional design."
            </blockquote>
            <p>
              Etiam sit amet nibh in risus pulvinar tincidunt. Morbi nec purus
              pulvinar, dignissim justo non, scelerisque metus. Nullam volutpat,
              enim vel luctus dictum, lacus justo facilisis mauris, at bibendum
              justo velit vel neque.
            </p>
          </article>
        </main>
        <aside
          className={`fixed top-0 right-0 h-full w-96 bg-gray-100 shadow-lg border-l transform transition-transform duration-300 ${
            isCommentOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <PostComments />
        </aside>
        {/* Comment Section */}
        <section className="w-full max-w-4xl px-8 py-10 mx-auto bg-gray-50"></section>
      </div>
    );
  }
};

export default SinglePost;
