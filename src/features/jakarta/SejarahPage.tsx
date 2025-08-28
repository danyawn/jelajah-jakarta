'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ScrollText, Calendar, MapPin, Users, Building } from 'lucide-react';

export const SejarahPage: React.FC = () => {
  const timelineEvents = [
    {
      year: '1527',
      title: 'Sunda Kelapa Port',
      description: 'The port of Sunda Kelapa was established as a major trading center in the region, marking the beginning of Jakarta\'s maritime history.',
      image: '/images/sejarah-jakarta-1.jpeg',
      icon: Building
    },
    {
      year: '1619',
      title: 'Dutch Colonial Era',
      description: 'The Dutch East India Company (VOC) captured the port and renamed it Batavia, establishing it as the center of Dutch colonial administration.',
      image: '/images/sejarah-jakarta-2.jpg',
      icon: Calendar
    },
    {
      year: '1945',
      title: 'Indonesian Independence',
      description: 'After Indonesia declared independence, Batavia was renamed Jakarta and became the capital of the newly independent nation.',
      image: '/images/sejarah-jakarta-3.jpeg',
      icon: Users
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div 
        className="text-center p-8 bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20 shadow-xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <ScrollText className="w-10 h-10 text-cyan-400 drop-shadow-lg" />
          <h2 className="text-4xl font-bold text-white">Brief History of Jakarta</h2>
        </div>
        <p className="text-white/90 max-w-3xl mx-auto font-medium text-lg">
          From ancient port to modern metropolis - explore Jakarta&apos;s rich historical journey
        </p>
      </motion.div>

      {/* Introduction */}
      <motion.div 
        className="p-8 bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20 shadow-xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="prose prose-invert max-w-none">
          <p className="text-white/90 text-lg leading-relaxed mb-4">
            Jakarta, formerly known as Batavia, has a long history as a center of trade and government in the archipelago. Diverse cultural influences have shaped the city&apos;s character to this day.
          </p>
          <p className="text-white/90 text-lg leading-relaxed">
            From the port of Sunda Kelapa, through the colonial era, to independence, Jakarta continues to develop into a metropolis with strong social and economic dynamics.
          </p>
        </div>
      </motion.div>

      {/* Timeline */}
      <motion.div 
        className="space-y-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        {timelineEvents.map((event, index) => {
          const Icon = event.icon;
          return (
            <motion.div
              key={event.year}
              className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 items-center`}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + index * 0.3, duration: 0.8 }}
            >
              {/* Image */}
              <div className="flex-1">
                <div className="relative h-96 md:h-[400px] rounded-3xl overflow-hidden shadow-2xl">
                  <Image 
                    src={event.image} 
                    alt={event.title} 
                    fill 
                    className="object-cover" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-6 left-6 text-white">
                    <div className="text-2xl font-bold">{event.year}</div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 p-8 bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20 shadow-xl">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30">
                    <Icon className="w-6 h-6 text-cyan-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">{event.title}</h3>
                </div>
                <p className="text-white/90 text-lg leading-relaxed">
                  {event.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Historical facts */}
      <motion.div 
        className="p-8 bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20 shadow-xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <span className="text-2xl">📚</span>
          Historical Facts
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-white/90">
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-cyan-400 mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-white mb-1">Strategic Location</h4>
              <p className="text-sm">Jakarta&apos;s position at the mouth of the Ciliwung River made it a natural trading hub</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Building className="w-5 h-5 text-yellow-400 mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-white mb-1">Colonial Architecture</h4>
              <p className="text-sm">Many historic buildings from the Dutch colonial period still stand today</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Users className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-white mb-1">Cultural Melting Pot</h4>
              <p className="text-sm">Jakarta has always been home to diverse ethnic groups and cultures</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Calendar className="w-5 h-5 text-purple-400 mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-white mb-1">Modern Development</h4>
              <p className="text-sm">Since independence, Jakarta has grown into Southeast Asia&apos;s largest metropolitan area</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};


