import { useState, useMemo } from "react";
import { useGlicoDrive } from "../utils/provider";
import MotorCategory from "./MotorCategory";

const Dashboard = () => {
  const { setCurrentScreen, vehicles, notifications, userProfile, icons } =
    useGlicoDrive();

  const {
    Bell,
    Search,
    Menu,
    Car,
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
  } = icons;

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
      description: "Report incidents quickly",
      amount: "+GHC 234.00",
      color: "bg-orange-50",
      iconColor: "text-orange-600",
    },
    {
      icon: MapPin,
      label: "Find Local Services",
      description: "Locate nearby garages",
      amount: "+GHC 134.00",
      color: "bg-purple-50",
      iconColor: "text-purple-600",
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
      <div className="fixed inset-0 z-50">
        <div
          className="absolute inset-0 bg-black bg-opacity-50"
          onClick={() => setShowSideMenu(false)}
        />
        <div className="absolute left-0 top-0 h-full w-80 bg-white shadow-2xl border-r border-gray-100 transform transition-transform duration-300">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white">
            <div className="flex items-center space-x-3">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">T</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">{userProfile.firstName}</h3>
                <p className="text-blue-100 text-sm">Premium Member</p>
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
                className="w-full flex items-center space-x-4 px-6 py-4 hover:bg-gray-50 transition-colors border-l-4 border-transparent hover:border-blue-600"
              >
                <item.icon className="w-6 h-6 text-gray-600" />
                <span className="text-gray-700 font-medium text-base">
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
      <div className="fixed inset-0 z-50">
        <div
          className="absolute inset-0 bg-black bg-opacity-50"
          onClick={() => setShowNotifications(false)}
        />
        <div className="absolute right-4 top-4 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 max-h-96 overflow-hidden">
          <div className="p-4 border-b border-gray-100 bg-gray-50">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-gray-900 text-base">
                Notifications
              </h3>
              <button
                onClick={() => setShowNotifications(false)}
                className="p-2 hover:bg-gray-200 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
          <div className="max-h-80 overflow-y-auto">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className="p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start space-x-3">
                  <div
                    className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                      notification.read ? "bg-gray-300" : "bg-blue-600"
                    }`}
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 text-sm">
                      {notification.title}
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">
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
    <div className="bg-white h-full w-full flex flex-col relative">
      {/* Header */}
      <div className="bg-white z-40 border-b border-gray-100 shadow-sm flex-shrink-0">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center shadow-sm">
                  <span className="text-white font-semibold text-sm">T</span>
                </div>
                <div className="absolute -bottom-1 -right-1 bg-blue-600 text-white text-xs px-1.5 py-0.5 rounded-full font-medium shadow-sm">
                  {userProfile.profileCompletion}%
                </div>
              </div>
              <div>
                <p className="text-lg font-semibold text-gray-900">
                  Hello {userProfile.firstName}!
                </p>
                <p className="text-sm text-gray-600">
                  Complete your profile easily
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                className="relative p-2 hover:bg-gray-100 rounded-xl transition-colors"
                onClick={() => setShowNotifications(true)}
              >
                <Bell className="w-6 h-6 text-gray-600" />
                {unreadNotifications > 0 && (
                  <div className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center shadow-sm">
                    <span className="text-white text-xs font-bold">
                      {unreadNotifications}
                    </span>
                  </div>
                )}
              </button>
              <button
                onClick={() => setShowSideMenu(true)}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <Menu className="w-6 h-6 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search policies, claims, and more..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-base text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto bg-gray-50">
        {/* Main Policy Card */}
        <div className="px-4 mb-6 mt-4">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-3xl p-6 text-white relative overflow-hidden shadow-lg border border-blue-500/20">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                  <Car className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Car Insurance</h3>
                  <p className="text-blue-100 text-sm">
                    Comprehensive Coverage
                  </p>
                </div>
              </div>
              <ChevronRight className="w-6 h-6 text-white" />
            </div>

            <div className="flex justify-between items-end mb-6">
              <div>
                <p className="text-blue-100 text-sm mb-1">Policy holder</p>
                <p className="text-white font-semibold text-base">
                  Rahul Sharma
                </p>
              </div>
              <div className="text-right">
                <p className="text-blue-100 text-sm mb-1">
                  {vehicles[0]?.make} {vehicles[0]?.model}
                </p>
                <p className="text-white font-semibold text-base">
                  {vehicles[0]?.plate}
                </p>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div>
                <p className="text-blue-100 text-sm mb-1">
                  Third party validity
                </p>
                <p className="text-white font-semibold text-base">10/02/25</p>
              </div>
              <button className="bg-white/20 text-white px-6 py-2 rounded-2xl font-medium border border-white/30 hover:bg-white/30 transition-all duration-200 shadow-sm">
                Renew Now
              </button>
            </div>
          </div>
        </div>

        {/* Motor Categories */}
        <MotorCategory />

        {/* Quick Actions */}
        <div className="px-4 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Quick Actions
            </h3>
            <button className="text-blue-600 font-medium text-sm hover:text-blue-800 transition-colors">
              See All
            </button>
          </div>

          <div className="space-y-3">
            {quickActions.map((action, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-4 flex items-center justify-between shadow-sm border border-gray-100 hover:shadow-md hover:border-gray-200 transition-all duration-200"
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-12 h-12 ${action.color} rounded-2xl flex items-center justify-center`}
                  >
                    <action.icon className={`w-6 h-6 ${action.iconColor}`} />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-base">
                      {action.label}
                    </p>
                    <p className="text-sm text-gray-600">
                      {action.description}
                    </p>
                  </div>
                </div>
                <span className="font-bold text-gray-900 text-base">
                  {action.amount}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="px-4 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Recent Activity
            </h3>
            <button className="text-blue-600 font-medium text-sm hover:text-blue-800 transition-colors">
              View All
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center">
                  <Shield className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-base">
                    Policy Renewed
                  </p>
                  <p className="text-sm text-gray-600">
                    Car Insurance - Comprehensive
                  </p>
                </div>
              </div>
              <span className="text-xs text-gray-400">2d ago</span>
            </div>

            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-base">
                    Claim Processed
                  </p>
                  <p className="text-sm text-gray-600">
                    Accident claim - GHS 2,400
                  </p>
                </div>
              </div>
              <span className="text-xs text-gray-400">1w ago</span>
            </div>

            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center">
                  <Star className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-base">
                    Reward Earned
                  </p>
                  <p className="text-sm text-gray-600">
                    Safe driving bonus +75 points
                  </p>
                </div>
              </div>
              <span className="text-xs text-gray-400">2w ago</span>
            </div>
          </div>
        </div>

        {/* Performance Insights */}
        <div className="px-4 mb-6">
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6 border border-green-200 shadow-sm">
            <h3 className="font-bold text-gray-900 text-lg mb-4 flex items-center">
              <TrendingUp className="w-6 h-6 mr-2 text-green-600" />
              Your Insurance Performance
            </h3>

            <div className="grid grid-cols-2 gap-6 mb-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 mb-1">
                  98%
                </div>
                <p className="text-sm text-gray-600">Claim-Free Score</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 mb-1">15%</div>
                <p className="text-sm text-gray-600">Total Savings</p>
              </div>
            </div>

            <div className="pt-4 border-t border-green-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">
                  Next reward milestone
                </span>
                <span className="text-sm font-semibold text-green-600">
                  +50 points
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: "75%" }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Renewals */}
        <div className="px-4 mb-6">
          <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6 shadow-sm">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Calendar className="w-6 h-6 text-orange-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-orange-900 mb-2 text-base">
                  Renewal Reminder
                </h3>
                <p className="text-orange-800 mb-4 text-sm">
                  Your Tata Altroz policy expires in 15 days
                </p>
                <button className="bg-orange-600 text-white px-6 py-2 rounded-2xl font-semibold hover:bg-orange-700 transition-colors text-base shadow-sm">
                  Renew Now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Support & Help */}
        <div className="px-4 mb-20">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Support & Help
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-col items-center space-y-3 hover:shadow-md hover:border-gray-200 transition-all duration-200">
              <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-blue-600" />
              </div>
              <span className="font-semibold text-gray-900 text-sm">
                Live Chat
              </span>
              <span className="text-xs text-gray-600 text-center">
                Get instant help
              </span>
            </button>

            <button className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-col items-center space-y-3 hover:shadow-md hover:border-gray-200 transition-all duration-200">
              <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center">
                <Phone className="w-6 h-6 text-green-600" />
              </div>
              <span className="font-semibold text-gray-900 text-sm">
                Call Support
              </span>
              <span className="text-xs text-gray-600 text-center">
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
