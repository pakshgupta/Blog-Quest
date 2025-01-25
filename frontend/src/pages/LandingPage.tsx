import { Link } from "react-router-dom";
import Footer from "../components/Footer";
const LandingPage = () => {
  return (
    <div className="relative w-full h-screen">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="./images/cover2.jpg" // Replace with an inspiring writing-related image
          alt="Motivational Writing Background"
          className="object-cover w-full h-full brightness-75"
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-white/50 to-white/80"></div>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center lg:px-32">
        <h1 className="text-4xl font-extrabold leading-tight text-gray-900 md:text-6xl">
          Start Your <span className="text-yellow-600">Writing Journey</span>
        </h1>
        <p className="max-w-3xl mt-4 text-lg text-gray-700 md:text-xl">
          Share your ideas, express your thoughts, and connect with a world of
          readers. Your story deserves to be heard.
        </p>

        {/* Call-to-Action Buttons */}
        <div className="flex flex-col mt-8 space-y-4 md:flex-row md:space-y-0 md:space-x-6">
          <Link
            to="/user/signup"
            className="px-8 py-3 font-semibold text-white transition bg-yellow-500 rounded-md shadow-md hover:bg-yellow-700"
          >
            Get Started
          </Link>
          <button className="px-8 py-3 font-semibold text-gray-800 transition bg-gray-100 rounded-md shadow-md hover:bg-gray-200">
            Learn More
          </button>
        </div>
      </div>
      <hr className="absolute w-full mx-auto my-8 border-t-2 border-black bottom-20" />
      {/* Footer */}
      <footer className="absolute bottom-0 w-full py-4 text-sm text-center text-gray-500">
        <Footer />
      </footer>
    </div>
  );
};

export default LandingPage;
