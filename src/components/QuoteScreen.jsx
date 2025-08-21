import { useState } from "react";
import { 
  ArrowLeft, Car, Shield, CheckCircle, X, Users, Building, Truck, 
  Calendar, Smartphone, QrCode, MapPin, Phone, AlertTriangle, Zap 
} from "lucide-react";

// Enhanced Quote Screen (8-Screen Process)
const QuoteScreen = () => {
  const [step, setStep] = useState(1);
  const [savedQuotes, setSavedQuotes] = useState([]);
  const [quoteData, setQuoteData] = useState({
    // Step 1: Vehicle Information
    vehicleMake: "",
    vehicleModel: "",
    vehicleUsage: "",
    yearOfManufacture: "",

    // Step 2: Additional Vehicle Details
    bodyType: "",
    color: "",
    chassisNumber: "",
    policyStartDate: new Date().toISOString().split("T")[0],
    policyEndDate: "",

    // Step 3: Risk Details
    numberOfSeats: "",
    estimatedVehicleValue: "",
    accessoryValue: "",

    // Step 4: Coverage Options
    coverageType: "comprehensive",
    numberOfMonths: "12",

    // Calculated
    quote: null,
  });

  const [showPayment, setShowPayment] = useState(false);

  // Step 1: Vehicle Information
  const VehicleInformationStep = () => (
    <div className="space-y-4 sm:space-y-6">
      <div className="text-center">
        <div className="w-16 sm:w-20 h-16 sm:h-20 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Car className="w-8 sm:w-10 h-8 sm:h-10 text-blue-600" />
        </div>
        <h2 className="text-xl sm:text-2xl font-bold mb-2 text-gray-900">
          Vehicle Information
        </h2>
        <p className="text-sm sm:text-base text-gray-600 px-4">
          Tell us about your vehicle for accurate pricing
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Make of Vehicle *
          </label>
          <select
            value={quoteData.vehicleMake}
            onChange={(e) =>
              setQuoteData({ ...quoteData, vehicleMake: e.target.value })
            }
            className="w-full p-3 sm:p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
          >
            <option value="">Select Vehicle Make</option>
            <option value="Toyota">Toyota</option>
            <option value="Honda">Honda</option>
            <option value="Nissan">Nissan</option>
            <option value="Hyundai">Hyundai</option>
            <option value="KIA">KIA</option>
            <option value="Mercedes-Benz">Mercedes-Benz</option>
            <option value="BMW">BMW</option>
            <option value="Audi">Audi</option>
            <option value="Volkswagen">Volkswagen</option>
            <option value="Ford">Ford</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Model of Vehicle *
          </label>
          <input
            type="text"
            value={quoteData.vehicleModel}
            onChange={(e) =>
              setQuoteData({ ...quoteData, vehicleModel: e.target.value })
            }
            placeholder="e.g., Camry, Corolla, Civic"
            className="w-full p-3 sm:p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Vehicle Usage *
          </label>
          <div className="grid grid-cols-1 gap-3">
            {[
              {
                id: "private-individual",
                icon: Users,
                title: "Private Individual",
                desc: "Personal use, family car",
                popular: true,
              },
              {
                id: "private-corporate",
                icon: Building,
                title: "Private Corporate",
                desc: "Company-owned vehicle",
                popular: false,
              },
              {
                id: "commercial",
                icon: Truck,
                title: "Commercial Vehicle",
                desc: "Business, delivery, cargo",
                popular: false,
              },
              {
                id: "taxi-uber",
                icon: Car,
                title: "Taxi/Ride-sharing",
                desc: "Uber, Bolt, taxi service",
                popular: false,
              },
            ].map((usage) => (
              <button
                key={usage.id}
                onClick={() =>
                  setQuoteData({ ...quoteData, vehicleUsage: usage.id })
                }
                className={`relative p-3 sm:p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                  quoteData.vehicleUsage === usage.id
                    ? "border-blue-600 bg-blue-50 shadow-lg"
                    : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
                }`}
              >
                {usage.popular && (
                  <div className="absolute -top-2 left-4 bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                    Most Popular
                  </div>
                )}
                <div className="flex items-start space-x-3">
                  <usage.icon
                    className={`w-5 sm:w-6 h-5 sm:h-6 mt-1 ${
                      quoteData.vehicleUsage === usage.id
                        ? "text-blue-600"
                        : "text-gray-400"
                    }`}
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 text-sm sm:text-base">
                      {usage.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 mt-1">{usage.desc}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Year of Manufacture *
          </label>
          <select
            value={quoteData.yearOfManufacture}
            onChange={(e) =>
              setQuoteData({ ...quoteData, yearOfManufacture: e.target.value })
            }
            className="w-full p-3 sm:p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
          >
            <option value="">Select Year</option>
            {Array.from(
              { length: 30 },
              (_, i) => new Date().getFullYear() - i
            ).map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        onClick={() => setStep(2)}
        disabled={
          !quoteData.vehicleMake ||
          !quoteData.vehicleModel ||
          !quoteData.vehicleUsage ||
          !quoteData.yearOfManufacture
        }
        className="w-full bg-blue-600 text-white py-3 sm:py-4 rounded-xl font-semibold hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors text-base sm:text-lg"
      >
        Continue
      </button>
    </div>
  );

  // Step 2: Additional Vehicle Details
  const AdditionalVehicleDetailsStep = () => (
    <div className="space-y-4 sm:space-y-6">
      <div className="text-center">
        <div className="w-16 sm:w-20 h-16 sm:h-20 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Car className="w-8 sm:w-10 h-8 sm:h-10 text-green-600" />
        </div>
        <h2 className="text-xl sm:text-2xl font-bold mb-2 text-gray-900">
          Additional Details
        </h2>
        <p className="text-sm sm:text-base text-gray-600">Complete your vehicle information</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Body Type *
          </label>
          <select
            value={quoteData.bodyType}
            onChange={(e) =>
              setQuoteData({ ...quoteData, bodyType: e.target.value })
            }
            className="w-full p-3 sm:p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
          >
            <option value="">Select Body Type</option>
            <option value="Sedan">Sedan</option>
            <option value="SUV">SUV</option>
            <option value="Hatchback">Hatchback</option>
            <option value="Station Wagon">Station Wagon</option>
            <option value="Coupe">Coupe</option>
            <option value="Pickup">Pickup Truck</option>
            <option value="Van">Van</option>
            <option value="Convertible">Convertible</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Color *
          </label>
          <select
            value={quoteData.color}
            onChange={(e) =>
              setQuoteData({ ...quoteData, color: e.target.value })
            }
            className="w-full p-3 sm:p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
          >
            <option value="">Select Color</option>
            <option value="White">White</option>
            <option value="Black">Black</option>
            <option value="Silver">Silver</option>
            <option value="Gray">Gray</option>
            <option value="Blue">Blue</option>
            <option value="Red">Red</option>
            <option value="Green">Green</option>
            <option value="Yellow">Yellow</option>
            <option value="Brown">Brown</option>
            <option value="Gold">Gold</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Chassis Number *
          </label>
          <input
            type="text"
            value={quoteData.chassisNumber}
            onChange={(e) =>
              setQuoteData({
                ...quoteData,
                chassisNumber: e.target.value.toUpperCase(),
              })
            }
            placeholder="Enter 17-character VIN/Chassis Number"
            maxLength={17}
            className="w-full p-3 sm:p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base font-mono"
          />
          <p className="text-xs text-gray-500 mt-1">
            Found on your vehicle registration document or dashboard
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Policy Start Date *
            </label>
            <input
              type="date"
              value={quoteData.policyStartDate}
              onChange={(e) => {
                const startDate = new Date(e.target.value);
                const endDate = new Date(startDate);
                endDate.setFullYear(startDate.getFullYear() + 1);
                setQuoteData({
                  ...quoteData,
                  policyStartDate: e.target.value,
                  policyEndDate: endDate.toISOString().split("T")[0],
                });
              }}
              min={new Date().toISOString().split("T")[0]}
              className="w-full p-3 sm:p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Policy End Date
            </label>
            <input
              type="date"
              value={quoteData.policyEndDate}
              readOnly
              className="w-full p-3 sm:p-4 border border-gray-300 rounded-xl bg-gray-50 text-base"
            />
            <p className="text-xs text-gray-500 mt-1">
              Auto-calculated (1 year)
            </p>
          </div>
        </div>
      </div>

      <button
        onClick={() => setStep(3)}
        disabled={
          !quoteData.bodyType ||
          !quoteData.color ||
          !quoteData.chassisNumber ||
          quoteData.chassisNumber.length < 17
        }
        className="w-full bg-green-600 text-white py-3 sm:py-4 rounded-xl font-semibold hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors text-base sm:text-lg"
      >
        Continue
      </button>
    </div>
  );

  // Step 3: Risk Details
  const RiskDetailsStep = () => (
    <div className="space-y-4 sm:space-y-6">
      <div className="text-center">
        <div className="w-16 sm:w-20 h-16 sm:h-20 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Shield className="w-8 sm:w-10 h-8 sm:h-10 text-purple-600" />
        </div>
        <h2 className="text-xl sm:text-2xl font-bold mb-2 text-gray-900">
          Risk Assessment
        </h2>
        <p className="text-sm sm:text-base text-gray-600 px-4">
          Help us calculate your premium accurately
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Number of Seats *
          </label>
          <input
            type="number"
            value={quoteData.numberOfSeats}
            onChange={(e) =>
              setQuoteData({ ...quoteData, numberOfSeats: e.target.value })
            }
            placeholder="e.g., 5"
            min="2"
            max="50"
            className="w-full p-3 sm:p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Estimated Vehicle Value (GHS) *
          </label>
          <input
            type="number"
            value={quoteData.estimatedVehicleValue}
            onChange={(e) =>
              setQuoteData({
                ...quoteData,
                estimatedVehicleValue: e.target.value,
              })
            }
            placeholder="e.g., 75000"
            min="10000"
            className="w-full p-3 sm:p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
          />
          <p className="text-xs text-gray-500 mt-1">
            Current market value of your vehicle
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Accessories or Trailer Value (GHS)
          </label>
          <input
            type="number"
            value={quoteData.accessoryValue}
            onChange={(e) =>
              setQuoteData({ ...quoteData, accessoryValue: e.target.value })
            }
            placeholder="e.g., 5000 (Optional)"
            min="0"
            className="w-full p-3 sm:p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
          />
          <p className="text-xs text-gray-500 mt-1">
            Sound system, custom wheels, trailer, etc.
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start space-x-3">
            <Shield className="w-5 sm:w-6 h-5 sm:h-6 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-blue-900 mb-1">
                AI-Powered Valuation
              </h4>
              <p className="text-sm text-blue-700">
                Our system will cross-reference your vehicle details with
                current market data to ensure accurate coverage and fair
                pricing.
              </p>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={() => setStep(4)}
        disabled={!quoteData.numberOfSeats || !quoteData.estimatedVehicleValue}
        className="w-full bg-purple-600 text-white py-3 sm:py-4 rounded-xl font-semibold hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors text-base sm:text-lg"
      >
        Get Quote
      </button>
    </div>
  );

  // Step 4: Coverage Options
  const CoverageOptionsStep = () => {
    const generateQuote = () => {
      const baseRates = {
        "private-individual": 800,
        "private-corporate": 1200,
        commercial: 1800,
        "taxi-uber": 2200,
      };

      const coverageMultipliers = {
        "third-party": 0.4,
        "third-party-fire": 0.6,
        comprehensive: 1.0,
      };

      const baseRate = baseRates[quoteData.vehicleUsage] || 1000;
      const coverageMultiplier =
        coverageMultipliers[quoteData.coverageType] || 1.0;
      const vehicleValueFactor = Math.max(
        1,
        parseInt(quoteData.estimatedVehicleValue) / 50000
      );

      const basePremium = Math.round(
        baseRate * coverageMultiplier * vehicleValueFactor
      );
      const discount = Math.round(basePremium * 0.15); // Safe driver discount
      const finalPremium = basePremium - discount;
      const tax = Math.round(finalPremium * 0.125); // 12.5% VAT + fees
      const total = finalPremium + tax;

      setQuoteData({
        ...quoteData,
        quote: {
          basePremium,
          discount,
          finalPremium,
          tax,
          total,
          breakdown: {
            basePremium,
            discount,
            tax,
            total,
          },
        },
      });
      setStep(5);
    };

    return (
      <div className="space-y-4 sm:space-y-6">
        <div className="text-center">
          <div className="w-16 sm:w-20 h-16 sm:h-20 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 sm:w-10 h-8 sm:h-10 text-orange-600" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold mb-2 text-gray-900">
            Choose Coverage
          </h2>
          <p className="text-sm sm:text-base text-gray-600 px-4">
            Select the protection that fits your needs
          </p>
        </div>

        <div className="space-y-4">
          {[
            {
              id: "third-party",
              title: "Third Party Only",
              desc: "Legal minimum coverage",
              price: "From GHS 400/year",
              features: [
                "Third party damage coverage",
                "Legal requirement compliance",
                "Court appearance support",
                "Basic liability protection",
              ],
              color: "gray",
            },
            {
              id: "third-party-fire",
              title: "Third Party + Fire/Theft",
              desc: "Enhanced protection",
              price: "From GHS 650/year",
              features: [
                "All third party benefits",
                "Fire damage coverage",
                "Theft protection",
                "Natural disaster cover",
              ],
              color: "orange",
            },
            {
              id: "comprehensive",
              title: "Comprehensive Coverage",
              desc: "Complete protection",
              price: "From GHS 1,200/year",
              features: [
                "Full damage coverage",
                "Own vehicle protection",
                "24/7 roadside assistance",
                "Replacement vehicle",
                "Legal expense cover",
                "Medical expenses coverage",
              ],
              color: "blue",
              popular: true,
              recommended: true,
            },
          ].map((option) => (
            <button
              key={option.id}
              onClick={() =>
                setQuoteData({ ...quoteData, coverageType: option.id })
              }
              className={`relative w-full p-4 sm:p-6 rounded-2xl border-2 text-left transition-all duration-300 ${
                quoteData.coverageType === option.id
                  ? "border-blue-600 bg-blue-50 shadow-xl scale-105"
                  : "border-gray-200 hover:border-gray-300 hover:shadow-lg"
              }`}
            >
              {option.popular && (
                <div className="absolute -top-3 left-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs px-3 py-1 rounded-full font-medium">
                  Most Popular
                </div>
              )}
              {option.recommended && (
                <div className="absolute -top-3 right-4 bg-green-600 text-white text-xs px-3 py-1 rounded-full font-medium">
                  Recommended
                </div>
              )}

              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">
                    {option.title}
                  </h3>
                  <p className="text-sm text-gray-600">{option.desc}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-blue-600">
                    {option.price}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-2">
                {option.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center text-sm">
                    <CheckCircle className="w-4 h-4 text-blue-600 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </button>
          ))}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Policy Duration
          </label>
          <select
            value={quoteData.numberOfMonths}
            onChange={(e) =>
              setQuoteData({ ...quoteData, numberOfMonths: e.target.value })
            }
            className="w-full p-3 sm:p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
          >
            <option value="12">12 Months (Standard)</option>
            <option value="6">6 Months</option>
            <option value="3">3 Months</option>
          </select>
        </div>

        <button
          onClick={generateQuote}
          className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg hover:from-orange-700 hover:to-red-700 transition-all duration-200 shadow-lg transform hover:scale-105"
        >
          Calculate My Premium
        </button>
      </div>
    );
  };

  // Step 5: Quote Results
  const QuoteResultsStep = () => (
    <div className="space-y-4 sm:space-y-6">
      <div className="text-center">
        <div className="w-16 sm:w-20 h-16 sm:h-20 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-10 sm:w-12 h-10 sm:h-12 text-green-600" />
        </div>
        <h2 className="text-xl sm:text-2xl font-bold mb-2 text-gray-900">
          Your Quote is Ready!
        </h2>
        <p className="text-sm sm:text-base text-gray-600">
          Instant approval • MID verified • Secure payments
        </p>
      </div>

      {/* Quote Card */}
      <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 text-white rounded-2xl p-4 sm:p-6 shadow-2xl">
        <div className="text-center mb-4 sm:mb-6">
          <p className="text-sm opacity-90 mb-2">Annual Premium</p>
          <p className="text-3xl sm:text-5xl font-bold mb-2">
            GHS {quoteData.quote?.total.toLocaleString()}
          </p>
          <p className="text-sm opacity-75">
            Or GHS {Math.round(quoteData.quote?.total / 12).toLocaleString()}{" "}
            per month
          </p>
        </div>

        <div className="bg-white/15 backdrop-blur-sm rounded-xl p-4 space-y-3">
          <div className="flex justify-between text-sm">
            <span>Base Premium</span>
            <span>GHS {quoteData.quote?.basePremium.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm text-green-200">
            <span>Safe Driver Discount</span>
            <span>-GHS {quoteData.quote?.discount.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>VAT & Fees (12.5%)</span>
            <span>GHS {quoteData.quote?.tax.toLocaleString()}</span>
          </div>
          <div className="border-t border-white/20 pt-3 flex justify-between font-bold text-base sm:text-lg">
            <span>Total Amount</span>
            <span>GHS {quoteData.quote?.total.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Coverage Summary */}
      <div className="bg-white rounded-xl shadow-sm border p-4 sm:p-6">
        <h3 className="font-bold text-gray-900 text-base sm:text-lg mb-4">
          What's Included
        </h3>
        <div className="grid grid-cols-1 gap-3">
          {[
            "Third party liability up to GHS 500,000",
            "Own damage coverage (comprehensive)",
            "Fire and theft protection",
            "24/7 roadside assistance nationwide",
            "Replacement vehicle (up to 3 days)",
            "Medical expenses up to GHS 15,000",
            "Legal expense cover up to GHS 25,000",
            "Instant MID database registration",
          ].map((feature, idx) => (
            <div key={idx} className="flex items-start space-x-3">
              <CheckCircle className="w-4 sm:w-5 h-4 sm:h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <span className="text-sm sm:text-base text-gray-700">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button
          onClick={() => {
            const newQuote = {
              id: Date.now(),
              ...quoteData,
              createdAt: new Date().toISOString(),
              expiresAt: new Date(
                Date.now() + 30 * 24 * 60 * 60 * 1000
              ).toISOString(),
            };
            setSavedQuotes((prev) => [...prev, newQuote]);
            console.log("Quote saved to dashboard");
          }}
          className="bg-gray-100 text-gray-700 py-3 sm:py-4 rounded-xl font-semibold hover:bg-gray-200 transition-colors text-base sm:text-lg"
        >
          Save Quote
        </button>
        <button
          onClick={() => setShowPayment(true)}
          className="bg-gradient-to-r from-green-600 to-green-700 text-white py-3 sm:py-4 rounded-xl font-bold hover:from-green-700 hover:to-green-800 transition-all duration-200 shadow-lg transform hover:scale-105 text-base sm:text-lg"
        >
          Buy Now
        </button>
      </div>
    </div>
  );

  // Payment Modal
  const PaymentModal = () => {
    if (!showPayment || !quoteData.quote) return null;

    return (
      <div className="fixed inset-0 bg-black/60 z-50 flex items-end sm:items-center sm:justify-center">
        <div className="bg-white w-full sm:w-full sm:max-w-lg sm:mx-4 rounded-t-2xl sm:rounded-2xl max-h-[85vh] overflow-y-auto">
          <div className="sticky top-0 bg-white border-b p-4 sm:rounded-t-2xl">
            <div className="flex items-center justify-between">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                Secure Payment
              </h2>
              <button
                onClick={() => setShowPayment(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>
          </div>

          <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
            {/* Amount Summary */}
            <div className="bg-gradient-to-r from-blue-50 to-green-50 p-4 sm:p-6 rounded-xl border">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-1">Total Amount</p>
                <p className="text-2xl sm:text-4xl font-bold text-gray-900">
                  GHS {quoteData.quote.total.toLocaleString()}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Includes VAT and all fees
                </p>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900 text-base sm:text-lg">
                Choose Payment Method
              </h3>

              {[
                {
                  id: "mtn-momo",
                  name: "MTN Mobile Money",
                  desc: "Pay with MTN MoMo wallet",
                  icon: Smartphone,
                  color: "yellow",
                  popular: true,
                },
                {
                  id: "vodafone-cash",
                  name: "Vodafone Cash",
                  desc: "Pay with Vodafone wallet",
                  icon: Smartphone,
                  color: "red",
                },
                {
                  id: "airteltigo-money",
                  name: "AirtelTigo Money",
                  desc: "Pay with AirtelTigo wallet",
                  icon: Smartphone,
                  color: "blue",
                },
                {
                  id: "ghqr",
                  name: "GhQR Universal",
                  desc: "All banks and digital wallets",
                  icon: QrCode,
                  color: "purple",
                  action: "payment-success",
                },
                {
                  id: "bank-transfer",
                  name: "Bank Transfer",
                  desc: "Direct bank account transfer",
                  icon: Building,
                  color: "green",
                },
                {
                  id: "installments",
                  name: "Pay in Installments",
                  desc: "3, 6, or 12 monthly payments",
                  icon: Calendar,
                  color: "indigo",
                },
              ].map((method) => (
                <button
                  key={method.id}
                  onClick={() => {
                    if (method.action === "payment-success") {
                      setShowPayment(false);
                      console.log("Payment successful!");
                    }
                  }}
                  className="w-full flex items-center justify-between p-3 sm:p-4 border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-md transition-all duration-200 group"
                >
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    <div className="w-10 sm:w-12 h-10 sm:h-12 bg-blue-100 rounded-xl flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                      <method.icon className="w-5 sm:w-6 h-5 sm:h-6 text-blue-600" />
                    </div>
                    <div className="text-left">
                      <div className="flex items-center space-x-2">
                        <p className="font-semibold text-gray-900 text-sm sm:text-base">
                          {method.name}
                        </p>
                        {method.popular && (
                          <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                            Popular
                          </span>
                        )}
                      </div>
                      <p className="text-xs sm:text-sm text-gray-600">{method.desc}</p>
                    </div>
                  </div>
                  <ArrowLeft className="w-4 sm:w-5 h-4 sm:h-5 text-gray-400 group-hover:text-gray-600 transition-colors rotate-180" />
                </button>
              ))}
            </div>

            {/* Security Notice */}
            <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
              <div className="flex items-start space-x-3">
                <Shield className="w-5 sm:w-6 h-5 sm:h-6 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-blue-900 mb-1">
                    Instant Coverage
                  </h4>
                  <p className="text-xs sm:text-sm text-blue-700">
                    Your policy activates immediately upon successful payment
                    and will be automatically registered with the NIC Motor
                    Insurance Database.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return <VehicleInformationStep />;
      case 2:
        return <AdditionalVehicleDetailsStep />;
      case 3:
        return <RiskDetailsStep />;
      case 4:
        return <CoverageOptionsStep />;
      case 5:
        return <QuoteResultsStep />;
      default:
        return <VehicleInformationStep />;
    }
  };

  return (
    <div className="w-full h-full bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="flex-none bg-white shadow-sm border-b">
        <div className="flex items-center justify-between p-4">
          <button
            onClick={() =>
              step > 1 ? setStep(step - 1) : console.log("Back to dashboard")
            }
            className="text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="text-center">
            <h1 className="text-lg font-semibold text-gray-900">Get Quote</h1>
            <p className="text-sm text-gray-500">Step {step} of 5</p>
          </div>
          <div className="w-6 h-6" />
        </div>

        {/* Progress Bar */}
        <div className="px-4 pb-2">
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div
              className="bg-gradient-to-r from-blue-600 to-purple-600 h-1.5 rounded-full transition-all duration-500"
              style={{ width: `${(step / 5) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6">
        {renderStepContent()}
      </div>

      <PaymentModal />
    </div>
  );
};

export default QuoteScreen;