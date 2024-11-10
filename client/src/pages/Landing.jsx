import Spline from '@splinetool/react-spline';
import { Typewriter } from 'react-simple-typewriter';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-black flex flex-col">
      {/* Navbar */}
      <nav className="absolute top-0 left-0 w-full flex items-center justify-between p-6 bg-opacity-70 bg-gray-900 text-white z-20">
        <div className="text-2xl font-semibold">Cole's Canvas</div>
        <button
          onClick={() => navigate('/signup')}
          className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition duration-300"
        >
          Sign Up
        </button>
      </nav>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center relative">
        <Spline
          scene="https://prod.spline.design/BHoBinyw1GIemnRw/scene.splinecode"
          className="absolute inset-0 w-full h-full"
        />
        
        {/* Welcome text overlay with typewriter effect */}
        <div className="relative z-10 flex flex-col items-center text-center">
          <h1 className="text-5xl font-bold text-white md:text-6xl lg:text-7xl">
            <Typewriter
              words={["Welcome to Cole's Canvas"]}
              loop={false}
              cursor
              cursorStyle="_"
              typeSpeed={100}
              deleteSpeed={50}
              delaySpeed={1000}
            />
          </h1>
          <p className="text-lg text-gray-300 mt-4 md:text-xl lg:text-2xl">
            Your creative playground awaits
          </p>
        </div>
      </main>
    </div>
  );
}
