import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, X, GraduationCap, Briefcase, Trophy, Star } from "lucide-react";
import { TeamMemberProps } from './types';

interface TeamMemberModalProps {
  member: TeamMemberProps;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  currentIndex: number;
  totalMembers: number;
}

const TeamMemberModal: React.FC<TeamMemberModalProps> = ({
  member,
  isOpen,
  onClose,
  onNext,
  onPrev,
  currentIndex,
  totalMembers,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-900">
        <DialogHeader className="relative">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold text-cc-navy dark:text-white">
              Team Member Profile
            </DialogTitle>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {currentIndex + 1} of {totalMembers}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-8 mt-6">
          {/* Left Column - Image and Basic Info */}
          <div className="space-y-6">
            <div className="aspect-square overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-700">
              <img
                src={member.imageSrc}
                alt={member.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-center">
              <h2 className="text-3xl font-bold text-cc-navy dark:text-white mb-2">
                {member.name}
              </h2>
              <p className="text-xl text-cc-gold dark:text-cc-orange font-medium mb-4">
                {member.title}
              </p>
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="space-y-6">
            {/* Biography */}
            <div>
              <h3 className="text-lg font-semibold text-cc-navy dark:text-white mb-3 flex items-center">
                <Star className="h-5 w-5 mr-2 text-cc-gold" />
                Biography
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {member.bio}
              </p>
            </div>

            {/* Education */}
            {member.education && (
              <div>
                <h3 className="text-lg font-semibold text-cc-navy dark:text-white mb-3 flex items-center">
                  <GraduationCap className="h-5 w-5 mr-2 text-cc-gold" />
                  Education
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  {member.education}
                </p>
              </div>
            )}

            {/* Specializations */}
            {member.specializations && member.specializations.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-cc-navy dark:text-white mb-3">
                  Areas of Expertise
                </h3>
                <div className="flex flex-wrap gap-2">
                  {member.specializations.map((spec, index) => (
                    <span
                      key={index}
                      className="bg-cc-gold/10 text-cc-navy dark:bg-cc-orange/10 dark:text-cc-orange px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Experience */}
        {member.experience && member.experience.length > 0 && (
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-cc-navy dark:text-white mb-4 flex items-center">
              <Briefcase className="h-5 w-5 mr-2 text-cc-gold" />
              Professional Experience
            </h3>
            <div className="space-y-2">
              {member.experience.map((exp, index) => (
                <div key={index} className="flex items-start">
                  <div className="w-2 h-2 bg-cc-gold rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <p className="text-gray-700 dark:text-gray-300">{exp}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Achievements */}
        {member.achievements && member.achievements.length > 0 && (
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-cc-navy dark:text-white mb-4 flex items-center">
              <Trophy className="h-5 w-5 mr-2 text-cc-gold" />
              Key Achievements
            </h3>
            <div className="space-y-2">
              {member.achievements.map((achievement, index) => (
                <div key={index} className="flex items-start">
                  <div className="w-2 h-2 bg-cc-gold rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <p className="text-gray-700 dark:text-gray-300">{achievement}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <Button
            onClick={onPrev}
            variant="outline"
            className="flex items-center gap-2"
            disabled={currentIndex === 0}
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
          
          <Button
            onClick={onNext}
            variant="outline"
            className="flex items-center gap-2"
            disabled={currentIndex === totalMembers - 1}
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TeamMemberModal;