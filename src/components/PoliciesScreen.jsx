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
import { useGlicoDrive } from "../utils/provider";

const PoliciesScreen = () => {
  const [activeTab, setActiveTab] = useState("active");
  const [searchQuery, setSearchQuery] = useState("");

  const {setCurrentScreen} = useGlicoDrive();

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
        return "text-green-600 bg-green-100";
      case "expiring":
        return "text-orange-600 bg-orange-100";
      case "expired":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const PolicyCard = ({ policy, type = "policy" }) => (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-4">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center">
            <Car className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{policy.vehicle}</h3>
            <p className="text-sm text-gray-500">
              {type === "quote" ? `Quote ${policy.id}` : policy.plate}
            </p>
          </div>
        </div>
        {policy.status && (
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
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
          <p className="text-xs text-gray-500 mb-1">Coverage Type</p>
          <p className="text-sm font-medium text-gray-900">{policy.type}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1">Premium</p>
          <p className="text-sm font-medium text-gray-900">{policy.premium}</p>
        </div>
      </div>

      {type === "policy" && (
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-xs text-gray-500 mb-1">Start Date</p>
            <p className="text-sm text-gray-700">{policy.startDate}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">End Date</p>
            <p className="text-sm text-gray-700">{policy.endDate}</p>
          </div>
        </div>
      )}

      {type === "quote" && (
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-xs text-gray-500 mb-1">Created</p>
            <p className="text-sm text-gray-700">{policy.created}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Valid Until</p>
            <p className="text-sm text-gray-700">{policy.validUntil}</p>
          </div>
        </div>
      )}

      <div className="flex space-x-2">
        {type === "policy" && policy.status === "active" && (
          <>
            <button className="flex-1 bg-purple-600 text-white py-2 px-4 rounded-xl font-medium hover:bg-purple-700 transition-colors">
              View Details
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
              <Download className="w-4 h-4 text-gray-600" />
            </button>
          </>
        )}

        {type === "quote" && (
          <>
            <button className="flex-1 bg-green-600 text-white py-2 px-4 rounded-xl font-medium hover:bg-green-700 transition-colors">
              Buy Now
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
              <Eye className="w-4 h-4 text-gray-600" />
            </button>
          </>
        )}

        {type === "policy" && policy.status === "expired" && (
          <button className="flex-1 bg-orange-600 text-white py-2 px-4 rounded-xl font-medium hover:bg-orange-700 transition-colors">
            Renew Policy
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen max-w-sm mx-auto">
      {/* Header */}
      <div className="bg-white px-4 py-3 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            onClick={() => setCurrentScreen("dashboard")}
            >
              <ArrowLeft className="w-6 h-6 text-gray-600" />
            </button>
            <h1 className="text-xl font-bold text-gray-900">Policies</h1>
          </div>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <Filter className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search policies or quotes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-100 rounded-xl text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-300"
          />
        </div>
      </div>
      <div
        className="overflow-y-auto"
        style={{
          height: "calc(100vh - 300px)",
        }}
      >
        {/* Quick Actions */}
        <div className="px-4 py-4 bg-white mb-2">
          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center space-x-2 bg-purple-600 text-white py-3 px-4 rounded-xl font-medium hover:bg-purple-700 transition-colors"onClick={() => setCurrentScreen("quote")}
              >
              <Plus className="w-5 h-5" />
              <span>Get New Quote</span>
            </button>
            <button className="flex items-center justify-center space-x-2 border border-purple-600 text-purple-600 py-3 px-4 rounded-xl font-medium hover:bg-purple-50 transition-colors">
              <FileText className="w-5 h-5" />
              <span>Documents</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white px-4 py-2 border-b border-gray-200">
          <div className="flex space-x-1">
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
                className={`flex-1 py-3 px-4 rounded-xl font-medium transition-colors ${
                  activeTab === tab.id
                    ? "bg-purple-600 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-4 pb-24">
          {activeTab === "active" && (
            <div>
              {activePolicies.length === 0 ? (
                <div className="text-center py-12">
                  <Shield className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    No Active Policies
                  </h3>
                  <p className="text-gray-500 mb-6">
                    Get your first insurance policy in minutes
                  </p>
                  <button className="bg-purple-600 text-white py-3 px-6 rounded-xl font-medium hover:bg-purple-700 transition-colors">
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
                <div className="text-center py-12">
                  <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    No Saved Quotes
                  </h3>
                  <p className="text-gray-500 mb-6">
                    Save quotes to compare and purchase later
                  </p>
                  <button className="bg-purple-600 text-white py-3 px-6 rounded-xl font-medium hover:bg-purple-700 transition-colors">
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
                <div className="text-center py-12">
                  <Clock className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    No Policy History
                  </h3>
                  <p className="text-gray-500">
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

        {/* Renewal Alert */}
        {activePolicies.some((p) => p.daysLeft <= 30) && (
          <div className="fixed bottom-30 left-1/2  transform -translate-x-1/2 w-full max-w-sm px-4">
            <div className="bg-orange-100 border border-orange-300 rounded-xl p-4 shadow-lg">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-6 h-6 text-orange-600 mt-0.5" />
                <div className="flex-1">
                  <h4 className="font-semibold text-orange-900 mb-1">
                    Policy Expiring Soon
                  </h4>
                  <p className="text-sm text-orange-800 mb-3">
                    Your Tata Altroz policy expires in 15 days
                  </p>
                  <button className="bg-orange-600 text-white py-2 px-4 rounded-lg font-medium text-sm hover:bg-orange-700 transition-colors">
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
};

export default PoliciesScreen;
