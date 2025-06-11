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
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      {/* Hero Section with background */}
      <section className="relative bg-gradient-to-r from-cc-navy to-cc-gold py-20 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Meet Our Leadership</h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl">
            Visionary leaders driving Constant Capital's success and innovation.
          </p>
        </div>
      </section>

      {/* Board Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-left mb-12">
          <div className="text-cc-gold uppercase tracking-wide font-medium mb-2">GOVERNANCE</div>
          <h2 className="text-3xl md:text-4xl font-bold text-cc-navy mb-2">Our Board</h2>
          <p className="text-gray-600 mb-6">Guided by experience, integrity, and vision.</p>
          <blockquote className="border-l-4 border-cc-gold pl-4 italic text-lg text-gray-700 flex items-center gap-2">
            <svg className="w-6 h-6 text-cc-gold" fill="currentColor" viewBox="0 0 24 24"><path d="M7.17 6A5.001 5.001 0 0 0 2 11c0 2.76 2.24 5 5 5v2c-3.87 0-7-3.13-7-7a7 7 0 0 1 7-7v2zm9.66 0A5.001 5.001 0 0 0 11.83 11c0 2.76 2.24 5 5 5v2c-3.87 0-7-3.13-7-7a7 7 0 0 1 7-7v2z"/></svg>
            "Good business leaders create a vision, articulate the vision, passionately own the vision and relentlessly drive it to completion." – Jack Welch
          </blockquote>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mt-12">
          {leaders.map((leader, index) => (
            <LeaderCard
              key={index}
              leader={leader}
              onClick={() => handleLeaderClick(index)}
            />
          ))}
        </div>
      </section>

      {/* Vision Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <LeadershipVision />
        </div>
      </section>

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
