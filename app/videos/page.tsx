'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Play, Flame } from 'lucide-react';

const FEED = 'https://voz-central-ai.lovable.app/api/public/videos-virais?limit=30';
const IG_PERFIL = 'https://www.instagram.com/tvvozdebrasilia/reels/';
const linkIG = (u?: string) => {
  const limpo = ((u || '').trim().split(/\s+/)[0] || '').replace(/[),]+$/, '');
  return /^https:\/\/(www\.)?instagram\.com\/(reel|p)\/[A-Za-z0-9_-]+\/?$/i.test(limpo)
    ? limpo
    : IG_PERFIL;
};

type Viral = {
  id: string;
  titulo: string;
  descricao: string;
  video_url: string;
  thumb_url: string;
  hashtags: string;
  instagram_permalink: string;
  publicado_em: string | null;
  views: number;
  likes: number;
};

export default function VideosViraisPage() {
  const [videos, setVideos] = useState<Viral[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(FEED, { cache: 'no-store' })
      .then((r) => r.json())
      .then((d) => {
        if (d?.ok) setVideos(d.videos || []);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-[1400px] mx-auto px-4 pt-[190px] lg:pt-[220px] pb-16">
        <div className="flex items-center gap-3 mb-2">
          <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
            <Flame className="w-3 h-3" /> VIRAL
          </span>
          <h1 className="text-3xl lg:text-4xl font-black text-gray-900">Vídeos Virais</h1>
        </div>
        <p className="text-gray-600 mb-8">
          Os vídeos mais comentados da semana, selecionados e publicados pela TV Voz de Brasília.
        </p>

        {loading && <p className="text-gray-500">Carregando vídeos...</p>}

        {!loading && videos.length === 0 && (
          <p className="text-gray-500">Nenhum vídeo publicado ainda. Volte em instantes.</p>
        )}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {videos.map((v) => (
            <a
              key={v.id}
              href={linkIG(v.instagram_permalink)}
              target="_blank"
              rel="noreferrer"
              className="group block text-left bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all"
            >
              <div className="relative aspect-[9/16] bg-gray-900 overflow-hidden">
                {v.thumb_url ? (
                  <img
                    src={v.thumb_url}
                    alt={v.titulo}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                ) : null}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="bg-white/90 rounded-full p-3 shadow-lg">
                    <Play className="w-6 h-6 fill-green-700 text-green-700" />
                  </span>
                </div>
              </div>
              <div className="p-3">
                <h2 className="text-sm font-bold text-gray-900 leading-snug line-clamp-3">
                  {v.titulo}
                </h2>
              </div>
            </a>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
