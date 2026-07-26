'use client';
 
import Link from 'next/link';
import { TrendingUp, Play, DollarSign, Cloud } from 'lucide-react';
import { useEffect, useState } from 'react';
import AdComponent from '../common/AdComponent';
 
export default function Sidebar() {
  const [mostRead, setMostRead] = useState<any[]>([]);
  const [recentVideos, setRecentVideos] = useState<any[]>([]);
 
  useEffect(() => {
    fetch('https://www.vozdebrasilia.com.br/wp-json/wp/v2/posts?per_page=5&orderby=comment_count&order=desc&_embed=true')
      .then(r => r.json())
      .then(data => setMostRead(Array.isArray(data) ? data : []))
      .catch(() => {});
 
    fetch('https://www.vozdebrasilia.com.br/wp-json/wp/v2/posts?categories=59&per_page=3&orderby=date&order=desc&_embed=true')
      .then(r => r.json())
      .then(data => setRecentVideos(Array.isArray(data) ? data : []))
      .catch(() => {});
  }, []);
 
  return (
    <div className="space-y-6">

      {/* Anúncio - Hotel Tambaqui Praia */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
        <span className="block text-[10px] text-gray-400 font-semibold tracking-wider text-center pt-3">PUBLICIDADE</span>
        <a
          href="https://www.vozdebrasilia.com.br/noticia/hotel-tambaqui-praia-hospedagem-premium-em-jatiuca-vira-febre-entre-turistas-em-maceio"
          target="_blank"
          rel="noopener noreferrer"
          className="block p-3"
        >
          <div className="relative rounded-lg overflow-hidden" style={{ aspectRatio: '300/250' }}>
            <img
              src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80"
              alt="Hotel Tambaqui Praia - Maceió"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
              <div className="text-[10px] uppercase tracking-wider text-emerald-300 font-semibold">Hospede-se em Maceió</div>
              <div className="font-bold text-base leading-tight">Hotel Tambaqui Praia</div>
              <div className="text-xs opacity-90">Jatiúca · Pé na areia · Reserve já</div>
            </div>
          </div>
        </a>
      </div>

      {/* Anúncio - Wanchako Restaurante */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
        <span className="block text-[10px] text-gray-400 font-semibold tracking-wider text-center pt-3">PUBLICIDADE</span>
        <a
          href="https://www.vozdebrasilia.com.br/noticia/wanchako-cozinha-peruana-premiada-e-destaque-gastronomico-de-maceio"
          target="_blank"
          rel="noopener noreferrer"
          className="block p-3"
        >
          <div className="relative rounded-lg overflow-hidden" style={{ aspectRatio: '300/600' }}>
            <img
              src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=80"
              alt="Wanchako Restaurante Peruano - Maceió"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10" />
            <div className="absolute top-3 left-3 right-3 text-white">
              <div className="text-[10px] uppercase tracking-widest text-amber-300 font-bold">Gastronomia Premiada</div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
              <div className="font-extrabold text-2xl leading-tight mb-1">Wanchako</div>
              <div className="text-sm opacity-95 mb-3">Alta cozinha peruana em Maceió · Ceviches, tiraditos e coquetéis autorais</div>
              <span className="inline-block bg-amber-400 text-black text-xs font-bold px-3 py-1.5 rounded-full">Reserve sua mesa →</span>
            </div>
          </div>
        </a>
      </div>
 
      {/* Clima & Economia */}
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-md p-6 text-white">
        <h3 className="font-bold mb-4 flex items-center gap-2">
          <Cloud className="w-5 h-5" />
          Clima & Economia
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-white/10 backdrop-blur-sm rounded-lg">
            <div>
              <div className="text-xs opacity-75 mb-1">Brasília</div>
              <div className="font-bold text-2xl">28°C</div>
              <div className="text-xs opacity-75">Parcialmente nublado</div>
            </div>
            <div className="text-4xl">☁️</div>
          </div>
          <div className="flex items-center justify-between p-3 bg-white/10 backdrop-blur-sm rounded-lg">
            <div>
              <div className="text-xs opacity-75 mb-1">Dólar</div>
              <div className="font-bold text-xl flex items-center gap-1">
                <DollarSign className="w-4 h-4" />
                R$ 4,85
              </div>
              <div className="text-xs text-green-400">↓ -0,5%</div>
            </div>
            <div>
              <div className="text-xs opacity-75 mb-1">Euro</div>
              <div className="font-bold text-xl">R$ 5,32</div>
              <div className="text-xs text-red-400">↑ +0,2%</div>
            </div>
          </div>
        </div>
      </div>
 
      {/* Banner rodapé */}
      <div className="w-full">
        <a
          href="https://agenciabrasilia.df.gov.br/w/gdf-que-fez-acoes-do-governo-contribuem-para-melhorar-a-vida-da-populacao-em-diversas-areas"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full"
        >
          <img
            src="https://www.vozdebrasilia.com.br/wp-content/uploads/2026/03/728x90-1.gif"
            alt="Banner publicitário"
            className="w-full h-auto rounded-xl"
          />
        </a>
      </div>
 
    </div>
  );
}