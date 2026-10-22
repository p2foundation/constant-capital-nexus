import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHero from '@/components/layout/PageHero';
import { jobListings, departments, jobTypes, workModes } from '@/data/careers';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Search, MapPin, Clock, Briefcase, Building2, ArrowRight, Users, TrendingUp, Shield, Star } from 'lucide-react';

const Careers = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('All Departments');
  const [selectedType, setSelectedType] = useState('All Types');
  const [selectedMode, setSelectedMode] = useState('All Modes');

  const filteredJobs = useMemo(() => {
    return jobListings.filter((job) => {
      if (!job.isActive) return false;
      const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.department.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDept = selectedDept === 'All Departments' || job.department === selectedDept;
      const matchesType = selectedType === 'All Types' || job.type === selectedType;
      const matchesMode = selectedMode === 'All Modes' || job.workMode === selectedMode;
      return matchesSearch && matchesDept && matchesType && matchesMode;
    });
  }, [searchQuery, selectedDept, selectedType, selectedMode]);

  const activeCount = jobListings.filter(j => j.isActive).length;

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Careers | Constant Capital Ghana</title>
        <meta name="description" content="Join Constant Capital Ghana. Explore career opportunities in investment banking, research, technology, and more." />
      </Helmet>
      <Navbar />

      <div className="pt-16">
        <PageHero
          eyebrow={`${activeCount} Open Position${activeCount !== 1 ? 's' : ''}`}
          title={<>Build your career at <span className="text-accent">Constant Capital</span></>}
          description="Join one of Ghana's leading investment firms. We're looking for talented individuals who want to make an impact in financial services."
          primaryCta={{ label: 'View open roles', to: '#open-positions' }}
          icon={Briefcase}
          highlights={['Fast-track career growth', 'Collaborative, high-trust team', 'SEC-licensed, stable firm', 'Work that is visible and valued']}
        />
      </div>

      {/* Culture Cards */}
      <section className="py-12 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { icon: TrendingUp, title: 'Growth', desc: 'Fast-track your career' },
              { icon: Users, title: 'Team', desc: 'Collaborative culture' },
              { icon: Shield, title: 'Stability', desc: 'SEC-licensed firm' },
              { icon: Star, title: 'Impact', desc: 'Visible contributions' },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-card rounded-xl p-5 text-center border border-border shadow-sm"
              >
                <item.icon className="w-8 h-8 text-accent mx-auto mb-2" />
                <h3 className="font-semibold text-foreground text-sm">{item.title}</h3>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Listings */}
      <section id="open-positions" className="scroll-mt-20 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">Open Positions</h2>

          {/* Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search roles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedDept} onValueChange={setSelectedDept}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {departments.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {jobTypes.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={selectedMode} onValueChange={setSelectedMode}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {workModes.map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          {/* Results */}
          {filteredJobs.length === 0 ? (
            <div className="text-center py-16 bg-muted/30 rounded-2xl border border-border">
              <Briefcase className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No positions found</h3>
              <p className="text-muted-foreground text-sm max-w-md mx-auto">
                No roles match your filters right now. Try adjusting your search or check back soon — we're always growing.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredJobs.map((job, i) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    to={`/careers/${job.id}`}
                    className="group block bg-card border border-border rounded-xl p-5 md:p-6 hover:border-accent/50 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          {job.isFeatured && (
                            <Badge className="bg-accent/15 text-accent border-accent/30 text-[10px]">FEATURED</Badge>
                          )}
                          <Badge variant="outline" className="text-[10px]">{job.department}</Badge>
                        </div>
                        <h3 className="text-lg md:text-xl font-bold text-foreground group-hover:text-accent transition-colors">
                          {job.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{job.summary}</p>
                        <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground flex-wrap">
                          <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{job.location}</span>
                          <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{job.type}</span>
                          <span className="flex items-center gap-1"><Building2 className="w-3.5 h-3.5" />{job.workMode}</span>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Button variant="outline" size="sm" className="group-hover:bg-accent group-hover:text-accent-foreground group-hover:border-accent transition-all">
                          View Details <ArrowRight className="w-4 h-4 ml-1" />
                        </Button>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* General Application CTA */}
      <section className="py-12 md:py-16 bg-muted/50">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <h2 className="text-2xl font-bold text-foreground mb-3">Don't See Your Role?</h2>
          <p className="text-muted-foreground mb-6">
            We're always looking for exceptional talent. Send your CV to{' '}
            <a href="mailto:info@constantcap.com.gh?subject=General Application" className="text-accent hover:underline font-medium">
              info@constantcap.com.gh
            </a>{' '}
            and we'll keep you in mind for future openings.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Careers;
