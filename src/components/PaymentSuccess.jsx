import { CheckCircle, Eye, Share2, Download, Home } from "lucide-react";
import { useGlicoDrive } from "../utils/provider";

// Mock data
const mockData = {
  userProfile: {
    email: "john.doe@example.com",
  },
  vehicles: [
    {
      make: "Toyota",
      model: "Camry",
    },
  ],
};

// Payment Success Screen
const PaymentSuccess = () => {
  const { userProfile, vehicles } = mockData;

  const { setCurrentScreen } = useGlicoDrive();

  return (
    <div className="w-full h-full bg-gradient-to-br from-green-600 via-emerald-600 to-teal-700 text-white flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 text-center overflow-y-auto">
        {/* Success Animation */}
        <div className="relative mb-6 sm:mb-8">
          <div className="w-24 sm:w-32 h-24 sm:h-32 bg-white rounded-full flex items-center justify-center shadow-2xl">
            <CheckCircle className="w-16 sm:w-20 h-16 sm:h-20 text-green-600" />
          </div>
          <div className="absolute inset-0 w-24 sm:w-32 h-24 sm:h-32 border-4 border-white/30 rounded-full animate-ping" />
          <div
            className="absolute inset-2 w-20 sm:w-28 h-20 sm:h-28 border-2 border-white/20 rounded-full animate-ping"
            style={{ animationDelay: "1s" }}
          />
        </div>

        <h1 className="text-2xl sm:text-4xl font-bold mb-2 sm:mb-3">
          Payment Successful!
        </h1>
        <p className="text-lg sm:text-xl mb-6 sm:mb-8 text-green-100 px-4">
          Your policy is now active and you're fully protected
        </p>

        {/* Policy Details Card */}
        <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-4 sm:p-6 w-full max-w-sm mb-6 sm:mb-8">
          <div className="space-y-3 sm:space-y-4">
            {[
              ["Policy Number:", "POL-2024-000002"],
              ["Vehicle:", `${vehicles[0]?.make} ${vehicles[0]?.model}`],
              ["Coverage:", "Comprehensive"],
              ["Premium Paid:", "GHS 1,350"],
              ["MID Status:", "Verified & Active"],
              [
                "Valid Until:",
                new Date(
                  Date.now() + 365 * 24 * 60 * 60 * 1000
                ).toLocaleDateString(),
              ],
            ].map(([label, value], idx) => (
              <div
                key={idx}
                className="flex justify-between items-center text-sm sm:text-base"
              >
                <span className="text-green-100">{label}</span>
                <span className="font-semibold text-white text-right">
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4 w-full max-w-sm">
          <button
            onClick={() => setCurrentScreen("dashboard")}
            className="w-full bg-white text-green-700 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg hover:bg-green-50 transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2"
          >
            <Home className="w-5 sm:w-6 h-5 sm:h-6" />
            <span>Go to Dashboard</span>
          </button>

          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={() => setCurrentScreen("policy-card")}
              className="bg-white/20 backdrop-blur-sm text-white py-3 rounded-xl font-semibold hover:bg-white/30 transition-all duration-200 flex flex-col items-center space-y-1"
            >
              <Eye className="w-4 sm:w-5 h-4 sm:h-5" />
              <span className="text-xs">View</span>
            </button>
            <button className="bg-white/20 backdrop-blur-sm text-white py-3 rounded-xl font-semibold hover:bg-white/30 transition-all duration-200 flex flex-col items-center space-y-1">
              <Download className="w-4 sm:w-5 h-4 sm:h-5" />
              <span className="text-xs">Download</span>
            </button>
            <button className="bg-white/20 backdrop-blur-sm text-white py-3 rounded-xl font-semibold hover:bg-white/30 transition-all duration-200 flex flex-col items-center space-y-1">
              <Share2 className="w-4 sm:w-5 h-4 sm:h-5" />
              <span className="text-xs">Share</span>
            </button>
          </div>
        </div>

        {/* Welcome Message */}
        <div className="mt-6 sm:mt-8 text-center px-4">
          <p className="text-green-100 mb-2 text-base sm:text-lg">
            Welcome to GLICO-DRIVE protection!
          </p>
          <p className="text-sm text-green-200 mb-1">
            Policy documents sent to {userProfile.email}
          </p>
          <p className="text-sm text-green-200">
            Emergency support: 0302-664-910 • Available 24/7
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
