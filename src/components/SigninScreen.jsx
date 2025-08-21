import { useGlicoDrive } from "../utils/provider";

// Sign In Screen (Multi-Factor Authentication)
const SignInScreen = () => {
  const { setCurrentScreen, icons, appSettings } = useGlicoDrive();
  const {
    ArrowLeft,
    Lock,
    Eye,
    EyeOff,
    Smartphone,
    Shield,
    AlertTriangle,
  } = icons;

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [biometricAvailable, setBiometricAvailable] = useState(true);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [twoFactorCode, setTwoFactorCode] = useState("");

  const handleBiometricLogin = () => {
    // Simulate biometric authentication
    setCurrentScreen("dashboard");
  };

  const handleLogin = () => {
    if (formData.email && formData.password) {
      if (appSettings.security.twoFactorEnabled) {
        setShowTwoFactor(true);
      } else {
        setCurrentScreen("dashboard");
      }
    } else {
      setFailedAttempts((prev) => prev + 1);
      if (failedAttempts >= 4) {
        setIsLocked(true);
      }
    }
  };

  const handleTwoFactorVerification = () => {
    if (twoFactorCode.length === 6) {
      setCurrentScreen("dashboard");
    }
  };

  if (showTwoFactor) {
    return (
      <div className="bg-gray-50 h-full">
        <div className="bg-white shadow-sm">
          <div className="flex items-center justify-between p-4">
            <button
              onClick={() => setShowTwoFactor(false)}
              className="text-gray-600 hover:text-gray-800 transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div className="text-center">
              <h1 className="text-lg font-semibold text-gray-900">
                Two-Factor Authentication
              </h1>
              <p className="text-sm text-gray-500">Enter verification code</p>
            </div>
            <div className="w-6 h-6" />
          </div>
        </div>

        <div
          className="p-6 space-y-6"
          style={{ height: "calc(100vh - 250px)" }}
        >
          <div className="text-center">
            <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Shield className="w-10 h-10 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold mb-2 text-gray-900">
              Security Code
            </h2>
            <p className="text-gray-600">
              We've sent a 6-digit code to your registered phone number ending
              in ****67
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Verification Code
              </label>
              <input
                type="text"
                value={twoFactorCode}
                onChange={(e) =>
                  setTwoFactorCode(
                    e.target.value.replace(/\D/g, "").slice(0, 6)
                  )
                }
                placeholder="000000"
                className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-center text-2xl font-mono tracking-widest"
                maxLength={6}
              />
            </div>

            <button
              onClick={handleTwoFactorVerification}
              disabled={twoFactorCode.length !== 6}
              className="w-full bg-blue-600 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200"
            >
              Verify & Continue
            </button>

            <div className="text-center">
              <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                Didn't receive code? Resend
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 h-full">
      <div className="bg-white shadow-sm">
        <div className="flex items-center justify-between p-4">
          <button
            onClick={() => setCurrentScreen("welcome")}
            className="text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="text-center">
            <h1 className="text-lg font-semibold text-gray-900">
              Welcome Back
            </h1>
            <p className="text-sm text-gray-500">Login to your account</p>
          </div>
          <div className="w-6 h-6" />
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Biometric Login Option */}
        {biometricAvailable && (
          <div className="text-center">
            <button
              onClick={handleBiometricLogin}
              className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4 hover:bg-blue-200 transition-colors"
            >
              <Smartphone className="w-10 h-10 text-blue-600" />
            </button>
            <p className="text-sm text-gray-600 mb-4">Use Face ID / Touch ID</p>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-50 text-gray-500">
                  Or continue with password
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Account Lockout Warning */}
        {isLocked && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-6 h-6 text-red-600 mt-0.5" />
              <div>
                <h4 className="font-semibold text-red-800">
                  Account Temporarily Locked
                </h4>
                <p className="text-sm text-red-700 mt-1">
                  Too many failed login attempts. Please try again in 15 minutes
                  or use account recovery.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Login Form */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email or Phone Number
            </label>
            <div className="relative">
              <input
                type="text"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="Enter email or phone number"
                disabled={isLocked}
                className="w-full p-4 pl-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base disabled:bg-gray-100"
              />
              <MailIcon className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                placeholder="Enter your password"
                disabled={isLocked}
                className="w-full p-4 pl-12 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base disabled:bg-gray-100"
              />
              <Lock className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.rememberMe}
                onChange={(e) =>
                  setFormData({ ...formData, rememberMe: e.target.checked })
                }
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700">Remember me</span>
            </label>
            <button
              onClick={() => setCurrentScreen("forgot-password")}
              className="text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              Forgot Password?
            </button>
          </div>

          {/* Failed Attempts Warning */}
          {failedAttempts > 0 && !isLocked && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <p className="text-sm text-yellow-800">
                {5 - failedAttempts} attempts remaining before account lockout
              </p>
            </div>
          )}

          <button
            onClick={handleLogin}
            disabled={isLocked || !formData.email || !formData.password}
            className="w-full bg-blue-600 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200 shadow-lg"
          >
            Sign In
          </button>
        </div>

        {/* Security Features */}
        <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
          <div className="flex items-start space-x-3">
            <Shield className="w-6 h-6 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-semibold text-blue-900 mb-1">
                Secured by GLICO
              </h4>
              <p className="text-sm text-blue-700">
                Your login is protected with bank-level security including
                device verification and fraud detection.
              </p>
            </div>
          </div>
        </div>

        {/* Alternative Action */}
        <div className="text-center">
          <button
            onClick={() => setCurrentScreen("signup")}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Don't have an account? Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignInScreen;
