"use client"

import useSWR, { Fetcher } from "swr";

interface Text {
  content: string;
  section_name: string;
}

interface HeroSectionProps {
  heroImagePath: string;
}

export function HeroSectionWithBg({ heroImagePath }: HeroSectionProps) {
  const fetcher = async (url: string) => {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
    return res.json();
  };
  const { data, error, isLoading } = useSWR('http://localhost:5000/sites/c3c94b9c-c898-4b5e-b747-8d319a5de45b/texts', fetcher)
  
  if (error) return <div className="h-svh flex flex-col items-center justify-center gap-4">Echec du chargement</div>
  if (isLoading) return <div className="h-svh flex flex-col items-center justify-center gap-4">Chargement...</div>

  let texts: Text[];
  texts = data.texts;
  const title = texts.find((item: Text) => item.section_name === 'title');
  const subtitles = texts.filter((item: Text) => item.section_name === 'subtitle');

  return (
    <div className="h-svh bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center gap-4" style={{ backgroundImage: `url(${heroImagePath})` }}>
      {title && <h1 className="text-6xl">{title.content}</h1>}
      <div className="flex flex-col items-center justify-center gap-2">
        {subtitles && subtitles.map((text, index) => (
          <h2 key={index}>{text.content}</h2>
        ))}
      </div>
    </div>
  )
}

export function HeroSection() {
  const fetcher = async (url: string) => {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
    return res.json();
  };
  const { data, error, isLoading } = useSWR('http://localhost:5000/sites/c3c94b9c-c898-4b5e-b747-8d319a5de45b/texts', fetcher)
  
  if (error) return <div className="h-svh flex flex-col items-center justify-center gap-4">Echec du chargement</div>
  if (isLoading) return <div className="h-svh flex flex-col items-center justify-center gap-4">Chargement...</div>

  let texts: Text[];
  texts = data.texts;
  const title = texts.find((item: Text) => item.section_name === 'title');
  const subtitles = texts.filter((item: Text) => item.section_name === 'subtitle');

  return (
    <div className="h-svh flex flex-col items-center justify-center gap-4">
      {title && <h1 className="text-6xl">{title.content}</h1>}
      <div className="flex flex-col items-center justify-center gap-2">
        {subtitles && subtitles.map((text, index) => (
          <h2 key={index}>{text.content}</h2>
        ))}
      </div>
    </div>
  )
}