import { useGlicoDrive } from "../utils/provider";

// Splash Screen Component
const SplashScreen = () => {
  const { setCurrentScreen } = useGlicoDrive();

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentScreen("welcome");
    }, 2000);
    return () => clearTimeout(timer);
  }, [setCurrentScreen]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 flex flex-col items-center justify-center text-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 rounded-full border border-white"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 rounded-full border border-white"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 rounded-full border border-white"></div>
      </div>

      <div className="text-center relative z-10">
        {/* Logo */}
        <div className="mb-8">
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-2xl">
            <Car className="w-12 h-12 text-blue-600" />
          </div>
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-wider">GLICODRIVE</h1>
            <p className="text-blue-200 text-lg">Motor Insurance</p>
          </div>
        </div>

        {/* Loading indicator */}
        <div className="flex justify-center mb-8">
          <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>

        {/* Trust indicators */}
        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-center text-blue-200">
            <Lock className="w-4 h-4 mr-2" />
            <span>Licensed by Ghana Insurance Commission</span>
          </div>
          <div className="text-blue-300">
            <p>Powered by GLICO Group</p>
            <p className="text-xs">We cushion you for life</p>
          </div>
        </div>
      </div>

      {/* Version info */}
      <div className="absolute bottom-4 text-center text-xs text-blue-200">
        <p>v2.1.0 | MID Verified</p>
        <p>Bank of Ghana Compliant</p>
      </div>
    </div>
  );
};

export default SplashScreen;

// Note: This component is designed to be used as the initial screen of the application,
// displaying a splash screen with branding and loading indicators before navigating to the welcome screen.
