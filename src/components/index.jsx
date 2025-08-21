import BottomNavigation from "./BottomNavigation";
import ClaimsScreen from "./ClaimsScreen";
import Dashboard from "./Dashboard";
import DemoNavigation from "./DemoNavigation";
import PaymentSuccess from "./PaymentSuccess";
import PoliciesScreen from "./PoliciesScreen";
import PolicyCard from "./PolicyCard";
import ProfileScreen from "./ProfileScreen";
import QuoteScreen from "./QuoteScreen";
import SignInScreen from "./SigninScreen";
import SignupScreen from "./SignupScreen";
import StatusBar from "./StatusBar";
import WelcomeScreen from "./WelcomeScreen-v2";
import { GlicoDriveProvider, useGlicoDrive } from "../utils/provider";

// Main App Router
const AppRouter = () => {
  const { currentScreen } = useGlicoDrive();

  const screens = {
    welcome: WelcomeScreen,
    signup: SignupScreen,
    signin: SignInScreen,
    dashboard: Dashboard,
    quote: QuoteScreen,
    "payment-success": PaymentSuccess,
    "policy-card": PolicyCard,

    // Placeholder screens for navigation
    policies: () => <PoliciesScreen />,
    claims: () => <ClaimsScreen />,
    profile: () => <ProfileScreen />,
  };

  const ScreenComponent = screens[currentScreen] || WelcomeScreen;
  return <ScreenComponent />;
};

// Main App Container
const AppContainer = () => {
  return (
    <div className="w-full h-full relative rounded-2xl shadow-2xl">
      <div className="w-full h-full">
        <div className="h-full relative flex flex-col">
          {/* Status Bar */}
          <div className="sticky top-0 z-50">
            <StatusBar />
          </div>

          {/* Main Content */}
          <div className="flex-1 overflow-hidden relative">
            <AppRouter />
          </div>

          {/* Bottom Navigation */}
          <BottomNavigation />
        </div>
      </div>
      <div>
        <DemoNavigation />
      </div>
    </div>
  );
};

// Main App Component
const ConsumerApp = () => {
  return (
    <GlicoDriveProvider>
      <AppContainer />
    </GlicoDriveProvider>
  );
};

export default ConsumerApp;
