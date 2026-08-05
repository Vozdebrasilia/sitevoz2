'use client';

import { useEffect, useState } from 'react';
import { Instagram, Flame } from 'lucide-react';

const FEED = 'https://voz-central-ai.lovable.app/api/public/videos-virais?limit=6';
const INSTA = 'https://www.instagram.com/tvvozdebrasilia/';

type Viral = {
  id: string;
  titulo: string;
  video_url: string;
  thumb_url: string;
};

export default function InstagramVideoBanner() {
  const [video, setVideo] = useState<Viral | null>(null);

  useEffect(() => {
    fetch(FEED, { cache: 'no-store' })
      .then((r) => r.json())
      .then((d) => {
        const lista: Viral[] = d?.videos || [];
        if (lista.length) setVideo(lista[Math.floor(Math.random() * lista.length)]);
      })
      .catch(() => {});
  }, []);

  if (!video) return null;

  return (
    <section className="max-w-[1400px] mx-auto px-4 my-6">
      <a
        href={INSTA}
        target="_blank"
        rel="noreferrer"
        aria-label="Siga a TV Voz de Brasília no Instagram"
        className="group block rounded-2xl overflow-hidden border border-yellow-500/30 bg-gradient-to-r from-[#0B1020] via-[#131a33] to-[#0B1020] shadow-xl"
      >
        <div className="flex flex-col md:flex-row items-center gap-5 p-5 md:p-6">
          <div className="relative w-[150px] shrink-0 aspect-[9/16] rounded-xl overflow-hidden bg-black ring-2 ring-yellow-500/60">
            <video
              src={video.video_url}
              poster={video.thumb_url || undefined}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="w-full h-full object-cover"
            />
            <span className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full flex items-center gap-1">
              <Flame className="w-3 h-3" /> VIRAL
            </span>
          </div>

          <div className="flex-1 text-center md:text-left">
            <p className="text-yellow-400 text-xs font-black tracking-[0.2em] uppercase">
              TV Voz de Brasília no Instagram
            </p>
            <h3 className="mt-1 text-white text-xl md:text-2xl font-black leading-tight">
              {video.titulo}
            </h3>
            <p className="mt-2 text-white/70 text-sm">
              Vídeos virais todos os dias no @tvvozdebrasilia. Clique e siga agora.
            </p>
          </div>

          <span className="inline-flex items-center gap-2 rounded-xl px-5 py-3 font-bold text-white bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#8134AF] shadow-lg group-hover:scale-105 transition-transform">
            <Instagram className="w-5 h-5" />
            @tvvozdebrasilia
          </span>
        </div>
      </a>
    </section>
  );
}
