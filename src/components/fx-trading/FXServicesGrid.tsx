
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Repeat, 
  Shield, 
  Building2, 
  Briefcase, 
  LineChart, 
  Clock,
  ArrowRightLeft,
  Landmark
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const services = [
  {
    icon: Repeat,
    title: 'Spot Transactions',
    description: 'Execute immediate currency exchanges at competitive market rates with T+2 settlement for your international payments.',
    color: 'from-blue-500/20 to-blue-600/20',
    iconColor: 'text-blue-400',
  },
  {
    icon: ArrowRightLeft,
    title: 'Forward Contracts',
    description: 'Lock in exchange rates for future transactions to protect against currency fluctuations and budget with certainty.',
    color: 'from-purple-500/20 to-purple-600/20',
    iconColor: 'text-purple-400',
  },
  {
    icon: Shield,
    title: 'Hedging Solutions',
    description: 'Comprehensive risk management strategies to protect your business from adverse currency movements.',
    color: 'from-green-500/20 to-green-600/20',
    iconColor: 'text-green-400',
  },
  {
    icon: Building2,
    title: 'Corporate FX',
    description: 'Tailored foreign exchange solutions for corporations with international trade and investment activities.',
    color: 'from-orange-500/20 to-orange-600/20',
    iconColor: 'text-orange-400',
  },
  {
    icon: Landmark,
    title: 'Institutional Trading',
    description: 'High-volume currency trading services for banks, asset managers, and financial institutions.',
    color: 'from-cyan-500/20 to-cyan-600/20',
    iconColor: 'text-cyan-400',
  },
  {
    icon: LineChart,
    title: 'FX Advisory',
    description: 'Expert guidance on currency markets, optimal timing, and strategic FX management for your portfolio.',
    color: 'from-pink-500/20 to-pink-600/20',
    iconColor: 'text-pink-400',
  },
  {
    icon: Briefcase,
    title: 'Trade Finance FX',
    description: 'Specialized foreign exchange services for import/export businesses and trade finance transactions.',
    color: 'from-amber-500/20 to-amber-600/20',
    iconColor: 'text-amber-400',
  },
  {
    icon: Clock,
    title: 'Same-Day Settlement',
    description: 'Expedited currency settlements for urgent transactions with real-time execution and confirmation.',
    color: 'from-red-500/20 to-red-600/20',
    iconColor: 'text-red-400',
  },
];

const FXServicesGrid = () => {
  return (
    <section className="py-20 bg-cc-gray dark:bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-accent font-medium text-sm uppercase tracking-wider">Our FX Services</span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
            Comprehensive Foreign Exchange Solutions
          </h2>
          <p className="text-gray-600 dark:text-muted-foreground max-w-2xl mx-auto">
            From simple currency conversions to complex hedging strategies, 
            we provide the full spectrum of FX services to meet your needs.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full bg-card border-none shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden">
                <CardContent className="p-6 relative">
                  {/* Background Gradient */}
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${service.color} rounded-full blur-3xl opacity-50 group-hover:opacity-75 transition-opacity`} />
                  
                  <div className="relative">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <service.icon className={`h-7 w-7 ${service.iconColor}`} />
                    </div>
                    
                    <h3 className="text-lg font-bold text-foreground mb-2">
                      {service.title}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-muted-foreground text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FXServicesGrid;
