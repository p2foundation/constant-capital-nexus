import React from 'react';

interface Partner {
  name: string;
  short: string;
  logo: string;
}

const partners: Partner[] = [
  { name: "Securities and Exchange Commission", short: "SEC Ghana", logo: "/lovable-uploads/cc8b89a0-9ae7-4c1e-95ee-534ba55c6e10.png" },
  { name: "Ghana Stock Exchange", short: "GSE", logo: "/lovable-uploads/a028936c-4eb7-490c-baf1-39fbdaaf1fd8.png" },
  { name: "Central Securities Depository", short: "CSD", logo: "/lovable-uploads/6b658321-aa10-4753-883f-344ac3884071.png" },
  { name: "Ghana Securities Industry Association", short: "GSIA", logo: "/lovable-uploads/7cf3de7a-45d0-4f2c-b42c-6b8cabcbc9b5.png" },
];

const LogoCard = ({ p, hidden }: { p: Partner; hidden?: boolean }) => (
  <li
    aria-hidden={hidden}
    className="flex w-56 sm:w-64 shrink-0 flex-col items-center justify-center gap-3 rounded-2xl border border-gray-200 bg-white px-6 py-6 shadow-sm dark:border-white/10 dark:bg-white"
  >
    <img
      src={p.logo}
      alt={hidden ? "" : `${p.name} logo`}
      loading="lazy"
      decoding="async"
      className="h-20 sm:h-24 w-full object-contain"
    />
    <span className="text-center text-xs font-semibold text-gray-700">{p.short}</span>
  </li>
);

const ClientsCarousel = () => {
  return (
    <section className="py-20 bg-gray-50 dark:bg-card overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-left mb-12">
          <div className="text-cc-gold uppercase tracking-wide font-medium mb-4">OUR REGULATORS</div>
          <h2 className="text-4xl md:text-5xl font-bold text-cc-navy dark:text-white mb-6">We Work With Industry Partners</h2>
          <p className="max-w-3xl text-lg text-gray-600 dark:text-muted-foreground">
            Constant Capital collaborates with key regulatory and industry bodies in Ghana's financial sector,
            ensuring compliance and maintaining the highest standards of financial services.
          </p>
        </div>
      </div>

      {/* Smooth continuous strip; pauses on hover, static for reduced-motion users */}
      <div className="group relative [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <ul className="flex w-max gap-6 py-2 animate-[regulator-scroll_35s_linear_infinite] group-hover:[animation-play-state:paused] motion-reduce:animate-none motion-reduce:flex-wrap motion-reduce:w-full motion-reduce:justify-center">
          {partners.map((p) => <LogoCard key={p.name} p={p} />)}
          {[...partners, ...partners, ...partners].map((p, i) => (
            <span key={i} className="contents motion-reduce:hidden"><LogoCard p={p} hidden /></span>
          ))}
        </ul>
      </div>
      <style>{`@keyframes regulator-scroll{from{transform:translateX(0)}to{transform:translateX(-50%)}}`}</style>
    </section>
  );
};

export default ClientsCarousel;
