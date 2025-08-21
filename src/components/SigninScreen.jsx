import { useState } from "react";
import { useGlicoDrive } from "../utils/provider";

const SignInScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const { setCurrentScreen, icons } = useGlicoDrive();
  const { ArrowRight, Mail, Lock, Eye, EyeOff, AlertCircle, Shield } = icons;

  const handleSubmit = async () => {
    setIsLoading(true);
    setErrors({});

    // Basic validation
    const newErrors = {};
    if (!email) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      setCurrentScreen("dashboard");
    }, 2000);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-purple-900 to-blue-700 flex items-center justify-center overflow-hidden rounded-[14px]">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <div className="absolute top-[5%] left-[5%] w-16 h-16 sm:w-24 sm:h-24 lg:w-32 lg:h-32 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-[10%] right-[5%] w-20 h-20 sm:w-32 sm:h-32 lg:w-40 lg:h-40 bg-purple-300 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/4 w-12 h-12 sm:w-18 sm:h-18 lg:w-24 lg:h-24 bg-blue-300 rounded-full blur-2xl"></div>
      </div>

      {/* Main Sign In Card */}
      <div className="relative bg-white/95 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-2xl w-[90%] h-auto max-w-md mx-auto overflow-hidden border border-white/20 flex flex-col">
        {/* Header */}
        <div className="text-center pt-8 sm:pt-10 pb-6 px-6 relative flex-shrink-0">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 flex items-center justify-center">
            Logn In
            <span className="ml-2 text-2xl">👋</span>
          </h1>
          <p className="text-gray-600 text-base font-medium">
            To access your account
          </p>
        </div>

        {/* Sign In Content */}
        <div className="px-6 pb-8 flex-1">
          <div className="space-y-4 mb-6">
            {/* Email Input */}
            <div className="space-y-2">
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <Mail className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Email"
                  className={`w-full pl-12 pr-4 py-4 bg-gray-50 border rounded-2xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                    errors.email
                      ? "border-red-300 bg-red-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                />
                {errors.email && (
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                    <AlertCircle className="w-5 h-5 text-red-500" />
                  </div>
                )}
              </div>
              {errors.email && (
                <p className="text-sm text-red-500 ml-2">{errors.email}</p>
              )}
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <Lock className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Password"
                  className={`w-full pl-12 pr-12 py-4 bg-gray-50 border rounded-2xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                    errors.password
                      ? "border-red-300 bg-red-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
                {errors.password && (
                  <div className="absolute right-12 top-1/2 transform -translate-y-1/2">
                    <AlertCircle className="w-5 h-5 text-red-500" />
                  </div>
                )}
              </div>
              {errors.password && (
                <p className="text-sm text-red-500 ml-2">{errors.password}</p>
              )}
            </div>
          </div>

          {/* Login Button */}
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="group w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-2xl font-semibold text-base shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 active:scale-98 flex items-center justify-center relative overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                Signing In...
              </>
            ) : (
              <>
                <div className="absolute inset-0 bg-white/10 transform translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                <span className="relative z-10">Login</span>
                <ArrowRight className="w-4 h-4 ml-2 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
              </>
            )}
          </button>

          {/* Forgot Password Link */}
          <div className="text-center mt-6">
            <button
              type="button"
              onClick={() => setCurrentScreen("forgot-password")}
              className="text-blue-600 hover:text-blue-700 font-medium text-base transition-colors duration-200 hover:underline"
            >
              Forgot Password?
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-gray-200"></div>
            <span className="px-4 text-sm text-gray-500 font-medium">OR</span>
            <div className="flex-1 border-t border-gray-200"></div>
          </div>

          {/* Sign Up Link */}
          <div className="text-center">
            <p className="text-gray-600 text-sm mb-2">Don't have an account?</p>
            <button
              type="button"
              onClick={() => setCurrentScreen("signup")}
              className="text-blue-600 hover:text-blue-700 font-semibold text-base transition-colors duration-200 hover:underline"
            >
              Create Account
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-6 pt-4 border-t border-gray-100">
            <div className="flex items-center justify-center text-xs text-gray-500 mb-2">
              <Shield className="w-4 h-4 mr-2 text-blue-600" />
              <span>GIC Licensed • Bank of Ghana Compliant</span>
            </div>
            <div className="flex items-center justify-center text-xs text-gray-500 mb-2">
              <Lock className="w-4 h-4 mr-2 text-gray-600" />{" "}
              <span>Your data is encrypted and secure</span>
            </div>
          </div>
        </div>

        {/* Bottom accent */}
        <div className="h-1 bg-gradient-to-r from-blue-500 to-purple-600 flex-shrink-0"></div>
      </div>
    </div>
  );
};

export default SignInScreen;
