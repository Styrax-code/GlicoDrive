import { useGlicoDrive } from "../utils/provider";

const WelcomeScreen = () => {

  const { setCurrentScreen, icons } = useGlicoDrive();
  const { Lock, Car, Shield, User, ArrowRight, Star } = icons;

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-purple-900 to-blue-700 flex items-center justify-center overflow-hidden rounded-[14px]">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-[5%] left-[5%] w-16 h-16 sm:w-24 sm:h-24 lg:w-32 lg:h-32 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-[10%] right-[5%] w-20 h-20 sm:w-32 sm:h-32 lg:w-40 lg:h-40 bg-purple-300 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/4 w-12 h-12 sm:w-18 sm:h-18 lg:w-24 lg:h-24 bg-blue-300 rounded-full blur-2xl"></div>
      </div>

      {/* Center Card (slightly smaller than parent to reveal gradient) */}
      <div
        className="relative bg-white/95 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-2xl 
        w-[90%] h-[90%] max-w-3xl mx-auto overflow-hidden border border-white/20 
        flex flex-col"
      >
        {/* Header */}
        <div className="text-center pt-6 sm:pt-8 md:pt-12 pb-3 sm:pb-4 md:pb-2 px-3 sm:px-4 md:px-6 relative flex-shrink-0">
          <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl sm:rounded-3xl flex items-center justify-center mx-auto mb-3 sm:mb-4 md:mb-6 shadow-lg border border-blue-100">
            <div className="relative">
              <Car
                className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-blue-600"
                strokeWidth={1.5}
              />
              <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 bg-blue-600 rounded-full flex items-center justify-center">
                <Shield
                  className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 text-white"
                  strokeWidth={2}
                />
              </div>
            </div>
          </div>

          <div className="space-y-1 mb-2 sm:mb-3 md:mb-4">
            <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 tracking-wide">
              GLICODRIVE
            </h1>
            <p className="text-blue-600 text-xs sm:text-sm md:text-base font-semibold tracking-wider uppercase">
              Motor Insurance
            </p>
          </div>
        </div>

        {/* Main Content (scrollable if needed) */}
        <div className="px-3 sm:px-4 md:px-6 pb-4 sm:pb-6 md:pb-8 flex-1 flex flex-col justify-between ">
          <p className="text-gray-600 text-xs sm:text-sm md:text-base  text-sm text-center leading-relaxed mb-4 sm:mb-6 px-2 sm:px-4">
            Comprehensive motor insurance with instant quotes,
            competitive rates, and 24/7 claim support.
          </p>
          {/* Buttons at bottom */}
          <div className="space-y-2 sm:space-y-3 flex-shrink-0">
            <button
              onClick={() => setCurrentScreen("signup")}
              className="group w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 md:py-4 rounded-xl sm:rounded-2xl font-semibold text-sm md:text-base shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 flex items-center justify-center relative overflow-hidden"
            >
              <User className="w-5 h-5 mr-2 relative z-10" strokeWidth={2} />
              <span className="relative z-10">Get Started</span>
              <ArrowRight className="w-4 h-4 ml-2 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
            </button>

            <button
              onClick={() => setCurrentScreen("signin")}
              className="group w-full bg-gray-50 hover:bg-gray-100 text-blue-700 py-3 md:py-4 rounded-xl sm:rounded-2xl font-semibold text-sm md:text-base border border-gray-200 hover:border-blue-200 transition-all duration-300 flex items-center justify-center"
            >
              <ArrowRight className="w-5 h-5 mr-2 rotate-45" strokeWidth={2} />
              Sign In
              <div className="ml-2 opacity-50 group-hover:opacity-100 transition-opacity duration-300">
                →
              </div>
            </button>
          </div>

           {/* Trust Indicators */}
          <div className="mt-6 pt-2 border-t border-gray-100">
            <div className="flex items-center justify-center text-xs text-gray-500 mb-2">
              <Shield className="w-4 h-4 mr-2 text-blue-600" />
              <span>GIC Licensed • Bank of Ghana Compliant</span>
            </div>
            <div className="flex items-center justify-center text-xs text-gray-500 mb-2">
              <Lock className="w-4 h-4 mr-2 text-gray-600" />{" "}
              <span>Your data is encrypted and secure</span>
            </div>
          </div>
        </div>

        {/* Bottom accent */}
        <div className="h-1 bg-gradient-to-r from-blue-500 to-purple-600 flex-shrink-0"></div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
