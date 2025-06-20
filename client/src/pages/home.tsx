import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import ColorPicker from "@/components/color-picker";
import GradientGenerator from "@/components/gradient-generator";
import PaletteCard from "@/components/palette-card";
import TrendingSection from "@/components/trending-section";
import FeaturesSection from "@/components/features-section";
import Footer from "@/components/footer";
import { useQuery } from "@tanstack/react-query";
import type { Palette, Gradient } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Palette as PaletteIcon, Shuffle, Plus } from "lucide-react";

export default function Home() {
  const { data: palettes = [], isLoading: palettesLoading } = useQuery<Palette[]>({
    queryKey: ['/api/palettes'],
  });

  const { data: gradients = [], isLoading: gradientsLoading } = useQuery<Gradient[]>({
    queryKey: ['/api/gradients'],
  });

  return (
    <div className="min-h-screen bg-background font-sans">
      <Navigation />
      <HeroSection />
      
      {/* Featured Tools Section */}
      <section id="tools" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Powerful Color Tools</h2>
            <p className="text-xl text-gray-600">Everything you need to work with colors professionally</p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <ColorPicker />
            
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Advanced Color Picker</h3>
                <p className="text-gray-600 mb-6">
                  Pick colors with precision using our interactive color wheel. Get instant color codes in HEX, RGB, HSL, and more formats.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    <span className="text-gray-700">Multiple color format support</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    <span className="text-gray-700">Real-time color preview</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    <span className="text-gray-700">One-click copy to clipboard</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    <span className="text-gray-700">Color accessibility checker</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gradient Generator Section */}
      <section id="gradients" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Gradient Generator</h2>
            <p className="text-xl text-gray-600">Create beautiful gradients with full control over colors and direction</p>
          </div>
          
          <GradientGenerator />
        </div>
      </section>

      {/* Color Palettes Section */}
      <section id="palettes" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-16">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Beautiful Color Palettes</h2>
              <p className="text-xl text-gray-600">Curated collections of harmonious colors for your projects</p>
            </div>
            <div className="flex gap-4">
              <Button className="bg-indigo-600 hover:bg-indigo-700">
                <Plus className="w-4 h-4 mr-2" />
                Create New
              </Button>
              <Button variant="outline">
                <Shuffle className="w-4 h-4 mr-2" />
                Generate Random
              </Button>
            </div>
          </div>
          
          {palettesLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-gray-50 rounded-xl p-6 animate-pulse">
                  <div className="w-full h-32 bg-gray-200 rounded-lg mb-4"></div>
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, j) => (
                      <div key={j} className="w-12 h-12 bg-gray-200 first:rounded-l-lg last:rounded-r-lg"></div>
                    ))}
                  </div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {palettes.map((palette) => (
                <PaletteCard key={palette.id} palette={palette} />
              ))}
            </div>
          )}
          
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Load More Palettes
            </Button>
          </div>
        </div>
      </section>

      <TrendingSection />
      <FeaturesSection />
      <Footer />
    </div>
  );
}
