import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Briefcase, CheckCircle2, Star, GraduationCap, Sparkles } from 'lucide-react';
import { JobListing } from '@/data/careers';

interface JobContentProps {
  job: JobListing;
}

const JobContent = ({ job }: JobContentProps) => {
  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <h2 className="text-xl font-bold text-foreground mb-3 flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-cc-gold" /> About the Role
        </h2>
        <p className="text-muted-foreground leading-relaxed">{job.aboutRole}</p>
      </motion.div>

      <Separator />

      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
        <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-cc-gold" /> Key Responsibilities
        </h2>
        <ul className="space-y-3">
          {job.responsibilities.map((r, i) => (
            <li key={i} className="flex items-start gap-3 text-muted-foreground">
              <span className="w-6 h-6 rounded-full bg-cc-gold/15 text-cc-gold flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">{i + 1}</span>
              {r}
            </li>
          ))}
        </ul>
      </motion.div>

      <Separator />

      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
          <Star className="w-5 h-5 text-cc-gold" /> Required Skills
        </h2>
        <div className="flex flex-wrap gap-2">
          {job.requirements.map((req) => (
            <Badge key={req} variant="secondary" className="text-sm py-1.5 px-3">{req}</Badge>
          ))}
        </div>
      </motion.div>

      {job.bonusSkills && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
          <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-cc-gold" /> Bonus Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            {job.bonusSkills.map((skill) => (
              <Badge key={skill} variant="outline" className="text-sm py-1.5 px-3">{skill}</Badge>
            ))}
          </div>
        </motion.div>
      )}

      <Separator />

      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-cc-gold" /> Qualifications
        </h2>
        <ul className="space-y-3">
          {job.qualifications.map((q, i) => (
            <li key={i} className="flex items-start gap-3 text-muted-foreground">
              <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-1" />
              {q}
            </li>
          ))}
        </ul>
      </motion.div>

      <Separator />

      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
        className="bg-cc-gold/5 border border-cc-gold/20 rounded-xl p-6"
      >
        <h2 className="text-xl font-bold text-foreground mb-2">Why Constant Capital?</h2>
        <p className="text-muted-foreground leading-relaxed">{job.whyJoinUs}</p>
      </motion.div>
    </div>
  );
};

export default JobContent;
