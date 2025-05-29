
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download, RefreshCw } from 'lucide-react';
import { generateFinancialServicesImage } from '@/utils/imageGeneration';
import { toast } from 'sonner';

interface ImageGeneratorProps {
  onImageGenerated: (imageUrl: string) => void;
  buttonText?: string;
  className?: string;
}

const ImageGenerator: React.FC<ImageGeneratorProps> = ({ 
  onImageGenerated, 
  buttonText = "Generate New Image",
  className = ""
}) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateImage = async () => {
    setIsGenerating(true);
    try {
      const imageUrl = await generateFinancialServicesImage();
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
