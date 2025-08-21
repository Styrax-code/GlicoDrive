import { useState, useCallback, useEffect, useMemo } from "react";
import { useGlicoDrive } from "../utils/provider";

// Signup Screen (8-Field Form) - Fully Responsive to Parent Container
const SignupScreen = () => {
  const { setCurrentScreen, icons } = useGlicoDrive();
  const {
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
  } = icons;

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
      <div className={`${className}`}>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          {label} {props.required && <span className="text-red-500">*</span>}
        </label>
        <div className="relative">
          <input
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setFocusedField(fieldId)}
            onBlur={() => setFocusedField(null)}
            placeholder={placeholder}
            className={`
              w-full px-3 py-3 border rounded-lg text-base
              transition-all duration-200 ease-out
              placeholder-gray-400 bg-white
              focus:ring-2 focus:ring-blue-500 focus:border-blue-500
              ${hasError ? "border-red-300 focus:ring-red-200" : "border-gray-300"}
              ${isValid ? "border-green-300 focus:ring-green-200" : ""}
              ${Icon ? "pl-10" : ""}
            `}
            {...props}
          />

          {/* Icon */}
          {Icon && (
            <Icon
              className={`
              absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4
              transition-colors duration-200
              ${isFocused ? "text-blue-500" : "text-gray-400"}
              ${hasError ? "text-red-400" : ""}
              ${isValid ? "text-green-400" : ""}
            `}
            />
          )}

          {/* Status Icon */}
          {isValid && (
            <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-green-500" />
          )}
        </div>

        {/* Error Message */}
        {hasError && (
          <div className="flex items-center space-x-1.5 mt-1.5">
            <AlertCircleIcon className="w-3.5 h-3.5 text-red-500 flex-shrink-0" />
            <p className="text-red-600 text-xs">{error}</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50 w-full h-full flex flex-col">
      {/* Sleek Header - Flexible height */}
      <div className="bg-white/90 backdrop-blur-md border-b border-gray-100 flex-shrink-0">
        <div className="flex items-center px-4 py-3">
          <button
            onClick={() => setCurrentScreen("welcome")}
            className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div className="flex-1 text-center">
            <h1 className="text-lg font-semibold text-gray-900">
              Create Account
            </h1>
            <p className="text-xs text-gray-500">
              Join thousands of protected drivers
            </p>
          </div>

          <div className="w-10 h-10 flex items-center justify-center">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
              <User className="w-4 h-4 text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Scrollable Form Container - Takes remaining height */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 pb-6 min-h-full flex flex-col">
          {/* Compact Progress Bar */}
          <div className="mb-6 flex-shrink-0">
            <div className="flex justify-between text-xs text-gray-600 mb-2">
              <span>Complete your profile</span>
              <span>{formProgress}/8 completed</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500"
                style={{ width: `${(formProgress / 8) * 100}%` }}
              />
            </div>
          </div>

          {/* Form Content - Flexible container */}
          <div className="flex-1 flex flex-col">
            {/* Compact Form Grid */}
            <div className="space-y-4 flex-1">
              {/* Name Fields Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <InputField
                  label="First Name"
                  value={formData.firstName}
                  onChange={(value) => handleFieldChange("firstName", value)}
                  placeholder="John"
                  icon={User}
                  error={errors.firstName}
                  touched={touched.firstName}
                  required
                />
                <InputField
                  label="Surname"
                  value={formData.surname}
                  onChange={(value) => handleFieldChange("surname", value)}
                  placeholder="Doe"
                  icon={User}
                  error={errors.surname}
                  touched={touched.surname}
                  required
                />
              </div>

              {/* Gender & Date Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Gender <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.gender}
                    onChange={(e) => handleFieldChange("gender", e.target.value)}
                    onFocus={() => setFocusedField("gender")}
                    onBlur={() => setFocusedField(null)}
                    className={`
                      w-full px-3 py-3 border rounded-lg text-base bg-white text-gray-700 
                      transition-all duration-200 ease-out
                      focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                      ${errors.gender && touched.gender ? "border-red-300" : "border-gray-300"}
                      ${!errors.gender && touched.gender && formData.gender ? "border-green-300" : ""}
                    `}
                  >
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.gender && touched.gender && (
                    <div className="flex items-center space-x-1.5 mt-1.5">
                      <LucideAlertCircle className="w-3.5 h-3.5 text-red-500 flex-shrink-0" />
                      <p className="text-red-600 text-xs">{errors.gender}</p>
                    </div>
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
                  required
                />
              </div>

              {/* Contact Fields */}
              <InputField
                label="Phone Number"
                type="tel"
                value={formData.phone}
                onChange={(value) => {
                  // Auto-format phone number
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
                required
              />

              <InputField
                label="Email Address"
                type="email"
                value={formData.email}
                onChange={(value) =>
                  handleFieldChange("email", value.toLowerCase())
                }
                placeholder="john.doe@example.com"
                icon={Mail}
                error={errors.email}
                touched={touched.email}
                required
              />

              {/* Address */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Address <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <textarea
                    value={formData.address}
                    onChange={(e) => handleFieldChange("address", e.target.value)}
                    onFocus={() => setFocusedField("address")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Enter your full residential address"
                    rows={2}
                    className={`
                      w-full px-3 py-3 pl-10 border rounded-lg text-base resize-none bg-white
                      transition-all duration-200 ease-out placeholder-gray-400
                      focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                      ${errors.address && touched.address ? "border-red-300" : "border-gray-300"}
                      ${!errors.address && touched.address && formData.address ? "border-green-300" : ""}
                    `}
                  />
                  <MapPin
                    className={`
                    absolute left-3 top-3 w-4 h-4 transition-colors duration-200
                    ${focusedField === "address" ? "text-blue-500" : "text-gray-400"}
                    ${errors.address && touched.address ? "text-red-400" : ""}
                    ${!errors.address && touched.address && formData.address ? "text-green-400" : ""}
                  `}
                  />
                  {!errors.address && touched.address && formData.address && (
                    <CheckCircle className="absolute right-3 top-3 w-4 h-4 text-green-500" />
                  )}
                </div>
                {errors.address && touched.address && (
                  <div className="flex items-center space-x-1.5 mt-1.5">
                    <LucideAlertCircle className="w-3.5 h-3.5 text-red-500 flex-shrink-0" />
                    <p className="text-red-600 text-xs">{errors.address}</p>
                  </div>
                )}
              </div>

              {/* Password with Strength */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => handleFieldChange("password", e.target.value)}
                    onFocus={() => setFocusedField("password")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Create a strong password"
                    className={`
                      w-full px-3 py-3 pr-10 border rounded-lg text-base bg-white
                      transition-all duration-200 ease-out placeholder-gray-400
                      focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                      ${errors.password && touched.password ? "border-red-300" : "border-gray-300"}
                    `}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 p-0.5 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* Compact Password Strength */}
                {formData.password && (
                  <div className="mt-2 bg-gray-50 rounded-lg p-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs text-gray-600">Strength:</span>
                      <span
                        className={`text-xs font-semibold ${
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
                    <div className="w-full bg-gray-200 rounded-full h-1.5 mb-2">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                        style={{ width: `${passwordStrength}%` }}
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-1 text-xs">
                      {Object.entries(checks)
                        .slice(0, 3)
                        .map(([key, passed]) => (
                          <div
                            key={key}
                            className={`flex items-center space-x-1 ${passed ? "text-green-600" : "text-gray-400"}`}
                          >
                            {passed ? (
                              <CheckLineIcon className="w-2.5 h-2.5" />
                            ) : (
                              <div className="w-2.5 h-2.5 rounded-full border border-gray-300" />
                            )}
                            <span className="truncate">
                              {key === "length"
                                ? "8+ chars"
                                : key === "uppercase"
                                  ? "A-Z"
                                  : "a-z"}
                            </span>
                          </div>
                        ))}
                    </div>
                  </div>
                )}

                {errors.password && touched.password && (
                  <div className="flex items-center space-x-1.5 mt-1.5">
                    <LucideAlertCircle className="w-3.5 h-3.5 text-red-500 flex-shrink-0" />
                    <p className="text-red-600 text-xs">{errors.password}</p>
                  </div>
                )}
              </div>

              {/* Terms & Conditions */}
              <div className="bg-blue-50/50 rounded-xl p-4 border border-blue-100">
                <label className="flex items-start space-x-3 cursor-pointer group">
                  <div className="relative flex-shrink-0 mt-0.5">
                    <input
                      type="checkbox"
                      checked={acceptedTerms}
                      onChange={(e) => setAcceptedTerms(e.target.checked)}
                      className="sr-only"
                    />
                    <div
                      className={`
                      w-5 h-5 rounded-md border-2 transition-all duration-200 flex items-center justify-center
                      ${
                        acceptedTerms
                          ? "bg-blue-500 border-blue-500 shadow-sm"
                          : "border-gray-300 group-hover:border-blue-400 bg-white"
                      }
                    `}
                    >
                      {acceptedTerms && (
                        <CheckIcon className="w-3 h-3 text-white" />
                      )}
                    </div>
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-700">
                      I agree to the{" "}
                      <button className="text-blue-600 hover:text-blue-800 font-medium underline">
                        Terms & Conditions
                      </button>{" "}
                      and{" "}
                      <button className="text-blue-600 hover:text-blue-800 font-medium underline">
                        Privacy Policy
                      </button>
                    </span>
                  </div>
                </label>
                {errors.terms && (
                  <div className="flex items-center space-x-1.5 mt-2">
                    <LucideAlertCircle className="w-3.5 h-3.5 text-red-500 flex-shrink-0" />
                    <p className="text-red-600 text-xs">{errors.terms}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Actions - Always at bottom */}
            <div className="flex-shrink-0 pt-6 space-y-4">
              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={!isFormValid || isSubmitting}
                className={`
                  w-full py-3.5 px-6 rounded-xl font-semibold text-base transition-all duration-300
                  flex items-center justify-center space-x-2 shadow-lg relative overflow-hidden
                  ${
                    isFormValid && !isSubmitting
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-xl hover:from-blue-700 hover:to-purple-700 active:scale-[0.98]"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }
                `}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Creating Account...</span>
                  </>
                ) : (
                  <>
                    <Shield className="w-5 h-5" />
                    <span>Create Account</span>
                  </>
                )}

                {/* Shimmer Effect for Valid State */}
                {isFormValid && !isSubmitting && (
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 animate-pulse" />
                )}
              </button>

              {/* Alternative Action */}
              <div className="text-center">
                <button
                  onClick={() => setCurrentScreen("signin")}
                  className="text-gray-600 hover:text-blue-600 text-sm font-medium transition-colors duration-200"
                >
                  Already have an account?{" "}
                  <span className="text-blue-600 font-semibold">Sign In</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupScreen;