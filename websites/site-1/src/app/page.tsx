"use client"

import useSWR, { Fetcher } from "swr";

interface Text {
  content: string;
  section_name: string;
}

export default function Home() {
  // const getTexts = async () => {
  //   try {
  //     const res = await fetch('http://localhost:5000/sites/9abb6f00-7326-4442-aaea-13be48d37018/texts');
  //     const data = await res.json();
  //     console.log(data);
  //     return data;
  //   } catch (err) {
  //     console.error('Error fetching texts:', err);
  //   }
  // };
  const fetcher = async (url: string) => {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
    return res.json();
  };
  const { data, error, isLoading } = useSWR('http://localhost:5000/sites/1c951dcf-6a30-4f0d-aa2b-0c2809d2965b/texts', fetcher)
  
  if (error) return <div className="h-svh flex flex-col items-center justify-center gap-4">Echec du chargement</div>
  if (isLoading) return <div className="h-svh flex flex-col items-center justify-center gap-4">Chargement...</div>


  let texts: Text[]
  texts = data.texts
  const title = texts.find((item: Text) => item.section_name === 'title');
  const subtitles = texts.filter((item: Text) => item.section_name === 'subtitle')

  return (
    <main className="h-svh flex flex-col items-center justify-center gap-4">
      {title && <h1 className="text-6xl">{title.content}</h1>}
      <div className="flex flex-col items-center justify-center gap-2">
        {subtitles && subtitles.map((text, index) => (
          <h2 key={index}>{text.content}</h2>
        ))}
      </div>
    </main>
  );
}