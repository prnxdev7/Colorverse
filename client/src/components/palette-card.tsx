import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Heart, Copy } from "lucide-react";
import { useClipboard } from "@/hooks/use-clipboard";
import { useToast } from "@/hooks/use-toast";

interface Palette {
  id: number;
  name: string;
  description: string;
  colors: string[];
  tags: string[];
  usageCount: number;
  isTrending: boolean;
}

interface PaletteCardProps {
  palette: Palette;
}

export default function PaletteCard({ palette }: PaletteCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const { copyToClipboard } = useClipboard();
  const { toast } = useToast();

  const handleCopyPalette = async () => {
    const colorString = palette.colors.join(', ');
    await copyToClipboard(colorString);
    toast({
      title: "Palette copied!",
      description: `${palette.name} colors copied to clipboard`,
    });
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    toast({
      title: isLiked ? "Removed from favorites" : "Added to favorites",
      description: `${palette.name} ${isLiked ? 'removed from' : 'added to'} your favorites`,
    });
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
      className="bg-gray-50 rounded-xl p-4 sm:p-6 hover:shadow-lg transition-all group cursor-pointer transform hover:-translate-y-1 card-hover"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img 
        src={getImageForPalette(palette.id - 1)} 
        alt={palette.name}
        className="w-full h-24 sm:h-32 object-cover rounded-lg mb-3 sm:mb-4"
        loading="lazy"
      />
      
      <div className="flex mb-3 sm:mb-4">
        {palette.colors.map((color, index) => (
          <div 
            key={index}
            className={`w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 ${index === 0 ? 'rounded-l-lg' : ''} ${index === palette.colors.length - 1 ? 'rounded-r-lg' : ''} ${color === '#ffffff' ? 'border border-gray-200' : ''} cursor-pointer hover:scale-110 transition-transform`}
            style={{ backgroundColor: color }}
            title={color}
            onClick={() => {
              navigator.clipboard.writeText(color);
              toast({
                title: "Color copied!",
                description: `${color} copied to clipboard`,
              });
            }}
          ></div>
        ))}
      </div>
      
      <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">{palette.name}</h3>
      <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">{palette.description}</p>
      
      <div className="flex items-center justify-between">
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3">
          <span className="text-xs text-gray-500">{palette.colors.length} colors</span>
          {palette.isTrending && (
            <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full">Trending</span>
          )}
        </div>
        <div className="flex gap-1 sm:gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLike}
            className={`transition-all p-1 sm:p-2 ${isHovered || isLiked ? 'opacity-100' : 'opacity-60'} ${isLiked ? 'text-red-600' : 'text-gray-600 hover:text-red-600'}`}
          >
            <Heart className={`w-3 h-3 sm:w-4 sm:h-4 ${isLiked ? 'fill-current' : ''}`} />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopyPalette}
            className={`transition-opacity p-1 sm:p-2 ${isHovered ? 'opacity-100' : 'opacity-60'} text-gray-600 hover:text-indigo-600`}
          >
            <Copy className="w-3 h-3 sm:w-4 sm:h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
