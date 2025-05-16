
import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from '@/components/ui/carousel';

// Service card component for the Goldman Sachs style design
const ServiceCard = ({ 
  title, 
  description,
  imageUrl,
  link = "#"
}: { 
  title: string; 
  description: string;
  imageUrl: string;
  link?: string;
}) => {
  return (
    <div className="bg-white dark:bg-cc-navy/60 h-full shadow-md rounded-sm overflow-hidden border border-transparent dark:border-cc-gold/20">
      <div className="h-[300px] overflow-hidden">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
      <div className="p-8">
        <h3 className="text-xl font-bold mb-4 dark:text-white">{title}</h3>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          {description}
        </p>
        <Link 
          to={link}
          className="inline-flex items-center text-cc-navy dark:text-cc-gold hover:text-cc-gold dark:hover:text-white transition-colors"
        >
          <ArrowRight className="h-5 w-5" />
        </Link>
      </div>
    </div>
  );
};

const Services = () => {
  // Define service items with the new uploaded images
  const services = [
    {
      title: "Securities Trading",
      description: "Access to Ghana Stock Exchange and other African markets with competitive commission rates for our institutional and corporate clients.",
      imageUrl: "/lovable-uploads/19a0a23f-1474-49a7-a0fc-4b62e718b6e7.png",
      link: "/securities-trading"
    },
    {
      title: "Financings & Capital Markets",
      description: "Providing capital raising solutions through debt and equity offerings, with specialized expertise in African capital markets.",
      imageUrl: "/lovable-uploads/5d82ecc8-34e0-4284-9c90-434650eaf740.png",
      link: "/capital-markets"
    },
    {
      title: "Investment Research",
      description: "In-depth analysis and insights into market trends, equity performance, and economic developments across Ghana and Africa.",
      imageUrl: "/lovable-uploads/749a8bb6-9f9d-4731-8233-2a3459f75e84.png",
      link: "/research"
    },
    {
      title: "Investment Advisory",
      description: "Tailored investment strategies and portfolio management for institutional clients and high-net-worth individuals.",
      imageUrl: "/lovable-uploads/1f153fc7-d536-4eab-8f5c-6527267e1769.png",
      link: "/investment-advisory"
    },
    {
      title: "Strategic Advisory",
      description: "Expert guidance on mergers, acquisitions, corporate restructuring, and strategic business initiatives.",
      imageUrl: "/lovable-uploads/3722b840-57e0-4fc4-8378-9ee194fd4491.png",
      link: "/strategic-advisory"
    },
    {
      title: "Equity Capital",
      description: "Alternative investment solutions focusing on growth capital for promising businesses across key sectors in Ghana and Africa.",
      imageUrl: "/lovable-uploads/3722b840-57e0-4fc4-8378-9ee194fd4491.png",
      link: "/private-equity"
    }
  ];

  return (
    <div className="py-16 bg-cc-gray dark:bg-cc-navy/90">
      <div className="container mx-auto px-4">
        <div className="mb-16">
          <h2 className="text-sm font-medium uppercase tracking-wider text-cc-gold mb-2">WHAT WE DO</h2>
          <h3 className="text-4xl sm:text-5xl font-bold text-cc-navy dark:text-white mb-6">Delivering for Our Clients</h3>
        </div>
        
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {services.map((service, index) => (
              <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                <ServiceCard
                  title={service.title}
                  description={service.description}
                  imageUrl={service.imageUrl}
                  link={service.link}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          
          <div className="flex items-center justify-center gap-4 mt-8">
            <CarouselPrevious className="static transform-none flex h-10 w-10 items-center justify-center border border-cc-navy text-cc-navy dark:border-cc-gold dark:text-cc-gold hover:bg-cc-navy hover:text-white dark:hover:bg-cc-gold dark:hover:text-cc-navy">
              <ArrowLeft className="h-6 w-6" />
            </CarouselPrevious>
            <CarouselNext className="static transform-none flex h-10 w-10 items-center justify-center border border-cc-navy text-cc-navy dark:border-cc-gold dark:text-cc-gold hover:bg-cc-navy hover:text-white dark:hover:bg-cc-gold dark:hover:text-cc-navy">
              <ArrowRight className="h-6 w-6" />
            </CarouselNext>
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default Services;
