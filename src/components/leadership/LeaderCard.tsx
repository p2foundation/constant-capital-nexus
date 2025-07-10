
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { LeaderProps } from './types';

interface LeaderCardProps {
  leader: LeaderProps;
  onClick: () => void;
}

const LeaderCard: React.FC<LeaderCardProps> = ({ leader, onClick }) => {
  return (
    <Card className="overflow-hidden border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all cursor-pointer bg-white dark:bg-gray-800 hover:scale-105" onClick={onClick}>
      <div className="aspect-square overflow-hidden bg-gray-100 dark:bg-gray-700">
        <img
          src={leader.imageSrc}
          alt={leader.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      <CardContent className="p-4 text-center">
        <h3 className="text-xl font-bold text-cc-navy dark:text-white mb-1">{leader.name}</h3>
        <p className="text-cc-gold dark:text-cc-orange font-medium">{leader.title}</p>
      </CardContent>
    </Card>
  );
};

export default LeaderCard;
