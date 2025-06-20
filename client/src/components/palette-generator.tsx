import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RefreshCw, Copy, Download, Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useClipboard } from "@/hooks/use-clipboard";
import { hexToHsl, hslToHex } from "@/lib/color-utils";

export default function PaletteGenerator() {
  const [generatedPalette, setGeneratedPalette] = useState<string[]>([]);
  const [paletteTheme, setPaletteTheme] = useState("random");
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();
  const { copyToClipboard } = useClipboard();

  const themes = {
    random: "Random Colors",
    warm: "Warm Tones",
    cool: "Cool Tones",
    monochromatic: "Monochromatic",
    analogous: "Analogous",
    complementary: "Complementary",
    vintage: "Vintage",
    modern: "Modern",
    nature: "Nature Inspired",
    sunset: "Sunset",
    ocean: "Ocean",
    forest: "Forest"
  };

  const generatePalette = () => {
    setIsGenerating(true);
    setTimeout(() => {
      let colors: string[] = [];
      
      switch (paletteTheme) {
        case "warm":
          colors = generateWarmPalette();
          break;
        case "cool":
          colors = generateCoolPalette();
          break;
        case "monochromatic":
          colors = generateMonochromaticPalette();
          break;
        case "analogous":
          colors = generateAnalogousPalette();
          break;
        case "complementary":
          colors = generateComplementaryPalette();
          break;
        case "vintage":
          colors = generateVintagePalette();
          break;
        case "modern":
          colors = generateModernPalette();
          break;
        case "nature":
          colors = generateNaturePalette();
          break;
        case "sunset":
          colors = generateSunsetPalette();
          break;
        case "ocean":
          colors = generateOceanPalette();
          break;
        case "forest":
          colors = generateForestPalette();
          break;
        default:
          colors = generateRandomPalette();
      }
      
      setGeneratedPalette(colors);
      setIsGenerating(false);
    }, 500);
  };

  const generateRandomPalette = (): string[] => {
    return Array.from({ length: 5 }, () => 
      '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0')
    );
  };

  const generateWarmPalette = (): string[] => {
    const baseHues = [0, 30, 60, 15, 45]; // Reds, oranges, yellows
    return baseHues.map(hue => {
      const saturation = 60 + Math.random() * 30;
      const lightness = 45 + Math.random() * 30;
      return hslToHex(hue, saturation, lightness);
    });
  };

  const generateCoolPalette = (): string[] => {
    const baseHues = [180, 210, 240, 270, 200]; // Blues, greens, purples
    return baseHues.map(hue => {
      const saturation = 50 + Math.random() * 40;
      const lightness = 40 + Math.random() * 35;
      return hslToHex(hue, saturation, lightness);
    });
  };

  const generateMonochromaticPalette = (): string[] => {
    const baseHue = Math.random() * 360;
    const baseSaturation = 60 + Math.random() * 30;
    const lightnesses = [20, 35, 50, 65, 80];
    return lightnesses.map(lightness => 
      hslToHex(baseHue, baseSaturation, lightness)
    );
  };

  const generateAnalogousPalette = (): string[] => {
    const baseHue = Math.random() * 360;
    const hues = [baseHue - 30, baseHue - 15, baseHue, baseHue + 15, baseHue + 30];
    return hues.map(hue => {
      const saturation = 60 + Math.random() * 25;
      const lightness = 45 + Math.random() * 25;
      return hslToHex((hue + 360) % 360, saturation, lightness);
    });
  };

  const generateComplementaryPalette = (): string[] => {
    const baseHue = Math.random() * 360;
    const complementHue = (baseHue + 180) % 360;
    return [
      hslToHex(baseHue, 70, 30),
      hslToHex(baseHue, 60, 50),
      hslToHex(baseHue, 50, 70),
      hslToHex(complementHue, 60, 50),
      hslToHex(complementHue, 70, 30)
    ];
  };

  const generateVintagePalette = (): string[] => {
    const vintageColors = [
      "#8B4513", "#A0522D", "#CD853F", "#DEB887", "#F5DEB3",
      "#D2691E", "#BC8F8F", "#F4A460", "#DAA520", "#B8860B"
    ];
    return shuffleArray(vintageColors).slice(0, 5);
  };

  const generateModernPalette = (): string[] => {
    const modernColors = [
      "#2563eb", "#7c3aed", "#dc2626", "#059669", "#ea580c",
      "#6366f1", "#8b5cf6", "#ef4444", "#10b981", "#f59e0b"
    ];
    return shuffleArray(modernColors).slice(0, 5);
  };

  const generateNaturePalette = (): string[] => {
    const natureColors = [
      "#228B22", "#32CD32", "#90EE90", "#8FBC8F", "#556B2F",
      "#9ACD32", "#ADFF2F", "#00FF7F", "#2E8B57", "#3CB371"
    ];
    return shuffleArray(natureColors).slice(0, 5);
  };

  const generateSunsetPalette = (): string[] => {
    return ["#FF4500", "#FF6347", "#FFD700", "#FFA500", "#DC143C"];
  };

  const generateOceanPalette = (): string[] => {
    return ["#006994", "#0892D0", "#00BFFF", "#87CEEB", "#E0F6FF"];
  };

  const generateForestPalette = (): string[] => {
    return ["#013220", "#228B22", "#32CD32", "#90EE90", "#F0FFF0"];
  };

  const shuffleArray = (array: string[]): string[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const handleCopyPalette = async () => {
    const colorString = generatedPalette.join(', ');
    await copyToClipboard(colorString);
    toast({
      title: "Palette copied!",
      description: "All colors copied to clipboard",
    });
  };

  const downloadPalette = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 1000;
    canvas.height = 200;

    const colorWidth = canvas.width / generatedPalette.length;
    
    generatedPalette.forEach((color, index) => {
      ctx.fillStyle = color;
      ctx.fillRect(index * colorWidth, 0, colorWidth, canvas.height);
      
      // Add color text
      ctx.fillStyle = '#ffffff';
      ctx.font = '16px Arial';
      ctx.textAlign = 'center';
      ctx.shadowColor = 'rgba(0,0,0,0.5)';
      ctx.shadowBlur = 2;
      ctx.fillText(color, index * colorWidth + colorWidth / 2, canvas.height / 2);
      ctx.shadowBlur = 0;
    });

    const link = document.createElement('a');
    link.download = `${paletteTheme}-palette.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-0">AI Palette Generator</h3>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Theme</label>
          <Select value={paletteTheme} onValueChange={setPaletteTheme}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(themes).map(([key, label]) => (
                <SelectItem key={key} value={key}>{label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-end">
          <Button 
            onClick={generatePalette}
            disabled={isGenerating}
            className="w-full bg-indigo-600 hover:bg-indigo-700"
          >
            {isGenerating ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
            ) : (
              <RefreshCw className="w-4 h-4 mr-2" />
            )}
            Generate Palette
          </Button>
        </div>
      </div>

      {generatedPalette.length > 0 && (
        <div>
          <div className="flex flex-wrap gap-2 justify-center mb-6">
            {generatedPalette.map((color, index) => (
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
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg shadow-md hover:scale-110 transition-transform"
                  style={{ backgroundColor: color }}
                />
                <p className="text-xs text-center mt-2 font-mono">{color}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 justify-center">
            <Button variant="outline" onClick={handleCopyPalette}>
              <Copy className="w-4 h-4 mr-2" />
              Copy All
            </Button>
            <Button variant="outline" onClick={downloadPalette}>
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
            <Button variant="outline">
              <Heart className="w-4 h-4 mr-2" />
              Save
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}