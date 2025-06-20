import { Button } from "@/components/ui/button";
import { Palette, Play } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Discover Perfect{" "}
            <span className="gradient-bg bg-clip-text text-transparent">Colors</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Create stunning color palettes, generate beautiful gradients, and find the perfect colors for your next project with our advanced color tools.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 transform hover:scale-105 transition-all">
              <Palette className="w-5 h-5 mr-2" />
              Start Creating
            </Button>
            <Button variant="outline" size="lg" className="hover:bg-gray-50">
              <Play className="w-5 h-5 mr-2" />
              Watch Demo
            </Button>
          </div>
        </div>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-16 h-16 bg-pink-400 rounded-full opacity-20 animate-float"></div>
      <div className="absolute top-40 right-20 w-12 h-12 bg-blue-400 rounded-full opacity-20 animate-float" style={{ animationDelay: '-2s' }}></div>
      <div className="absolute bottom-32 left-1/4 w-8 h-8 bg-yellow-400 rounded-full opacity-20 animate-float" style={{ animationDelay: '-4s' }}></div>
    </section>
  );
}
