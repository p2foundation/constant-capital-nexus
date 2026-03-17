import { useState, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { jobListings } from '@/data/careers';
import { Button } from '@/components/ui/button';
import JobHeader from '@/components/careers/JobHeader';
import JobContent from '@/components/careers/JobContent';
import JobSidebar from '@/components/careers/JobSidebar';
import ApplicationForm from '@/components/careers/ApplicationForm';

const CareerDetail = () => {
  const { id } = useParams();
  const job = jobListings.find(j => j.id === id);
  const [showForm, setShowForm] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  const handleApplyClick = () => {
    setShowForm(prev => !prev);
    if (!showForm) {
      setTimeout(() => formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
    }
  };

  if (!job) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-24 pb-16 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Position Not Found</h1>
          <p className="text-muted-foreground mb-6">This job listing may have been removed or is no longer available.</p>
          <Button asChild><Link to="/careers">Browse Open Positions</Link></Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{job.title} | Careers | Constant Capital Ghana</title>
        <meta name="description" content={job.summary} />
      </Helmet>
      <Navbar />

      <JobHeader job={job} />

      <section className="py-10 md:py-14">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <JobContent job={job} />
            </div>
            <JobSidebar job={job} onApplyClick={handleApplyClick} showForm={showForm} />
          </div>

          <div ref={formRef}>
            <ApplicationForm job={job} visible={showForm} />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CareerDetail;
