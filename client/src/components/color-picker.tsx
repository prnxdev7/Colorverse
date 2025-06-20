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
    <div className="bg-gray-50 rounded-2xl p-8">
      <div className="flex items-center justify-center mb-8">
        <div className="relative">
          <div className="w-48 h-48 rounded-full color-picker-wheel p-4">
            <div 
              className="w-full h-full rounded-full border-4 border-white shadow-lg flex items-center justify-center"
              style={{ backgroundColor: selectedColor }}
            >
              <div className="w-4 h-4 bg-white rounded-full border-2 border-gray-300 shadow-lg"></div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg">
          <Label className="block text-sm font-medium text-gray-700 mb-2">HEX</Label>
          <Input 
            type="text" 
            value={selectedColor} 
            onChange={(e) => setSelectedColor(e.target.value)}
            className="text-center font-mono"
          />
        </div>
        <div className="bg-white p-4 rounded-lg">
          <Label className="block text-sm font-medium text-gray-700 mb-2">RGB</Label>
          <Input 
            type="text" 
            value={rgb ? `${rgb.r}, ${rgb.g}, ${rgb.b}` : "Invalid"} 
            readOnly
            className="text-center font-mono"
          />
        </div>
        <div className="bg-white p-4 rounded-lg">
          <Label className="block text-sm font-medium text-gray-700 mb-2">HSL</Label>
          <Input 
            type="text" 
            value={hsl ? `${hsl.h}°, ${hsl.s}%, ${hsl.l}%` : "Invalid"} 
            readOnly
            className="text-center font-mono"
          />
        </div>
      </div>
      
      <Button 
        onClick={handleCopyColor}
        className="w-full bg-indigo-600 hover:bg-indigo-700"
      >
        <Copy className="w-4 h-4 mr-2" />
        Copy Color Code
      </Button>
    </div>
  );
}
