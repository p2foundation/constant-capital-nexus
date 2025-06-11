
import { toast } from "sonner";

interface GenerateImageParams {
  prompt: string;
  width?: number;
  height?: number;
}

export const generateImage = async ({ prompt, width = 1024, height = 1024 }: GenerateImageParams): Promise<string> => {
  try {
    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "dall-e-3",
        prompt,
        n: 1,
        size: `${width}x${height}`,
        quality: "hd",
        style: "natural"
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.data && data.data[0] && data.data[0].url) {
      return data.data[0].url;
    } else {
      throw new Error('No image URL in response');
    }
  } catch (error) {
    console.error('Error generating image:', error);
    toast.error('Failed to generate image. Please try again.');
    throw error;
  }
};

export const generateFinancialServicesImage = async (): Promise<string> => {
  const prompt = "Professional business meeting in a modern conference room with diverse financial advisors discussing investment strategies with clients, charts and graphs on screens in background, corporate atmosphere, high quality photography, natural lighting, business professional attire";
  
  return generateImage({ prompt, width: 1024, height: 768 });
};

export const generateStrategicAdvisoryImage = async (): Promise<string> => {
  const prompt = "Executive boardroom with senior business professionals in suits conducting strategic planning session, modern corporate setting with city skyline view, financial charts and merger documents on mahogany table, professional photography, dramatic lighting, sophisticated atmosphere";
  
  return generateImage({ prompt, width: 1024, height: 768 });
};
