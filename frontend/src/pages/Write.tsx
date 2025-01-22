const Write = () => {
  return (
    <div className="relative flex items-center justify-center w-full min-h-screen">
      {/* Publish Button */}
      <button className="absolute px-6 py-2 text-sm text-white bg-black rounded-full top-6 right-6 hover:bg-gray-800">
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
            placeholder="Title"
          />
        </div>

        {/* Content Editor */}
        <div className="w-full max-w-4xl mx-auto">
          <textarea
            name="content"
            id="content"
            placeholder="Tell your story..."
            className="w-full min-h-[600px] text-xl text-gray-700 font-normal leading-relaxed placeholder-gray-500 focus:outline-none resize-none"
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default Write;
