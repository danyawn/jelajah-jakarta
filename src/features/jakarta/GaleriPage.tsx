'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Images as ImagesIcon, X, ChevronLeft, ChevronRight } from 'lucide-react';

export const GaleriPage: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  
  const images = [
    { src: '/images/jakarta-1.jpg', title: 'Jakarta Skyline', desc: 'Modern cityscape at sunset' },
    { src: '/images/jakarta-2.png', title: 'Monas Monument', desc: 'National monument in golden hour' },
    { src: '/images/jakarta-3.jpg', title: 'Kota Tua', desc: 'Historic old town district' },
    { src: '/images/jakarta-4.jpg', title: 'Ancol Beach', desc: 'Coastal recreation area' },
    { src: '/images/jakarta-5.jpeg', title: 'Jakarta Night', desc: 'City lights after dark' },
    { src: '/images/sejarah-jakarta-1.jpeg', title: 'Colonial Heritage', desc: 'Dutch colonial architecture' },
    { src: '/images/sejarah-jakarta-2.jpg', title: 'Historical Street', desc: 'Traditional street scene' },
    { src: '/images/sejarah-jakarta-3.jpeg', title: 'Cultural Heritage', desc: 'Preserved historical sites' },
    { src: '/images/transport-jakarta-1.jpg', title: 'MRT Jakarta', desc: 'Modern metro system' },
    { src: '/images/transport-jakarta-2.jpg', title: 'TransJakarta', desc: 'Bus rapid transit' },
    { src: '/images/transport-jakarta-3.jpg', title: 'KRL Commuter', desc: 'Commuter rail network' },
    { src: '/images/transport-jakarta-4.webp', title: 'Airport Express', desc: 'High-speed airport connection' },
    { src: '/images/kuliner-jakarta-1.jpg', title: 'Street Food', desc: 'Local culinary delights' },
    { src: '/images/kuliner-jakarta-2.jpeg', title: 'Traditional Cuisine', desc: 'Authentic Indonesian dishes' },
    { src: '/images/kuliner-jakarta-3.jpg', title: 'Modern Dining', desc: 'Contemporary restaurants' },
    { src: '/images/kuliner-jakarta-4.webp', title: 'Culinary Scene', desc: 'Diverse food culture' },
  ];

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % images.length);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? images.length - 1 : selectedImage - 1);
    }
  };

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
          <ImagesIcon className="w-10 h-10 text-cyan-400 drop-shadow-lg" />
          <h2 className="text-4xl font-bold text-white">Jakarta Photo Gallery</h2>
        </div>
        <p className="text-white/90 max-w-3xl mx-auto font-medium text-lg">
          A stunning collection of photos capturing Jakarta&apos;s beauty and dynamic energy
        </p>
      </motion.div>

      {/* Masonry Image Grid */}
      <motion.div 
        className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {images.map((image, index) => (
          <motion.div
            key={index}
            className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 break-inside-avoid mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + index * 0.05, duration: 0.5 }}
            whileHover={{ scale: 1.02, y: -5 }}
            onClick={() => setSelectedImage(index)}
          >
            <Image 
              src={image.src} 
              alt={image.title} 
              width={400} 
              height={300} 
              className="w-full object-cover group-hover:scale-110 transition-transform duration-700 cursor-pointer" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h3 className="text-lg font-bold mb-1">{image.title}</h3>
                <p className="text-sm text-white/80">{image.desc}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              className="relative max-w-4xl max-h-[90vh] mx-4"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Navigation buttons */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Image */}
              <Image 
                src={images[selectedImage].src} 
                alt={images[selectedImage].title} 
                width={800} 
                height={600} 
                className="w-full h-auto max-h-[90vh] object-contain rounded-2xl" 
              />

              {/* Image info */}
              <div className="absolute bottom-4 left-4 right-4 p-4 bg-black/50 backdrop-blur-sm rounded-xl text-white">
                <h3 className="text-xl font-bold mb-1">{images[selectedImage].title}</h3>
                <p className="text-white/80">{images[selectedImage].desc}</p>
                <p className="text-sm text-white/60 mt-2">{selectedImage + 1} of {images.length}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};


