import { useGlicoDrive } from "../utils/provider";

// Enhanced Bottom Navigation with Curved Design
const BottomNavigation = () => {
  const {
    currentScreen,
    setCurrentScreen,
    activeTab,
    setActiveTab,
    showNav,
    setShowNav,
    icons,
  } = useGlicoDrive();
  const { Home, Shield, FileText, User, ChevronUp, ChevronDown } = icons;

  const tabs = [
    { id: "home", icon: Home, label: "Home", screen: "dashboard" },
    { id: "policies", icon: Shield, label: "Policies", screen: "policies" },
    { id: "claims", icon: FileText, label: "Claims", screen: "claims" },
    { id: "profile", icon: User, label: "Profile", screen: "profile" },
  ];

  if (!["dashboard", "policies", "claims", "profile"].includes(currentScreen)) {
    return null;
  }

  return (
    <div className="absolute bottom-0 left-0 right-0 w-full z-50">
      {/* Navigation Container with Curved Top */}
      <div
        className={`relative transition-transform duration-300 ease-out ${
          showNav ? "translate-y-0" : "translate-y-full"
        }`}
      >
        {/* Toggle Button */}
          <button
            onClick={() => setShowNav(!showNav)}
            className="absolute -top-[clamp(0.75rem,2vw,1rem)] left-1/2 transform -translate-x-1/2 bg-white rounded-full p-[clamp(1rem,2vw,1.25rem)] shadow-lg border border-gray-200 hover:bg-gray-50 transition-all duration-200 hover:scale-105 z-10"
            aria-label={showNav ? "Hide navigation" : "Show navigation"}
          >
            {showNav ? (
              <ChevronDown className="w-[clamp(1.25rem,2.25vw,1.5rem)] h-[clamp(0.875rem,2vw,1rem)] text-gray-600" />
            ) : (
              <ChevronUp className="w-[clamp(1.25rem,2.25vw,1.5rem)] h-[clamp(0.875rem,2vw,1rem)] text-gray-600" />
            )}
          </button>
        {/* Curved Background */}
        <div
          className="bg-white shadow-2xl border-t border-gray-100"
          style={{
            borderTopLeftRadius: "clamp(1rem, 6vw, 1.5rem)",
            borderTopRightRadius: "clamp(1rem, 6vw, 1.5rem)",
            clipPath:
              "polygon(0 clamp(1rem, 5vw, 1.25rem), clamp(1rem, 5vw, 1.25rem) 0, calc(100% - clamp(1rem, 5vw, 1.25rem)) 0, 100% clamp(1rem, 5vw, 1.25rem), 100% 100%, 0 100%)",
          }}
        >
          

          {/* Navigation Items */}
          <div className="grid grid-cols-4 px-[clamp(0.75rem,3vw,1rem)] py-[clamp(0.75rem,3vw,1rem)] pt-[clamp(1.5rem,4vw,2rem)]">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setCurrentScreen(tab.screen);
                }}
                className={`flex flex-col items-center py-[clamp(0.5rem,2vw,0.75rem)] px-[clamp(0.5rem,2vw,0.75rem)] rounded-xl transition-all duration-200 ${
                  activeTab === tab.id
                    ? "text-blue-600 bg-blue-50 scale-105"
                    : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                }`}
              >
                <div
                  className={`p-[clamp(0.5rem,1.5vw,0.75rem)] rounded-xl transition-all duration-200 ${
                    activeTab === tab.id ? "bg-blue-100" : "hover:bg-gray-100"
                  }`}
                >
                  <tab.icon
                    className={`w-[clamp(1rem,2.5vw,1.25rem)] h-[clamp(1rem,2.5vw,1.25rem)] transition-transform duration-200 ${
                      activeTab === tab.id ? "scale-110" : ""
                    }`}
                  />
                </div>
                <span className="text-[clamp(0.625rem,1.5vw,0.75rem)] font-medium mt-[clamp(0.25rem,1vw,0.5rem)]">
                  {tab.label}
                </span>
                {activeTab === tab.id && (
                  <div className="w-[clamp(0.25rem,0.5vw,0.3rem)] h-[clamp(0.25rem,0.5vw,0.3rem)] bg-blue-600 rounded-full mt-[clamp(0.25rem,1vw,0.5rem)] animate-pulse" />
                )}
              </button>
            ))}

            {/* Safe area padding for devices with home indicator */}
            <div className="h-[env(safe-area-inset-bottom, 0.5rem)] pb-[clamp(0.5rem,2vw,0.75rem)]"></div>
          </div>
        </div>
      </div>

      {/* Minimized State - Hidden Toggle Area */}
      {!showNav && (
        <div className="group absolute bottom-0 left-0 right-0 w-full h-[clamp(3rem,10vw,4rem)] flex items-end justify-center pb-[clamp(0.75rem,3vw,1rem)]">
          {/* Invisible touch/hover area */}
          <div className="w-[clamp(4rem,15vw,5rem)] h-[clamp(2.5rem,8vw,3rem)] flex items-center justify-center">
            <button
              onClick={() => setShowNav(true)}
              className="bg-white rounded-full p-[clamp(0.75rem,2vw,1rem)] shadow-lg border border-gray-200 hover:bg-gray-50 transition-all duration-300 hover:scale-105 opacity-0 group-hover:opacity-100 group-active:opacity-100 translate-y-[clamp(0.5rem,1.5vw,0.75rem)] group-hover:translate-y-0 group-active:translate-y-0"
              aria-label="Show navigation"
            >
              <ChevronUp className="w-[clamp(1rem,2.5vw,1.25rem)] h-[clamp(1rem,2.5vw,1.25rem)] text-gray-600" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BottomNavigation;
