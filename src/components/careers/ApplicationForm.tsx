import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { Mail, Upload, CheckCircle, User, Briefcase, FileText, ArrowRight, ArrowLeft } from 'lucide-react';
import { JobListing } from '@/data/careers';

interface ApplicationFormProps {
  job: JobListing;
  visible: boolean;
}

type Step = 1 | 2 | 3;

const stepLabels = ['Personal Info', 'Experience', 'Cover Letter & Submit'];

const ApplicationForm = ({ job, visible }: ApplicationFormProps) => {
  const { toast } = useToast();
  const [step, setStep] = useState<Step>(1);
  const [submitted, setSubmitted] = useState(false);
  const [agreedToPrivacy, setAgreedToPrivacy] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    currentRole: '',
    yearsExperience: '',
    linkedIn: '',
    portfolio: '',
    coverLetter: '',
    heardFrom: '',
    noticePeriod: '',
    expectedSalary: '',
  });

  const update = (field: string, value: string) =>
    setFormData(p => ({ ...p, [field]: value }));

  const canProceedStep1 = formData.fullName && formData.email && formData.phone;
  const canProceedStep2 = formData.yearsExperience;
  const canSubmit = formData.coverLetter && agreedToPrivacy;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const body = `Full Name: ${formData.fullName}
Email: ${formData.email}
Phone: ${formData.phone}
Current Role: ${formData.currentRole}
Years of Experience: ${formData.yearsExperience}
Notice Period: ${formData.noticePeriod}
Expected Salary: ${formData.expectedSalary}
LinkedIn: ${formData.linkedIn}
Portfolio: ${formData.portfolio}
How did you hear about us: ${formData.heardFrom}

Cover Letter:
${formData.coverLetter}`;

    window.location.href = `mailto:${job.applicationEmail}?subject=${encodeURIComponent(job.subjectLine)}&body=${encodeURIComponent(body)}`;

    setSubmitted(true);
    toast({
      title: "Application Started",
      description: "Your email client should open. Please attach your CV before sending.",
    });
  };

  if (!visible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 'auto' }}
      className="mt-12 max-w-2xl mx-auto"
    >
      <div className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-lg">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-foreground">Apply for {job.title}</h2>
          <p className="text-sm text-muted-foreground mt-1">Complete the form below. Your email client will open with details pre-filled.</p>
        </div>

        {/* Success State */}
        <AnimatePresence>
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-10"
            >
              <div className="w-16 h-16 bg-green-500/15 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Application Ready!</h3>
              <p className="text-muted-foreground max-w-md mx-auto mb-4">
                Your email client should have opened with your details pre-filled. <strong>Don't forget to attach your CV/resume</strong> before sending.
              </p>
              <div className="bg-muted/50 rounded-lg p-4 text-sm text-muted-foreground max-w-sm mx-auto">
                <p className="font-medium text-foreground mb-1">Didn't open?</p>
                Send your CV manually to{' '}
                <a href={`mailto:${job.applicationEmail}?subject=${encodeURIComponent(job.subjectLine)}`} className="text-cc-gold hover:underline font-medium">
                  {job.applicationEmail}
                </a>
              </div>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => { setSubmitted(false); setStep(1); }}
              >
                Submit Another Application
              </Button>
            </motion.div>
          ) : (
            <>
              {/* Step Indicator */}
              <div className="flex items-center gap-2 mb-8">
                {stepLabels.map((label, i) => (
                  <React.Fragment key={label}>
                    <div className="flex items-center gap-2">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                        step > i + 1 ? 'bg-green-500 text-white' :
                        step === i + 1 ? 'bg-cc-gold text-cc-navy' :
                        'bg-muted text-muted-foreground'
                      }`}>
                        {step > i + 1 ? <CheckCircle className="w-4 h-4" /> : i + 1}
                      </div>
                      <span className={`text-xs hidden sm:block ${step === i + 1 ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
                        {label}
                      </span>
                    </div>
                    {i < stepLabels.length - 1 && (
                      <div className={`flex-1 h-0.5 ${step > i + 1 ? 'bg-green-500' : 'bg-muted'}`} />
                    )}
                  </React.Fragment>
                ))}
              </div>

              <form onSubmit={handleSubmit}>
                <AnimatePresence mode="wait">
                  {/* Step 1: Personal Info */}
                  {step === 1 && (
                    <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                      <div className="flex items-center gap-2 mb-2">
                        <User className="w-5 h-5 text-cc-gold" />
                        <h3 className="font-semibold text-foreground">Personal Information</h3>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="fullName">Full Name <span className="text-red-500">*</span></Label>
                          <Input id="fullName" value={formData.fullName} onChange={e => update('fullName', e.target.value)} placeholder="e.g. Kwame Asante" />
                        </div>
                        <div>
                          <Label htmlFor="email">Email Address <span className="text-red-500">*</span></Label>
                          <Input id="email" type="email" value={formData.email} onChange={e => update('email', e.target.value)} placeholder="kwame@example.com" />
                        </div>
                        <div>
                          <Label htmlFor="phone">Phone Number <span className="text-red-500">*</span></Label>
                          <Input id="phone" value={formData.phone} onChange={e => update('phone', e.target.value)} placeholder="+233 XX XXX XXXX" />
                        </div>
                        <div>
                          <Label htmlFor="linkedIn">LinkedIn Profile</Label>
                          <Input id="linkedIn" value={formData.linkedIn} onChange={e => update('linkedIn', e.target.value)} placeholder="https://linkedin.com/in/..." />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="portfolio">Portfolio / Website (optional)</Label>
                        <Input id="portfolio" value={formData.portfolio} onChange={e => update('portfolio', e.target.value)} placeholder="https://yoursite.com" />
                      </div>
                      <div className="flex justify-end pt-2">
                        <Button type="button" onClick={() => setStep(2)} disabled={!canProceedStep1} className="bg-cc-gold hover:bg-cc-gold/90 text-cc-navy font-bold">
                          Next: Experience <ArrowRight className="w-4 h-4 ml-1" />
                        </Button>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 2: Experience */}
                  {step === 2 && (
                    <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Briefcase className="w-5 h-5 text-cc-gold" />
                        <h3 className="font-semibold text-foreground">Professional Experience</h3>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="currentRole">Current / Most Recent Role</Label>
                          <Input id="currentRole" value={formData.currentRole} onChange={e => update('currentRole', e.target.value)} placeholder="e.g. IT Specialist at ABC Ltd" />
                        </div>
                        <div>
                          <Label htmlFor="experience">Years of Experience <span className="text-red-500">*</span></Label>
                          <Select value={formData.yearsExperience} onValueChange={v => update('yearsExperience', v)}>
                            <SelectTrigger><SelectValue placeholder="Select range" /></SelectTrigger>
                            <SelectContent>
                              <SelectItem value="0-1">0–1 years</SelectItem>
                              <SelectItem value="2-4">2–4 years</SelectItem>
                              <SelectItem value="5-7">5–7 years</SelectItem>
                              <SelectItem value="8-10">8–10 years</SelectItem>
                              <SelectItem value="10+">10+ years</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="noticePeriod">Notice Period</Label>
                          <Select value={formData.noticePeriod} onValueChange={v => update('noticePeriod', v)}>
                            <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Immediately">Immediately</SelectItem>
                              <SelectItem value="2 weeks">2 weeks</SelectItem>
                              <SelectItem value="1 month">1 month</SelectItem>
                              <SelectItem value="2 months">2 months</SelectItem>
                              <SelectItem value="3+ months">3+ months</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="expectedSalary">Expected Salary (GHS/month)</Label>
                          <Input id="expectedSalary" value={formData.expectedSalary} onChange={e => update('expectedSalary', e.target.value)} placeholder="e.g. 5,000 - 8,000" />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="heardFrom">How did you hear about this role?</Label>
                        <Select value={formData.heardFrom} onValueChange={v => update('heardFrom', v)}>
                          <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                            <SelectItem value="Company Website">Company Website</SelectItem>
                            <SelectItem value="Referral">Employee Referral</SelectItem>
                            <SelectItem value="Job Board">Job Board (Jobberman, etc.)</SelectItem>
                            <SelectItem value="Social Media">Social Media</SelectItem>
                            <SelectItem value="University">University / Career Fair</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex justify-between pt-2">
                        <Button type="button" variant="outline" onClick={() => setStep(1)}>
                          <ArrowLeft className="w-4 h-4 mr-1" /> Back
                        </Button>
                        <Button type="button" onClick={() => setStep(3)} disabled={!canProceedStep2} className="bg-cc-gold hover:bg-cc-gold/90 text-cc-navy font-bold">
                          Next: Cover Letter <ArrowRight className="w-4 h-4 ml-1" />
                        </Button>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 3: Cover Letter & Submit */}
                  {step === 3 && (
                    <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                      <div className="flex items-center gap-2 mb-2">
                        <FileText className="w-5 h-5 text-cc-gold" />
                        <h3 className="font-semibold text-foreground">Cover Letter & Submission</h3>
                      </div>
                      <div>
                        <Label htmlFor="coverLetter">Cover Letter <span className="text-red-500">*</span></Label>
                        <Textarea
                          id="coverLetter"
                          value={formData.coverLetter}
                          onChange={e => update('coverLetter', e.target.value)}
                          placeholder="Tell us why you're the right fit for this role. What excites you about Constant Capital? What unique value do you bring?"
                          className="min-h-[180px]"
                        />
                        <p className="text-xs text-muted-foreground mt-1">{formData.coverLetter.length} characters</p>
                      </div>

                      <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4 text-sm text-amber-700 dark:text-amber-400">
                        <Upload className="w-4 h-4 inline mr-1.5" />
                        <strong>Important:</strong> Your email client will open with details pre-filled. Please <strong>attach your CV/resume</strong> and any supporting documents before sending.
                      </div>

                      {/* Summary */}
                      <div className="bg-muted/50 rounded-lg p-4 text-sm space-y-1">
                        <p className="font-medium text-foreground mb-2">Application Summary</p>
                        <p className="text-muted-foreground"><span className="font-medium text-foreground">Name:</span> {formData.fullName}</p>
                        <p className="text-muted-foreground"><span className="font-medium text-foreground">Email:</span> {formData.email}</p>
                        <p className="text-muted-foreground"><span className="font-medium text-foreground">Experience:</span> {formData.yearsExperience} years</p>
                        {formData.currentRole && <p className="text-muted-foreground"><span className="font-medium text-foreground">Current Role:</span> {formData.currentRole}</p>}
                      </div>

                      <div className="flex items-start gap-2">
                        <Checkbox
                          id="privacy"
                          checked={agreedToPrivacy}
                          onCheckedChange={(checked) => setAgreedToPrivacy(checked === true)}
                        />
                        <Label htmlFor="privacy" className="text-xs text-muted-foreground leading-tight cursor-pointer">
                          I consent to Constant Capital processing my personal data for recruitment purposes. I understand my data will be handled in accordance with the{' '}
                          <a href="/privacy-policy" className="text-cc-gold hover:underline">Privacy Policy</a>.
                        </Label>
                      </div>

                      <div className="flex justify-between pt-2">
                        <Button type="button" variant="outline" onClick={() => setStep(2)}>
                          <ArrowLeft className="w-4 h-4 mr-1" /> Back
                        </Button>
                        <Button type="submit" disabled={!canSubmit} className="bg-cc-gold hover:bg-cc-gold/90 text-cc-navy font-bold">
                          <Mail className="w-4 h-4 mr-2" /> Submit Application
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default ApplicationForm;
