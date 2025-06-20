import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { AlertCircle, CheckCircle, Eye } from "lucide-react";
import { getContrastRatio, isAccessible } from "@/lib/color-utils";

export default function AccessibilityChecker() {
  const [foregroundColor, setForegroundColor] = useState("#000000");
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  
  const contrastRatio = getContrastRatio(foregroundColor, backgroundColor);
  const isAACompliant = contrastRatio >= 4.5;
  const isAAACompliant = contrastRatio >= 7;
  
  const getComplianceLevel = () => {
    if (isAAACompliant) return { level: "AAA", color: "text-green-600", icon: CheckCircle };
    if (isAACompliant) return { level: "AA", color: "text-yellow-600", icon: CheckCircle };
    return { level: "Fail", color: "text-red-600", icon: AlertCircle };
  };

  const compliance = getComplianceLevel();
  const ComplianceIcon = compliance.icon;

  const colorBlindnessSimulations = {
    protanopia: "Protanopia (Red-blind)",
    deuteranopia: "Deuteranopia (Green-blind)", 
    tritanopia: "Tritanopia (Blue-blind)",
    achromatopsia: "Achromatopsia (Complete color blindness)"
  };

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg">
      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-6">Accessibility Checker</h3>
      
      <div className="grid sm:grid-cols-2 gap-6 mb-6">
        <div>
          <Label className="block text-sm font-medium text-gray-700 mb-2">Foreground Color</Label>
          <div className="flex gap-2">
            <div 
              className="w-12 h-12 rounded-lg border-2 border-gray-300 cursor-pointer"
              style={{ backgroundColor: foregroundColor }}
              onClick={() => {
                const input = document.createElement('input');
                input.type = 'color';
                input.value = foregroundColor;
                input.addEventListener('change', (e) => {
                  setForegroundColor((e.target as HTMLInputElement).value);
                });
                input.click();
              }}
            />
            <Input
              type="text"
              value={foregroundColor}
              onChange={(e) => setForegroundColor(e.target.value)}
              className="font-mono text-sm"
            />
          </div>
        </div>

        <div>
          <Label className="block text-sm font-medium text-gray-700 mb-2">Background Color</Label>
          <div className="flex gap-2">
            <div 
              className="w-12 h-12 rounded-lg border-2 border-gray-300 cursor-pointer"
              style={{ backgroundColor: backgroundColor }}
              onClick={() => {
                const input = document.createElement('input');
                input.type = 'color';
                input.value = backgroundColor;
                input.addEventListener('change', (e) => {
                  setBackgroundColor((e.target as HTMLInputElement).value);
                });
                input.click();
              }}
            />
            <Input
              type="text"
              value={backgroundColor}
              onChange={(e) => setBackgroundColor(e.target.value)}
              className="font-mono text-sm"
            />
          </div>
        </div>
      </div>

      {/* Preview */}
      <div className="mb-6">
        <Label className="block text-sm font-medium text-gray-700 mb-2">Preview</Label>
        <div 
          className="p-6 rounded-lg border text-center"
          style={{ 
            backgroundColor: backgroundColor,
            color: foregroundColor,
            border: `2px solid ${foregroundColor}20`
          }}
        >
          <h4 className="text-lg font-semibold mb-2">Sample Text</h4>
          <p className="text-sm">This is how your text will appear with the selected colors.</p>
        </div>
      </div>

      {/* Contrast Results */}
      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <ComplianceIcon className={`w-5 h-5 ${compliance.color}`} />
            <span className="font-semibold">Contrast Ratio</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{contrastRatio.toFixed(2)}:1</p>
          <p className={`text-sm ${compliance.color} font-medium`}>
            WCAG {compliance.level} {compliance.level === "Fail" ? "Non-compliant" : "Compliant"}
          </p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Eye className="w-5 h-5 text-gray-600" />
            <span className="font-semibold">Recommendations</span>
          </div>
          <div className="space-y-1 text-sm text-gray-600">
            <p>Normal text: {isAACompliant ? "✓" : "✗"} AA (4.5:1)</p>
            <p>Large text: {contrastRatio >= 3 ? "✓" : "✗"} AA (3:1)</p>
            <p>Enhanced: {isAAACompliant ? "✓" : "✗"} AAA (7:1)</p>
          </div>
        </div>
      </div>

      {/* Color Blindness Simulation */}
      <div className="mb-6">
        <Label className="block text-sm font-medium text-gray-700 mb-3">Color Blindness Simulation</Label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {Object.entries(colorBlindnessSimulations).map(([type, label]) => (
            <div key={type} className="text-center">
              <div 
                className="w-full h-16 rounded-lg mb-2 border"
                style={{ 
                  backgroundColor: backgroundColor,
                  color: foregroundColor,
                  filter: type === 'protanopia' ? 'hue-rotate(180deg) saturate(0.8)' :
                         type === 'deuteranopia' ? 'hue-rotate(60deg) saturate(0.7)' :
                         type === 'tritanopia' ? 'hue-rotate(240deg) saturate(0.6)' :
                         'grayscale(1)'
                }}
              >
                <div className="p-2 text-xs">Text</div>
              </div>
              <p className="text-xs text-gray-600">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {!isAACompliant && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <span className="font-semibold text-red-800">Accessibility Warning</span>
          </div>
          <p className="text-sm text-red-700">
            This color combination does not meet WCAG accessibility standards. Consider using higher contrast colors for better readability.
          </p>
        </div>
      )}
    </div>
  );
}