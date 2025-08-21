import { useRef, useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Car,
  Zap,
  Fuel,
  Wrench,
  Star,
  Crown,
} from "lucide-react";

export default function MotorCategory() {
  const scrollRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  // Motor categories with real images and fallback icons
  const motorCategories = [
    {
      label: "Electric",
      color: "bg-blue-100",
      iconColor: "text-blue-600",
      icon: Zap,
      image:
        "https://images.unsplash.com/photo-1593941707882-a5bac6861d75?w=200&h=200&fit=crop&crop=center",
    },
    {
      label: "Petrol",
      color: "bg-green-100",
      iconColor: "text-green-600",
      icon: Fuel,
      image:
        "https://images.unsplash.com/photo-1494976688153-c817d9c3a46d?w=200&h=200&fit=crop&crop=center",
    },
    {
      label: "Hybrid",
      color: "bg-purple-100",
      iconColor: "text-purple-600",
      icon: Car,
      image:
        "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=200&h=200&fit=crop&crop=center",
    },
    {
      label: "Diesel",
      color: "bg-orange-100",
      iconColor: "text-orange-600",
      icon: Fuel,
      image:
        "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=200&h=200&fit=crop&crop=center",
    },
    {
      label: "Sports",
      color: "bg-red-100",
      iconColor: "text-red-600",
      icon: Star,
      image:
        "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=200&h=200&fit=crop&crop=center",
    },
    {
      label: "Luxury",
      color: "bg-yellow-100",
      iconColor: "text-yellow-600",
      icon: Crown,
      image:
        "https://images.unsplash.com/photo-1563720223185-11003d516935?w=200&h=200&fit=crop&crop=center",
    },
    {
      label: "SUV",
      color: "bg-indigo-100",
      iconColor: "text-indigo-600",
      icon: Car,
      image:
        "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=200&h=200&fit=crop&crop=center",
    },
    {
      label: "Sedan",
      color: "bg-pink-100",
      iconColor: "text-pink-600",
      icon: Car,
      image:
        "https://images.unsplash.com/photo-1550355291-bbee04a92027?w=200&h=200&fit=crop&crop=center",
    },
    {
      label: "Pickup",
      color: "bg-gray-100",
      iconColor: "text-gray-600",
      icon: Wrench,
      image:
        "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=200&h=200&fit=crop&crop=center",
    },
    {
      label: "Motorcycle",
      color: "bg-teal-100",
      iconColor: "text-teal-600",
      icon: Star,
      image:
        "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=200&h=200&fit=crop&crop=center",
    },
  ];

  const itemsPerPage = 4;
  const itemWidth = 108; // 96px (w-24) + 12px (gap)
  const totalPages = Math.ceil(motorCategories.length / itemsPerPage);

  const scrollCategories = (direction) => {
    if (!scrollRef.current) return;

    const scrollAmount = 312; // Approximate width of 4 items + gaps
    const newScrollLeft =
      direction === "left"
        ? scrollRef.current.scrollLeft - scrollAmount
        : scrollRef.current.scrollLeft + scrollAmount;

    scrollRef.current.scrollTo({
      left: newScrollLeft,
      behavior: "smooth",
    });
  };

  const goToPage = (pageIndex) => {
    if (!scrollRef.current) return;

    const scrollAmount = 312 * pageIndex;
    scrollRef.current.scrollTo({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  const handleScroll = () => {
    if (!scrollRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    const maxScrollLeft = scrollWidth - clientWidth;

    setShowLeftArrow(scrollLeft > 10);
    setShowRightArrow(scrollLeft < maxScrollLeft - 10);

    // Calculate current page
    const itemWidth = 312; // Approximate width including gaps
    const page = Math.round(scrollLeft / itemWidth);
    setCurrentPage(Math.min(page, totalPages - 1));
  };

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener("scroll", handleScroll);
      handleScroll(); // Initial check
      return () => scrollElement.removeEventListener("scroll", handleScroll);
    }
  }, []);

  return (
    <div className="px-4 mb-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Motor Categories
        </h3>
        <button className="text-purple-500 font-medium hover:text-purple-600 transition-colors">
          View All
        </button>
      </div>

      {/* Categories Container with Navigation */}
      <div className="relative group">
        {/* Scrollable Categories */}
        <div
          ref={scrollRef}
          className="flex space-x-3 overflow-x-auto pb-2 scrollbar-hide scroll-smooth"
          style={{
            scrollbarWidth: "none" /* Firefox */,
            msOverflowStyle: "none" /* Internet Explorer 10+ */,
          }}
        >
          {motorCategories.map((category, idx) => (
            <button
              key={idx}
              className={`flex-shrink-0 w-24 h-24 ${category.color} rounded-2xl flex flex-col items-center justify-center space-y-2 transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50`}
            >
              <div
                className={`w-8 h-8 ${category.color} rounded-xl flex items-center justify-center`}
              >
                <category.icon className={`w-5 h-5 ${category.iconColor}`} />
              </div>
              <span className="text-xs font-medium text-gray-700">
                {category.label}
              </span>
            </button>
          ))}
        </div>

        {/* Left Arrow */}
        {showLeftArrow && (
          <button
            onClick={() => scrollCategories("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 z-10 
                       bg-white border border-gray-200 p-2 rounded-full shadow-lg 
                       opacity-0 group-hover:opacity-100 transition-all duration-300 
                       hover:bg-gray-50 hover:shadow-xl hover:border-gray-300
                       focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
            aria-label="Previous categories"
          >
            <ChevronLeft className="w-4 h-4 text-gray-700" />
          </button>
        )}

        {/* Right Arrow */}
        {showRightArrow && (
          <button
            onClick={() => scrollCategories("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 z-10 
                       bg-white border border-gray-200 p-2 rounded-full shadow-lg 
                       opacity-0 group-hover:opacity-100 transition-all duration-300 
                       hover:bg-gray-50 hover:shadow-xl hover:border-gray-300
                       focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
            aria-label="Next categories"
          >
            <ChevronRight className="w-4 h-4 text-gray-700" />
          </button>
        )}

        {/* Subtle gradient overlays */}
        <div
          className={`absolute left-0 top-0 bottom-2 w-6 bg-gradient-to-r from-white via-white/80 to-transparent pointer-events-none transition-opacity duration-300 ${
            showLeftArrow ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          className={`absolute right-0 top-0 bottom-2 w-6 bg-gradient-to-l from-white via-white/80 to-transparent pointer-events-none transition-opacity duration-300 ${
            showRightArrow ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>

      {/* Page Indicators */}
      <div className="flex justify-center space-x-2 mt-4">
        {Array.from({ length: totalPages }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => goToPage(idx)}
            className={`h-1 rounded-full transition-all duration-300 cursor-pointer hover:bg-opacity-80 ${
              currentPage === idx
                ? "w-8 bg-purple-500 shadow-sm"
                : "w-2 bg-gray-300 hover:bg-gray-400"
            }`}
            aria-label={`Go to page ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
