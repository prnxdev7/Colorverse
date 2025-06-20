import { useQuery } from "@tanstack/react-query";
import type { Gradient } from "@shared/schema";

export default function TrendingSection() {
  const { data: trendingGradients = [] } = useQuery<Gradient[]>({
    queryKey: ['/api/gradients/trending'],
  });

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
    <section id="trends" className="py-20 bg-gradient-to-br from-purple-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Trending Colors & Gradients</h2>
          <p className="text-xl text-gray-600">Popular color combinations used by designers worldwide</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {trendingGradients.map((gradient) => (
            <div key={gradient.id} className="group cursor-pointer">
              <div 
                className="h-32 rounded-xl mb-4 group-hover:scale-105 transition-transform"
                style={{ background: generateGradientStyle(gradient) }}
              ></div>
              <h4 className="font-medium text-gray-900">{gradient.name}</h4>
              <p className="text-sm text-gray-600">Used {gradient.usageCount || 0} times this week</p>
            </div>
          ))}
        </div>
        
        {/* Color Trends Chart */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">Color Usage Trends</h3>
            <div className="flex gap-2">
              <button className="text-sm text-gray-600 hover:text-indigo-600 px-3 py-1 rounded bg-gray-100">7D</button>
              <button className="text-sm text-white bg-indigo-600 px-3 py-1 rounded">30D</button>
              <button className="text-sm text-gray-600 hover:text-indigo-600 px-3 py-1 rounded bg-gray-100">90D</button>
            </div>
          </div>
          
          <div className="space-y-4">
            {colorTrends.map((trend) => (
              <div key={trend.name} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-4 h-4 rounded"
                    style={{ backgroundColor: trend.color }}
                  ></div>
                  <span className="text-gray-700">{trend.name}</span>
                </div>
                <div className="flex-1 mx-4">
                  <div className="bg-gray-200 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full transition-all duration-1000"
                      style={{ 
                        backgroundColor: trend.color,
                        width: `${trend.percentage}%`
                      }}
                    ></div>
                  </div>
                </div>
                <span className="text-sm text-gray-600">{trend.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
