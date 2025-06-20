import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Download, Copy, Heart, Shuffle, Plus, Code } from "lucide-react";
import { useClipboard } from "@/hooks/use-clipboard";
import { useToast } from "@/hooks/use-toast";

interface ColorStop {
  color: string;
  position: number;
}

export default function GradientGenerator() {
  const [colorStops, setColorStops] = useState<ColorStop[]>([
    { color: "#667eea", position: 0 },
    { color: "#764ba2", position: 100 }
  ]);
  const [direction, setDirection] = useState(135);
  const [gradientType, setGradientType] = useState("linear");
  const { copyToClipboard } = useClipboard();
  const { toast } = useToast();

  const generateGradientCSS = () => {
    const stops = colorStops
      .sort((a, b) => a.position - b.position)
      .map(stop => `${stop.color} ${stop.position}%`)
      .join(", ");

    if (gradientType === "linear") {
      return `linear-gradient(${direction}deg, ${stops})`;
    } else if (gradientType === "radial") {
      return `radial-gradient(circle, ${stops})`;
    } else {
      return `conic-gradient(${stops})`;
    }
  };

  const handleCopyCSS = async () => {
    const css = `background: ${generateGradientCSS()};`;
    await copyToClipboard(css);
    toast({
      title: "CSS copied!",
      description: "Gradient CSS code copied to clipboard",
    });
  };

  const updateColorStop = (index: number, field: 'color' | 'position', value: string | number) => {
    const newStops = [...colorStops];
    newStops[index] = { ...newStops[index], [field]: value };
    setColorStops(newStops);
  };

  const addColorStop = () => {
    const newPosition = colorStops.length > 0 
      ? Math.min(100, Math.max(...colorStops.map(s => s.position)) + 20)
      : 50;
    setColorStops([...colorStops, { color: "#ffffff", position: newPosition }]);
  };

  const removeColorStop = (index: number) => {
    if (colorStops.length > 2) {
      setColorStops(colorStops.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg">
      {/* Gradient Preview */}
      <div className="mb-6 sm:mb-8">
        <div 
          className="h-32 sm:h-40 lg:h-48 rounded-xl mb-4"
          style={{ background: generateGradientCSS() }}
        ></div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
          <span className="text-xs sm:text-sm font-medium text-gray-700">
            Direction: {direction}° | Type: {gradientType}
          </span>
          <Button variant="ghost" size="sm" onClick={handleCopyCSS} className="text-xs sm:text-sm">
            <Code className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
            Get CSS Code
          </Button>
        </div>
      </div>
      
      {/* Gradient Controls */}
      <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
        {/* Color Stops */}
        <div>
          <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Color Stops</h4>
          <div className="space-y-3 sm:space-y-4">
            {colorStops.map((stop, index) => (
              <div key={index} className="flex items-center space-x-2 sm:space-x-4">
                <div 
                  className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-lg border-2 border-gray-300 cursor-pointer flex-shrink-0"
                  style={{ backgroundColor: stop.color }}
                  onClick={() => {
                    const input = document.createElement('input');
                    input.type = 'color';
                    input.value = stop.color;
                    input.addEventListener('change', (e) => {
                      updateColorStop(index, 'color', (e.target as HTMLInputElement).value);
                    });
                    input.click();
                  }}
                ></div>
                <div className="flex-1 min-w-0">
                  <Input
                    type="text"
                    value={stop.color}
                    onChange={(e) => updateColorStop(index, 'color', e.target.value)}
                    className="font-mono text-xs sm:text-sm"
                  />
                </div>
                <div className="w-16 sm:w-20">
                  <Slider
                    value={[stop.position]}
                    onValueChange={([value]) => updateColorStop(index, 'position', value)}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                  <span className="text-xs text-gray-500 block text-center">{stop.position}%</span>
                </div>
                {colorStops.length > 2 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeColorStop(index)}
                    className="flex-shrink-0 text-lg"
                  >
                    ×
                  </Button>
                )}
              </div>
            ))}
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={addColorStop}
            className="mt-4 text-indigo-600 hover:text-indigo-700 text-xs sm:text-sm"
          >
            <Plus className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
            Add Color Stop
          </Button>
        </div>
        
        {/* Direction Controls */}
        <div>
          <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Direction & Type</h4>
          <div className="space-y-4">
            <div>
              <Label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Gradient Type</Label>
              <Select value={gradientType} onValueChange={setGradientType}>
                <SelectTrigger className="text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="linear">Linear</SelectItem>
                  <SelectItem value="radial">Radial</SelectItem>
                  <SelectItem value="conic">Conic</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {gradientType === "linear" && (
              <div>
                <Label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                  Angle: {direction}°
                </Label>
                <Slider
                  value={[direction]}
                  onValueChange={([value]) => setDirection(value)}
                  max={360}
                  step={1}
                  className="w-full"
                />
              </div>
            )}
            <div className="grid grid-cols-4 gap-2">
              <Button
                variant="outline"
                size="sm"
                className="aspect-square text-lg"
                onClick={() => setDirection(0)}
              >
                ↑
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="aspect-square text-lg"
                onClick={() => setDirection(45)}
              >
                ↗
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="aspect-square text-lg"
                onClick={() => setDirection(90)}
              >
                →
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="aspect-square text-lg"
                onClick={() => setDirection(135)}
              >
                ↘
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="flex flex-wrap gap-2 sm:gap-4 mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-gray-200">
        <Button className="bg-indigo-600 hover:bg-indigo-700 text-xs sm:text-sm flex-1 sm:flex-none">
          <Download className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
          Export PNG
        </Button>
        <Button variant="outline" onClick={handleCopyCSS} className="text-xs sm:text-sm flex-1 sm:flex-none">
          <Copy className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
          Copy CSS
        </Button>
        <Button variant="outline" className="text-xs sm:text-sm flex-1 sm:flex-none">
          <Heart className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
          Save
        </Button>
        <Button variant="outline" className="text-xs sm:text-sm flex-1 sm:flex-none">
          <Shuffle className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
          Random
        </Button>
      </div>
    </div>
  );
}
