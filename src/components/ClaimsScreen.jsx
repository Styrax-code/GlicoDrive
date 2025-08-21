import { useState } from "react";
import { useGlicoDrive } from "../utils/provider";

// Claims Screen Component - Implementing 8-stage tracking from blueprint
const ClaimsScreen = () => {
  const { setCurrentScreen, claims, icons } = useGlicoDrive();
  const {
    ArrowLeft,
    Plus,
    AlertTriangle,
    Phone,
    Truck,
    Camera,
    Mic,
    MapPin,
    FileText,
    CheckCircle,
    Clock,
    RefreshCw,
    Zap,
    X,
    MessageSquare,
    Download,
  } = icons;
  const [claimStep, setClaimStep] = useState("list");
  const [newClaim, setNewClaim] = useState({
    type: "",
    location: "",
    description: "",
    date: "",
    time: "",
    policeReport: false,
  });

  const ClaimsList = () => (
    <div className="flex flex-col w-full h-full bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 w-full">
        <div className="flex items-center justify-between p-[4%]">
          <button
            onClick={() => setCurrentScreen("dashboard")}
            className="text-gray-600"
          >
            <ArrowLeft className="w-[clamp(20px,2vw,24px)] h-[clamp(20px,2vw,24px)]" />
          </button>
          <h1 className="text-[clamp(1rem,3vw,1.125rem)] text-gray-500 font-semibold">
            Claims
          </h1>
          <button
            onClick={() => setClaimStep("new-claim")}
            className="text-blue-600"
          >
            <Plus className="w-[clamp(20px,2vw,24px)] h-[clamp(20px,2vw,24px)]" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 sm:py-8 space-y-4 sm:space-y-6">
        {/* Emergency Actions */}
        <div className="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl p-4 sm:p-6">
          <div className="flex items-center mb-4">
            <AlertTriangle className="w-6 h-6 mr-2" />
            <h2 className="font-bold text-lg">Emergency?</h2>
          </div>
          <p className="text-red-100 mb-4 text-sm">
            If you're in an active accident scene, prioritize safety first.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={() => setClaimStep("accident-mode")}
              className="bg-white/20 backdrop-blur-sm py-3 rounded-lg font-semibold hover:bg-white/30 transition-colors"
            >
              <AlertTriangle className="w-5 h-5 inline mr-2" />
              Accident Mode
            </button>
            <button className="bg-white/20 backdrop-blur-sm py-3 rounded-lg font-semibold hover:bg-white/30 transition-colors">
              <Phone className="w-5 h-5 inline mr-2" />
              Call 191
            </button>
          </div>
        </div>

        {/* Active Claims */}
        {claims.length > 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-[4%]">
            <div className="flex items-center justify-between mb-[2%]">
              <h2 className="font-semibold text-gray-500 flex items-center text-[clamp(0.875rem,2.5vw,1rem)]">
                <Clock className="w-[clamp(16px,2vw,20px)] h-[clamp(16px,2vw,20px)] mr-[2%] text-orange-600" />
                Active Claims
              </h2>
              <span className="text-[clamp(0.75rem,2vw,0.875rem)] text-gray-500">
                {claims.length} ongoing
              </span>
            </div>

            {claims.map((claim) => (
              <div
                key={claim.id}
                className="border border-gray-200 rounded-lg p-[4%] mb-[2%]"
              >
                <div className="flex items-center justify-between mb-[2%]">
                  <div>
                    <h3 className="font-semibold text-[clamp(0.875rem,2.5vw,1rem)]">
                      {claim.type}
                    </h3>
                    <p className="text-[clamp(0.75rem,2vw,0.875rem)] text-gray-600">
                      Claim #{claim.id}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center px-[2%] py-[1%] rounded-full text-[clamp(0.625rem,1.5vw,0.75rem)] bg-orange-100 text-orange-800">
                      Stage {claim.stage}/8
                    </span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-[2%]">
                  <div className="flex justify-between text-[clamp(0.75rem,2vw,0.875rem)] mb-[1%]">
                    <span>Progress</span>
                    <span>{claim.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-[8px]">
                    <div
                      className="bg-blue-600 h-[8px] rounded-full transition-all duration-300"
                      style={{ width: `${claim.progress}%` }}
                    />
                  </div>
                </div>

                {/* Claim Details */}
                <div className="grid grid-cols-2 gap-[2%] mb-[2%] text-[clamp(0.75rem,2vw,0.875rem)]">
                  <div>
                    <p className="text-gray-500">Estimated Amount</p>
                    <p className="font-semibold">{claim.amount}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Settlement ETA</p>
                    <p className="font-semibold">{claim.estimatedSettlement}</p>
                  </div>
                </div>

                <button
                  onClick={() => setClaimStep("claim-tracking")}
                  className="w-full bg-blue-50 text-blue-600 py-[2%] rounded-lg font-medium hover:bg-blue-100 transition-colors text-[clamp(0.875rem,2.5vw,1rem)]"
                >
                  View Detailed Progress
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Quick Actions */}
        <div className="bg-white rounded-xl border border-gray-200 p-[4%]">
          <h3 className="font-semibold mb-[2%] text-gray-500 text-[clamp(0.875rem,2.5vw,1rem)]">
            Quick Actions
          </h3>
          <div className="grid grid-cols-2 gap-[2%]">
            {[
              {
                icon: Camera,
                label: "Photo Claim",
                desc: "Quick damage report",
                color: "blue",
                action: () => setClaimStep("photo-claim"),
              },
              {
                icon: Truck,
                label: "Roadside Help",
                desc: "Towing & assistance",
                color: "green",
              },
              {
                icon: MessageSquare,
                label: "Chat Support",
                desc: "24/7 assistance",
                color: "purple",
              },
              {
                icon: Phone,
                label: "Call Claims",
                desc: "Speak to expert",
                color: "orange",
              },
            ].map((action, idx) => (
              <button
                key={idx}
                onClick={action.action}
                className={`flex flex-col items-center p-[3%] bg-${action.color}-50 rounded-lg text-center hover:bg-${action.color}-100 transition-colors`}
              >
                <action.icon
                  className={`w-[clamp(24px,3vw,32px)] h-[clamp(24px,3vw,32px)] text-${action.color}-600 mb-[2%]`}
                />
                <span
                  className={`font-medium text-${action.color}-700 text-[clamp(0.75rem,2vw,0.875rem)]`}
                >
                  {action.label}
                </span>
                <span
                  className={`text-[clamp(0.625rem,1.5vw,0.75rem)] text-${action.color}-600`}
                >
                  {action.desc}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Claims History */}
        <div className="bg-white rounded-xl border border-gray-200 p-[4%]">
          <h3 className="font-semibold mb-[2%] text-[clamp(0.875rem,2.5vw,1rem)]">
            Claims History
          </h3>
          {claims.length === 0 ? (
            <div className="text-center py-[5%] text-gray-500">
              <FileText className="w-[clamp(40px,5vw,48px)] h-[clamp(40px,5vw,48px)] mx-auto mb-[2%] opacity-50" />
              <p className="text-[clamp(0.875rem,2.5vw,1rem)]">
                No previous claims
              </p>
              <p className="text-[clamp(0.75rem,2vw,0.875rem)]">
                Keep up the safe driving!
              </p>
            </div>
          ) : (
            <div className="text-center py-[3%] text-gray-500">
              <p className="text-[clamp(0.75rem,2vw,0.875rem)]">
                Previous claims will appear here
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // Accident Mode Screen
  const AccidentMode = () => (
    <div className="flex flex-col w-full h-full bg-red-900 text-white">
      <div className="flex-1 overflow-y-auto p-4 sm:p-6">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => setClaimStep("list")}
            className="text-white/80"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-semibold">ACCIDENT MODE</h1>
          <div className="w-6 h-6" />
        </div>

        {/* Emergency Banner */}
        <div className="bg-red-800/50 backdrop-blur-sm rounded-xl p-4 mb-6 border border-red-600">
          <div className="flex items-center mb-2">
            <AlertTriangle className="w-6 h-6 mr-2" />
            <span className="font-semibold">Emergency Response Active</span>
          </div>
          <p className="text-sm text-red-200">
            Location tracked • Time logged • Evidence recording
          </p>
        </div>

        {/* Safety Checklist */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-6">
          <h2 className="font-semibold mb-4 flex items-center">
            <CheckCircle className="w-5 h-5 mr-2" />
            Safety First Checklist
          </h2>
          <div className="space-y-3">
            {[
              "Move to a safe location if possible",
              "Turn on hazard lights",
              "Check for injuries",
              "Call emergency services if needed",
              "Document the scene",
            ].map((item, idx) => (
              <div key={idx} className="flex items-center">
                <div className="w-5 h-5 border-2 border-white rounded mr-3" />
                <span className="text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <button className="bg-red-600 p-4 rounded-xl text-center hover:bg-red-700 transition-colors">
            <Phone className="w-8 h-8 mx-auto mb-2" />
            <span className="font-medium block">Call 191</span>
            <p className="text-xs text-red-200">Emergency Services</p>
          </button>
          <button className="bg-orange-600 p-4 rounded-xl text-center hover:bg-orange-700 transition-colors">
            <Truck className="w-8 h-8 mx-auto mb-2" />
            <span className="font-medium block">Request Tow</span>
            <p className="text-xs text-orange-200">Roadside Assistance</p>
          </button>
        </div>

        {/* Evidence Collection */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-6">
          <h3 className="font-semibold mb-4">Document the Scene</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: Camera, label: "Take Photos" },
              { icon: Mic, label: "Voice Note" },
              { icon: MapPin, label: "Mark Location" },
              { icon: FileText, label: "Police Report" },
            ].map((item, idx) => (
              <button
                key={idx}
                className="bg-white/20 p-3 rounded-lg text-center hover:bg-white/30 transition-colors"
              >
                <item.icon className="w-6 h-6 mx-auto mb-1" />
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Auto-Detected Info */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
          <h3 className="font-semibold mb-3">Auto-Detected Information</h3>
          <div className="space-y-2 text-sm">
            {[
              ["Time:", new Date().toLocaleString()],
              ["Location:", "Spintex Road, Accra"],
              ["Weather:", "Clear, 28°C"],
              ["Policy Status:", "Active ✓"],
            ].map(([label, value], idx) => (
              <div key={idx} className="flex justify-between">
                <span className="text-white/80">{label}</span>
                <span className={idx === 3 ? "text-green-300" : ""}>
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  
  // Claim Tracking Screen - 8 Stage Process
  const ClaimTracking = () => {
    const claim = claims[0];
    const stages = [
      {
        id: 1,
        title: "Claim Submitted",
        status: "complete",
        icon: CheckCircle,
      },
      {
        id: 2,
        title: "Claim Number Issued",
        status: "complete",
        icon: CheckCircle,
      },
      { id: 3, title: "Under Review", status: "complete", icon: CheckCircle },
      {
        id: 4,
        title: "Liability Determination",
        status: "complete",
        icon: CheckCircle,
      },
      { id: 5, title: "DV Issuance", status: "complete", icon: CheckCircle },
      { id: 6, title: "DV Completion", status: "current", icon: Clock },
      { id: 7, title: "Payment Processing", status: "pending", icon: Clock },
      {
        id: 8,
        title: "Payment Complete",
        status: "pending",
        icon: CheckCircle,
      },
    ];

    return (
      <div className="flex flex-col w-full h-full bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 w-full">
          <div className="flex items-center justify-between p-[4%]">
            <button
              onClick={() => setClaimStep("list")}
              className="text-gray-600"
            >
              <ArrowLeft className="w-[clamp(20px,2vw,24px)] h-[clamp(20px,2vw,24px)]" />
            </button>
            <h1 className="text-[clamp(1rem,3vw,1.125rem)] text-gray-500 font-semibold">
              Claim Status
            </h1>
            <RefreshCw className="w-[clamp(20px,2vw,24px)] h-[clamp(20px,2vw,24px)] text-gray-400" />
          </div>
        </div>

        <div className="px-[5%] py-[5%] space-y-[3%] flex-1 w-full overflow-y-auto">
          {/* Claim Header */}
          <div className="bg-white rounded-xl border border-gray-200 p-[4%]">
            <div className="text-center mb-[2%]">
              <h2 className="text-[clamp(1.25rem,4vw,1.5rem)] font-bold">
                Claim #{claim.id}
              </h2>
              <p className="text-[clamp(0.875rem,2.5vw,1rem)] text-gray-600">
                {claim.type}
              </p>
              <p className="text-[clamp(0.75rem,2vw,0.875rem)] text-gray-500">
                Submitted on {claim.date}
              </p>
            </div>

            <div className="bg-orange-50 border border-orange-200 rounded-lg p-[4%]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-orange-800 text-[clamp(0.875rem,2.5vw,1rem)]">
                    Current Stage
                  </p>
                  <p className="text-orange-600 text-[clamp(0.75rem,2vw,0.875rem)]">
                    DV Completion - Stage 6/8
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-orange-800 text-[clamp(0.875rem,2.5vw,1rem)]">
                    {claim.progress}%
                  </p>
                  <p className="text-[clamp(0.625rem,1.5vw,0.75rem)] text-orange-600">
                    Complete
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Timeline */}
          <div className="bg-white rounded-xl border border-gray-200 p-[4%]">
            <h3 className="text-gray-500 font-semibold mb-[2%] text-[clamp(0.875rem,2.5vw,1rem)]">
              Progress Timeline
            </h3>
            <div className="space-y-[2%]">
              {stages.map((stage) => (
                <div key={stage.id} className="flex items-center">
                  <div
                    className={`w-[clamp(32px,4vw,40px)] h-[clamp(32px,4vw,40px)] rounded-full flex items-center justify-center mr-[2%] ${
                      stage.status === "complete"
                        ? "bg-green-100"
                        : stage.status === "current"
                          ? "bg-blue-100"
                          : "bg-gray-100"
                    }`}
                  >
                    <stage.icon
                      className={`w-[clamp(16px,2vw,20px)] h-[clamp(16px,2vw,20px)] ${
                        stage.status === "complete"
                          ? "text-green-600"
                          : stage.status === "current"
                            ? "text-blue-600"
                            : "text-gray-400"
                      }`}
                    />
                  </div>
                  <div className="flex-1">
                    <p
                      className={`font-medium text-[clamp(0.875rem,2.5vw,1rem)] ${
                        stage.status === "current"
                          ? "text-blue-600"
                          : "text-gray-800"
                      }`}
                    >
                      {stage.title}
                    </p>
                    {stage.status === "current" && (
                      <p className="text-[clamp(0.75rem,2vw,0.875rem)] text-gray-600">
                        In progress - Expected completion in 2-3 days
                      </p>
                    )}
                  </div>
                  {stage.status === "complete" && (
                    <CheckCircle className="w-[clamp(16px,2vw,20px)] h-[clamp(16px,2vw,20px)] text-green-600" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Current Stage Details */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-[4%]">
            <h3 className="font-semibold text-blue-800 mb-[2%] text-[clamp(0.875rem,2.5vw,1rem)]">
              DV Completion Stage
            </h3>
            <p className="text-blue-600 mb-[2%] text-[clamp(0.75rem,2vw,0.875rem)]">
              Your Discharge Voucher (DV) has been issued and is being processed
              by the approved garage.
            </p>
            <div className="space-y-[1.5%] text-[clamp(0.75rem,2vw,0.875rem)]">
              <div className="flex justify-between">
                <span className="text-blue-700">DV Number:</span>
                <span className="font-medium">DV-2024-001234</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-700">Approved Garage:</span>
                <span className="font-medium">AutoFix Ghana Ltd</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-700">Settlement Amount:</span>
                <span className="font-medium">{claim.amount}</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-[2%]">
            <button className="w-full bg-blue-600 text-white py-[3%] rounded-xl font-semibold hover:bg-blue-700 transition-colors text-[clamp(0.875rem,2.5vw,1rem)]">
              <Phone className="w-[clamp(16px,2vw,20px)] h-[clamp(16px,2vw,20px)] inline mr-[2%]" />
              Contact Claims Officer
            </button>
            <button className="w-full bg-white border border-gray-300 text-gray-700 py-[3%] rounded-xl font-semibold hover:bg-gray-50 transition-colors text-[clamp(0.875rem,2.5vw,1rem)]">
              <Download className="w-[clamp(16px,2vw,20px)] h-[clamp(16px,2vw,20px)] inline mr-[2%]" />
              Download DV Documents
            </button>
          </div>
        </div>
      </div>
    );
  };

  // New Claim Submission
  const NewClaimSubmission = () => (
    <div className="min-h-screen h-full w-full bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 w-full">
        <div className="flex items-center justify-between p-[4%]">
          <button
            onClick={() => setClaimStep("list")}
            className="text-gray-600"
          >
            <ArrowLeft className="w-[clamp(20px,2vw,24px)] h-[clamp(20px,2vw,24px)]" />
          </button>
          <h1 className="text-[clamp(1rem,3vw,1.125rem)] font-semibold">
            Submit New Claim
          </h1>
          <div className="w-[clamp(20px,2vw,24px)] h-[clamp(20px,2vw,24px)]" />
        </div>
      </div>

      <div className="px-[5%] py-[5%] space-y-[3%] flex-1 w-full overflow-y-auto">
        {/* Claim Type Selection */}
        <div className="bg-white rounded-xl border border-gray-200 p-[4%]">
          <h3 className="font-semibold mb-[2%] text-[clamp(0.875rem,2.5vw,1rem)]">
            Claim Type
          </h3>
          <div className="grid grid-cols-2 gap-[2%]">
            {[
              {
                id: "accident",
                label: "Accident/Collision",
                icon: AlertTriangle,
              },
              { id: "theft", label: "Theft", icon: Lock },
              { id: "fire", label: "Fire Damage", icon: Zap },
              { id: "vandalism", label: "Vandalism", icon: X },
            ].map((type) => (
              <button
                key={type.id}
                onClick={() => setNewClaim({ ...newClaim, type: type.id })}
                className={`p-[3%] rounded-lg border-2 text-center transition-colors ${
                  newClaim.type === type.id
                    ? "border-blue-600 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <type.icon className="w-[clamp(20px,2vw,24px)] h-[clamp(20px,2vw,24px)] mx-auto mb-[2%] text-gray-600" />
                <span className="text-[clamp(0.75rem,2vw,0.875rem)] font-medium">
                  {type.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Incident Details */}
        <div className="bg-white rounded-xl border border-gray-200 p-[4%]">
          <h3 className="font-semibold mb-[2%] text-[clamp(0.875rem,2.5vw,1rem)]">
            Incident Details
          </h3>
          <div className="space-y-[2%]">
            <div className="grid grid-cols-2 gap-[2%]">
              <div>
                <label className="block text-[clamp(0.75rem,2vw,0.875rem)] font-medium text-gray-700 mb-[1%]">
                  Date
                </label>
                <input
                  type="date"
                  value={newClaim.date}
                  onChange={(e) =>
                    setNewClaim({ ...newClaim, date: e.target.value })
                  }
                  className="w-full px-[3%] py-[2%] border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-[clamp(0.75rem,2vw,0.875rem)] font-medium text-gray-700 mb-[1%]">
                  Time
                </label>
                <input
                  type="time"
                  value={newClaim.time}
                  onChange={(e) =>
                    setNewClaim({ ...newClaim, time: e.target.value })
                  }
                  className="w-full px-[3%] py-[2%] border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-[clamp(0.75rem,2vw,0.875rem)] font-medium text-gray-700 mb-[1%]">
                Location
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={newClaim.location}
                  onChange={(e) =>
                    setNewClaim({ ...newClaim, location: e.target.value })
                  }
                  placeholder="Enter incident location"
                  className="w-full px-[3%] py-[2%] pr-[10%] border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <button className="absolute right-[3%] top-1/2 transform -translate-y-1/2">
                  <MapPin className="w-[clamp(16px,2vw,20px)] h-[clamp(16px,2vw,20px)] text-gray-400" />
                </button>
              </div>
            </div>

            <div>
              <label className="block text-[clamp(0.75rem,2vw,0.875rem)] font-medium text-gray-700 mb-[1%]">
                Description
              </label>
              <textarea
                value={newClaim.description}
                onChange={(e) =>
                  setNewClaim({ ...newClaim, description: e.target.value })
                }
                placeholder="Describe what happened..."
                rows={4}
                className="w-full px-[3%] py-[2%] border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="policeReport"
                checked={newClaim.policeReport}
                onChange={(e) =>
                  setNewClaim({ ...newClaim, policeReport: e.target.checked })
                }
                className="w-[clamp(14px,1.5vw,16px)] h-[clamp(14px,1.5vw,16px)] text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label
                htmlFor="policeReport"
                className="ml-[2%] text-[clamp(0.75rem,2vw,0.875rem)] text-gray-700"
              >
                Police report filed
              </label>
            </div>
          </div>
        </div>

        {/* Document Upload */}
        <div className="bg-white rounded-xl border border-gray-200 p-[4%]">
          <h3 className="font-semibold mb-[2%] text-[clamp(0.875rem,2.5vw,1rem)]">
            Upload Evidence
          </h3>
          <div className="grid grid-cols-2 gap-[2%]">
            <button className="p-[3%] border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors">
              <Camera className="w-[clamp(24px,3vw,32px)] h-[clamp(24px,3vw,32px)] mx-auto mb-[2%] text-gray-400" />
              <span className="text-[clamp(0.75rem,2vw,0.875rem)] font-medium text-gray-600">
                Take Photos
              </span>
            </button>
            <button className="p-[3%] border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors">
              <FileText className="w-[clamp(24px,3vw,32px)] h-[clamp(24px,3vw,32px)] mx-auto mb-[2%] text-gray-400" />
              <span className="text-[clamp(0.75rem,2vw,0.875rem)] font-medium text-gray-600">
                Upload Files
              </span>
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <button
          onClick={() => setClaimStep("list")}
          disabled={!newClaim.type || !newClaim.date || !newClaim.location}
          className="w-full bg-blue-600 text-white py-[3%] rounded-xl font-semibold hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors text-[clamp(0.875rem,2.5vw,1rem)]"
        >
          Submit Claim
        </button>
      </div>
    </div>
  );

  // Route to appropriate screen
  if (claimStep === "list") return <ClaimsList />;
  if (claimStep === "accident-mode") return <AccidentMode />;
  if (claimStep === "claim-tracking") return <ClaimTracking />;
  if (claimStep === "new-claim") return <NewClaimSubmission />;

  return <ClaimsList />;
};

export default ClaimsScreen;
