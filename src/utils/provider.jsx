import { createContext, useContext, useState, useEffect } from "react";
import {
  Car,
  Shield,
  CreditCard,
  Camera,
  MapPin,
  Phone,
  Bell,
  User,
  Settings,
  FileText,
  AlertTriangle,
  AlertCircle,
  CheckCircle,
  Clock,
  Smartphone,
  Zap,
  Star,
  TrendingUp,
  Globe,
  Lock,
  Scan,
  Wallet,
  BarChart3,
  MessageSquare,
  Navigation,
  Heart,
  Award,
  Truck,
  Home,
  Menu,
  X,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  Plus,
  Minus,
  Calendar,
  DollarSign,
  Users,
  Building,
  Search,
  SignalHigh,
  Battery,
  Wifi,
  ChevronUp,
  ChevronDown,
  MessageCircle,
  Download,
  Share2,
  RefreshCw,
  QrCode,
  Target,
  Volume2,
  Mic,
  Send,
  Play,
  Pause,
  ChevronRight,
  Edit3,
  Info,
  HelpCircle,
  LogOut,
  Copy,
  ExternalLink,
  Mail,
  Hand
} from "lucide-react";

// Enhanced Context with comprehensive state management
const GlicoDriveContext = createContext();

export const useGlicoDrive = () => {
  const context = useContext(GlicoDriveContext);
  if (!context) {
    throw new Error("useGlicoDrive must be used within a GlicoDriveProvider");
  }
  return context;
};

export const GlicoDriveProvider = ({ children }) => {
  // Navigation & UI State
  const [currentScreen, setCurrentScreen] = useState("welcome");
  const [currentTime, setCurrentTime] = useState(new Date());
  const [batteryLevel, setBatteryLevel] = useState(87);
  const [signalStrength, setSignalStrength] = useState(4);
  const [showNav, setShowNav] = useState(true);
  const [activeTab, setActiveTab] = useState("home");
  const [isLoading, setIsLoading] = useState(false);
  const [networkQuality, setNetworkQuality] = useState("4G");

  // Enhanced User Profile State (8-field registration)
  const [userProfile, setUserProfile] = useState({
    firstName: "Kwame",
    surname: "Asante",
    gender: "Male",
    dateOfBirth: "1990-05-15",
    phone: "+233 24 123 4567",
    email: "kwame.asante@gmail.com",
    address: "East Legon, Accra, Ghana",
    ghanaCard: "GHA-123456789-0",
    isVerified: true,
    memberSince: "2024",
    totalSavings: "GHS 2,450",
    profilePhoto: null,
    lastLogin: new Date().toISOString(),
    securityLevel: "high",
  });

  // Enhanced Policies State
  const [policies, setPolicies] = useState([
    {
      id: "POL-2024-000001",
      vehicleId: 1,
      type: "comprehensive",
      premium: 1350,
      status: "active",
      startDate: "2024-01-15",
      endDate: "2024-12-15",
      midVerified: true,
      policyNumber: "POL-2024-000001",
      paymentMethod: "mtn-momo",
      renewalReminders: true,
      documents: ["policy-cert.pdf", "mid-sticker.pdf"],
    },
  ]);

  // Enhanced Vehicles State
  const [vehicles, setVehicles] = useState([
    {
      id: 1,
      make: "Toyota",
      model: "Camry",
      year: "2020",
      plate: "GR 1234-20",
      color: "Silver",
      bodyType: "Sedan",
      chassisNumber: "JT2BF28K8Y0123456",
      seats: 5,
      estimatedValue: 85000,
      accessoryValue: 5000,
      usage: "private-individual",
      status: "active",
      coverage: "comprehensive",
      renewalDate: "2024-12-15",
      midStatus: "verified",
    },
  ]);

  // Enhanced Claims State with 8-stage tracking
  const [claims, setClaims] = useState([
    {
      id: "CLM-2024-001",
      type: "Accident Damage",
      status: "stage-5",
      amount: "GHS 8,500",
      date: "2024-08-10",
      incidentLocation: "Spintex Road, Accra",
      description: "Front bumper damage from parking incident",
      stage: 5,
      stageDetails: {
        1: { completed: true, date: "2024-08-10", name: "Claim Submitted" },
        2: { completed: true, date: "2024-08-11", name: "Claim Number Issued" },
        3: { completed: true, date: "2024-08-13", name: "Under Review" },
        4: {
          completed: true,
          date: "2024-08-15",
          name: "Liability Determined",
        },
        5: {
          completed: false,
          current: true,
          name: "DV Issuance",
          expectedDate: "2024-08-25",
        },
        6: { completed: false, name: "DV Completion" },
        7: { completed: false, name: "Payment Processing" },
        8: { completed: false, name: "Payment Complete" },
      },
      documents: ["incident-photos.zip", "police-report.pdf"],
      claimsOfficer: {
        name: "Sarah Mensah",
        phone: "+233 30 266 4910",
        email: "s.mensah@glico.com.gh",
      },
    },
  ]);

  // Quote Management State
  const [savedQuotes, setSavedQuotes] = useState([]);
  const [activeQuote, setActiveQuote] = useState(null);

  // Notification State
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "policy-renewal",
      title: "Policy Renewal Reminder",
      message: "Your Toyota Camry policy expires in 14 days",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      read: false,
      priority: "high",
    },
  ]);

  // App Settings State
  const [appSettings, setAppSettings] = useState({
    language: "en",
    theme: "light",
    notifications: {
      pushEnabled: true,
      emailEnabled: true,
      smsEnabled: true,
      renewalReminders: true,
      claimUpdates: true,
      securityAlerts: true,
    },
    security: {
      biometricEnabled: false,
      autoLogout: 15, // minutes
      twoFactorEnabled: false,
    },
    dataUsage: {
      offlineSync: true,
      backgroundSync: true,
      downloadDocuments: "wifi-only",
    },
  });

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Network quality simulation
  useEffect(() => {
    const networkTimer = setInterval(() => {
      const qualities = ["3G", "4G", "5G"];
      setNetworkQuality(
        qualities[Math.floor(Math.random() * qualities.length)]
      );
    }, 30000);
    return () => clearInterval(networkTimer);
  }, []);

  const value = {
    // Screen navigation
    currentScreen,
    setCurrentScreen,

    // System state
    currentTime,
    batteryLevel,
    setBatteryLevel,
    signalStrength,
    setSignalStrength,
    showNav,
    setShowNav,
    activeTab,
    setActiveTab,
    isLoading,
    setIsLoading,
    networkQuality,

    // User data
    userProfile,
    setUserProfile,
    policies,
    setPolicies,
    vehicles,
    setVehicles,
    claims,
    setClaims,
    savedQuotes,
    setSavedQuotes,
    activeQuote,
    setActiveQuote,

    // App state
    notifications,
    setNotifications,
    appSettings,
    setAppSettings,

    // Icons
    icons: {
      Car,
      Shield,
      CreditCard,
      Camera,
      MapPin,
      Phone,
      Bell,
      User,
      Settings,
      FileText,
      AlertTriangle,
      AlertCircle,
      CheckCircle,
      Clock,
      Smartphone,
      Zap,
      Star,
      TrendingUp,
      Globe,
      Lock,
      Scan,
      Wallet,
      BarChart3,
      MessageSquare,
      MessageCircle,
      Navigation,
      Heart,
      Award,
      Truck,
      Home,
      Menu,
      X,
      Eye,
      EyeOff,
      ArrowRight,
      ArrowLeft,
      Plus,
      Minus,
      Calendar,
      DollarSign,
      Users,
      Building,
      Search,
      SignalHigh,
      Battery,
      Wifi,
      ChevronUp,
      ChevronDown,
      Download,
      Share2,
      RefreshCw,
      QrCode,
      Target,
      Volume2,
      Mic,
      Send,
      Play,
      Pause,
      ChevronRight,
      Edit3,
      Info,
      HelpCircle,
      LogOut,
      Copy,
      ExternalLink,
      Mail,
      Hand,
    },
  };

  return (
    <GlicoDriveContext.Provider value={value}>
      {children}
    </GlicoDriveContext.Provider>
  );
};
