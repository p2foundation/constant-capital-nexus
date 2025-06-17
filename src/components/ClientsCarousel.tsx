import React, { useEffect } from 'react';
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
interface Partner {
  name: string;
  logo: string;
  alt: string;
}
const partners: Partner[] = [{
  name: "Securities and Exchange Commission",
  logo: "/lovable-uploads/cc8b89a0-9ae7-4c1e-95ee-534ba55c6e10.png",
  alt: "Securities and Exchange Commission Logo"
}, {
  name: "Ghana Stock Exchange",
  logo: "/lovable-uploads/a028936c-4eb7-490c-baf1-39fbdaaf1fd8.png",
  alt: "Ghana Stock Exchange Logo"
}, {
  name: "Central Securities Depository",
  logo: "/lovable-uploads/6b658321-aa10-4753-883f-344ac3884071.png",
  alt: "Central Securities Depository Logo"
}, {
  name: "Ghana Securities Industry Association",
  logo: "/lovable-uploads/7cf3de7a-45d0-4f2c-b42c-6b8cabcbc9b5.png",
  alt: "Ghana Securities Industry Association Logo"
}];
const ClientsCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
    dragFree: true,
    slidesToScroll: 1
  }, [Autoplay({
    delay: 4000,
    stopOnInteraction: false
  })]);
  useEffect(() => {
    if (emblaApi) {
      console.log("Embla carousel initialized");
    }
  }, [emblaApi]);
  return <section className="py-20 bg-gray-50 dark:bg-cc-navy/80 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-left mb-16">
          <div className="text-cc-gold uppercase tracking-wide font-medium mb-4">OUR REGULATORS</div>
          <h2 className="text-4xl md:text-5xl font-bold text-cc-navy dark:text-white mb-6">We Work With Industry Partners</h2>
          <p className="max-w-3xl text-lg text-gray-600 dark:text-gray-300">
            Constant Capital collaborates with key regulatory and industry bodies in Ghana's financial sector,
            ensuring compliance and maintaining the highest standards of financial services.
          </p>
        </div>

        <div className="mt-16">
          <div className="overflow-hidden" ref={emblaRef}>
            <Carousel opts={{
            align: "center",
            loop: true,
            skipSnaps: false,
            dragFree: true
          }} plugins={[Autoplay({
            delay: 4000,
            stopOnInteraction: false,
            stopOnMouseEnter: true,
            playOnInit: true
          })]} className="w-full">
              <CarouselContent className="-ml-8 md:-ml-12">
                {[...partners, ...partners].map((partner, index) => <CarouselItem key={`${partner.name}-${index}`} className="pl-8 md:pl-12 basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5">
                    <div className="p-4">
                      <div className={cn("flex items-center justify-center p-6 md:p-8", "h-32 md:h-40 lg:h-48", "transition-all duration-500 ease-in-out", "transform hover:scale-105")}>
                        <img src={partner.logo} alt={partner.alt} className="max-h-full max-w-full object-contain transition-all duration-500 ease-in-out filter grayscale hover:grayscale-0 opacity-70 hover:opacity-100" style={{
                      filter: 'grayscale(0.5) brightness(0.9)',
                      transition: 'all 0.5s ease-in-out'
                    }} onMouseEnter={e => {
                      e.currentTarget.style.filter = 'grayscale(0) brightness(1)';
                    }} onMouseLeave={e => {
                      e.currentTarget.style.filter = 'grayscale(0.5) brightness(0.9)';
                    }} />
                      </div>
                    </div>
                  </CarouselItem>)}
              </CarouselContent>
            </Carousel>
          </div>
        </div>

        {/* Subtle gradient overlays for infinite scroll effect */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-16 h-full bg-gradient-to-r from-gray-50 to-transparent dark:from-cc-navy/80 pointer-events-none"></div>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-16 h-full bg-gradient-to-l from-gray-50 to-transparent dark:from-cc-navy/80 pointer-events-none"></div>
      </div>
    </section>;
};
export default ClientsCarousel;