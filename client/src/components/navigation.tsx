import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg gradient-bg"></div>
            <span className="text-xl font-bold text-gray-900 font-display">ColorVerse</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('palettes')}
              className="text-gray-600 hover:text-indigo-600 transition-colors"
            >
              Palettes
            </button>
            <button 
              onClick={() => scrollToSection('gradients')}
              className="text-gray-600 hover:text-indigo-600 transition-colors"
            >
              Gradients
            </button>
            <button 
              onClick={() => scrollToSection('tools')}
              className="text-gray-600 hover:text-indigo-600 transition-colors"
            >
              Tools
            </button>
            <button 
              onClick={() => scrollToSection('trends')}
              className="text-gray-600 hover:text-indigo-600 transition-colors"
            >
              Trends
            </button>
            <Button className="bg-indigo-600 hover:bg-indigo-700">
              Sign Up
            </Button>
          </div>
          
          <button 
            className="md:hidden text-gray-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
        
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-4">
              <button 
                onClick={() => { scrollToSection('palettes'); setIsMenuOpen(false); }}
                className="text-gray-600 hover:text-indigo-600 transition-colors text-left"
              >
                Palettes
              </button>
              <button 
                onClick={() => { scrollToSection('gradients'); setIsMenuOpen(false); }}
                className="text-gray-600 hover:text-indigo-600 transition-colors text-left"
              >
                Gradients
              </button>
              <button 
                onClick={() => { scrollToSection('tools'); setIsMenuOpen(false); }}
                className="text-gray-600 hover:text-indigo-600 transition-colors text-left"
              >
                Tools
              </button>
              <button 
                onClick={() => { scrollToSection('trends'); setIsMenuOpen(false); }}
                className="text-gray-600 hover:text-indigo-600 transition-colors text-left"
              >
                Trends
              </button>
              <Button className="bg-indigo-600 hover:bg-indigo-700 w-fit">
                Sign Up
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
