import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy } from "lucide-react";
import { useClipboard } from "@/hooks/use-clipboard";
import { useToast } from "@/hooks/use-toast";
import { hexToRgb, hexToHsl, rgbToHex, hslToHex } from "@/lib/color-utils";

export default function ColorPicker() {
  const [selectedColor, setSelectedColor] = useState("#FF5733");
  const { copyToClipboard } = useClipboard();
  const { toast } = useToast();

  const rgb = hexToRgb(selectedColor);
  const hsl = hexToHsl(selectedColor);

  const handleCopyColor = async () => {
    await copyToClipboard(selectedColor);
    toast({
      title: "Color copied!",
      description: `${selectedColor} copied to clipboard`,
    });
  };

  return (
    <div className="bg-gradient-to-br from-white via-gray-50 to-indigo-50 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl border border-white/50 backdrop-blur-sm">
      <div className="flex items-center justify-center mb-8 sm:mb-10">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-full blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
          <div className="relative w-36 h-36 sm:w-44 sm:h-44 lg:w-52 lg:h-52 rounded-full p-1 bg-gradient-to-br from-white via-purple-50 to-blue-50 shadow-2xl">
            <input
              type="color"
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
              className="w-full h-full rounded-full border-4 border-white shadow-xl cursor-pointer appearance-none transform hover:scale-105 transition-all duration-300"
              style={{ backgroundColor: selectedColor }}
            />
          </div>
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-transparent via-white/10 to-transparent pointer-events-none"></div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8">
        <div className="bg-white/80 backdrop-blur-sm p-4 sm:p-5 rounded-2xl shadow-lg border border-white/40 hover:shadow-xl transition-all duration-300 group">
          <Label className="block text-sm font-semibold text-gray-800 mb-3 font-display">HEX</Label>
          <Input 
            type="text" 
            value={selectedColor} 
            onChange={(e) => setSelectedColor(e.target.value)}
            className="text-center font-mono text-sm bg-gray-50/80 border-gray-200/50 rounded-xl focus:ring-2 focus:ring-purple-500/20 transition-all group-hover:border-purple-300"
          />
        </div>
        <div className="bg-white/80 backdrop-blur-sm p-4 sm:p-5 rounded-2xl shadow-lg border border-white/40 hover:shadow-xl transition-all duration-300 group">
          <Label className="block text-sm font-semibold text-gray-800 mb-3 font-display">RGB</Label>
          <Input 
            type="text" 
            value={rgb ? `${rgb.r}, ${rgb.g}, ${rgb.b}` : "Invalid"} 
            readOnly
            className="text-center font-mono text-sm bg-gray-50/80 border-gray-200/50 rounded-xl cursor-not-allowed"
          />
        </div>
        <div className="bg-white/80 backdrop-blur-sm p-4 sm:p-5 rounded-2xl shadow-lg border border-white/40 hover:shadow-xl transition-all duration-300 group">
          <Label className="block text-sm font-semibold text-gray-800 mb-3 font-display">HSL</Label>
          <Input 
            type="text" 
            value={hsl ? `${Math.round(hsl.h)}°, ${Math.round(hsl.s)}%, ${Math.round(hsl.l)}%` : "Invalid"} 
            readOnly
            className="text-center font-mono text-sm bg-gray-50/80 border-gray-200/50 rounded-xl cursor-not-allowed"
          />
        </div>
      </div>
      
      <Button 
        onClick={handleCopyColor}
        className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 hover:from-purple-700 hover:via-pink-700 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 font-display"
      >
        <Copy className="w-5 h-5 mr-2" />
        Copy Color Code
      </Button>
    </div>
  );
}
