'use client';

import { useEffect, useState } from 'react';

type Ad = {
  href: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  cta: string;
  image: string;
  gradient: string;
  accent: string;
};

const ADS: Ad[] = [
  {
    href: 'https://www.vozdebrasilia.com.br/noticia/ritz-lagoa-da-anta-o-5-estrelas-mais-desejado-de-maceio,
    eyebrow: 'Resort 5 Estrelas · Maceió',
    title: 'Ritz Lagoa da Anta',
    subtitle: 'All inclusive à beira-mar em Jatiúca · Spa · Gastronomia premiada',
    cta: 'Reserve com upgrade VOZ2026',
    image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1600&q=80',
    gradient: 'from-blue-950/90 via-blue-900/70 to-blue-950/40',
    accent: 'bg-amber-400 text-blue-950',
  },
  {
    href: 'https://www.vozdebrasilia.com.br/noticia/hotel-tambaqui-praia-hospedagem-premium-em-jatiuca-vira-febre-entre-turistas-em',
    eyebrow: 'Hospedagem Premium · Maceió',
    title: 'Hotel Tambaqui Praia',
    subtitle: 'Pé na areia em Jatiúca · Café da manhã regional · Vista mar',
    cta: 'Reserve com condição especial',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1600&q=80',
    gradient: 'from-emerald-900/90 via-emerald-800/70 to-emerald-900/40',
    accent: 'bg-emerald-400 text-emerald-950',
  },
  {
    href: 'https://www.vozdebrasilia.com.br/noticia/wanchako-cozinha-peruana-premiada-e-destaque-gastronomico-de-maceio',
    eyebrow: 'Gastronomia Premiada · Maceió',
    title: 'Wanchako Cozinha Peruana',
    subtitle: 'Ceviches autorais, tiraditos e coquetelaria assinada',
    cta: 'Reserve sua mesa',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1600&q=80',
    gradient: 'from-amber-950/90 via-amber-900/70 to-amber-950/40',
    accent: 'bg-amber-400 text-amber-950',
  },
];

export default function PremiumBanner({ variant = 0 }: { variant?: number }) {
  const [i, setI] = useState(variant % ADS.length);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % ADS.length), 7000);
    return () => clearInterval(t);
  }, []);
  const ad = ADS[i];

  return (
    <div className="w-full max-w-[1200px] mx-auto px-4">
      <div className="flex items-center justify-between mb-1">
        <span className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-semibold">
          Publicidade
        </span>
        <div className="flex gap-1">
          {ADS.map((_, k) => (
            <button
              key={k}
              aria-label={`Anúncio ${k + 1}`}
              onClick={() => setI(k)}
              className={`h-1.5 rounded-full transition-all ${
                k === i ? 'w-6 bg-gray-800' : 'w-1.5 bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
      <a
        href={ad.href}
        className="group relative block rounded-2xl overflow-hidden shadow-lg border border-gray-200/60 bg-gray-900 min-h-[180px] md:min-h-0"
      >
        <div className="md:hidden">
          <img src={ad.image} alt={ad.title} className="w-full h-40 object-cover" />
          <div className="p-4 bg-gradient-to-b from-gray-900 to-black text-white">
            <div className="text-[10px] uppercase tracking-[0.25em] font-bold opacity-90 mb-1">
              {ad.eyebrow}
            </div>
            <div className="font-extrabold text-lg leading-tight mb-2">{ad.title}</div>
            <div className="text-xs opacity-90 mb-3">{ad.subtitle}</div>
            <span className={`inline-flex w-fit items-center gap-2 ${ad.accent} font-bold text-xs px-4 py-2 rounded-full shadow`}>
              {ad.cta} →
            </span>
          </div>
        </div>
        <div className="hidden md:block relative" style={{ aspectRatio: '1200/220' }}>
          <img
            src={ad.image}
            alt={ad.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className={`absolute inset-0 bg-gradient-to-r ${ad.gradient}`} />
          <div className="relative h-full flex flex-col justify-center px-10 text-white max-w-[70%]">
            <div className="text-xs uppercase tracking-[0.25em] font-bold opacity-90 mb-2">
              {ad.eyebrow}
            </div>
            <div className="font-extrabold text-3xl leading-tight mb-2 drop-shadow">{ad.title}</div>
            <div className="text-sm opacity-95 mb-3 max-w-md">{ad.subtitle}</div>
            <span className={`inline-flex w-fit items-center gap-2 ${ad.accent} font-bold text-sm px-4 py-2 rounded-full shadow`}>
              {ad.cta} →
            </span>
          </div>
        </div>
      </a>
    </div>
  );
}
