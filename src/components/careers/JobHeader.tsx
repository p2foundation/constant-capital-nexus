import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, MapPin, Clock, Building2, Calendar, AlertTriangle } from 'lucide-react';
import { format, differenceInDays } from 'date-fns';
import { JobListing } from '@/data/careers';

interface JobHeaderProps {
  job: JobListing;
}

const JobHeader = ({ job }: JobHeaderProps) => {
  const daysUntilClosing = job.closingDate
    ? differenceInDays(new Date(job.closingDate), new Date())
    : null;

  return (
    <section className="pt-20 pb-10 md:pt-28 md:pb-14 bg-gradient-to-br from-cc-navy via-cc-navy/95 to-cc-blue relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 right-20 w-64 h-64 bg-cc-gold/30 rounded-full blur-3xl" />
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <Link to="/careers" className="inline-flex items-center text-gray-400 hover:text-cc-gold text-sm mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to all positions
        </Link>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            {job.isFeatured && <Badge className="bg-cc-gold/20 text-cc-gold border-cc-gold/30">FEATURED</Badge>}
            <Badge variant="outline" className="text-gray-300 border-gray-600">{job.department}</Badge>
            {daysUntilClosing !== null && daysUntilClosing <= 7 && daysUntilClosing >= 0 && (
              <Badge className="bg-red-500/20 text-red-400 border-red-500/30 animate-pulse">
                <AlertTriangle className="w-3 h-3 mr-1" />
                {daysUntilClosing === 0 ? 'Closing today!' : `${daysUntilClosing} day${daysUntilClosing !== 1 ? 's' : ''} left`}
              </Badge>
            )}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">{job.title}</h1>
          <div className="flex items-center gap-5 text-gray-300 text-sm flex-wrap">
            <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" />{job.location}</span>
            <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" />{job.type}</span>
            <span className="flex items-center gap-1.5"><Building2 className="w-4 h-4" />{job.workMode}</span>
            <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" />Posted {format(new Date(job.postedDate), 'MMM d, yyyy')}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default JobHeader;
