
import React, { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from '@/components/ui/carousel';
import ImageGenerator from '@/components/ImageGenerator';

// Service card component for the Goldman Sachs style design
const ServiceCard = ({ 
  title, 
  description,
  imageUrl,
  link = "#",
  onImageGenerated,
  showImageGenerator = false
}: { 
  title: string; 
  description: string;
  imageUrl: string;
  link?: string;
  onImageGenerated?: (imageUrl: string) => void;
  showImageGenerator?: boolean;
}) => {
  return (
    <div className="bg-white dark:bg-cc-navy/60 h-full shadow-md rounded-sm overflow-hidden border border-transparent dark:border-cc-gold/20">
      <div className="h-[200px] sm:h-[250px] md:h-[300px] overflow-hidden relative">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        {showImageGenerator && onImageGenerated && (
          <div className="absolute bottom-2 right-2">
            <ImageGenerator
              onImageGenerated={onImageGenerated}
              buttonText="New Image"
              imageType="strategic-advisory"
              className="text-xs bg-white/90 hover:bg-white"
            />
          </div>
        )}
      </div>
      <div className="p-4 sm:p-6 lg:p-8">
        <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 dark:text-white">{title}</h3>
        <p className="text-gray-700 dark:text-gray-300 mb-4 sm:mb-6 text-sm sm:text-base leading-relaxed">
          {description}
        </p>
        <Link 
          to={link}
          className="inline-flex items-center text-cc-navy dark:text-cc-gold hover:text-cc-gold dark:hover:text-white transition-colors min-h-[44px]"
        >
          <ArrowRight className="h-5 w-5" />
        </Link>
      </div>
    </div>
  );
};

const Services = () => {
  const [strategicAdvisoryImage, setStrategicAdvisoryImage] = useState("https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=800&q=80");

  const handleStrategicAdvisoryImageGenerated = (imageUrl: string) => {
    setStrategicAdvisoryImage(imageUrl);
  };

  // Define service items with the new uploaded images
  const services = [
    {
      title: "Securities Trading",
      description: "Access to Ghana Stock Exchange and other African markets with competitive commission rates for institutional and international clients seeking African market exposure.",
      imageUrl: "/lovable-uploads/19a0a23f-1474-49a7-a0fc-4b62e718b6e7.png",
      link: "/securities-trading"
    },
    {
      title: "Investment Research",
      description: "Comprehensive market intelligence and analysis covering Ghana, West African markets, and emerging African investment opportunities for global investors.",
      imageUrl: "/lovable-uploads/749a8bb6-9f9d-4731-8233-2a3459f75e84.png",
      link: "/investment-research"
    },
    {
      title: "Financings & Capital Markets",
      description: "International capital raising solutions through debt and equity offerings, connecting African companies with global investors and capital markets.",
      imageUrl: "/lovable-uploads/5d82ecc8-34e0-4284-9c90-434650eaf740.png",
      link: "/capital-markets"
    },
    {
      title: "Investment Advisory",
      description: "Tailored investment strategies and African market portfolio management for institutional clients, family offices, and international high-net-worth individuals.",
      imageUrl: "/lovable-uploads/1f153fc7-d536-4eab-8f5c-6527267e1769.png",
      link: "/investment-advisory"
    },
    {
      title: "Strategic Advisory",
      description: "Expert guidance on cross-border mergers, acquisitions, corporate restructuring, and strategic business initiatives across African markets.",
      imageUrl: strategicAdvisoryImage,
      link: "/strategic-advisory",
      showImageGenerator: true,
      onImageGenerated: handleStrategicAdvisoryImageGenerated
    },
    {
      title: "Private Equity",
      description: "Alternative investment solutions focusing on growth capital for promising businesses across key sectors in Ghana, West Africa, and emerging African markets.",
      imageUrl: "/lovable-uploads/3722b840-57e0-4fc4-8378-9ee194fd4491.png",
      link: "/private-equity"
    }
  ];

  return (
    <div className="py-12 sm:py-16 bg-cc-gray dark:bg-cc-navy/90">
      <div className="container mx-auto px-4">
        <div className="mb-12 sm:mb-16 text-center sm:text-left">
          <h2 className="text-sm font-medium uppercase tracking-wider text-cc-gold mb-2">WHAT WE DO</h2>
          <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-cc-navy dark:text-white mb-4 sm:mb-6">Delivering for Our Global Clients</h3>
          <p className="text-gray-600 dark:text-gray-300 text-lg max-w-3xl">
            Connecting African opportunities with international capital through expert financial services and deep market knowledge.
          </p>
        </div>
        
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 sm:-ml-4">
            {services.map((service, index) => (
              <CarouselItem key={index} className="pl-2 sm:pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                <ServiceCard
                  title={service.title}
                  description={service.description}
                  imageUrl={service.imageUrl}
                  link={service.link}
                  showImageGenerator={service.showImageGenerator}
                  onImageGenerated={service.onImageGenerated}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          
          <div className="flex items-center justify-center gap-3 mt-6 sm:mt-8">
            <CarouselPrevious className="static transform-none flex h-12 w-12 sm:h-10 sm:w-10 items-center justify-center border border-cc-navy text-cc-navy dark:border-cc-gold dark:text-cc-gold hover:bg-cc-navy hover:text-white dark:hover:bg-cc-gold dark:hover:text-cc-navy transition-colors">
              <ArrowLeft className="h-5 w-5 sm:h-6 sm:w-6" />
            </CarouselPrevious>
            <CarouselNext className="static transform-none flex h-12 w-12 sm:h-10 sm:w-10 items-center justify-center border border-cc-navy text-cc-navy dark:border-cc-gold dark:text-cc-gold hover:bg-cc-navy hover:text-white dark:hover:bg-cc-gold dark:hover:text-cc-navy transition-colors">
              <ArrowRight className="h-5 w-5 sm:h-6 sm:w-6" />
            </CarouselNext>
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default Services;
