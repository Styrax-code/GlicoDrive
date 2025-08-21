import { useCallback } from "react";
import { useGlicoDrive } from "../utils/provider";

// Enhanced Status Bar Component
const StatusBar = () => {
  const { currentTime, batteryLevel, networkQuality, icons } = useGlicoDrive();
  const { Battery, SignalHigh, Wifi } = icons;

  const formatTime = useCallback(() => {
    return currentTime.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  }, [currentTime]);

  const getBatteryColor = useCallback(() => {
    if (batteryLevel < 20) return "text-red-400";
    if (batteryLevel < 50) return "text-yellow-400";
    return "text-white";
  }, [batteryLevel]);

  return (
    <div className="flex justify-between items-center text-white px-4 py-2 bg-black">
      <div className="flex items-center space-x-3">
        <span className="text-sm font-semibold tracking-wide">
          {formatTime()}
        </span>
        <span className="text-xs bg-white/20 px-2 py-1 rounded-full font-medium">
          {networkQuality}
        </span>
      </div>
      <div className="flex items-center space-x-3">
        <div className="flex space-x-px items-center">
          <SignalHigh />
        </div>
        <Wifi className="w-4 h-4" />
        <div className="flex items-center space-x-1">
          <Battery className={`w-4 h-4 ${getBatteryColor()}`} />
          <span className="text-xs font-medium">{batteryLevel}%</span>
        </div>
      </div>
    </div>
  );
};

export default StatusBar;
