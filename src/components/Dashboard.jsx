import React, { useState, useMemo } from "react";
import {
  Bell,
  Search,
  Menu,
  Car,
  Truck,
  Home,
  FileText,
  MapPin,
  Shield,
  ChevronRight,
  TrendingUp,
  Calendar,
  MessageCircle,
  Phone,
  Star,
  X,
  User,
  Settings,
  HelpCircle,
  LogOut,
  Award,
} from "lucide-react";
import MotorCategory from "./MotorCategory";

// Mock MotorCategory component
const MotorCategory2 = () => {
  const motorCategories = [
    {
      icon: Car,
      label: "Sedan",
      color: "bg-pink-100",
      iconColor: "text-pink-500",
    },
    {
      icon: Car,
      label: "SUV",
      color: "bg-orange-100",
      iconColor: "text-orange-500",
    },
    {
      icon: Home,
      label: "Hatchback",
      color: "bg-purple-100",
      iconColor: "text-purple-500",
    },
    {
      icon: Truck,
      label: "Commercial",
      color: "bg-blue-100",
      iconColor: "text-blue-500",
    },
  ];

  return (
    <div className="px-3 sm:px-4 mb-4 sm:mb-6">
      <div className="flex justify-between items-center mb-3 sm:mb-4">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900">
          Motor Categories
        </h3>
        <button className="text-purple-500 font-medium text-sm">See All</button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
        {motorCategories.map((category, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 flex flex-col items-center space-y-2 sm:space-y-3 shadow-sm hover:shadow-md transition-all duration-200"
          >
            <div
              className={`w-8 h-8 sm:w-12 sm:h-12 ${category.color} rounded-xl sm:rounded-2xl flex items-center justify-center`}
            >
              <category.icon
                className={`w-4 h-4 sm:w-6 sm:h-6 ${category.iconColor}`}
              />
            </div>
            <span className="font-semibold text-gray-900 text-xs sm:text-sm text-center">
              {category.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Mock hook for demo purposes
const useGlicoDrive = () => ({
  setCurrentScreen: (screen) => console.log(`Navigate to: ${screen}`),
  userProfile: {
    firstName: "Thompson",
    profileCompletion: 60,
  },
  vehicles: [{ make: "Tata", model: "Altroz", plate: "MP04CY9999" }],
  policies: [
    {
      type: "Comprehensive",
      endDate: "2025-02-10",
      status: "active",
    },
  ],
  notifications: [
    {
      id: 1,
      read: false,
      title: "Policy Renewal Due",
      message: "Your car insurance policy expires in 15 days",
      timestamp: "2025-08-18T10:30:00Z",
    },
    {
      id: 2,
      read: false,
      title: "Claim Update",
      message: "Your recent claim has been processed successfully",
      timestamp: "2025-08-17T14:15:00Z",
    },
    {
      id: 3,
      read: true,
      title: "Reward Points",
      message: "You earned 75 points for safe driving",
      timestamp: "2025-08-15T09:00:00Z",
    },
  ],
});

const Dashboard = () => {
  const { setCurrentScreen, userProfile, vehicles, policies, notifications } =
    useGlicoDrive();

  const [searchQuery, setSearchQuery] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSideMenu, setShowSideMenu] = useState(false);

  const unreadNotifications = useMemo(
    () => notifications.filter((n) => !n.read).length,
    [notifications]
  );

  const quickActions = [
    {
      icon: FileText,
      label: "Register a Claim",
      description: "Weekly Goal: 150 min",
      amount: "+GHC 234.00",
      color: "bg-orange-100",
      iconColor: "text-orange-500",
    },
    {
      icon: MapPin,
      label: "Find Local Services",
      description: "Weekly Goal: 150 min",
      amount: "+GHC 134.00",
      color: "bg-purple-100",
      iconColor: "text-purple-500",
    },
  ];

  const sideMenuItems = [
    { icon: User, label: "Profile", screen: "profile" },
    { icon: Shield, label: "My Policies", screen: "policies" },
    { icon: FileText, label: "Claims", screen: "claims" },
    { icon: Award, label: "Rewards", screen: "rewards" },
    { icon: Settings, label: "Settings", screen: "settings" },
    { icon: HelpCircle, label: "Help & Support", screen: "help" },
    { icon: LogOut, label: "Logout", screen: "logout" },
  ];

  // Side Menu Component
  const SideMenu = () => {
    if (!showSideMenu) return null;

    return (
      <div className="inset-0 z-50">
        <div
          className="absolute inset-0 bg-black bg-opacity-50"
          onClick={() => setShowSideMenu(false)}
        />
        <div className="absolute left-0 top-0 h-full w-64 sm:w-80 bg-white shadow-xl transform transition-transform duration-300">
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-4 sm:p-6 text-white">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg sm:text-xl">
                  T
                </span>
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold">
                  {userProfile.firstName}
                </h3>
                <p className="text-purple-100 text-sm">Premium Member</p>
              </div>
            </div>
          </div>

          <div className="py-4">
            {sideMenuItems.map((item, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setCurrentScreen(item.screen);
                  setShowSideMenu(false);
                }}
                className="w-full flex items-center space-x-4 px-4 sm:px-6 py-3 sm:py-4 hover:bg-gray-50 transition-colors"
              >
                <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
                <span className="text-gray-700 font-medium text-sm sm:text-base">
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Notifications Panel Component
  const NotificationPanel = () => {
    if (!showNotifications) return null;

    return (
      <div className="inset-0 z-50">
        <div
          className="absolute inset-0 bg-black bg-opacity-50"
          onClick={() => setShowNotifications(false)}
        />
        <div className="absolute right-2 sm:right-4 top-2 sm:top-4 w-72 sm:w-80 bg-white rounded-2xl shadow-2xl border max-h-80 sm:max-h-96 overflow-hidden">
          <div className="p-3 sm:p-4 border-b bg-gray-50">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-gray-900 text-sm sm:text-base">
                Notifications
              </h3>
              <button
                onClick={() => setShowNotifications(false)}
                className="p-1 hover:bg-gray-200 rounded-full transition-colors"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
              </button>
            </div>
          </div>
          <div className="max-h-64 sm:max-h-80 overflow-y-auto">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className="p-3 sm:p-4 border-b hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start space-x-3">
                  <div
                    className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                      notification.read ? "bg-gray-300" : "bg-blue-500"
                    }`}
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 text-xs sm:text-sm">
                      {notification.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-600 mt-1">
                      {notification.message}
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                      {new Date(notification.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gray-50 h-full w-full flex flex-col relative">
      {/* Header - Responsive */}
      <div className="bg-white z-40 border-b border-gray-100 flex-shrink-0">
        <div className="px-3 sm:px-4 py-2 sm:py-3">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="relative">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-xs sm:text-sm">
                    T
                  </span>
                </div>
                <div className="absolute -bottom-1 -right-1 bg-purple-500 text-white text-xs px-1 sm:px-1.5 py-0.5 rounded-full font-medium">
                  {userProfile.profileCompletion}%
                </div>
              </div>
              <div>
                <p className="text-base sm:text-lg font-semibold text-gray-900">
                  Hello {userProfile.firstName}!
                </p>
                <p className="text-xs sm:text-sm text-gray-500">
                  Complete your profile easily
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-3">
              <button
                className="relative p-1 sm:p-0"
                onClick={() => setShowNotifications(true)}
              >
                <Bell className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
                {unreadNotifications > 0 && (
                  <div className="absolute -top-1 sm:-top-2 -right-1 sm:-right-2 w-4 h-4 sm:w-5 sm:h-5 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">
                      {unreadNotifications}
                    </span>
                  </div>
                )}
              </button>
              <button
                onClick={() => setShowSideMenu(true)}
                className="p-1 sm:p-0"
              >
                <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Search Bar - Responsive */}
          <div className="relative">
            <Search className="absolute left-2 sm:left-3 top-2.5 sm:top-3 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 sm:pl-10 pr-3 sm:pr-4 py-2.5 sm:py-3 bg-gray-100 rounded-full text-sm sm:text-base text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-300"
            />
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Main Policy Card */}
        <div className="px-3 sm:px-4 mb-4 sm:mb-6 mt-3 sm:mt-4">
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl sm:rounded-3xl p-4 sm:p-6 text-white relative overflow-hidden">
            <div className="flex items-start justify-between mb-3 sm:mb-4">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-xl sm:rounded-2xl flex items-center justify-center">
                  <Car className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold">
                    Car Insurance
                  </h3>
                  <p className="text-purple-100 text-xs sm:text-sm">
                    Comprehensive
                  </p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>

            <div className="flex justify-between items-end mb-4 sm:mb-6">
              <div>
                <p className="text-purple-100 text-xs sm:text-sm mb-1">
                  Policy holder
                </p>
                <p className="text-white font-semibold text-sm sm:text-base">
                  Rahul Sharma
                </p>
              </div>
              <div className="text-right">
                <p className="text-purple-100 text-xs sm:text-sm mb-1">
                  {vehicles[0]?.make} {vehicles[0]?.model}
                </p>
                <p className="text-white font-semibold text-sm sm:text-base">
                  {vehicles[0]?.plate}
                </p>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div>
                <p className="text-purple-100 text-xs sm:text-sm mb-1">
                  Third party validity
                </p>
                <p className="text-white font-semibold text-sm sm:text-base">
                  10/02/25
                </p>
              </div>
              <button className="bg-black text-white px-4 sm:px-6 py-1.5 sm:py-2 rounded-full font-medium text-sm sm:text-base">
                Renew Now
              </button>
            </div>
          </div>
        </div>

        {/* Motor Categories */}
        <MotorCategory />

        {/* Quick Actions */}
        <div className="px-3 sm:px-4 mb-4 sm:mb-6">
          <div className="flex justify-between items-center mb-3 sm:mb-4">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900">
              Quick Actions
            </h3>
            <button className="text-purple-500 font-medium text-sm">
              See All
            </button>
          </div>

          <div className="space-y-2 sm:space-y-3">
            {quickActions.map((action, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 flex items-center justify-between shadow-sm"
              >
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div
                    className={`w-10 h-10 sm:w-12 sm:h-12 ${action.color} rounded-xl sm:rounded-2xl flex items-center justify-center`}
                  >
                    <action.icon
                      className={`w-5 h-5 sm:w-6 sm:h-6 ${action.iconColor}`}
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm sm:text-base">
                      {action.label}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-500">
                      {action.description}
                    </p>
                  </div>
                </div>
                <span className="font-bold text-gray-900 text-sm sm:text-base">
                  {action.amount}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="px-3 sm:px-4 mb-4 sm:mb-6">
          <div className="flex justify-between items-center mb-3 sm:mb-4">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900">
              Recent Activity
            </h3>
            <button className="text-purple-500 font-medium text-sm">
              View All
            </button>
          </div>

          <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm">
            <div className="p-3 sm:p-4 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-xl sm:rounded-2xl flex items-center justify-center">
                  <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-green-500" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm sm:text-base">
                    Policy Renewed
                  </p>
                  <p className="text-xs sm:text-sm text-gray-500">
                    Car Insurance - Comprehensive
                  </p>
                </div>
              </div>
              <span className="text-xs text-gray-400">2d ago</span>
            </div>

            <div className="p-3 sm:p-4 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-xl sm:rounded-2xl flex items-center justify-center">
                  <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm sm:text-base">
                    Claim Processed
                  </p>
                  <p className="text-xs sm:text-sm text-gray-500">
                    Accident claim - GHS 2,400
                  </p>
                </div>
              </div>
              <span className="text-xs text-gray-400">1w ago</span>
            </div>

            <div className="p-3 sm:p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-xl sm:rounded-2xl flex items-center justify-center">
                  <Star className="w-5 h-5 sm:w-6 sm:h-6 text-purple-500" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm sm:text-base">
                    Reward Earned
                  </p>
                  <p className="text-xs sm:text-sm text-gray-500">
                    Safe driving bonus +75 points
                  </p>
                </div>
              </div>
              <span className="text-xs text-gray-400">2w ago</span>
            </div>
          </div>
        </div>

        {/* Performance Insights */}
        <div className="px-3 sm:px-4 mb-4 sm:mb-6">
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-green-200">
            <h3 className="font-bold text-gray-900 text-base sm:text-lg mb-3 sm:mb-4 flex items-center">
              <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-green-500" />
              Your Insurance Performance
            </h3>

            <div className="grid grid-cols-2 gap-4 sm:gap-6 mb-3 sm:mb-4">
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-green-600 mb-1">
                  98%
                </div>
                <p className="text-xs sm:text-sm text-gray-600">
                  Claim-Free Score
                </p>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-blue-600 mb-1">
                  15%
                </div>
                <p className="text-xs sm:text-sm text-gray-600">
                  Total Savings
                </p>
              </div>
            </div>

            <div className="pt-3 sm:pt-4 border-t border-green-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs sm:text-sm text-gray-600">
                  Next reward milestone
                </span>
                <span className="text-xs sm:text-sm font-semibold text-green-600">
                  +50 points
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: "75%" }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Renewals */}
        <div className="px-3 sm:px-4 mb-4 sm:mb-6">
          <div className="bg-orange-50 border border-orange-200 rounded-xl sm:rounded-2xl p-4 sm:p-6">
            <div className="flex items-start space-x-3 sm:space-x-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-orange-900 mb-2 text-sm sm:text-base">
                  Renewal Reminder
                </h3>
                <p className="text-orange-800 mb-3 sm:mb-4 text-xs sm:text-sm">
                  Your Tata Altroz policy expires in 15 days
                </p>
                <button className="bg-orange-600 text-white px-4 sm:px-6 py-1.5 sm:py-2 rounded-lg font-semibold hover:bg-orange-700 transition-colors text-sm sm:text-base">
                  Renew Now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Support & Help */}
        <div className="px-3 sm:px-4 mb-16 sm:mb-20">
          <div className="flex justify-between items-center mb-3 sm:mb-4">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900">
              Support & Help
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <button className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-sm flex flex-col items-center space-y-2 sm:space-y-3 hover:shadow-md transition-all duration-200">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-xl sm:rounded-2xl flex items-center justify-center">
                <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" />
              </div>
              <span className="font-semibold text-gray-900 text-xs sm:text-sm">
                Live Chat
              </span>
              <span className="text-xs text-gray-500 text-center">
                Get instant help
              </span>
            </button>

            <button className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-sm flex flex-col items-center space-y-2 sm:space-y-3 hover:shadow-md transition-all duration-200">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-xl sm:rounded-2xl flex items-center justify-center">
                <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-green-500" />
              </div>
              <span className="font-semibold text-gray-900 text-xs sm:text-sm">
                Call Support
              </span>
              <span className="text-xs text-gray-500 text-center">
                24/7 assistance
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Side Menu */}
      <SideMenu />

      {/* Notification Panel */}
      <NotificationPanel />
    </div>
  );
};

export default Dashboard;
