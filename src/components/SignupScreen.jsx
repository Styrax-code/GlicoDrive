import { useState, useCallback, useEffect, useMemo } from "react";
import {
  ArrowLeft,
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Shield,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
  Check,
} from "lucide-react";

const SignupScreen = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    surname: "",
    gender: "",
    dateOfBirth: "",
    phone: "",
    email: "",
    address: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const setCurrentScreen = (screen) => {
    console.log(`Navigation to ${screen} screen`);
  };

  // Real-time validation as user types
  const validateField = useCallback((field, value) => {
    switch (field) {
      case "firstName":
        if (!value || value.length < 2) {
          return "First name must be at least 2 characters";
        }
        if (!/^[a-zA-Z\s]+$/.test(value)) {
          return "First name can only contain letters";
        }
        break;
      case "surname":
        if (!value || value.length < 2) {
          return "Surname must be at least 2 characters";
        }
        if (!/^[a-zA-Z\s]+$/.test(value)) {
          return "Surname can only contain letters";
        }
        break;
      case "gender":
        if (!value) {
          return "Please select your gender";
        }
        break;
      case "dateOfBirth":
        if (!value) {
          return "Date of birth is required";
        } else {
          const age =
            (new Date() - new Date(value)) / (365.25 * 24 * 60 * 60 * 1000);
          if (age < 18) {
            return "You must be 18 or older";
          }
        }
        break;
      case "phone":
        if (!value) {
          return "Phone number is required";
        }
        if (!/^\+233\s?\d{2}\s?\d{3}\s?\d{4}$/.test(value)) {
          return "Please enter a valid Ghana phone number";
        }
        break;
      case "email":
        if (!value) {
          return "Email address is required";
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          return "Please enter a valid email address";
        }
        break;
      case "address":
        if (!value || value.length < 10) {
          return "Address must be at least 10 characters";
        }
        break;
      case "password":
        if (!value) {
          return "Password is required";
        }
        if (value.length < 8) {
          return "Password must be at least 8 characters";
        }
        if (
          !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/.test(
            value
          )
        ) {
          return "Password must contain uppercase, lowercase, number, and special character";
        }
        break;
      default:
        return null;
    }
    return null;
  }, []);

  // Real-time field validation
  useEffect(() => {
    const newErrors = {};
    Object.keys(formData).forEach((field) => {
      if (touched[field]) {
        const error = validateField(field, formData[field]);
        if (error) {
          newErrors[field] = error;
        }
      }
    });
    setErrors(newErrors);
  }, [formData, touched, validateField]);

  const calculatePasswordStrength = useCallback((password) => {
    let strength = 0;
    const checks = {
      length: password.length >= 8,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      numbers: /\d/.test(password),
      special: /[@$!%*?&]/.test(password),
    };

    Object.values(checks).forEach((check) => {
      if (check) strength += 20;
    });

    return { strength, checks };
  }, []);

  const { strength, checks } = useMemo(
    () => calculatePasswordStrength(formData.password),
    [formData.password, calculatePasswordStrength]
  );

  useEffect(() => {
    setPasswordStrength(strength);
  }, [strength]);

  const handleFieldChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    // Mark all fields as touched for final validation
    const allTouched = Object.keys(formData).reduce((acc, field) => {
      acc[field] = true;
      return acc;
    }, {});
    setTouched(allTouched);

    // Final validation
    const finalErrors = {};
    Object.keys(formData).forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) finalErrors[field] = error;
    });

    if (!acceptedTerms) {
      finalErrors.terms = "You must accept the terms and conditions";
    }

    if (Object.keys(finalErrors).length === 0) {
      // Simulate API call
      setTimeout(() => {
        setCurrentScreen("dashboard");
        setIsSubmitting(false);
      }, 2000);
    } else {
      setErrors(finalErrors);
      setIsSubmitting(false);
    }
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength < 40) return "bg-red-500";
    if (passwordStrength < 60) return "bg-orange-500";
    if (passwordStrength < 80) return "bg-yellow-500";
    return "bg-green-500";
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength < 40) return "Weak";
    if (passwordStrength < 60) return "Fair";
    if (passwordStrength < 80) return "Good";
    return "Strong";
  };

  const isFormValid =
    Object.keys(errors).length === 0 &&
    Object.keys(formData).every((key) => formData[key] !== "") &&
    acceptedTerms;

  const formProgress = Object.keys(formData).filter(
    (key) => formData[key]
  ).length;

  const InputField = ({
    label,
    type = "text",
    value,
    onChange,
    placeholder,
    icon: Icon,
    error,
    touched,
    className = "",
    ...props
  }) => {
    const fieldId = label.toLowerCase().replace(/\s+/g, "");
    const hasError = error && touched;
    const isValid = !error && touched && value;
    const isFocused = focusedField === fieldId;

    return (
      <div className={className}>
        <div className="relative">
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
            <Icon
              className={`w-5 h-5 transition-colors duration-200 ${
                isFocused
                  ? "text-blue-500"
                  : hasError
                    ? "text-red-400"
                    : isValid
                      ? "text-green-400"
                      : "text-gray-400"
              }`}
            />
          </div>
          <input
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setFocusedField(fieldId)}
            onBlur={() => setFocusedField(null)}
            placeholder={placeholder}
            className={`w-full pl-12 pr-12 py-3 bg-gray-50 border rounded-2xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
              hasError
                ? "border-red-300 bg-red-50"
                : isValid
                  ? "border-green-300 bg-green-50"
                  : "border-gray-200 hover:border-gray-300"
            }`}
            {...props}
          />
          {isValid && (
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <CheckCircle className="w-5 h-5 text-green-500" />
            </div>
          )}
          {hasError && (
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <AlertCircle className="w-5 h-5 text-red-500" />
            </div>
          )}
        </div>
        {hasError && <p className="text-sm text-red-500 mt-1 ml-2">{error}</p>}
      </div>
    );
  };

  return (
    <div className="relative w-full h-full bg-white flex items-center justify-center overflow-hidden rounded-[14px]">
      {/* Main Signup Card */}
      <div className="relative bg-white backdrop-blur-sm rounded-2xl sm:rounded-3xl  w-[98%] max-w-full mx-auto h-[98%] overflow-hidden  flex flex-col">
        {/* Header */}
        <div className="flex-shrink-0 bg-gradient-to-r from-gray-50 to-white px-6 py-4 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setCurrentScreen("welcome")}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>

            <div className="text-center flex-1">
              <h1 className="text-xl font-bold text-gray-900">
                Create Account
              </h1>
              <p className="text-sm text-gray-600">
                Join thousands of protected drivers
              </p>
            </div>

            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-blue-600" />
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex justify-between text-xs text-gray-600 mb-2">
              <span>Complete your profile</span>
              <span>{formProgress}/8 completed</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500"
                style={{ width: `${(formProgress / 8) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Scrollable Form Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          <div className="space-y-5">
            {/* Name Fields Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="First Name"
                value={formData.firstName}
                onChange={(value) => handleFieldChange("firstName", value)}
                placeholder="First Name"
                icon={User}
                error={errors.firstName}
                touched={touched.firstName}
              />
              <InputField
                label="Surname"
                value={formData.surname}
                onChange={(value) => handleFieldChange("surname", value)}
                placeholder="Surname"
                icon={User}
                error={errors.surname}
                touched={touched.surname}
              />
            </div>

            {/* Gender & Date Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <User
                    className={`w-5 h-5 transition-colors duration-200 ${
                      focusedField === "gender"
                        ? "text-blue-500"
                        : errors.gender && touched.gender
                          ? "text-red-400"
                          : !errors.gender && touched.gender && formData.gender
                            ? "text-green-400"
                            : "text-gray-400"
                    }`}
                  />
                </div>
                <select
                  value={formData.gender}
                  onChange={(e) => handleFieldChange("gender", e.target.value)}
                  onFocus={() => setFocusedField("gender")}
                  onBlur={() => setFocusedField(null)}
                  className={`w-full pl-12 pr-12 py-3 bg-gray-50 border rounded-2xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                    errors.gender && touched.gender
                      ? "border-red-300 bg-red-50"
                      : !errors.gender && touched.gender && formData.gender
                        ? "border-green-300 bg-green-50"
                        : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                {!errors.gender && touched.gender && formData.gender && (
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  </div>
                )}
                {errors.gender && touched.gender && (
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                    <AlertCircle className="w-5 h-5 text-red-500" />
                  </div>
                )}
                {errors.gender && touched.gender && (
                  <p className="text-sm text-red-500 mt-1 ml-2">
                    {errors.gender}
                  </p>
                )}
              </div>

              <InputField
                label="Date of Birth"
                type="date"
                value={formData.dateOfBirth}
                onChange={(value) => handleFieldChange("dateOfBirth", value)}
                icon={Calendar}
                error={errors.dateOfBirth}
                touched={touched.dateOfBirth}
                max={
                  new Date(Date.now() - 18 * 365 * 24 * 60 * 60 * 1000)
                    .toISOString()
                    .split("T")[0]
                }
              />
            </div>

            {/* Contact Fields */}
            <InputField
              label="Phone Number"
              type="tel"
              value={formData.phone}
              onChange={(value) => {
                let formatted = value.replace(/\D/g, "");
                if (formatted.startsWith("233")) {
                  formatted = "+" + formatted;
                } else if (formatted.startsWith("0")) {
                  formatted = "+233" + formatted.substring(1);
                } else if (
                  !formatted.startsWith("+233") &&
                  formatted.length > 0
                ) {
                  formatted = "+233" + formatted;
                }
                handleFieldChange("phone", formatted);
              }}
              placeholder="+233 24 123 4567"
              icon={Phone}
              error={errors.phone}
              touched={touched.phone}
            />

            <InputField
              label="Email Address"
              type="email"
              value={formData.email}
              onChange={(value) =>
                handleFieldChange("email", value.toLowerCase())
              }
              placeholder="your.email@example.com"
              icon={Mail}
              error={errors.email}
              touched={touched.email}
            />

            {/* Address */}
            <div className="relative">
              <div className="absolute left-4 top-4">
                <MapPin
                  className={`w-5 h-5 transition-colors duration-200 ${
                    focusedField === "address"
                      ? "text-blue-500"
                      : errors.address && touched.address
                        ? "text-red-400"
                        : !errors.address && touched.address && formData.address
                          ? "text-green-400"
                          : "text-gray-400"
                  }`}
                />
              </div>
              <textarea
                value={formData.address}
                onChange={(e) => handleFieldChange("address", e.target.value)}
                onFocus={() => setFocusedField("address")}
                onBlur={() => setFocusedField(null)}
                placeholder="Enter your full residential address"
                rows={3}
                className={`w-full pl-12 pr-12 py-3 bg-gray-50 border rounded-2xl text-gray-900 placeholder-gray-500 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                  errors.address && touched.address
                    ? "border-red-300 bg-red-50"
                    : !errors.address && touched.address && formData.address
                      ? "border-green-300 bg-green-50"
                      : "border-gray-200 hover:border-gray-300"
                }`}
              />
              {!errors.address && touched.address && formData.address && (
                <div className="absolute right-4 top-4">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                </div>
              )}
              {errors.address && touched.address && (
                <div className="absolute right-4 top-4">
                  <AlertCircle className="w-5 h-5 text-red-500" />
                </div>
              )}
              {errors.address && touched.address && (
                <p className="text-sm text-red-500 mt-1 ml-2">
                  {errors.address}
                </p>
              )}
            </div>

            {/* Password with Strength */}
            <div className="space-y-3">
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <Shield className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) =>
                    handleFieldChange("password", e.target.value)
                  }
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Create a strong password"
                  className={`w-full pl-12 pr-12 py-3 bg-gray-50 border rounded-2xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                    errors.password && touched.password
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
              </div>

              {/* Password Strength Indicator */}
              {formData.password && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">
                      Password Strength:
                    </span>
                    <span
                      className={`text-sm font-semibold ${
                        passwordStrength < 40
                          ? "text-red-600"
                          : passwordStrength < 60
                            ? "text-orange-600"
                            : passwordStrength < 80
                              ? "text-yellow-600"
                              : "text-green-600"
                      }`}
                    >
                      {getPasswordStrengthText()}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                      style={{ width: `${passwordStrength}%` }}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {Object.entries(checks).map(([key, passed]) => (
                      <div
                        key={key}
                        className={`flex items-center space-x-2 ${passed ? "text-green-600" : "text-gray-400"}`}
                      >
                        {passed ? (
                          <Check className="w-3 h-3" />
                        ) : (
                          <div className="w-3 h-3 rounded-full border border-gray-300" />
                        )}
                        <span>
                          {key === "length"
                            ? "8+ characters"
                            : key === "uppercase"
                              ? "Uppercase"
                              : key === "lowercase"
                                ? "Lowercase"
                                : key === "numbers"
                                  ? "Numbers"
                                  : "Special chars"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {errors.password && touched.password && (
                <p className="text-sm text-red-500 ml-2">{errors.password}</p>
              )}
            </div>

            {/* Terms & Conditions */}
            <div className="bg-blue-50 rounded-2xl p-4 border border-blue-100">
              <label className="flex items-start space-x-3 cursor-pointer">
                <div className="relative flex-shrink-0 mt-1">
                  <input
                    type="checkbox"
                    checked={acceptedTerms}
                    onChange={(e) => setAcceptedTerms(e.target.checked)}
                    className="sr-only"
                  />
                  <div
                    className={`w-5 h-5 rounded-md border-2 transition-all duration-200 flex items-center justify-center ${
                      acceptedTerms
                        ? "bg-blue-500 border-blue-500"
                        : "border-gray-300 bg-white hover:border-blue-400"
                    }`}
                  >
                    {acceptedTerms && <Check className="w-3 h-3 text-white" />}
                  </div>
                </div>
                <div className="text-sm text-gray-700">
                  I agree to the{" "}
                  <button className="text-blue-600 hover:text-blue-800 font-medium underline">
                    Terms & Conditions
                  </button>{" "}
                  and{" "}
                  <button className="text-blue-600 hover:text-blue-800 font-medium underline">
                    Privacy Policy
                  </button>
                </div>
              </label>
              {errors.terms && (
                <p className="text-sm text-red-500 mt-2 ml-2">{errors.terms}</p>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="flex-shrink-0 px-6 pb-6 space-y-4 bg-gradient-to-t from-gray-50 to-transparent pt-4">
          <button
            onClick={handleSubmit}
            disabled={!isFormValid || isSubmitting}
            className={`group w-full py-4 rounded-2xl font-semibold text-base shadow-lg transition-all duration-300 active:scale-98 flex items-center justify-center relative overflow-hidden ${
              isFormValid && !isSubmitting
                ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:shadow-xl hover:from-blue-700 hover:to-blue-800"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                Creating Account...
              </>
            ) : (
              <>
                <div className="absolute inset-0 bg-white/10 transform translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                <Shield className="w-5 h-5 mr-2 relative z-10" />
                <span className="relative z-10">Create Account</span>
              </>
            )}
          </button>

          <div className="text-center">
            <button
              onClick={() => setCurrentScreen("signin")}
              className="text-gray-600 hover:text-blue-600 text-sm transition-colors duration-200"
            >
              Already have an account?{" "}
              <span className="text-blue-600 font-semibold hover:underline">
                Sign In
              </span>
            </button>
          </div>
        </div>

        {/* Bottom accent */}
        <div className="h-1 bg-gradient-to-r from-blue-500 to-purple-600 flex-shrink-0"></div>
      </div>
    </div>
  );
};

export default SignupScreen;
