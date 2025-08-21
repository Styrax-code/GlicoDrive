import { useEffect, useState } from "react";
import { useGlicoDrive } from "../utils/provider";

// Demo Navigation Component
const DemoNavigation = () => {
  const { currentScreen, setCurrentScreen, icons } = useGlicoDrive();
  const { Eye, EyeOff } = icons;

  const [showDemoNav, setShowDemoNav] = useState(true);
  const [demoNavPosition, setDemoNavPosition] = useState({ x: '70%', y: '10%' });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const handleDragStart = (e) => {
    setIsDragging(true);
    const rect = e.currentTarget.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    setDragOffset({
      x: clientX - rect.left,
      y: clientY - rect.top,
    });
    e.preventDefault();
  };

  const handleDragMove = (e) => {
    if (!isDragging) return;

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    const container = document.querySelector(".w-full.h-full") || document.body;
    const containerRect = container.getBoundingClientRect();
    const navRect = e.currentTarget.getBoundingClientRect();

    const newX = Math.max(
      0,
      Math.min(
        containerRect.width - navRect.width,
        clientX - containerRect.left - dragOffset.x
      )
    );
    const newY = Math.max(
      0,
      Math.min(
        containerRect.height - navRect.height,
        clientY - containerRect.top - dragOffset.y
      )
    );

    setDemoNavPosition({
      x: `${(newX / containerRect.width) * 100}%`,
      y: `${(newY / containerRect.height) * 100}%`,
    });
    e.preventDefault();
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      const handleMouseMove = (e) => handleDragMove(e);
      const handleMouseUp = () => handleDragEnd();
      const handleTouchMove = (e) => handleDragMove(e);
      const handleTouchEnd = () => handleDragEnd();

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.addEventListener("touchmove", handleTouchMove, {
        passive: false,
      });
      document.addEventListener("touchend", handleTouchEnd);

      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
        document.removeEventListener("touchmove", handleTouchMove);
        document.removeEventListener("touchend", handleTouchEnd);
      };
    }
  }, [isDragging, dragOffset]);

  const screenOptions = [
    { value: "splash", label: "Splash" },
    { value: "onboarding", label: "Onboarding" },
    { value: "dashboard", label: "Dashboard" },
    { value: "policy-card", label: "Policy Card" },
    { value: "quote", label: "Get Quote" },
    { value: "payment-success", label: "Payment Success" },
    { value: "claims", label: "Claims" },
  ];

  if (!showDemoNav) {
    return (
      <div
        className="absolute z-40"
        style={{
          left: demoNavPosition.x,
          top: demoNavPosition.y,
        }}
      >
        <button
          onClick={() => setShowDemoNav(true)}
          className="bg-black/50 backdrop-blur-sm rounded-lg p-[0.5rem] text-white/70 hover:text-white shadow-lg"
        >
          <Eye className="w-[clamp(12px,2vw,16px)] h-[clamp(12px,2vw,16px)]" />
        </button>
      </div>
    );
  }

  return (
    <div
      className={`absolute z-50 ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
      style={{
        left: demoNavPosition.x,
        top: demoNavPosition.y,
        touchAction: "none",
      }}
      onMouseDown={handleDragStart}
      onTouchStart={handleDragStart}
    >
      <div className="bg-black/80 backdrop-blur-sm rounded-lg p-[0.5rem] shadow-lg select-none">
        <div className="flex items-center space-x-[0.5rem]">
          <div className="flex items-center space-x-[0.25rem] text-white/50">
            <div className="w-[0.125rem] h-[0.125rem] bg-current rounded-full" />
            <div className="w-[0.125rem] h-[0.125rem] bg-current rounded-full" />
            <div className="w-[0.125rem] h-[0.125rem] bg-current rounded-full" />
          </div>
          <select
            value={currentScreen}
            onChange={(e) => setCurrentScreen(e.target.value)}
            className="bg-transparent text-white text-[clamp(0.625rem,1.5vw,0.75rem)] border-none outline-none pr-[1rem] cursor-pointer"
            onMouseDown={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
          >
            {screenOptions.map((option) => (
              <option
                key={option.value}
                value={option.value}
                className="bg-black"
              >
                {option.label}
              </option>
            ))}
          </select>
          <button
            onClick={() => setShowDemoNav(false)}
            className="text-white/70 hover:text-white"
            onMouseDown={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
          >
            <EyeOff className="w-[clamp(10px,1.5vw,12px)] h-[clamp(10px,1.5vw,12px)]" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DemoNavigation;