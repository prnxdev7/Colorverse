import { useState } from "react";

interface Gradient {
  id: number;
  name: string;
  description: string;
  colors: { color: string; position: number }[];
  direction: number;
  type: string;
  usageCount: number;
  isTrending: boolean;
}

export default function TrendingSection() {
  const [trendingGradients] = useState<Gradient[]>([
    {
      id: 1,
      name: "Sunset Glow",
      description: "Warm gradient from pink to yellow",
      colors: [
        { color: "#ec4899", position: 0 },
        { color: "#ef4444", position: 50 },
        { color: "#eab308", position: 100 }
      ],
      direction: 135,
      type: "linear",
      usageCount: 89,
      isTrending: true
    },
    {
      id: 2,
      name: "Ocean Depth",
      description: "Cool blue to green gradient",
      colors: [
        { color: "#4ade80", position: 0 },
        { color: "#3b82f6", position: 100 }
      ],
      direction: 45,
      type: "linear",
      usageCount: 76,
      isTrending: true
    },
    {
      id: 3,
      name: "Cotton Candy",
      description: "Soft purple to pink gradient",
      colors: [
        { color: "#a855f7", position: 0 },
        { color: "#ec4899", position: 50 },
        { color: "#ef4444", position: 100 }
      ],
      direction: 90,
      type: "linear",
      usageCount: 63,
      isTrending: true
    },
    {
      id: 4,
      name: "Dark Matter",
      description: "Deep black gradient with subtle variations",
      colors: [
        { color: "#374151", position: 0 },
        { color: "#111827", position: 50 },
        { color: "#000000", position: 100 }
      ],
      direction: 180,
      type: "linear",
      usageCount: 52,
      isTrending: true
    }
  ]);

  const colorTrends = [
    { name: "Indigo", color: "#6366f1", percentage: 85 },
    { name: "Pink", color: "#ec4899", percentage: 72 },
    { name: "Green", color: "#10b981", percentage: 68 },
    { name: "Blue", color: "#3b82f6", percentage: 61 },
    { name: "Purple", color: "#8b5cf6", percentage: 54 },
  ];

  const generateGradientStyle = (gradient: Gradient) => {
    const stops = gradient.colors
      .map(stop => `${stop.color} ${stop.position}%`)
      .join(", ");
    
    if (gradient.type === "linear") {
      return `linear-gradient(${gradient.direction}deg, ${stops})`;
    }
    return `radial-gradient(circle, ${stops})`;
  };

  return (
    <section id="trends" className="py-12 sm:py-20 bg-gradient-to-br from-purple-50 to-indigo-50">
      <div className="max-w-7xl mx-auto mobile-optimized">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">Trending Colors & Gradients</h2>
          <p className="text-lg sm:text-xl text-gray-600 px-4">Popular color combinations used by designers worldwide</p>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
          {trendingGradients.map((gradient) => (
            <div key={gradient.id} className="group cursor-pointer">
              <div 
                className="h-24 sm:h-32 rounded-xl mb-3 sm:mb-4 group-hover:scale-105 transition-transform"
                style={{ background: generateGradientStyle(gradient) }}
                onClick={() => {
                  const css = `background: ${generateGradientStyle(gradient)};`;
                  navigator.clipboard.writeText(css);
                }}
              ></div>
              <h4 className="font-medium text-gray-900 text-sm sm:text-base">{gradient.name}</h4>
              <p className="text-xs sm:text-sm text-gray-600">Used {gradient.usageCount || 0} times this week</p>
            </div>
          ))}
        </div>
        
        {/* Color Trends Chart */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 space-y-4 sm:space-y-0">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900">Color Usage Trends</h3>
            <div className="flex gap-2">
              <button className="text-xs sm:text-sm text-gray-600 hover:text-indigo-600 px-2 sm:px-3 py-1 rounded bg-gray-100">7D</button>
              <button className="text-xs sm:text-sm text-white bg-indigo-600 px-2 sm:px-3 py-1 rounded">30D</button>
              <button className="text-xs sm:text-sm text-gray-600 hover:text-indigo-600 px-2 sm:px-3 py-1 rounded bg-gray-100">90D</button>
            </div>
          </div>
          
          <div className="space-y-3 sm:space-y-4">
            {colorTrends.map((trend) => (
              <div key={trend.name} className="flex items-center justify-between">
                <div className="flex items-center space-x-2 sm:space-x-3 min-w-0">
                  <div 
                    className="w-3 h-3 sm:w-4 sm:h-4 rounded flex-shrink-0"
                    style={{ backgroundColor: trend.color }}
                  ></div>
                  <span className="text-gray-700 text-sm sm:text-base truncate">{trend.name}</span>
                </div>
                <div className="flex-1 mx-2 sm:mx-4 min-w-0">
                  <div className="bg-gray-200 rounded-full h-1.5 sm:h-2">
                    <div 
                      className="h-1.5 sm:h-2 rounded-full transition-all duration-1000"
                      style={{ 
                        backgroundColor: trend.color,
                        width: `${trend.percentage}%`
                      }}
                    ></div>
                  </div>
                </div>
                <span className="text-xs sm:text-sm text-gray-600 flex-shrink-0">{trend.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
