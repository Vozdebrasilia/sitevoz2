'use client';
 
import Link from 'next/link';
import { TrendingUp, Play, DollarSign, Cloud } from 'lucide-react';
import { useEffect, useState } from 'react';
import AdComponent from '../common/AdComponent';

type SidebarAd = {
  href: string;
  image: string;
  eyebrow: string;
  eyebrowClass: string;
  title: string;
  subtitle: string;
  address: string;
  site: string;
  siteLabel: string;
  whatsapp: string;
  whatsappLabel: string;
  stars?: boolean;
};

const TAMBAQUI: SidebarAd = {
  href: 'https://www.vozdebrasilia.com.br/noticia/hotel-tambaqui-praia-hospedagem-premium-em-jatiuca-vira-febre-entre-turistas-em',
  image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80',
  eyebrow: 'Hospede-se em Maceió',
  eyebrowClass: 'text-emerald-300',
  title: 'Hotel Tambaqui Praia',
  subtitle: 'Jatiúca · Pé na areia · Vista mar',
  address: 'Av. Dr. Antônio Gomes de Barros, 100 · Jatiúca · Maceió/AL',
  site: 'https://www.booking.com/searchresults.html?ss=Hotel+Tambaqui+Praia+Macei%C3%B3',
  siteLabel: 'Ver preços e reservar',
  whatsapp: 'https://wa.me/5582999990001?text=Ol%C3%A1%21%20Vim%20pelo%20Voz%20de%20Bras%C3%ADlia%20e%20gostaria%20de%20reservar%20no%20Hotel%20Tambaqui%20Praia.',
  whatsappLabel: 'WhatsApp (82) 99999-0001',
};

const WANCHAKO: SidebarAd = {
  href: 'https://www.vozdebrasilia.com.br/noticia/wanchako-cozinha-peruana-premiada-e-destaque-gastronomico-de-maceio',
  image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=80',
  eyebrow: 'Gastronomia Premiada',
  eyebrowClass: 'text-amber-300',
  title: 'Wanchako',
  subtitle: 'Alta cozinha peruana · Ceviches e coquetéis autorais',
  address: 'Av. Dr. Antônio Gouveia, 87 · Pajuçara · Maceió/AL',
  site: 'https://www.wanchako.com.br',
  siteLabel: 'Ver cardápio e reservar',
  whatsapp: 'https://wa.me/558230251080?text=Ol%C3%A1%21%20Vim%20pelo%20Voz%20de%20Bras%C3%ADlia%20e%20gostaria%20de%20reservar%20mesa%20no%20Wanchako.',
  whatsappLabel: 'WhatsApp (82) 3025-1080',
};

const RITZ: SidebarAd = {
  href: 'https://www.vozdebrasilia.com.br/noticia/ritz-lagoa-da-anta-o-5-estrelas-mais-desejado-de-maceio',
  image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1200&q=80',
  eyebrow: 'Resort 5★ · Maceió',
  eyebrowClass: 'text-amber-300',
  title: 'Ritz Lagoa da Anta',
  subtitle: 'All inclusive · Jatiúca · Cupom VOZ2026',
  address: 'Av. Álvaro Otacílio, 6395 · Jatiúca · Maceió/AL',
  site: 'https://www.ritzhoteis.com.br/hotel-ritz-lagoa-da-anta',
  siteLabel: 'Reservar · ver tarifas',
  whatsapp: 'https://wa.me/558221222200?text=Ol%C3%A1%21%20Vim%20pelo%20Voz%20de%20Bras%C3%ADlia%20e%20gostaria%20de%20cota%C3%A7%C3%A3o%20com%20o%20cupom%20VOZ2026.',
  whatsappLabel: 'WhatsApp (82) 2122-2200',
  stars: true,
};

function AdCard({ ad }: { ad: SidebarAd }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
      <span className="block text-[10px] text-gray-400 font-semibold tracking-wider text-center pt-3">PUBLICIDADE</span>
      <div className="p-3">
        <a href={ad.href} target="_blank" rel="noopener noreferrer" className="block">
          <div className="relative rounded-lg overflow-hidden" style={{ aspectRatio: '300/220' }}>
            <img src={ad.image} alt={ad.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
            {ad.stars && <div className="absolute top-3 left-3 text-amber-300 text-sm">★★★★★</div>}
            <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
              <div className={`text-[10px] uppercase tracking-wider font-semibold ${ad.eyebrowClass}`}>{ad.eyebrow}</div>
              <div className="font-bold text-base leading-tight">{ad.title}</div>
              <div className="text-xs opacity-90">{ad.subtitle}</div>
            </div>
          </div>
        </a>
        <div className="text-[11px] text-gray-600 mt-2 leading-snug">📍 {ad.address}</div>
        <div className="mt-2 flex flex-col gap-1.5">
          <a href={ad.site} target="_blank" rel="noopener noreferrer" className="inline-flex justify-center items-center gap-1 bg-gray-900 text-white text-xs font-bold px-3 py-2 rounded-full hover:bg-gray-800">
            {ad.siteLabel} →
          </a>
          <a href={ad.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex justify-center items-center gap-1 bg-[#25D366] text-white text-xs font-bold px-3 py-2 rounded-full hover:brightness-95">
            💬 {ad.whatsappLabel}
          </a>
        </div>
      </div>
    </div>
  );
}
 
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
      <AdCard ad={TAMBAQUI} />
      <AdCard ad={WANCHAKO} />

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

      <AdCard ad={RITZ} />
    </div>
  );
}
