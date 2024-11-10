import Spline from '@splinetool/react-spline';
import { Typewriter } from 'react-simple-typewriter';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-black flex flex-col">
      
      <div className='text-right'>
        <button
            onClick={() => navigate('/signup')}
            className="  bg-black hover:bg-white text-white hover:text-black rounded-lg font-medium transition duration-300 p-2"
            >Get Started
        </button>
      </div>


      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center relative">
        <Spline
          scene="https://prod.spline.design/BHoBinyw1GIemnRw/scene.splinecode"
          className="absolute inset-0 w-full h-full"
        />
        
        {/* Welcome text overlay with typewriter effect */}
        <div className="relative z-10 flex flex-col items-center text-center">
          <h1 className="text-5xl font-bold text-white md:text-6xl lg:text-7xl " style={{fontFamily:"monospace"}}>
            <Typewriter
              words={["Welcome to Cole's Canvas"]}
              loop={false}
              cursor
              cursorStyle="_"
              typeSpeed={150}
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
