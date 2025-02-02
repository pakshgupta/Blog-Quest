import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreatePostMutation } from "../app/api/postAPI";

const Write = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [newPost] = useCreatePostMutation();
  const navigate = useNavigate();
  const handleSubmit = async () => {
    const formData = new FormData();
    formData.set("title", title);
    formData.set("description", description);
    const res = await newPost({ formData });
    if (res) {
      navigate("/");
    }
  };
  return (
    <div className="relative flex items-center justify-center w-full min-h-screen">
      {/* Publish Button */}
      <button
        className="absolute px-6 py-2 text-sm text-white bg-black rounded-full top-6 right-6 hover:bg-gray-800"
        onClick={handleSubmit}
      >
        Publish
      </button>

      {/* Content Area */}
      <div className="w-full px-8">
        {/* Title Input */}
        <div className="flex flex-col w-full max-w-4xl mx-auto mt-8">
          <input
            className="w-full mb-6 text-5xl font-bold text-gray-800 placeholder-gray-500 focus:outline-none"
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
          />
        </div>

        {/* Content Editor */}
        <div className="w-full max-w-4xl mx-auto">
          <textarea
            name="content"
            id="content"
            placeholder="Tell your story..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full min-h-[600px] text-xl text-gray-700 font-normal leading-relaxed placeholder-gray-500 focus:outline-none resize-none"
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default Write;
