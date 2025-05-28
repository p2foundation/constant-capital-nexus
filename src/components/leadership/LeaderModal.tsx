
import React from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Leader {
  id: string;
  name: string;
  title: string;
  imageSrc: string;
  bio: string;
  education?: string;
  experience?: string[];
  achievements?: string[];
}

interface LeaderModalProps {
  leader: Leader;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  currentIndex: number;
  totalLeaders: number;
}

const LeaderModal: React.FC<LeaderModalProps> = ({
  leader,
  isOpen,
  onClose,
  onNext,
  onPrev,
  currentIndex,
  totalLeaders
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="relative">
          {/* Header with navigation */}
          <DialogHeader className="sticky top-0 bg-white dark:bg-gray-800 border-b dark:border-gray-700 p-6 flex flex-row items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="icon"
                onClick={onPrev}
                className="h-8 w-8 dark:border-gray-600 dark:hover:bg-gray-700"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <DialogTitle className="text-lg font-semibold dark:text-white">
                {currentIndex + 1} of {totalLeaders}
              </DialogTitle>
              <Button
                variant="outline"
                size="icon"
                onClick={onNext}
                className="h-8 w-8 dark:border-gray-600 dark:hover:bg-gray-700"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </DialogHeader>

          {/* Content */}
          <div className="p-6">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Left side - Image */}
              <div className="space-y-4">
                <div className="aspect-[4/5] overflow-hidden bg-gray-100 dark:bg-gray-700 rounded-lg shadow-lg">
                  <img 
                    src={leader.imageSrc} 
                    alt={leader.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Quick stats */}
                <div className="text-center p-4 bg-cc-light-blue dark:bg-gray-700 rounded-lg">
                  <h3 className="text-xl font-bold text-cc-navy dark:text-white mb-1">{leader.name}</h3>
                  <p className="text-cc-gold dark:text-cc-orange font-medium text-lg">{leader.title}</p>
                </div>
              </div>

              {/* Right side - Details */}
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-semibold text-cc-navy dark:text-white mb-3 border-b border-cc-gold dark:border-cc-orange pb-2">
                    Biography
                  </h2>
                  <div className="prose max-w-none">
                    {leader.bio.split('\n\n').map((paragraph, idx) => (
                      <p key={idx} className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
                
                {leader.education && (
                  <div>
                    <h2 className="text-xl font-semibold text-cc-navy dark:text-white mb-3 border-b border-cc-gold dark:border-cc-orange pb-2">
                      Education
                    </h2>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{leader.education}</p>
                  </div>
                )}
                
                {leader.experience && leader.experience.length > 0 && (
                  <div>
                    <h2 className="text-xl font-semibold text-cc-navy dark:text-white mb-3 border-b border-cc-gold dark:border-cc-orange pb-2">
                      Professional Experience
                    </h2>
                    <ul className="space-y-2">
                      {leader.experience.map((exp, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="w-2 h-2 bg-cc-gold dark:bg-cc-orange rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span className="text-gray-700 dark:text-gray-300">{exp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {leader.achievements && leader.achievements.length > 0 && (
                  <div>
                    <h2 className="text-xl font-semibold text-cc-navy dark:text-white mb-3 border-b border-cc-gold dark:border-cc-orange pb-2">
                      Key Achievements
                    </h2>
                    <ul className="space-y-2">
                      {leader.achievements.map((achievement, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="w-2 h-2 bg-cc-gold dark:bg-cc-orange rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span className="text-gray-700 dark:text-gray-300">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Navigation buttons at bottom */}
            <div className="flex justify-between items-center mt-8 pt-6 border-t dark:border-gray-700">
              <Button 
                variant="outline" 
                onClick={onPrev}
                className="flex items-center space-x-2 dark:border-gray-600 dark:hover:bg-gray-700"
              >
                <ChevronLeft className="h-4 w-4" />
                <span>Previous</span>
              </Button>
              
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {currentIndex + 1} of {totalLeaders} leaders
              </div>
              
              <Button 
                variant="outline" 
                onClick={onNext}
                className="flex items-center space-x-2 dark:border-gray-600 dark:hover:bg-gray-700"
              >
                <span>Next</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LeaderModal;
