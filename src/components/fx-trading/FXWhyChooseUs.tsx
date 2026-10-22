
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Award, Users, Zap, Lock, HeadphonesIcon } from 'lucide-react';

const features = [
  {
    icon: Award,
    title: 'Licensed & Regulated',
    description: 'Fully licensed by the Securities and Exchange Commission (SEC) and Bank of Ghana (BoG) for FX trading.',
  },
  {
    icon: Zap,
    title: 'Competitive Rates',
    description: 'Access to interbank rates with tight spreads, ensuring you get the best value for your transactions.',
  },
  {
    icon: Lock,
    title: 'Secure Transactions',
    description: 'Bank-grade security protocols and encrypted communications protect every transaction.',
  },
  {
    icon: Users,
    title: 'Dedicated Support',
    description: 'Personal relationship managers and FX specialists available to assist with your trading needs.',
  },
  {
    icon: HeadphonesIcon,
    title: '24/5 Trading Desk',
    description: 'Our trading desk operates during all major market hours to execute your orders promptly.',
  },
  {
    icon: CheckCircle2,
    title: 'Seamless Settlement',
    description: 'Efficient settlement processes with same-day options for urgent transactions.',
  },
];

const FXWhyChooseUs = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-accent font-medium text-sm uppercase tracking-wider">Why Choose Us</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-6">
              Your Trusted Partner for Foreign Exchange
            </h2>
            <p className="text-gray-600 dark:text-muted-foreground mb-8">
              With our newly acquired FX license, we bring the same excellence and professionalism 
              that defines our securities trading to the foreign exchange market. Our team combines 
              deep market expertise with cutting-edge technology to deliver superior FX services.
            </p>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-card rounded-xl p-6">
                <div className="text-4xl font-bold text-accent mb-2">10+</div>
                <div className="text-gray-600 dark:text-muted-foreground text-sm">Years in Financial Markets</div>
              </div>
              <div className="bg-card rounded-xl p-6">
                <div className="text-4xl font-bold text-accent mb-2">500+</div>
                <div className="text-gray-600 dark:text-muted-foreground text-sm">Corporate Clients Served</div>
              </div>
              <div className="bg-card rounded-xl p-6">
                <div className="text-4xl font-bold text-accent mb-2">₵2B+</div>
                <div className="text-gray-600 dark:text-muted-foreground text-sm">Annual Trading Volume</div>
              </div>
              <div className="bg-card rounded-xl p-6">
                <div className="text-4xl font-bold text-accent mb-2">99.9%</div>
                <div className="text-gray-600 dark:text-muted-foreground text-sm">Order Execution Rate</div>
              </div>
            </div>
          </motion.div>
          
          {/* Right Content - Features */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex gap-4 p-4 rounded-xl bg-card hover:bg-accent/5 dark:hover:bg-accent/5 transition-colors group"
              >
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-colors">
                  <feature.icon className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-muted-foreground text-sm">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FXWhyChooseUs;
