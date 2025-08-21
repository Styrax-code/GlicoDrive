import { useState } from "react";
import {
  Search,
  Zap,
  CreditCard,
  AlertTriangle,
  Globe,
  Car,
  TrendingDown,
  TrendingUp,
  Smartphone,
  Settings,
  Cloud,
  Database,
  Package,
  RotateCcw,
  BadgeCheck,
  Shield,
  Building2,
  Phone,
  ChevronUp,
  ChevronDown,
  Tablet,
  Bell,
  User,
  FileText,
  DollarSign,
  Clock,
  Star,
  Activity,
} from "lucide-react";
import ConsumerApp from "../components/index";

const GlicoDriveConsumerDashboard = () => {
  const [appPosition, setAppPosition] = useState("right");
  const [showDetails, setShowDetails] = useState({});
  const [viewMode, setViewMode] = useState("grid");
  const [deviceSize, setDeviceSize] = useState("iphone14");

  const toggleDetails = (index) => {
    setShowDetails((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  // Clean device configurations
  const deviceSizes = {
    iphoneXR: { width: 380, height: 800, name: "iPhone XR", type: "phone" },
    iphone12Pro: {
      width: 360,
      height: 780,
      name: "iPhone 12 Pro",
      type: "phone",
    },
    iphone14: { width: 340, height: 720, name: "iPhone 14", type: "phone" },
    iphone14ProMax: {
      width: 400,
      height: 860,
      name: "iPhone 14 Pro Max",
      type: "phone",
    },
    iphonePlus: { width: 380, height: 760, name: "iPhone Plus", type: "phone" },
    iphoneMini: { width: 320, height: 640, name: "iPhone Mini", type: "phone" },
    samsungS23: { width: 350, height: 740, name: "Samsung S23", type: "phone" },
    pixel7: { width: 340, height: 720, name: "Pixel 7", type: "phone" },
    ipadMini: { width: 440, height: 600, name: "iPad Mini", type: "tablet" },
    ipad: { width: 500, height: 680, name: "iPad", type: "tablet" },
    ipadPro: { width: 580, height: 780, name: "iPad Pro", type: "tablet" },
  };

  const currentDevice = deviceSizes[deviceSize];

  // Core features from blueprint only
  const coreFeatures = [
    {
      title: "Ghana Card KYC Integration",
      desc: "NFC card reading, biometric verification, and real-time validation",
      detail:
        "Advanced NFC technology with 99.7% accuracy, biometric matching, and real-time NIA API integration for seamless onboarding and fraud prevention.",
      icon: <BadgeCheck className="w-5 h-5" />,
      category: "Identity",
      priority: "Critical",
    },
    {
      title: "Instant MID Synchronization",
      desc: "Real-time integration with Ghana's Motor Insurance Database",
      detail:
        "Bidirectional sync every 30 seconds, USSD gateway support, and blockchain-backed verification for 100% data integrity.",
      icon: <Zap className="w-5 h-5" />,
      category: "Database",
      priority: "Critical",
    },
    {
      title: "Universal Payment Gateway",
      desc: "MTN MoMo, Vodafone Cash, AirtelTigo Money, and GhQR support",
      detail:
        "PCI DSS Level 1 compliant processing, multi-currency support, and smart contract automation for payments.",
      icon: <CreditCard className="w-5 h-5" />,
      category: "Payments",
      priority: "Critical",
    },
    {
      title: "Emergency Accident Mode",
      desc: "GPS tracking and emergency services integration",
      detail:
        "Sub-meter GPS accuracy, offline mapping, automated emergency contacts, and real-time incident reporting.",
      icon: <AlertTriangle className="w-5 h-5" />,
      category: "Emergency",
      priority: "High",
    },
    {
      title: "Blockchain Verification",
      desc: "Immutable policy records on Polygon network",
      detail:
        "Smart contract automation, IPFS storage, cross-chain bridges, and tamper-proof claims history.",
      icon: <Globe className="w-5 h-5" />,
      category: "Blockchain",
      priority: "Medium",
    },
  ];

  // Performance metrics from blueprint
  const performanceMetrics = [
    {
      label: "Load Time",
      value: "< 2s",
      trend: <TrendingDown className="w-4 h-4 text-green-600" />,
    },
    {
      label: "Uptime",
      value: "99.9%",
      trend: <TrendingUp className="w-4 h-4 text-blue-600" />,
    },
    {
      label: "Claims Processing",
      value: "< 48h",
      trend: <TrendingDown className="w-4 h-4 text-purple-600" />,
    },
    {
      label: "User Rating",
      value: "4.8+",
      trend: <TrendingUp className="w-4 h-4 text-yellow-600" />,
    },
    {
      label: "API Response",
      value: "120ms",
      trend: <TrendingDown className="w-4 h-4 text-green-600" />,
    },
    {
      label: "Success Rate",
      value: "98.5%",
      trend: <TrendingUp className="w-4 h-4 text-blue-600" />,
    },
  ];

  // Blueprint quick actions
  const quickActions = [
    {
      title: "Get New Quote",
      icon: <DollarSign className="w-5 h-5" />,
      description: "Instant premium calculation",
    },
    {
      title: "Submit Claim",
      icon: <AlertTriangle className="w-5 h-5" />,
      description: "Emergency claim processing",
    },
    {
      title: "View Policy",
      icon: <FileText className="w-5 h-5" />,
      description: "Digital policy card",
    },
    {
      title: "Renew Policy",
      icon: <Clock className="w-5 h-5" />,
      description: "Smart renewal system",
    },
  ];

  // Calculate responsive widths
  const getLayoutClasses = () => {
    switch (appPosition) {
      case "left":
        return {
          container: "lg:grid-cols-2",
          phone: "lg:col-span-1 order-1",
          content: "lg:col-span-1 order-2",
        };
      case "right":
        return {
          container: "lg:grid-cols-2",
          phone: "lg:col-span-1 order-2",
          content: "lg:col-span-1 order-1",
        };
      case "top":
        return {
          container: "grid-cols-1",
          phone: "order-1",
          content: "order-2",
        };
      case "bottom":
        return {
          container: "grid-cols-1",
          phone: "order-2",
          content: "order-1",
        };
      default:
        return {
          container: "lg:grid-cols-5",
          phone: "lg:col-span-3 order-2",
          content: "lg:col-span-2 order-1",
        };
    }
  };

  const layoutClasses = getLayoutClasses();

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 p-4 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Clean Header */}
        <div className="bg-white rounded-xl p-6 mb-6 border border-gray-200">
          <div className="flex flex-wrap items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                <Car className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  GLICO-DRIVE
                </h1>
                <p className="text-gray-600">Motor Insurance Platform</p>
              </div>
            </div>

            <div className="flex gap-3 flex-wrap">
              {/* Device Selector */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-gray-600">
                  Device
                </label>
                <select
                  value={deviceSize}
                  onChange={(e) => setDeviceSize(e.target.value)}
                  className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                >
                  <optgroup label="📱 Phones">
                    <option value="iphoneMini">iPhone Mini</option>
                    <option value="iphone14">iPhone 14</option>
                    <option value="iphonePlus">iPhone Plus</option>
                    <option value="samsungS23">Samsung S23</option>
                    <option value="pixel7">Pixel 7</option>
                  </optgroup>
                  <optgroup label="📱 Tablets">
                    <option value="ipadMini">iPad Mini</option>
                    <option value="ipad">iPad</option>
                    <option value="ipadPro">iPad Pro</option>
                  </optgroup>
                </select>
              </div>

              {/* Position Selector */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-gray-600">
                  Position
                </label>
                <div className="flex bg-gray-100 rounded-lg p-1">
                  {["left", "right", "top", "bottom"].map((pos) => (
                    <button
                      key={pos}
                      onClick={() => setAppPosition(pos)}
                      className={`px-3 py-1 rounded text-xs font-medium capitalize transition-colors ${
                        appPosition === pos
                          ? "bg-white text-blue-600 border border-gray-200"
                          : "text-gray-600 hover:text-blue-600"
                      }`}
                    >
                      {pos}
                    </button>
                  ))}
                </div>
              </div>

              {/* View Mode */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-gray-600">
                  View
                </label>
                <div className="flex bg-gray-100 rounded-lg p-1">
                  {["grid", "list"].map((mode) => (
                    <button
                      key={mode}
                      onClick={() => setViewMode(mode)}
                      className={`px-3 py-1 rounded text-xs font-medium capitalize transition-colors ${
                        viewMode === mode
                          ? "bg-white text-blue-600 border border-gray-200"
                          : "text-gray-600 hover:text-blue-600"
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Status Bar */}
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>System Operational</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span>Licensed by Ghana Insurance Commission</span>
            </div>
          </div>
        </div>

        {/* Main Layout */}
        <div className={`grid gap-6 ${layoutClasses.container}`}>
          {/* Mobile Preview */}
          <div className={`${layoutClasses.phone} space-y-4`}>
            <div className="bg-white rounded-xl p-6 border border-gray-200 sticky top-4">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    Consumer App
                  </h2>
                  <p className="text-sm text-gray-600">Live Preview</p>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded">
                  {currentDevice.type === "tablet" ? (
                    <Tablet className="w-3 h-3" />
                  ) : (
                    <Smartphone className="w-3 h-3" />
                  )}
                  {currentDevice.name}
                </div>
              </div>

              {/* Clean Mobile Mockup */}
              <div className="flex justify-center mb-6">
                <div
                  className="bg-black rounded-2xl p-1 border border-gray-300 transition-all duration-300"
                  style={{
                    width: `${currentDevice.width}px`,
                    height: `${currentDevice.height}px`,
                  }}
                >
                  <div className="w-full h-full rounded-[14px] flex items-center justify-center text-white relative overflow-hidden">
                    <ConsumerApp />
                  </div>
                </div>
              </div>

              {/* App Info */}
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm font-semibold text-green-600">
                    Active
                  </div>
                  <div className="text-xs text-gray-600">Status</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm font-semibold text-blue-600">
                    v1.0
                  </div>
                  <div className="text-xs text-gray-600">Version</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-xs font-semibold text-purple-600">
                    {currentDevice.width}×{currentDevice.height}
                  </div>
                  <div className="text-xs text-gray-600">Resolution</div>
                </div>
              </div>

              {/* Feature Tags */}
              <div className="flex gap-2 flex-wrap">
                {[
                  "Ghana Card KYC",
                  "MID Sync",
                  "MoMo Payments",
                  "Emergency Mode",
                ].map((tag, index) => (
                  <span
                    key={index}
                    className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs border border-blue-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Dashboard Content */}
          <div className={`${layoutClasses.content} space-y-6`}>
            {/* Performance Metrics */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Performance Metrics
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {performanceMetrics.map((metric, index) => (
                  <div
                    key={index}
                    className="text-center p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center justify-center mb-2">
                      <span className="text-xl font-bold text-gray-800">
                        {metric.value}
                      </span>
                      <span className="ml-1">{metric.trend}</span>
                    </div>
                    <p className="text-xs text-gray-600 font-medium">
                      {metric.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Core Features */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  Core Features
                </h3>
                <span className="text-sm text-gray-600">
                  {coreFeatures.length} features
                </span>
              </div>

              {viewMode === "grid" ? (
                <div className="grid md:grid-cols-2 gap-4">
                  {coreFeatures.map((feature, index) => (
                    <div
                      key={index}
                      className="border border-gray-200 rounded-lg p-4"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center mr-3 text-blue-600">
                            {feature.icon}
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-800 text-sm">
                              {feature.title}
                            </h4>
                            <span
                              className={`text-xs px-2 py-1 rounded-full mt-1 inline-block ${
                                feature.priority === "Critical"
                                  ? "bg-red-50 text-red-700"
                                  : feature.priority === "High"
                                    ? "bg-orange-50 text-orange-700"
                                    : "bg-blue-50 text-blue-700"
                              }`}
                            >
                              {feature.priority}
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => toggleDetails(index)}
                          className="text-gray-400 hover:text-blue-600"
                        >
                          {showDetails[index] ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                      <p className="text-xs text-gray-600 mb-3">
                        {feature.desc}
                      </p>
                      {showDetails[index] && (
                        <div className="bg-blue-50 rounded-lg p-3 border-l-2 border-blue-500">
                          <p className="text-xs text-gray-700">
                            {feature.detail}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  {coreFeatures.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
                    >
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center mr-3 text-blue-600">
                          {feature.icon}
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-800 text-sm">
                            {feature.title}
                          </h4>
                          <p className="text-xs text-gray-600">
                            {feature.desc}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            feature.priority === "Critical"
                              ? "bg-red-50 text-red-700"
                              : feature.priority === "High"
                                ? "bg-orange-50 text-orange-700"
                                : "bg-blue-50 text-blue-700"
                          }`}
                        >
                          {feature.priority}
                        </span>
                        <button
                          onClick={() => toggleDetails(index)}
                          className="text-gray-400 hover:text-blue-600"
                        >
                          {showDetails[index] ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Technology Stack */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Technology Stack
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  {
                    name: "React Native",
                    type: "Frontend",
                    icon: <Smartphone className="w-5 h-5" />,
                  },
                  {
                    name: "Node.js",
                    type: "Backend",
                    icon: <Settings className="w-5 h-5" />,
                  },
                  {
                    name: "Polygon",
                    type: "Blockchain",
                    icon: <Globe className="w-5 h-5" />,
                  },
                  {
                    name: "AWS",
                    type: "Cloud",
                    icon: <Cloud className="w-5 h-5" />,
                  },
                  {
                    name: "MongoDB",
                    type: "Database",
                    icon: <Database className="w-5 h-5" />,
                  },
                  {
                    name: "Redis",
                    type: "Cache",
                    icon: <Zap className="w-5 h-5" />,
                  },
                  {
                    name: "Docker",
                    type: "Container",
                    icon: <Package className="w-5 h-5" />,
                  },
                  {
                    name: "GitHub Actions",
                    type: "CI/CD",
                    icon: <RotateCcw className="w-5 h-5" />,
                  },
                ].map((tech, index) => (
                  <div
                    key={index}
                    className="p-3 bg-gray-50 rounded-lg text-center"
                  >
                    <div className="text-gray-600 mb-2 flex justify-center">
                      {tech.icon}
                    </div>
                    <div className="font-medium text-sm">{tech.name}</div>
                    <div className="text-xs text-gray-500">{tech.type}</div>
                    <div className="w-2 h-2 bg-green-500 rounded-full mx-auto mt-2"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* External Integrations */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                External Integrations
              </h3>
              <div className="space-y-3">
                {[
                  {
                    name: "Ghana Card (NIA)",
                    status: "Connected",
                    uptime: "99.8%",
                    icon: <BadgeCheck className="w-4 h-4" />,
                  },
                  {
                    name: "Motor Insurance Database",
                    status: "Connected",
                    uptime: "99.9%",
                    icon: <Car className="w-4 h-4" />,
                  },
                  {
                    name: "Bank of Ghana",
                    status: "Connected",
                    uptime: "99.5%",
                    icon: <Building2 className="w-4 h-4" />,
                  },
                  {
                    name: "MTN Mobile Money",
                    status: "Connected",
                    uptime: "99.7%",
                    icon: <Phone className="w-4 h-4" />,
                  },
                  {
                    name: "Vodafone Cash",
                    status: "Connected",
                    uptime: "99.6%",
                    icon: <CreditCard className="w-4 h-4" />,
                  },
                  {
                    name: "Ghana Police Service",
                    status: "Testing",
                    uptime: "95.2%",
                    icon: <Shield className="w-4 h-4" />,
                  },
                ].map((integration, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center">
                      <div className="text-gray-600 mr-3">
                        {integration.icon}
                      </div>
                      <div>
                        <div className="font-medium text-sm">
                          {integration.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          Uptime: {integration.uptime}
                        </div>
                      </div>
                    </div>
                    <div
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        integration.status === "Connected"
                          ? "bg-green-50 text-green-700"
                          : "bg-yellow-50 text-yellow-700"
                      }`}
                    >
                      {integration.status}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlicoDriveConsumerDashboard;
