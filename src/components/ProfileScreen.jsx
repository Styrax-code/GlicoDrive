import { useGlicoDrive } from "../utils/provider";

// Profile Screen Component
const ProfileScreen = () => {
  const { setCurrentScreen, userProfile, icons } = useGlicoDrive();
  const {
    User,
    Settings,
    CheckCircle,
    Globe,
    Eye,
    Smartphone,
    Download,
    FileText,
    ArrowLeft,
    LogOut,
    HelpCircle,
    MessageSquare,
    Shield,
    Phone,
    Award,
    Lock,
    Bell,
    ArrowRight,
  } = icons;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="flex items-center justify-between p-4">
          <button
            onClick={() => setCurrentScreen("dashboard")}
            className="text-gray-600"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-semibold">Profile</h1>
          <Settings className="w-6 h-6 text-gray-600" />
        </div>
      </div>

      <div
        className="px-6 py-8 space-y-6"
        style={{ height: "calc(100vh - 100px)" }}
      >
        {/* User Information */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-10 h-10 text-blue-600" />
          </div>
          <h2 className="text-xl font-bold mb-1">{userProfile.name}</h2>
          <p className="text-gray-600 mb-2">{userProfile.phone}</p>
          <p className="text-gray-600 mb-2">{userProfile.email}</p>
          <div className="flex items-center justify-center text-sm">
            <CheckCircle className="w-4 h-4 text-green-600 mr-1" />
            <span className="text-green-600">
              Ghana Card: {userProfile.ghanaCard} (Verified)
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Member since {userProfile.memberSince}
          </p>
        </div>

        {/* Account Settings */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold mb-4">Account Settings</h3>
          <div className="space-y-1">
            {[
              { icon: User, label: "Personal Information", screen: null },
              { icon: Lock, label: "Change Password", screen: null },
              { icon: Shield, label: "Security Settings", screen: null },
              { icon: Bell, label: "Notification Preferences", screen: null },
            ].map((item, idx) => (
              <button
                key={idx}
                onClick={() => item.screen && setCurrentScreen(item.screen)}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <div className="flex items-center">
                  <item.icon className="w-5 h-5 text-gray-600 mr-3" />
                  <span className="font-medium">{item.label}</span>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400" />
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold mb-4">App Settings</h3>
          <div className="space-y-1">
            {[
              { icon: Globe, label: "Language Settings", desc: "English" },
              { icon: Eye, label: "Theme", desc: "Light" },
              { icon: Smartphone, label: "Data Usage", desc: "Standard" },
              { icon: Download, label: "Offline Data", desc: "Sync enabled" },
              {
                icon: FileText,
                label: "Insurance Certificate",
                desc: "View document",
              },
            ].map((item, idx) => (
              <button
                key={idx}
                className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center">
                  <item.icon className="w-5 h-5 text-gray-600 mr-3" />
                  <div className="text-left">
                    <p className="font-medium">{item.label}</p>
                    {item.desc && (
                      <p className="text-sm text-gray-500">{item.desc}</p>
                    )}
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400" />
              </button>
            ))}
          </div>
        </div>

        {/* Help & Support */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold mb-4">Help & Support</h3>
          <div className="space-y-1">
            {[
              { icon: HelpCircle, label: "FAQ & Help Center", screen: null },
              { icon: MessageSquare, label: "Contact Support", screen: null },
              { icon: Phone, label: "Call Center", desc: "030 123 4567" },
              { icon: FileText, label: "User Manual", screen: null },
            ].map((item, idx) => (
              <button
                key={idx}
                onClick={() => item.screen && setCurrentScreen(item.screen)}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <div className="flex items-center">
                  <item.icon className="w-5 h-5 text-gray-600 mr-3" />
                  <div className="text-left">
                    <p className="font-medium">{item.label}</p>
                    {item.desc && (
                      <p className="text-sm text-gray-500">{item.desc}</p>
                    )}
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400" />
              </button>
            ))}
          </div>
        </div>

        {/* Legal & Privacy */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold mb-4">Legal & Privacy</h3>
          <div className="space-y-1">
            {[
              { icon: FileText, label: "Terms of Service" },
              { icon: Shield, label: "Privacy Policy" },
              { icon: Download, label: "Data Export/Deletion" },
              { icon: Award, label: "Licenses & Attributions" },
            ].map((item, idx) => (
              <button
                key={idx}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <div className="flex items-center">
                  <item.icon className="w-5 h-5 text-gray-600 mr-3" />
                  <span className="font-medium">{item.label}</span>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400" />
              </button>
            ))}
          </div>
        </div>

        {/* App Information */}
        <div className="bg-gray-100 rounded-xl p-6 text-center">
          <p className="text-sm text-gray-600 mb-1">GLICODRIVE Version 2.1.0</p>
          <p className="text-xs text-gray-500">Build 2024.08.19</p>
          <p className="text-xs text-gray-500 mt-2">
            Licensed by Ghana Insurance Commission
          </p>
        </div>

        {/* Sign Out */}
        <button
          onClick={() => setCurrentScreen("welcome")}
          className="w-full bg-red-50 text-red-600 py-4 rounded-xl font-semibold hover:bg-red-100 transition-colors"
        >
          <LogOut className="w-5 h-5 inline mr-2" />
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default ProfileScreen;
