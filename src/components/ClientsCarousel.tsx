
import React, { useEffect } from 'react';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

interface Client {
  name: string;
  logo: string;
  alt: string;
}

const clients: Client[] = [
  {
    name: "Ghana Stock Exchange",
    logo: "/lovable-uploads/a028936c-4eb7-490c-baf1-39fbdaaf1fd8.png", 
    alt: "Ghana Stock Exchange Logo"
  },
  {
    name: "Databank",
    logo: "/lovable-uploads/97cd490f-4616-42b4-bb49-576791280973.png",
    alt: "Databank Logo"
  },
  {
    name: "Security and Exchange Commission",
    logo: "/lovable-uploads/cc8b89a0-9ae7-4c1e-95ee-534ba55c6e10.png", 
    alt: "Security and Exchange Commission Logo"
  },
  {
    name: "Petra Trust",
    logo: "/lovable-uploads/2a3d1aff-a189-43f3-81aa-f33300a33566.png",
    alt: "Petra Trust Logo"
  },
  {
    name: "Xtellus Capital",
    logo: "/lovable-uploads/5758fa9a-4e77-4490-aeb9-29d8a7611a15.png",
    alt: "Xtellus Capital Logo"
  }
];

const ClientsCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    align: 'start',
    dragFree: true
  }, [
    Autoplay({ delay: 3000, stopOnInteraction: false })
  ]);

  useEffect(() => {
    if (emblaApi) {
      console.log("Embla carousel initialized");
    }
  }, [emblaApi]);

  return (
    <section className="py-16 bg-gray-50 dark:bg-cc-navy/80">
      <div className="container mx-auto px-4">
        <div className="text-left mb-10">
          <div className="text-cc-gold uppercase tracking-wide font-medium mb-2">OUR PARTNERS</div>
          <h2 className="text-3xl md:text-4xl font-bold text-cc-navy dark:text-white mb-4">We Partner With Industry Leaders</h2>
          <p className="max-w-2xl text-gray-600 dark:text-gray-300">
            Constant Capital has established strong partnerships with leading financial institutions across Ghana
            to provide comprehensive solutions for our clients.
          </p>
        </div>

        <div className="mt-12">
          <div className="overflow-hidden" ref={emblaRef}>
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              plugins={[
                Autoplay({ delay: 3000, stopOnInteraction: false }),
              ]}
              className="w-full"
            >
              <CarouselContent className="-ml-4">
                {clients.map((client, index) => (
                  <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                    <div className="p-1">
                      <Card className={cn(
                        "overflow-hidden bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all p-8 h-48",
                        "flex items-center justify-center"
                      )}>
                        <div className="w-full h-full flex items-center justify-center p-4">
                          {client.logo ? (
                            <img 
                              src={client.logo} 
                              alt={client.alt} 
                              className="max-h-32 max-w-full object-contain transition-all duration-300"
                            />
                          ) : (
                            <div className="text-cc-navy dark:text-white text-lg font-medium">{client.name}</div>
                          )}
                        </div>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientsCarousel;
