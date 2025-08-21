import { useGlicoDrive } from "../utils/provider";

// Welcome Screen Component
const WelcomeScreen = () => {
  const { setCurrentScreen, icons } = useGlicoDrive();
  const { Car, Shield } = icons;

  return (
    <div className="w-full h-full min-h-[720px] bg-gradient-to-br from-blue-600 to-purple-700 text-white flex flex-col overflow-y-auto">
      {/* Header */}
      <div className="flex-shrink-0 text-center pt-6 sm:pt-8 md:pt-10 pb-2 sm:pb-3 md:pb-4 px-4 sm:mb-3">
        <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-2">
          <Car className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-blue-600" />
        </div>
        <h1 className="text-lg sm:text-2xl md:text-3xl font-bold">
          GLICODRIVE
        </h1>
        <p className="text-xs sm:text-sm md:text-base text-blue-200">
          Motor Insurance
        </p>
      </div>

      {/* Hero Content */}
      <div className="px-4 sm:px-6 md:px-8 text-center mb-2 sm:mb-10">
        <div className="max-w-md mx-auto w-full">
          <h2 className="text-base sm:text-xl md:text-2xl font-bold mb-2 leading-snug">
            Welcome Back,
            <br />
            Protecting what matters most
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-blue-200 mb-2 sm:mb-3 leading-relaxed">
            Sign in or create an account in just minutes to access the best
            insurance policies tailored for you.
          </p>

          {/* Trust indicators */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 sm:p-3">
            <div className="flex items-center justify-center text-xs sm:text-sm">
              <Shield className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0" />
              <span>Licensed by Ghana Insurance Commission</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex-shrink-0 px-4 sm:px-6 md:px-8 pb-2 sm:pb-3 space-y-2 sm:space-y-3">
        <div className="max-w-md mx-auto w-full space-y-2 sm:space-y-3">
          <button
            onClick={() => setCurrentScreen("signup")}
            className="w-full bg-white text-blue-600 py-2.5 sm:py-3 rounded-xl font-semibold text-sm sm:text-base shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95"
          >
            Get Started
          </button>
          <button
            onClick={() => setCurrentScreen("signin")}
            className="w-full bg-white/20 backdrop-blur-sm text-white py-2.5 sm:py-3 rounded-xl font-semibold text-sm sm:text-base border border-white/30 hover:bg-white/30 transition-all duration-300 active:scale-95"
          >
            Sign In
          </button>
        </div>
      </div>

      {/* Version */}
      <div className="flex-shrink-0 text-center pb-1 sm:pb-2 text-xs text-blue-200">
        v2.1.0 | Bank of Ghana Compliant
      </div>
    </div>
  );
};

export default WelcomeScreen;
