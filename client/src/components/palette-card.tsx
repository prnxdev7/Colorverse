import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Heart, Copy } from "lucide-react";
import { useClipboard } from "@/hooks/use-clipboard";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { Palette } from "@shared/schema";

interface PaletteCardProps {
  palette: Palette;
}

export default function PaletteCard({ palette }: PaletteCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { copyToClipboard } = useClipboard();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const usePaletteMutation = useMutation({
    mutationFn: () => apiRequest('POST', `/api/palettes/${palette.id}/use`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/palettes'] });
    },
  });

  const handleCopyPalette = async () => {
    const colorString = palette.colors.join(', ');
    await copyToClipboard(colorString);
    toast({
      title: "Palette copied!",
      description: `${palette.name} colors copied to clipboard`,
    });
    usePaletteMutation.mutate();
  };

  const sampleImages = [
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    "https://images.unsplash.com/photo-1439066615861-d1af74d74000?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    "https://pixabay.com/get/g7766a342b840e8a369eb1196b0bd6a95ac263a7dda9de547afbca8ead99865211c0efebaafb7f8ae99e6d317552bf35141845b9b1a3b7d5d96d50713238bebdc_1280.jpg",
    "https://pixabay.com/get/g08e6e007948ae51f22285a58bd50e2c0264fd088623355634a43ee02cde6bb522b3c405b91c20f813f4664ad2d6112c440b7e67a5fc18594607fc9812cbf495c_1280.jpg"
  ];

  const getImageForPalette = (index: number) => {
    return sampleImages[index % sampleImages.length];
  };

  return (
    <div 
      className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-all group cursor-pointer transform hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img 
        src={getImageForPalette(palette.id - 1)} 
        alt={palette.name}
        className="w-full h-32 object-cover rounded-lg mb-4"
        loading="lazy"
      />
      
      <div className="flex mb-4">
        {palette.colors.map((color, index) => (
          <div 
            key={index}
            className={`w-12 h-12 ${index === 0 ? 'rounded-l-lg' : ''} ${index === palette.colors.length - 1 ? 'rounded-r-lg' : ''} ${color === '#ffffff' ? 'border border-gray-200' : ''}`}
            style={{ backgroundColor: color }}
            title={color}
          ></div>
        ))}
      </div>
      
      <h3 className="font-semibold text-gray-900 mb-2">{palette.name}</h3>
      <p className="text-sm text-gray-600 mb-4">{palette.description}</p>
      
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-500">{palette.colors.length} colors</span>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            className={`transition-opacity ${isHovered ? 'opacity-100' : 'opacity-0'} text-gray-600 hover:text-red-600`}
          >
            <Heart className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopyPalette}
            className={`transition-opacity ${isHovered ? 'opacity-100' : 'opacity-0'} text-gray-600 hover:text-indigo-600`}
          >
            <Copy className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
