
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LeaderCard from '@/components/leadership/LeaderCard';
import LeadershipHero from '@/components/leadership/LeadershipHero';
import LeadershipVision from '@/components/leadership/LeadershipVision';
import LeaderModal from '@/components/leadership/LeaderModal';
import { leaders } from '@/data/leaders';

const Leadership = () => {
  const [selectedLeaderIndex, setSelectedLeaderIndex] = useState<number | null>(null);

  const handleLeaderClick = (index: number) => {
    setSelectedLeaderIndex(index);
  };

  const handleCloseModal = () => {
    setSelectedLeaderIndex(null);
  };

  const handleNextLeader = () => {
    if (selectedLeaderIndex !== null) {
      setSelectedLeaderIndex((selectedLeaderIndex + 1) % leaders.length);
    }
  };

  const handlePrevLeader = () => {
    if (selectedLeaderIndex !== null) {
      setSelectedLeaderIndex(selectedLeaderIndex === 0 ? leaders.length - 1 : selectedLeaderIndex - 1);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="pt-16">
        {/* Hero Section */}
        <LeadershipHero />

        {/* Team Section */}
        <div className="container mx-auto px-4 py-16">
          <div className="text-left mb-12">
            <div className="text-cc-gold uppercase tracking-wide font-medium mb-2">GOVERNANCE</div>
            <h2 className="text-3xl md:text-4xl font-bold text-cc-navy mb-4">Our Board</h2>
            <blockquote className="max-w-2xl text-gray-600 italic">
              "Good business leaders create a vision, articulate the vision, passionately own the vision and relentlessly drive it to completion." – Jack Welch
            </blockquote>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-12">
            {leaders.map((leader, index) => (
              <LeaderCard
                key={index}
                leader={leader}
                onClick={() => handleLeaderClick(index)}
              />
            ))}
          </div>
        </div>

        {/* Vision Section */}
        <LeadershipVision />
      </div>

      {/* Leader Modal */}
      {selectedLeaderIndex !== null && (
        <LeaderModal
          leader={leaders[selectedLeaderIndex]}
          isOpen={selectedLeaderIndex !== null}
          onClose={handleCloseModal}
          onNext={handleNextLeader}
          onPrev={handlePrevLeader}
          currentIndex={selectedLeaderIndex}
          totalLeaders={leaders.length}
        />
      )}

      <Footer />
    </div>
  );
};

export default Leadership;
