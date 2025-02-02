import { CiCircleMinus } from "react-icons/ci";
import { MdOutlineBookmarkAdd } from "react-icons/md";

interface PostCardProps {
  title: string;
  description?: string;
  id?: string;
}
const PostCard: React.FC<PostCardProps> = ({ title, description, id }) => {
  return (
    <div className="flex flex-col max-w-3xl gap-4 p-6 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg">
      <p className="font-semibold text-gray-700">Name</p>
      <div className="flex gap-6">
        {/* Text Section */}
        <div className="flex flex-col w-full">
          <h3 className="text-2xl font-bold text-gray-800">{title}</h3>
          <p className="mt-2 text-lg text-gray-600">{description}</p>

          {/* Footer */}
          <div className="flex justify-between mt-4 text-sm text-gray-500">
            <div className="flex space-x-6">
              <p>Date</p>
              <p>Likes</p>
              <p>Comments</p>
            </div>

            {/* Icons */}
            <div className="flex space-x-4">
              <CiCircleMinus className="text-2xl text-gray-600 cursor-pointer hover:text-gray-800" />
              <MdOutlineBookmarkAdd className="text-2xl text-gray-600 cursor-pointer hover:text-gray-800" />
            </div>
          </div>
        </div>

        {/* Image Section */}
        <div className="w-48 h-32 overflow-hidden rounded-lg">
          <img
            src="https://source.unsplash.com/random"
            alt="Post"
            className="object-cover w-full h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default PostCard;
