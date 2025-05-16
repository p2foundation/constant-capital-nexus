
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from 'react-router-dom';

interface LeaderProps {
  name: string;
  title: string;
  imageSrc?: string;
  bio?: string;
  id: string;
}

const LeaderCard = ({ name, title, imageSrc, bio, id }: LeaderProps) => {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('');

  return (
    <Card className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-all">
      <Link to={`/leadership/${id}`} className="block">
        <div className="aspect-square overflow-hidden bg-gray-100">
          {imageSrc ? (
            <img
              src={imageSrc}
              alt={name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-cc-navy text-white text-4xl font-bold">
              {initials}
            </div>
          )}
        </div>
        <CardContent className="p-4 text-center">
          <h3 className="text-xl font-bold text-cc-navy">{name}</h3>
          <p className="text-cc-gold font-medium">{title}</p>
          {bio && <p className="mt-2 text-gray-600 text-sm">{bio}</p>}
        </CardContent>
      </Link>
    </Card>
  );
};

const Leadership = () => {
  const leaders = [
    {
      id: "ekua-hayfron-benjamin",
      name: "Ekua Hayfron-Benjamin",
      title: "Chairperson",
      bio: "With over 25 years of experience in financial services.",
    },
    {
      id: "ben-ahiaglo",
      name: "Ben Ahiaglo",
      title: "Managing Director",
      bio: "Extensive experience in investment banking and capital markets.",
    },
    {
      id: "kofi-apenteng",
      name: "Kofi Apenteng",
      title: "Director",
      bio: "Deep expertise in risk management and corporate governance.",
    },
    {
      id: "ike-echeruo",
      name: "Ike Echeruo",
      title: "Director",
      bio: "A seasoned investment professional with expertise in private equity.",
    },
    {
      id: "kwame-agyire-tettey",
      name: "Kwame Agyire-Tettey",
      title: "Director",
      bio: "Specializes in financial regulation and compliance.",
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="pt-16">
        {/* Hero Section - Updated to match About page styling */}
        <section className="bg-cc-navy text-white py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl sm:text-5xl font-bold mb-6">Experience You Can Trust</h1>
              <p className="text-lg text-gray-300 mb-8">
                Leading investment banking and securities trading firm in Ghana and West Africa
              </p>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <div className="text-cc-gold uppercase tracking-wide font-medium mb-2">GOVERNANCE</div>
            <h2 className="text-3xl md:text-4xl font-bold text-cc-navy mb-4">Our Board</h2>
            <blockquote className="max-w-2xl mx-auto text-gray-600 italic">
              "Good business leaders create a vision, articulate the vision, passionately own the vision and relentlessly drive it to completion." – Jack Welch
            </blockquote>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-12">
            {leaders.map((leader, index) => (
              <LeaderCard
                key={index}
                id={leader.id}
                name={leader.name}
                title={leader.title}
                bio={leader.bio}
              />
            ))}
          </div>
        </div>

        {/* Vision Section */}
        <div className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-cc-navy mb-6">Our Vision & Values</h2>
              <p className="text-gray-600 mb-8">
                At Constant Capital, we are committed to excellence in financial services. Our board
                of directors brings decades of experience in investment banking, asset management,
                and financial advisory services across Africa and beyond.
              </p>
              <p className="text-gray-600">
                We believe in transparency, integrity, and delivering value to all our stakeholders.
                Our leadership team guides Constant Capital with a focus on sustainable growth and
                innovation in the financial sector.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Leadership;
