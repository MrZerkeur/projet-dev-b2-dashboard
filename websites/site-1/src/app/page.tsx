import React from 'react'
import Image from 'next/image';
import { getGalleryImages, getHeroImages } from './gallery';
import { HeroSection, HeroSectionWithBg } from './components/HeroSection';

export default function Home() {
  const imagePaths = getGalleryImages();
  const heroImagePaths = getHeroImages();

  return (
    <main className="h-auto">
      {heroImagePaths.length > 0 ? 
      <HeroSectionWithBg heroImagePath={heroImagePaths[0]} /> : 
      <HeroSection />}
      <div className="h-auto flex flex-col items-center justify-center gap-4">
        {imagePaths.map((imagePath) => (
          <Image key={imagePath} src={imagePath} width={400} height={400} alt="Gallery Image" />
        ))}
      </div>
    </main>
  );
}
