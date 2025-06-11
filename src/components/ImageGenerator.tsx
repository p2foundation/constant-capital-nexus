
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download, RefreshCw } from 'lucide-react';
import { generateImage, generateStrategicAdvisoryImage } from '@/utils/imageGeneration';
import { toast } from 'sonner';

interface ImageGeneratorProps {
  onImageGenerated: (imageUrl: string) => void;
  buttonText?: string;
  className?: string;
  imageType?: 'financial-services' | 'strategic-advisory' | 'custom';
  customPrompt?: string;
}

const ImageGenerator: React.FC<ImageGeneratorProps> = ({ 
  onImageGenerated, 
  buttonText = "Generate New Image",
  className = "",
  imageType = 'financial-services',
  customPrompt
}) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateImage = async () => {
    setIsGenerating(true);
    try {
      let imageUrl: string;
      
      if (imageType === 'strategic-advisory') {
        imageUrl = await generateStrategicAdvisoryImage();
      } else if (imageType === 'custom' && customPrompt) {
        imageUrl = await generateImage({ prompt: customPrompt });
      } else {
        // Default financial services image
        const prompt = "Professional business meeting in a modern conference room with diverse financial advisors discussing investment strategies with clients, charts and graphs on screens in background, corporate atmosphere, high quality photography, natural lighting, business professional attire";
        imageUrl = await generateImage({ prompt });
      }
      
      onImageGenerated(imageUrl);
      toast.success('New image generated successfully!');
    } catch (error) {
      console.error('Failed to generate image:', error);
      toast.error('Failed to generate image. Please check your API key.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Button
      onClick={handleGenerateImage}
      disabled={isGenerating}
      className={`flex items-center gap-2 ${className}`}
      variant="outline"
    >
      {isGenerating ? (
        <>
          <RefreshCw className="h-4 w-4 animate-spin" />
          Generating...
        </>
      ) : (
        <>
          <Download className="h-4 w-4" />
          {buttonText}
        </>
      )}
    </Button>
  );
};

export default ImageGenerator;
