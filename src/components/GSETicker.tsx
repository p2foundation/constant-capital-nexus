import React from 'react';

const GSETicker = () => {
  return (
    <div className="bg-white pt-1 pb-4 border-b">
      <div className="container mx-auto px-4">
        <iframe
          src="https://gsestockfeed.com"
          className="w-full h-[40px]"
          scrolling="no"
          frameBorder="0"
          title="Ghana Stock Exchange Ticker"
        ></iframe>
      </div>
    </div>
  );
};

export default GSETicker;
