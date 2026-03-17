
import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface CurrencyPair {
  pair: string;
  rate: string;
  change: number;
  flag1: string;
  flag2: string;
}

const currencyPairs: CurrencyPair[] = [
  { pair: 'USD/GHS', rate: '14.85', change: 0.25, flag1: '🇺🇸', flag2: '🇬🇭' },
  { pair: 'EUR/GHS', rate: '16.22', change: 0.18, flag1: '🇪🇺', flag2: '🇬🇭' },
  { pair: 'GBP/GHS', rate: '18.95', change: -0.12, flag1: '🇬🇧', flag2: '🇬🇭' },
  { pair: 'CHF/GHS', rate: '17.10', change: 0.08, flag1: '🇨🇭', flag2: '🇬🇭' },
  { pair: 'JPY/GHS', rate: '0.099', change: -0.05, flag1: '🇯🇵', flag2: '🇬🇭' },
  { pair: 'CAD/GHS', rate: '10.85', change: 0.15, flag1: '🇨🇦', flag2: '🇬🇭' },
  { pair: 'AUD/GHS', rate: '9.62', change: 0.22, flag1: '🇦🇺', flag2: '🇬🇭' },
  { pair: 'CNY/GHS', rate: '2.05', change: 0.10, flag1: '🇨🇳', flag2: '🇬🇭' },
];

const FXLiveTicker = () => {
  // Double the items for seamless loop
  const duplicatedPairs = [...currencyPairs, ...currencyPairs];
  
  return (
    <section className="bg-cc-navy border-y border-cc-gold/20 py-4 overflow-hidden">
      <div className="flex items-center">
        <div className="bg-cc-gold text-cc-navy px-6 py-2 font-semibold text-sm uppercase tracking-wide shrink-0 z-10">
          Live FX Rates
        </div>
        
        <div className="relative flex-1 overflow-hidden">
          <motion.div
            className="flex gap-8"
            animate={{ x: ['0%', '-50%'] }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            {duplicatedPairs.map((pair, index) => (
              <div
                key={`${pair.pair}-${index}`}
                className="flex items-center gap-3 shrink-0 px-4"
              >
                <div className="flex items-center gap-1 text-lg">
                  <span>{pair.flag1}</span>
                  <span className="text-gray-500">/</span>
                  <span>{pair.flag2}</span>
                </div>
                <div>
                  <div className="text-white font-medium text-sm">{pair.pair}</div>
                  <div className="flex items-center gap-2">
                    <span className="text-white font-bold">{pair.rate}</span>
                    <span className={`flex items-center text-xs ${pair.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {pair.change >= 0 ? (
                        <TrendingUp className="h-3 w-3 mr-0.5" />
                      ) : (
                        <TrendingDown className="h-3 w-3 mr-0.5" />
                      )}
                      {pair.change >= 0 ? '+' : ''}{pair.change}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FXLiveTicker;
