'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Flame, Play, Instagram } from 'lucide-react';

const FEED = 'https://voz-central-ai.lovable.app/api/public/videos-virais?limit=12';

type Viral = {
  id: string;
  titulo: string;
  video_url: string;
  thumb_url: string;
  instagram_permalink: string;
};

export default function ViralStrip() {
  const [videos, setVideos] = useState<Viral[]>([]);
  const [ativo, setAtivo] = useState<Viral | null>(null);

  useEffect(() => {
    fetch(FEED, { cache: 'no-store' })
      .then((r) => r.json())
      .then((d) => {
        if (d?.ok) setVideos(d.videos || []);
      })
      .catch(() => {});
  }, []);

  if (videos.length === 0) return null;

  return (
    <section className="bg-gray-900 py-8">
      <div className="max-w-[1400px] mx-auto px-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <span className="bg-red-600 text-white text-[11px] font-bold px-3 py-1 rounded-full flex items-center gap-1">
              <Flame className="w-3 h-3" /> VIRAL
            </span>
            <h2 className="text-2xl font-black text-white">Vídeos Virais</h2>
          </div>
          <Link
            href="/videos"
            className="text-sm font-semibold text-green-400 hover:text-green-300"
          >
            Ver todos →
          </Link>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-2 snap-x">
          {videos.map((v) => (
            <button
              key={v.id}
              onClick={() => setAtivo(v)}
              className="group shrink-0 w-[150px] snap-start text-left"
            >
              <div className="relative aspect-[9/16] rounded-xl overflow-hidden bg-black">
                {v.thumb_url ? (
                  <img
                    src={v.thumb_url}
                    alt={v.titulo}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : null}
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="bg-white/90 rounded-full p-2.5 shadow-lg">
                    <Play className="w-5 h-5 fill-green-700 text-green-700" />
                  </span>
                </span>
              </div>
              <p className="mt-2 text-xs font-semibold text-white/90 leading-snug line-clamp-2">
                {v.titulo}
              </p>
            </button>
          ))}
        </div>
      </div>

      {ativo && (
        <div
          className="fixed inset-0 z-[90] bg-black/85 flex items-center justify-center p-4"
          onClick={() => setAtivo(null)}
        >
          <div className="w-full max-w-[420px]" onClick={(e) => e.stopPropagation()}>
            <video
              src={ativo.video_url}
              poster={ativo.thumb_url || undefined}
              controls
              autoPlay
              playsInline
              className="w-full rounded-xl bg-black aspect-[9/16] object-contain"
            />
            <div className="mt-3 text-white">
              <h3 className="font-bold text-lg">{ativo.titulo}</h3>
              <div className="flex gap-3 mt-4">
                <a
                  href={ativo.instagram_permalink || 'https://www.instagram.com/tvvozdebrasilia/'}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 bg-gradient-to-r from-pink-600 to-purple-600 px-4 py-2 rounded-lg text-sm font-semibold"
                >
                  <Instagram className="w-4 h-4" /> Seguir @tvvozdebrasilia
                </a>
                <button
                  onClick={() => setAtivo(null)}
                  className="px-4 py-2 rounded-lg text-sm font-semibold bg-white/15"
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
