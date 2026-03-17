
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Globe, TrendingUp, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const FXHeroSection = () => {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-cc-navy via-cc-navy/95 to-cc-blue/90">
        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(212, 175, 55, 0.3) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(212, 175, 55, 0.3) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }} />
        </div>
        
        {/* Floating Currency Symbols */}
        <div className="absolute inset-0 overflow-hidden">
          {['$', '€', '£', '¥', '₵', '₦'].map((symbol, i) => (
            <motion.div
              key={i}
              className="absolute text-cc-gold/10 text-6xl md:text-8xl font-bold select-none"
              style={{
                left: `${10 + i * 15}%`,
                top: `${20 + (i % 3) * 25}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.5,
              }}
            >
              {symbol}
            </motion.div>
          ))}
        </div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 bg-cc-gold/20 backdrop-blur-sm border border-cc-gold/30 rounded-full px-4 py-2 mb-6">
              <Shield className="h-4 w-4 text-cc-gold" />
              <span className="text-cc-gold text-sm font-medium">SEC & BoG Licensed FX Dealer</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Foreign Exchange
              <span className="block text-cc-gold">Trading Excellence</span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 max-w-xl">
              Access competitive exchange rates and institutional-grade FX services. 
              From spot transactions to hedging solutions, we deliver precision and reliability.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link to="/contact">
                <Button size="lg" className="bg-cc-gold hover:bg-cc-gold/90 text-cc-navy font-semibold px-8">
                  Start Trading
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/account-opening">
                <Button size="lg" variant="outline" className="border-white/30 bg-white text-cc-navy font-semibold hover:bg-white/10 hover:text-white">
                  Open FX Account
                </Button>
              </Link>
            </div>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-white/10">
              <div>
                <div className="text-3xl font-bold text-cc-gold">$50M+</div>
                <div className="text-sm text-gray-400">Daily Volume</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-cc-gold">15+</div>
                <div className="text-sm text-gray-400">Currency Pairs</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-cc-gold">24/5</div>
                <div className="text-sm text-gray-400">Trading Hours</div>
              </div>
            </div>
          </motion.div>
          
          {/* Right Content - Interactive Currency Display */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:block"
          >
            <div className="relative">
              {/* Main Currency Card */}
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-cc-gold/20 rounded-full flex items-center justify-center">
                      <Globe className="h-6 w-6 text-cc-gold" />
                    </div>
                    <div>
                      <div className="text-white font-semibold">USD/GHS</div>
                      <div className="text-gray-400 text-sm">US Dollar / Ghana Cedi</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-green-400">
                    <TrendingUp className="h-5 w-5" />
                    <span className="text-sm font-medium">+0.25%</span>
                  </div>
                </div>
                
                <div className="text-5xl font-bold text-white mb-4">14.85</div>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-white/5 rounded-lg p-4">
                    <div className="text-gray-400 text-sm mb-1">Bid</div>
                    <div className="text-white font-semibold text-lg">14.82</div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4">
                    <div className="text-gray-400 text-sm mb-1">Ask</div>
                    <div className="text-white font-semibold text-lg">14.88</div>
                  </div>
                </div>
                
                {/* Mini Chart Visualization */}
                <div className="h-20 flex items-end gap-1">
                  {[40, 55, 45, 60, 50, 70, 55, 65, 75, 60, 80, 70].map((h, i) => (
                    <motion.div
                      key={i}
                      className="flex-1 bg-gradient-to-t from-cc-gold to-cc-gold/40 rounded-t"
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      transition={{ duration: 0.5, delay: 0.5 + i * 0.05 }}
                    />
                  ))}
                </div>
              </div>
              
              {/* Floating Cards */}
              <motion.div
                className="absolute -left-8 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <div className="text-gray-400 text-xs mb-1">EUR/GHS</div>
                <div className="text-white font-semibold">16.22</div>
              </motion.div>
              
              <motion.div
                className="absolute -right-6 bottom-1/4 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <div className="text-gray-400 text-xs mb-1">GBP/GHS</div>
                <div className="text-white font-semibold">18.95</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FXHeroSection;
