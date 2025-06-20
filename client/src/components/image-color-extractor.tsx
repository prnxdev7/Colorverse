import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Upload, Download, Copy, Image as ImageIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useClipboard } from "@/hooks/use-clipboard";

interface ExtractedColor {
  color: string;
  percentage: number;
  count: number;
}

export default function ImageColorExtractor() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [extractedColors, setExtractedColors] = useState<ExtractedColor[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { toast } = useToast();
  const { copyToClipboard } = useClipboard();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        setSelectedImage(imageUrl);
        extractColorsFromImage(imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const extractColorsFromImage = (imageUrl: string) => {
    setIsProcessing(true);
    const img = new Image();
    img.crossOrigin = "anonymous";
    
    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Set canvas size to match image
      canvas.width = img.width;
      canvas.height = img.height;
      
      // Draw image on canvas
      ctx.drawImage(img, 0, 0);
      
      // Get image data
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = imageData.data;
      
      // Extract colors
      const colorMap = new Map<string, number>();
      
      // Sample every 10th pixel for performance
      for (let i = 0; i < pixels.length; i += 40) {
        const r = pixels[i];
        const g = pixels[i + 1];
        const b = pixels[i + 2];
        const alpha = pixels[i + 3];
        
        // Skip transparent pixels
        if (alpha < 128) continue;
        
        // Convert to hex and quantize colors (reduce precision for better grouping)
        const quantizedR = Math.round(r / 17) * 17;
        const quantizedG = Math.round(g / 17) * 17;
        const quantizedB = Math.round(b / 17) * 17;
        
        const hex = rgbToHex(quantizedR, quantizedG, quantizedB);
        colorMap.set(hex, (colorMap.get(hex) || 0) + 1);
      }
      
      // Sort colors by frequency and get top 12
      const sortedColors = Array.from(colorMap.entries())
        .sort(([,a], [,b]) => b - a)
        .slice(0, 12);
      
      const totalPixels = sortedColors.reduce((sum, [,count]) => sum + count, 0);
      
      const colors: ExtractedColor[] = sortedColors.map(([color, count]) => ({
        color,
        count,
        percentage: Math.round((count / totalPixels) * 100)
      }));
      
      setExtractedColors(colors);
      setIsProcessing(false);
      
      toast({
        title: "Colors extracted!",
        description: `Found ${colors.length} dominant colors in the image`,
      });
    };
    
    img.onerror = () => {
      setIsProcessing(false);
      toast({
        title: "Error",
        description: "Failed to process the image",
        variant: "destructive"
      });
    };
    
    img.src = imageUrl;
  };

  const rgbToHex = (r: number, g: number, b: number): string => {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  };

  const handleCopyColor = async (color: string) => {
    await copyToClipboard(color);
    toast({
      title: "Color copied!",
      description: `${color} copied to clipboard`,
    });
  };

  const handleCopyAllColors = async () => {
    const colorString = extractedColors.map(c => c.color).join(', ');
    await copyToClipboard(colorString);
    toast({
      title: "All colors copied!",
      description: "Color palette copied to clipboard",
    });
  };

  const downloadPalette = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 800;
    canvas.height = 400;

    const colorWidth = canvas.width / extractedColors.length;
    
    extractedColors.forEach((colorData, index) => {
      ctx.fillStyle = colorData.color;
      ctx.fillRect(index * colorWidth, 0, colorWidth, canvas.height);
      
      // Add color text
      ctx.fillStyle = '#ffffff';
      ctx.font = '16px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(
        colorData.color, 
        index * colorWidth + colorWidth / 2, 
        canvas.height / 2
      );
    });

    // Download
    const link = document.createElement('a');
    link.download = 'color-palette.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg">
      <canvas ref={canvasRef} className="hidden" />
      
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-0">Image Color Extractor</h3>
        <Button 
          onClick={() => fileInputRef.current?.click()}
          className="bg-indigo-600 hover:bg-indigo-700"
        >
          <Upload className="w-4 h-4 mr-2" />
          Upload Image
        </Button>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageUpload}
        accept="image/*"
        className="hidden"
      />

      {!selectedImage && (
        <div 
          className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-indigo-400 transition-colors"
          onClick={() => fileInputRef.current?.click()}
        >
          <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 mb-2">Click to upload an image or drag and drop</p>
          <p className="text-sm text-gray-500">PNG, JPG, GIF up to 10MB</p>
        </div>
      )}

      {selectedImage && (
        <div className="mb-6">
          <img 
            src={selectedImage} 
            alt="Uploaded" 
            className="w-full max-h-64 object-contain rounded-lg border"
          />
        </div>
      )}

      {isProcessing && (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="text-gray-600 mt-2">Extracting colors...</p>
        </div>
      )}

      {extractedColors.length > 0 && (
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
            <h4 className="font-semibold text-gray-900 mb-2 sm:mb-0">Extracted Colors</h4>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleCopyAllColors}>
                <Copy className="w-4 h-4 mr-1" />
                Copy All
              </Button>
              <Button variant="outline" size="sm" onClick={downloadPalette}>
                <Download className="w-4 h-4 mr-1" />
                Download
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
            {extractedColors.map((colorData, index) => (
              <div 
                key={index}
                className="group cursor-pointer"
                onClick={() => handleCopyColor(colorData.color)}
              >
                <div 
                  className="w-full h-16 rounded-lg shadow-md hover:scale-105 transition-transform mb-2"
                  style={{ backgroundColor: colorData.color }}
                />
                <p className="text-xs font-mono text-center">{colorData.color}</p>
                <p className="text-xs text-gray-500 text-center">{colorData.percentage}%</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}