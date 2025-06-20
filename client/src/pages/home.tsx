import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import ColorPicker from "@/components/color-picker";
import GradientGenerator from "@/components/gradient-generator";
import ColorHarmonyGenerator from "@/components/color-harmony-generator";
import AccessibilityChecker from "@/components/accessibility-checker";
import ImageColorExtractor from "@/components/image-color-extractor";
import ColorConverter from "@/components/color-converter";
import PaletteGenerator from "@/components/palette-generator";
import PaletteCard from "@/components/palette-card";
import TrendingSection from "@/components/trending-section";
import FeaturesSection from "@/components/features-section";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Palette as PaletteIcon, Shuffle, Plus } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [palettes] = useState([
    {
      id: 1,
      name: "Modern Minimalist",
      description: "Clean and sophisticated grayscale palette",
      colors: ["#1a1a1a", "#666666", "#999999", "#cccccc", "#ffffff"],
      tags: ["minimal", "grayscale", "clean"],
      usageCount: 45,
      isTrending: true
    },
    {
      id: 2,
      name: "Ocean Breeze",
      description: "Calming blue tones inspired by the sea",
      colors: ["#1e3a8a", "#2563eb", "#60a5fa", "#67e8f9", "#ecfeff"],
      tags: ["blue", "ocean", "calming"],
      usageCount: 32,
      isTrending: false
    },
    {
      id: 3,
      name: "Sunset Warmth",
      description: "Vibrant warm colors of golden hour",
      colors: ["#ea580c", "#fb923c", "#fde047", "#f472b6", "#a855f7"],
      tags: ["warm", "sunset", "vibrant"],
      usageCount: 28,
      isTrending: true
    },
    {
      id: 4,
      name: "Forest Fresh",
      description: "Natural green tones from nature",
      colors: ["#166534", "#16a34a", "#4ade80", "#bef264", "#f7fee7"],
      tags: ["green", "nature", "fresh"],
      usageCount: 21,
      isTrending: false
    },
    {
      id: 5,
      name: "Royal Purple",
      description: "Luxurious purple shades for elegance",
      colors: ["#581c87", "#7c3aed", "#a855f7", "#c084fc", "#f3e8ff"],
      tags: ["purple", "luxury", "elegant"],
      usageCount: 19,
      isTrending: false
    },
    {
      id: 6,
      name: "Autumn Vibes",
      description: "Warm fall colors with earthy tones",
      colors: ["#b91c1c", "#ea580c", "#eab308", "#f59e0b", "#fef3c7"],
      tags: ["autumn", "warm", "earthy"],
      usageCount: 15,
      isTrending: false
    }
  ]);

  return (
    <div className="min-h-screen bg-background font-sans">
      <Navigation />
      <HeroSection />
      
      {/* Featured Tools Section */}
      <section id="tools" className="py-12 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto mobile-optimized">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">Professional Color Tools</h2>
            <p className="text-lg sm:text-xl text-gray-600 px-4">Complete toolkit for designers, developers, and creatives</p>
          </div>
          
          <Tabs defaultValue="picker" className="w-full">
            <TabsList className="grid grid-cols-3 lg:grid-cols-6 w-full mb-8">
              <TabsTrigger value="picker" className="text-xs sm:text-sm">Color Picker</TabsTrigger>
              <TabsTrigger value="harmony" className="text-xs sm:text-sm">Harmony</TabsTrigger>
              <TabsTrigger value="accessibility" className="text-xs sm:text-sm">Accessibility</TabsTrigger>
              <TabsTrigger value="extractor" className="text-xs sm:text-sm">Image Extract</TabsTrigger>
              <TabsTrigger value="converter" className="text-xs sm:text-sm">Converter</TabsTrigger>
              <TabsTrigger value="generator" className="text-xs sm:text-sm">AI Generator</TabsTrigger>
            </TabsList>
            
            <TabsContent value="picker">
              <ColorPicker />
            </TabsContent>
            
            <TabsContent value="harmony">
              <ColorHarmonyGenerator />
            </TabsContent>
            
            <TabsContent value="accessibility">
              <AccessibilityChecker />
            </TabsContent>
            
            <TabsContent value="extractor">
              <ImageColorExtractor />
            </TabsContent>
            
            <TabsContent value="converter">
              <ColorConverter />
            </TabsContent>
            
            <TabsContent value="generator">
              <PaletteGenerator />
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Gradient Generator Section */}
      <section id="gradients" className="py-12 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto mobile-optimized">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">Gradient Generator</h2>
            <p className="text-lg sm:text-xl text-gray-600 px-4">Create beautiful gradients with full control over colors and direction</p>
          </div>
          
          <GradientGenerator />
        </div>
      </section>

      {/* Color Palettes Section */}
      <section id="palettes" className="py-12 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto mobile-optimized">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-12 sm:mb-16 space-y-6 sm:space-y-0">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">Beautiful Color Palettes</h2>
              <p className="text-lg sm:text-xl text-gray-600">Curated collections of harmonious colors for your projects</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-sm sm:text-base">
                <Plus className="w-4 h-4 mr-2" />
                Create New
              </Button>
              <Button variant="outline" className="text-sm sm:text-base">
                <Shuffle className="w-4 h-4 mr-2" />
                Generate Random
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {palettes.map((palette) => (
              <PaletteCard key={palette.id} palette={palette} />
            ))}
          </div>
          
          <div className="text-center mt-8 sm:mt-12">
            <Button variant="outline" size="lg" className="text-sm sm:text-base">
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
