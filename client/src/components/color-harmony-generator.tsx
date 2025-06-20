import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Copy, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useClipboard } from "@/hooks/use-clipboard";
import { hexToHsl, hslToHex } from "@/lib/color-utils";

export default function ColorHarmonyGenerator() {
  const [baseColor, setBaseColor] = useState("#3b82f6");
  const [harmonyType, setHarmonyType] = useState("complementary");
  const { toast } = useToast();
  const { copyToClipboard } = useClipboard();

  const generateHarmony = (color: string, type: string): string[] => {
    const hsl = hexToHsl(color);
    if (!hsl) return [color];

    const { h, s, l } = hsl;
    
    switch (type) {
      case "complementary":
        return [color, hslToHex((h + 180) % 360, s, l)];
      
      case "triadic":
        return [
          color,
          hslToHex((h + 120) % 360, s, l),
          hslToHex((h + 240) % 360, s, l)
        ];
      
      case "tetradic":
        return [
          color,
          hslToHex((h + 90) % 360, s, l),
          hslToHex((h + 180) % 360, s, l),
          hslToHex((h + 270) % 360, s, l)
        ];
      
      case "analogous":
        return [
          hslToHex((h - 30 + 360) % 360, s, l),
          color,
          hslToHex((h + 30) % 360, s, l),
          hslToHex((h + 60) % 360, s, l)
        ];
      
      case "split-complementary":
        return [
          color,
          hslToHex((h + 150) % 360, s, l),
          hslToHex((h + 210) % 360, s, l)
        ];
      
      case "monochromatic":
        return [
          hslToHex(h, s, Math.max(10, l - 30)),
          hslToHex(h, s, Math.max(20, l - 15)),
          color,
          hslToHex(h, s, Math.min(90, l + 15)),
          hslToHex(h, s, Math.min(100, l + 30))
        ];
      
      default:
        return [color];
    }
  };

  const harmonyColors = generateHarmony(baseColor, harmonyType);

  const handleCopyHarmony = async () => {
    const colorString = harmonyColors.join(', ');
    await copyToClipboard(colorString);
    toast({
      title: "Harmony copied!",
      description: `${harmonyType} harmony colors copied to clipboard`,
    });
  };

  const generateRandomColor = () => {
    const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
    setBaseColor(randomColor);
  };

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-0">Color Harmony Generator</h3>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={generateRandomColor}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Random
          </Button>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Base Color</label>
          <div className="flex gap-2">
            <div 
              className="w-12 h-12 rounded-lg border-2 border-gray-300 cursor-pointer"
              style={{ backgroundColor: baseColor }}
              onClick={() => {
                const input = document.createElement('input');
                input.type = 'color';
                input.value = baseColor;
                input.addEventListener('change', (e) => {
                  setBaseColor((e.target as HTMLInputElement).value);
                });
                input.click();
              }}
            />
            <input
              type="text"
              value={baseColor}
              onChange={(e) => setBaseColor(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md font-mono text-sm"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Harmony Type</label>
          <Select value={harmonyType} onValueChange={setHarmonyType}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="complementary">Complementary</SelectItem>
              <SelectItem value="triadic">Triadic</SelectItem>
              <SelectItem value="tetradic">Tetradic</SelectItem>
              <SelectItem value="analogous">Analogous</SelectItem>
              <SelectItem value="split-complementary">Split Complementary</SelectItem>
              <SelectItem value="monochromatic">Monochromatic</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex flex-wrap gap-2 justify-center">
          {harmonyColors.map((color, index) => (
            <div 
              key={index}
              className="group cursor-pointer"
              onClick={() => {
                navigator.clipboard.writeText(color);
                toast({
                  title: "Color copied!",
                  description: `${color} copied to clipboard`,
                });
              }}
            >
              <div 
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg shadow-md hover:scale-110 transition-transform"
                style={{ backgroundColor: color }}
              />
              <p className="text-xs text-center mt-1 font-mono">{color}</p>
            </div>
          ))}
        </div>
      </div>

      <Button 
        onClick={handleCopyHarmony}
        className="w-full bg-indigo-600 hover:bg-indigo-700"
      >
        <Copy className="w-4 h-4 mr-2" />
        Copy All Colors
      </Button>
    </div>
  );
}