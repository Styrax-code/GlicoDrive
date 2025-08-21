import { useState } from "react";
import {
  ArrowLeft,
  Plus,
  Car,
  Shield,
  FileText,
  Download,
  Filter,
  Search,
  Clock,
  AlertCircle,
  Eye,
} from "lucide-react";

const PoliciesScreen = () => {
  const [activeTab, setActiveTab] = useState("active");
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data for policies
  const activePolicies = [
    {
      id: "POL001",
      type: "Comprehensive",
      vehicle: "Tata Altroz",
      plate: "MP04CY9999",
      startDate: "2024-02-10",
      endDate: "2025-02-10",
      premium: "GHS 2,400",
      status: "active",
      daysLeft: 15,
    },
    {
      id: "POL002",
      type: "Third Party",
      vehicle: "Honda Civic",
      plate: "GR12AB3456",
      startDate: "2024-06-15",
      endDate: "2025-06-15",
      premium: "GHS 1,200",
      status: "active",
      daysLeft: 120,
    },
  ];

  const savedQuotes = [
    {
      id: "QUO001",
      vehicle: "Toyota Camry",
      type: "Comprehensive",
      premium: "GHS 3,200",
      validUntil: "2025-08-25",
      created: "2025-08-18",
    },
    {
      id: "QUO002",
      vehicle: "Nissan Sentra",
      type: "Third Party Fire & Theft",
      premium: "GHS 1,800",
      validUntil: "2025-08-22",
      created: "2025-08-15",
    },
  ];

  const expiredPolicies = [
    {
      id: "POL003",
      type: "Comprehensive",
      vehicle: "Ford Focus",
      plate: "AS78CD9012",
      endDate: "2024-12-31",
      premium: "GHS 2,800",
      status: "expired",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "text-green-700 bg-green-100/90";
      case "expiring":
        return "text-orange-700 bg-orange-100/90";
      case "expired":
        return "text-red-700 bg-red-100/90";
      default:
        return "text-gray-700 bg-gray-100/90";
    }
  };

  const PolicyCard = ({ policy, type = "policy" }) => (
    <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-5 shadow-lg border border-white/30 mb-4 hover:shadow-xl transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
            <Car className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900">{policy.vehicle}</h3>
            <p className="text-sm text-gray-600 font-medium">
              {type === "quote" ? `Quote ${policy.id}` : policy.plate}
            </p>
          </div>
        </div>
        {policy.status && (
          <span
            className={`px-3 py-1.5 rounded-full text-xs font-bold shadow-sm ${getStatusColor(
              policy.status
            )}`}
          >
            {policy.status === "active" && policy.daysLeft <= 30
              ? "Expiring Soon"
              : policy.status.charAt(0).toUpperCase() + policy.status.slice(1)}
          </span>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-xs text-gray-500 mb-1 font-medium">Coverage Type</p>
          <p className="text-sm font-bold text-gray-900">{policy.type}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1 font-medium">Premium</p>
          <p className="text-sm font-bold text-gray-900">{policy.premium}</p>
        </div>
      </div>

      {type === "policy" && (
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-xs text-gray-500 mb-1 font-medium">Start Date</p>
            <p className="text-sm font-semibold text-gray-700">{policy.startDate}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1 font-medium">End Date</p>
            <p className="text-sm font-semibold text-gray-700">{policy.endDate}</p>
          </div>
        </div>
      )}

      {type === "quote" && (
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-xs text-gray-500 mb-1 font-medium">Created</p>
            <p className="text-sm font-semibold text-gray-700">{policy.created}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1 font-medium">Valid Until</p>
            <p className="text-sm font-semibold text-gray-700">{policy.validUntil}</p>
          </div>
        </div>
      )}

      <div className="flex space-x-3">
        {type === "policy" && policy.status === "active" && (
          <>
            <button className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-4 rounded-xl font-bold shadow-lg hover:shadow-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 active:scale-95">
              View Details
            </button>
            <button className="px-4 py-3 bg-white/80 border border-gray-200 rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300 active:scale-95">
              <Download className="w-4 h-4 text-gray-600" />
            </button>
          </>
        )}

        {type === "quote" && (
          <>
            <button className="flex-1 bg-gradient-to-r from-green-600 to-green-700 text-white py-3 px-4 rounded-xl font-bold shadow-lg hover:shadow-xl hover:from-green-700 hover:to-green-800 transition-all duration-300 active:scale-95">
              Buy Now
            </button>
            <button className="px-4 py-3 bg-white/80 border border-gray-200 rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300 active:scale-95">
              <Eye className="w-4 h-4 text-gray-600" />
            </button>
          </>
        )}

        {type === "policy" && policy.status === "expired" && (
          <button className="flex-1 bg-gradient-to-r from-orange-600 to-orange-700 text-white py-3 px-4 rounded-xl font-bold shadow-lg hover:shadow-xl hover:from-orange-700 hover:to-orange-800 transition-all duration-300 active:scale-95">
            Renew Policy
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="relative w-full h-screen flex bg-gradient-to-br from-purple-900 to-blue-700 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-[5%] left-[5%] w-24 h-24 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-[10%] right-[5%] w-32 h-32 bg-purple-300 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/4 w-18 h-18 bg-blue-300 rounded-full blur-2xl"></div>
        <div className="absolute top-[20%] right-[20%] w-16 h-16 bg-white/50 rounded-full blur-2xl"></div>
        <div className="absolute bottom-[30%] left-[10%] w-20 h-20 bg-purple-400/60 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-sm mx-auto h-full">
        {/* Header */}
        <div className="bg-white/95 backdrop-blur-sm px-4 py-4 border-b border-white/20 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <button className="p-2 hover:bg-gray-100/80 rounded-full transition-all duration-200 active:scale-95">
                <ArrowLeft className="w-6 h-6 text-gray-700" />
              </button>
              <h1 className="text-xl font-bold text-gray-900">Policies</h1>
            </div>
            <button className="p-2 hover:bg-gray-100/80 rounded-full transition-all duration-200 active:scale-95">
              <Filter className="w-6 h-6 text-gray-700" />
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search policies or quotes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-gray-50/90 border border-gray-200/50 rounded-2xl text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 backdrop-blur-sm"
            />
          </div>
        </div>

        <div className="overflow-y-auto h-full pb-32">
          {/* Quick Actions */}
          <div className="px-4 py-4 bg-white/95 backdrop-blur-sm mb-2 border-b border-white/20">
            <div className="grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center space-x-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-4 rounded-2xl font-bold shadow-lg hover:shadow-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 active:scale-95">
                <Plus className="w-5 h-5" />
                <span>Get New Quote</span>
              </button>
              <button className="flex items-center justify-center space-x-2 bg-white/90 border-2 border-purple-600/30 text-purple-700 py-3 px-4 rounded-2xl font-bold hover:bg-white hover:border-purple-600 hover:shadow-lg transition-all duration-300 active:scale-95 backdrop-blur-sm">
                <FileText className="w-5 h-5" />
                <span>Documents</span>
              </button>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="bg-white/95 backdrop-blur-sm px-4 py-3 border-b border-white/20 shadow-sm">
            <div className="flex space-x-2">
              {[
                { id: "active", label: "Active", count: activePolicies.length },
                {
                  id: "quotes",
                  label: "Saved Quotes",
                  count: savedQuotes.length,
                },
                {
                  id: "history",
                  label: "History",
                  count: expiredPolicies.length,
                },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 py-3 px-4 rounded-2xl font-bold transition-all duration-300 active:scale-95 shadow-sm ${
                    activeTab === tab.id
                      ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg"
                      : "bg-white/80 text-gray-700 hover:bg-white hover:shadow-lg"
                  }`}
                >
                  {tab.label} ({tab.count})
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 p-4">
            {activeTab === "active" && (
              <div>
                {activePolicies.length === 0 ? (
                  <div className="text-center py-12 bg-white/95 backdrop-blur-sm rounded-3xl shadow-lg border border-white/30">
                    <Shield className="w-20 h-20 text-purple-400 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      No Active Policies
                    </h3>
                    <p className="text-gray-600 mb-6 font-medium">
                      Get your first insurance policy in minutes
                    </p>
                    <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-8 rounded-2xl font-bold shadow-lg hover:shadow-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 active:scale-95">
                      Get New Quote
                    </button>
                  </div>
                ) : (
                  activePolicies.map((policy) => (
                    <PolicyCard key={policy.id} policy={policy} type="policy" />
                  ))
                )}
              </div>
            )}

            {activeTab === "quotes" && (
              <div>
                {savedQuotes.length === 0 ? (
                  <div className="text-center py-12 bg-white/95 backdrop-blur-sm rounded-3xl shadow-lg border border-white/30">
                    <FileText className="w-20 h-20 text-purple-400 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      No Saved Quotes
                    </h3>
                    <p className="text-gray-600 mb-6 font-medium">
                      Save quotes to compare and purchase later
                    </p>
                    <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-8 rounded-2xl font-bold shadow-lg hover:shadow-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 active:scale-95">
                      Create New Quote
                    </button>
                  </div>
                ) : (
                  savedQuotes.map((quote) => (
                    <PolicyCard key={quote.id} policy={quote} type="quote" />
                  ))
                )}
              </div>
            )}

            {activeTab === "history" && (
              <div>
                {expiredPolicies.length === 0 ? (
                  <div className="text-center py-12 bg-white/95 backdrop-blur-sm rounded-3xl shadow-lg border border-white/30">
                    <Clock className="w-20 h-20 text-purple-400 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      No Policy History
                    </h3>
                    <p className="text-gray-600 font-medium">
                      Your expired and cancelled policies will appear here
                    </p>
                  </div>
                ) : (
                  expiredPolicies.map((policy) => (
                    <PolicyCard key={policy.id} policy={policy} type="policy" />
                  ))
                )}
              </div>
            )}
          </div>
        </div>

        {/* Renewal Alert */}
        {activePolicies.some((p) => p.daysLeft <= 30) && (
          <div className="bottom-6 left-1/2 transform -translate-x-1/2 w-full max-w-sm px-4">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-2xl p-4 shadow-2xl border border-white/20 backdrop-blur-sm">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-6 h-6 text-white mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <h4 className="font-bold text-white mb-1">
                    Policy Expiring Soon
                  </h4>
                  <p className="text-sm text-orange-100 mb-3 font-medium">
                    Your Tata Altroz policy expires in 15 days
                  </p>
                  <button className="bg-white text-orange-600 py-2 px-4 rounded-xl font-bold text-sm hover:bg-orange-50 transition-all duration-300 active:scale-95 shadow-md">
                    Renew Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PoliciesScreen;
