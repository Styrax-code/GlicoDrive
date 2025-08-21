import { 
  ArrowLeft, Share2, Shield, CheckCircle, Download, Phone, Copy, ExternalLink 
} from "lucide-react";
import { useGlicoDrive } from "../utils/provider";

// Mock data
const mockData = {
  userProfile: {
    firstName: "John",
    surname: "Doe",
    phone: "+233 24 123 4567",
    ghanaCard: "GHA-123456789-0",
    email: "john.doe@example.com"
  },
  vehicles: [
    {
      make: "Toyota",
      model: "Camry",
      plate: "GR 1234-20",
      year: "2020",
      color: "White",
      bodyType: "Sedan",
      seats: "5"
    }
  ],
  policies: [
    {
      policyNumber: "POL-2024-000001",
      type: "comprehensive",
      premium: 1350,
      endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
    }
  ]
};

// Enhanced Policy Card Screen
const PolicyCard = () => {
  const { userProfile, vehicles, policies } = mockData;
  const activePolicy = policies[0];
  const vehicle = vehicles[0];

  const { setCurrentScreen } = useGlicoDrive();

  const handleCopyUSSD = () => {
    const ussdCode = `*920*57*${vehicle.plate.replace(" ", "")}#`;
    navigator.clipboard.writeText(ussdCode);
  };

  return (
    <div className="w-full h-full bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white flex flex-col">
      {/* Header */}
      <div className="flex-none p-4">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <button
            onClick={() => setCurrentScreen("dashboard")}
            className="text-white/80 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-semibold">Digital Policy Card</h1>
          <button className="text-white/80 hover:text-white cursor-pointer transition-colors p-2 hover:bg-white/10 rounded-full">
            <Share2 className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        {/* Digital Insurance Card */}
        <div className="bg-white text-gray-900 rounded-2xl shadow-2xl p-4 sm:p-6 mb-4 sm:mb-6">
          {/* Card Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 space-y-4 sm:space-y-0">
            <div className="flex items-center">
              <div className="w-12 sm:w-14 h-12 sm:h-14 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mr-3 sm:mr-4 shadow-lg">
                <Shield className="w-6 sm:w-8 h-6 sm:h-8 text-white" />
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">GLICO-DRIVE</p>
                <p className="text-xs sm:text-sm text-gray-600">Motor Insurance Policy</p>
              </div>
            </div>
            <div className="text-left sm:text-right">
              <div className="flex items-center mb-1">
                <CheckCircle className="w-4 h-4 text-green-600 mr-1" />
                <span className="text-xs font-bold text-green-700 bg-green-100 px-2 py-1 rounded-full">
                  MID VERIFIED
                </span>
              </div>
              <div className="text-xs text-gray-500 mt-2">
                {activePolicy.policyNumber}
              </div>
            </div>
          </div>

          {/* Vehicle & Policyholder Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-2 font-medium">
                Vehicle Details
              </p>
              <p className="font-bold text-gray-900 text-base sm:text-lg">
                {vehicle.make} {vehicle.model}
              </p>
              <p className="text-sm text-gray-600">
                {vehicle.plate} • {vehicle.year}
              </p>
              <p className="text-sm text-gray-600">
                {vehicle.color} {vehicle.bodyType}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Seats: {vehicle.seats}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-2 font-medium">
                Policy Holder
              </p>
              <p className="font-bold text-gray-900">
                {userProfile.firstName} {userProfile.surname}
              </p>
              <p className="text-sm text-gray-600">{userProfile.phone}</p>
              <p className="text-sm text-gray-600">{userProfile.ghanaCard}</p>
              <p className="text-xs text-gray-500 mt-1 break-all">{userProfile.email}</p>
            </div>
          </div>

          {/* Coverage & Premium Details */}
          <div className="border-t border-gray-200 pt-4 sm:pt-6 mb-4 sm:mb-6">
            <div className="grid grid-cols-3 gap-3 sm:gap-4 text-center">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                  Coverage
                </p>
                <p className="font-bold text-gray-900 capitalize text-sm sm:text-base">
                  {activePolicy.type}
                </p>
                <p className="text-xs text-green-600 font-medium">
                  Full Protection
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                  Premium
                </p>
                <p className="font-bold text-gray-900 text-sm sm:text-base">
                  GHS {activePolicy.premium.toLocaleString()}
                </p>
                <p className="text-xs text-blue-600 font-medium">Annual</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                  Valid Until
                </p>
                <p className="font-bold text-gray-900 text-sm sm:text-base">
                  {new Date(activePolicy.endDate).toLocaleDateString()}
                </p>
                <p className="text-xs text-purple-600 font-medium">
                  {Math.ceil(
                    (new Date(activePolicy.endDate) - new Date()) /
                      (1000 * 60 * 60 * 24)
                  )}{" "}
                  days left
                </p>
              </div>
            </div>
          </div>

          {/* QR Code Section */}
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-4 sm:p-6 text-center text-white">
            <div className="w-24 sm:w-32 h-24 sm:h-32 bg-white rounded-xl mx-auto mb-4 flex items-center justify-center">
              {/* QR Code Pattern */}
              <div className="w-20 sm:w-28 h-20 sm:h-28 grid grid-cols-14 gap-px p-1 bg-black rounded-lg">
                {Array.from({ length: 196 }).map((_, i) => (
                  <div
                    key={i}
                    className={`${Math.random() > 0.5 ? "bg-white" : "bg-black"} rounded-sm`}
                  />
                ))}
              </div>
            </div>
            <p className="text-white text-sm font-bold mb-1">
              SCAN FOR VERIFICATION
            </p>
            <p className="text-gray-300 text-xs">
              Instant verification with Ghana Police & NIC Database
            </p>
          </div>
        </div>

        {/* USSD Verification */}
        <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6 border border-white/20">
          <h3 className="font-bold mb-4 flex items-center text-base sm:text-lg">
            <Phone className="w-5 sm:w-6 h-5 sm:h-6 mr-2" />
            Manual Verification (USSD)
          </h3>
          <div className="space-y-4">
            <p className="text-white/90 text-sm sm:text-base">
              For instant policy verification, dial:
            </p>
            <div className="bg-white/25 backdrop-blur-sm rounded-xl p-3 sm:p-4 font-mono text-center text-lg sm:text-xl font-bold border border-white/30 break-all">
              *920*57*{vehicle.plate.replace(" ", "")}#
            </div>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
              <button
                onClick={handleCopyUSSD}
                className="flex-1 bg-white/20 backdrop-blur-sm rounded-xl p-3 font-medium hover:bg-white/30 transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <Copy className="w-4 h-4" />
                <span>Copy Code</span>
              </button>
              <button className="flex-1 bg-white/20 backdrop-blur-sm rounded-xl p-3 font-medium hover:bg-white/30 transition-all duration-200 flex items-center justify-center space-x-2">
                <ExternalLink className="w-4 h-4" />
                <span>Dial Now</span>
              </button>
            </div>
            <div className="grid grid-cols-1 gap-1 sm:gap-2 text-xs text-white/70">
              <p>✓ Instant verification with NIC Motor Insurance Database</p>
              <p>✓ Works on all networks (MTN, Vodafone, AirtelTigo)</p>
              <p>✓ Available 24/7 for Ghana Police verification</p>
              <p>✓ No internet connection required</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
          <button className="bg-white/20 backdrop-blur-sm rounded-2xl p-3 sm:p-4 text-center hover:bg-white/30 transition-all duration-200 transform hover:scale-105">
            <Download className="w-5 sm:w-6 h-5 sm:h-6 mx-auto mb-2" />
            <span className="text-xs sm:text-sm font-semibold">Download PDF</span>
          </button>
          <button className="bg-white/20 backdrop-blur-sm rounded-2xl p-3 sm:p-4 text-center hover:bg-white/30 transition-all duration-200 transform hover:scale-105">
            <Share2 className="w-5 sm:w-6 h-5 sm:h-6 mx-auto mb-2" />
            <span className="text-xs sm:text-sm font-semibold">Share Details</span>
          </button>
        </div>

        {/* Emergency Contacts */}
        <div className="bg-gradient-to-r from-red-900/40 to-orange-900/40 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-red-500/30">
          <h4 className="font-bold mb-4 text-red-200 text-base sm:text-lg">
            Emergency Contacts
          </h4>
          <div className="grid grid-cols-1 gap-3 sm:gap-4">
            <div className="flex items-center justify-between bg-white/10 rounded-xl p-3">
              <div className="flex-1 min-w-0">
                <p className="text-red-300 font-semibold text-sm sm:text-base">Claims Hotline</p>
                <p className="text-white font-mono text-sm sm:text-base">0302-664-910</p>
              </div>
              <button className="bg-red-600 text-white p-2 rounded-lg hover:bg-red-700 transition-colors flex-shrink-0">
                <Phone className="w-4 sm:w-5 h-4 sm:h-5" />
              </button>
            </div>
            <div className="flex items-center justify-between bg-white/10 rounded-xl p-3">
              <div className="flex-1 min-w-0">
                <p className="text-red-300 font-semibold text-sm sm:text-base">Police Emergency</p>
                <p className="text-white font-mono text-sm sm:text-base">191</p>
              </div>
              <button className="bg-red-600 text-white p-2 rounded-lg hover:bg-red-700 transition-colors flex-shrink-0">
                <Phone className="w-4 sm:w-5 h-4 sm:h-5" />
              </button>
            </div>
            <div className="flex items-center justify-between bg-white/10 rounded-xl p-3">
              <div className="flex-1 min-w-0">
                <p className="text-red-300 font-semibold text-sm sm:text-base">
                  Roadside Assistance
                </p>
                <p className="text-white font-mono text-sm sm:text-base">0302-664-911</p>
              </div>
              <button className="bg-red-600 text-white p-2 rounded-lg hover:bg-red-700 transition-colors flex-shrink-0">
                <Phone className="w-4 sm:w-5 h-4 sm:h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PolicyCard;