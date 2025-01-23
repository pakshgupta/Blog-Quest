import { IoClose } from "react-icons/io5";
import { useCommentToggle } from "../contexts/CommentToggleProvider";

const PostComments = () => {
  const { closeComment } = useCommentToggle();
  return (
    <div className="p-4">
      <h3 className="mb-6 text-2xl font-semibold">Comments</h3>
      <button
        onClick={closeComment}
        className="absolute text-3xl text-gray-600 top-4 right-4 hover:text-gray-800"
      >
        <IoClose />
      </button>
      <div className="flex items-center gap-4 mb-6">
        <img
          src="https://source.unsplash.com/50x50/?user"
          alt="User Avatar"
          className="object-cover w-12 h-12 rounded-full"
        />
        <textarea
          placeholder="Write a comment..."
          className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
        ></textarea>
      </div>
      <div className="space-y-6">
        {/* Single Comment */}
        <div className="flex items-start gap-4">
          <img
            src="https://source.unsplash.com/50x50/?person"
            alt="Commenter Avatar"
            className="object-cover w-10 h-10 rounded-full"
          />
          <div>
            <p className="font-semibold">Jane Smith</p>
            <p className="text-gray-700">
              This is a fantastic post! I learned so much. Thanks for sharing.
            </p>
          </div>
        </div>
        {/* Another Comment */}
        <div className="flex items-start gap-4">
          <img
            src="https://source.unsplash.com/50x50/?face"
            alt="Commenter Avatar"
            className="object-cover w-10 h-10 rounded-full"
          />
          <div>
            <p className="font-semibold">Alex Johnson</p>
            <p className="text-gray-700">
              Great explanation and beautifully laid out. Keep it up!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostComments;
