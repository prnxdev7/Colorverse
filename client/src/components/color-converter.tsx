import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy, ArrowRightLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useClipboard } from "@/hooks/use-clipboard";
import { hexToRgb, hexToHsl, rgbToHex, hslToHex } from "@/lib/color-utils";

export default function ColorConverter() {
  const [hexValue, setHexValue] = useState("#3b82f6");
  const [rgbR, setRgbR] = useState(59);
  const [rgbG, setRgbG] = useState(130);
  const [rgbB, setRgbB] = useState(246);
  const [hslH, setHslH] = useState(217);
  const [hslS, setHslS] = useState(91);
  const [hslL, setHslL] = useState(60);
  const [hsvH, setHsvH] = useState(217);
  const [hsvS, setHsvS] = useState(76);
  const [hsvV, setHsvV] = useState(96);
  const { toast } = useToast();
  const { copyToClipboard } = useClipboard();

  const updateFromHex = (hex: string) => {
    setHexValue(hex);
    const rgb = hexToRgb(hex);
    const hsl = hexToHsl(hex);
    if (rgb) {
      setRgbR(rgb.r);
      setRgbG(rgb.g);
      setRgbB(rgb.b);
    }
    if (hsl) {
      setHslH(hsl.h);
      setHslS(hsl.s);
      setHslL(hsl.l);
      // Convert to HSV
      const hsv = hslToHsv(hsl.h, hsl.s, hsl.l);
      setHsvH(hsv.h);
      setHsvS(hsv.s);
      setHsvV(hsv.v);
    }
  };

  const updateFromRgb = () => {
    const hex = rgbToHex(rgbR, rgbG, rgbB);
    setHexValue(hex);
    const hsl = hexToHsl(hex);
    if (hsl) {
      setHslH(hsl.h);
      setHslS(hsl.s);
      setHslL(hsl.l);
      const hsv = hslToHsv(hsl.h, hsl.s, hsl.l);
      setHsvH(hsv.h);
      setHsvS(hsv.s);
      setHsvV(hsv.v);
    }
  };

  const updateFromHsl = () => {
    const hex = hslToHex(hslH, hslS, hslL);
    setHexValue(hex);
    const rgb = hexToRgb(hex);
    if (rgb) {
      setRgbR(rgb.r);
      setRgbG(rgb.g);
      setRgbB(rgb.b);
    }
    const hsv = hslToHsv(hslH, hslS, hslL);
    setHsvH(hsv.h);
    setHsvS(hsv.s);
    setHsvV(hsv.v);
  };

  const hslToHsv = (h: number, s: number, l: number) => {
    const sNorm = s / 100;
    const lNorm = l / 100;
    const v = lNorm + sNorm * Math.min(lNorm, 1 - lNorm);
    const sHsv = v === 0 ? 0 : 2 * (1 - lNorm / v);
    return {
      h: h,
      s: Math.round(sHsv * 100),
      v: Math.round(v * 100)
    };
  };

  const copyValue = async (value: string, format: string) => {
    await copyToClipboard(value);
    toast({
      title: "Copied!",
      description: `${format} value copied to clipboard`,
    });
  };

  const formats = [
    {
      label: "HEX",
      value: hexValue,
      onChange: updateFromHex,
      editable: true
    },
    {
      label: "RGB",
      value: `rgb(${rgbR}, ${rgbG}, ${rgbB})`,
      onChange: updateFromRgb,
      editable: false
    },
    {
      label: "HSL",
      value: `hsl(${hslH}, ${hslS}%, ${hslL}%)`,
      onChange: updateFromHsl,
      editable: false
    },
    {
      label: "HSV",
      value: `hsv(${hsvH}, ${hsvS}%, ${hsvV}%)`,
      onChange: () => {},
      editable: false
    },
    {
      label: "CMYK",
      value: rgbToCmyk(rgbR, rgbG, rgbB),
      onChange: () => {},
      editable: false
    },
    {
      label: "CSS",
      value: `color: ${hexValue};`,
      onChange: () => {},
      editable: false
    }
  ];

  function rgbToCmyk(r: number, g: number, b: number): string {
    const rNorm = r / 255;
    const gNorm = g / 255;
    const bNorm = b / 255;
    
    const k = 1 - Math.max(rNorm, gNorm, bNorm);
    const c = (1 - rNorm - k) / (1 - k) || 0;
    const m = (1 - gNorm - k) / (1 - k) || 0;
    const y = (1 - bNorm - k) / (1 - k) || 0;
    
    return `cmyk(${Math.round(c * 100)}%, ${Math.round(m * 100)}%, ${Math.round(y * 100)}%, ${Math.round(k * 100)}%)`;
  }

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg">
      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-6">Color Converter</h3>
      
      {/* Color Preview */}
      <div className="flex items-center gap-4 mb-6">
        <div 
          className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg border-2 border-gray-300 shadow-md"
          style={{ backgroundColor: hexValue }}
        />
        <div>
          <p className="font-medium text-gray-900">{hexValue}</p>
          <p className="text-sm text-gray-600">Current Color</p>
        </div>
      </div>

      {/* Individual RGB/HSL Controls */}
      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <div className="space-y-3">
          <Label className="text-sm font-medium">RGB Values</Label>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label className="w-6 text-xs">R:</Label>
              <Input
                type="number"
                min="0"
                max="255"
                value={rgbR}
                onChange={(e) => setRgbR(Number(e.target.value))}
                onBlur={updateFromRgb}
                className="text-sm"
              />
            </div>
            <div className="flex items-center gap-2">
              <Label className="w-6 text-xs">G:</Label>
              <Input
                type="number"
                min="0"
                max="255"
                value={rgbG}
                onChange={(e) => setRgbG(Number(e.target.value))}
                onBlur={updateFromRgb}
                className="text-sm"
              />
            </div>
            <div className="flex items-center gap-2">
              <Label className="w-6 text-xs">B:</Label>
              <Input
                type="number"
                min="0"
                max="255"
                value={rgbB}
                onChange={(e) => setRgbB(Number(e.target.value))}
                onBlur={updateFromRgb}
                className="text-sm"
              />
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <Label className="text-sm font-medium">HSL Values</Label>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label className="w-6 text-xs">H:</Label>
              <Input
                type="number"
                min="0"
                max="360"
                value={hslH}
                onChange={(e) => setHslH(Number(e.target.value))}
                onBlur={updateFromHsl}
                className="text-sm"
              />
            </div>
            <div className="flex items-center gap-2">
              <Label className="w-6 text-xs">S:</Label>
              <Input
                type="number"
                min="0"
                max="100"
                value={hslS}
                onChange={(e) => setHslS(Number(e.target.value))}
                onBlur={updateFromHsl}
                className="text-sm"
              />
            </div>
            <div className="flex items-center gap-2">
              <Label className="w-6 text-xs">L:</Label>
              <Input
                type="number"
                min="0"
                max="100"
                value={hslL}
                onChange={(e) => setHslL(Number(e.target.value))}
                onBlur={updateFromHsl}
                className="text-sm"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Format Outputs */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Color Formats</Label>
        <div className="space-y-2">
          {formats.map((format) => (
            <div key={format.label} className="flex items-center gap-2">
              <Label className="w-12 text-xs text-gray-600 flex-shrink-0">{format.label}:</Label>
              <Input
                value={format.value}
                onChange={format.editable ? (e) => format.onChange(e.target.value) : undefined}
                readOnly={!format.editable}
                className="font-mono text-xs flex-1"
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyValue(format.value, format.label)}
                className="flex-shrink-0"
              >
                <Copy className="w-3 h-3" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}