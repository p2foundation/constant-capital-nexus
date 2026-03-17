
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Phone, Mail, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const FXCTASection = () => {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-cc-navy via-cc-blue to-cc-navy">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(212, 175, 55, 0.3) 0%, transparent 50%),
                              radial-gradient(circle at 75% 75%, rgba(212, 175, 55, 0.2) 0%, transparent 50%)`,
          }} />
        </div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Ready to Start Trading FX?
            </h2>
            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
              Open your FX trading account today and experience competitive rates, 
              expert service, and seamless execution.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-16">
              <Link to="/account-opening">
                <Button size="lg" className="bg-cc-gold hover:bg-cc-gold/90 text-cc-navy font-semibold px-8">
                  Open FX Account
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="border-white/30 bg-white text-cc-navy font-semibold hover:bg-white/10 hover:text-white">
                  Speak to an Advisor
                </Button>
              </Link>
            </div>
            
            {/* Contact Info */}
            <div className="grid md:grid-cols-3 gap-8 pt-10 border-t border-white/10">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-cc-gold/20 flex items-center justify-center mb-3">
                  <Phone className="h-5 w-5 text-cc-gold" />
                </div>
                <div className="text-gray-400 text-sm mb-1">FX Trading Desk</div>
                <a href="tel:+233302123456" className="text-white font-medium hover:text-cc-gold transition-colors">
                  +233 (0) 302 123 456
                </a>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-cc-gold/20 flex items-center justify-center mb-3">
                  <Mail className="h-5 w-5 text-cc-gold" />
                </div>
                <div className="text-gray-400 text-sm mb-1">Email</div>
                <a href="mailto:fx@constantcap.com.gh" className="text-white font-medium hover:text-cc-gold transition-colors">
                  fx@constantcap.com.gh
                </a>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-cc-gold/20 flex items-center justify-center mb-3">
                  <MapPin className="h-5 w-5 text-cc-gold" />
                </div>
                <div className="text-gray-400 text-sm mb-1">Visit Us</div>
                <div className="text-white font-medium">Accra, Ghana</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FXCTASection;
