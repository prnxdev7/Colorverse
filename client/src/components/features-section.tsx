import { Palette, Code, Heart, Eye, Smartphone, Users } from "lucide-react";

export default function FeaturesSection() {
  const features = [
    {
      icon: Palette,
      title: "Advanced Color Tools",
      description: "Professional color picker, palette generator, and harmony tools for precise color selection.",
      color: "indigo"
    },
    {
      icon: Code,
      title: "Export Ready Code",
      description: "Get CSS, SCSS, and other format code instantly. Copy and paste directly into your projects.",
      color: "green"
    },
    {
      icon: Heart,
      title: "Save Favorites",
      description: "Build your personal color library and access your favorite palettes anywhere, anytime.",
      color: "pink"
    },
    {
      icon: Eye,
      title: "Accessibility Check",
      description: "Ensure your colors meet WCAG guidelines with built-in contrast ratio checking.",
      color: "purple"
    },
    {
      icon: Smartphone,
      title: "Mobile Optimized",
      description: "Access all tools on any device with our responsive design and touch-friendly interface.",
      color: "yellow"
    },
    {
      icon: Users,
      title: "Community Driven",
      description: "Share palettes with the community and discover trending colors from designers worldwide.",
      color: "blue"
    }
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      indigo: "bg-indigo-100 group-hover:bg-indigo-200 text-indigo-600",
      green: "bg-green-100 group-hover:bg-green-200 text-green-600",
      pink: "bg-pink-100 group-hover:bg-pink-200 text-pink-600",
      purple: "bg-purple-100 group-hover:bg-purple-200 text-purple-600",
      yellow: "bg-yellow-100 group-hover:bg-yellow-200 text-yellow-600",
      blue: "bg-blue-100 group-hover:bg-blue-200 text-blue-600"
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.indigo;
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose ColorCraft?</h2>
          <p className="text-xl text-gray-600">Professional-grade tools for designers and developers</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center group">
              <div className={`w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4 transition-colors ${getColorClasses(feature.color)}`}>
                <feature.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
