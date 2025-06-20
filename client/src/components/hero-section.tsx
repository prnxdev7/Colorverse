import { Button } from "@/components/ui/button";
import { Palette, Play } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-violet-100 via-pink-50 to-blue-100 py-16 sm:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto mobile-optimized relative z-10">
        <div className="text-center hero-glow">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight font-display">
            <span className="block mb-3 sm:mb-4">Discover Perfect</span>
            <span className="animated-colors block transform hover:scale-105 transition-transform duration-300">
              ColorVerse
            </span>
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-700 mb-8 sm:mb-10 max-w-3xl mx-auto px-4 leading-relaxed font-display">
            Create stunning color palettes, generate beautiful gradients, and find the perfect colors for your next project with our professional-grade color tools.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center px-4">
            <Button size="lg" className="bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 hover:from-purple-700 hover:via-pink-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-300 text-sm sm:text-base shadow-xl hover:shadow-2xl rounded-2xl font-display font-semibold px-8 py-4">
              <Palette className="w-5 h-5 sm:w-6 sm:h-6 mr-3" />
              Start Creating
            </Button>
            <Button variant="outline" size="lg" className="hover:bg-white/90 border-2 border-purple-200 hover:border-purple-300 text-purple-700 text-sm sm:text-base transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl rounded-2xl font-display font-semibold px-8 py-4 bg-white/80 backdrop-blur-sm">
              <Play className="w-5 h-5 sm:w-6 sm:h-6 mr-3" />
              Watch Demo
            </Button>
          </div>
        </div>
      </div>
      
      {/* Enhanced Floating Elements */}
      <div className="hidden sm:block absolute top-20 left-10 w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-pink-400 to-red-400 rounded-full opacity-30 animate-float blur-sm"></div>
      <div className="hidden sm:block absolute top-40 right-20 w-8 h-8 lg:w-12 lg:h-12 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-full opacity-30 animate-float blur-sm" style={{ animationDelay: '-2s' }}></div>
      <div className="hidden sm:block absolute bottom-32 left-1/4 w-6 h-6 lg:w-8 lg:h-8 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full opacity-30 animate-float blur-sm" style={{ animationDelay: '-4s' }}></div>
      <div className="hidden lg:block absolute top-60 right-1/4 w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-400 rounded-full opacity-25 animate-float blur-sm" style={{ animationDelay: '-1s' }}></div>
      <div className="hidden lg:block absolute bottom-20 right-10 w-14 h-14 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-25 animate-float blur-sm" style={{ animationDelay: '-3s' }}></div>
    </section>
  );
}
