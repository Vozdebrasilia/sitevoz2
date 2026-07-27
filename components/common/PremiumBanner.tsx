'use client';

import { useEffect, useState } from 'react';

type Ad = {
  href: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  address: string;
  site: string;
  siteLabel: string;
  whatsapp: string;
  whatsappLabel: string;
  cta: string;
  image: string;
  gradient: string;
  accent: string;
};

const ADS: Ad[] = [
  {
    href: 'https://www.vozdebrasilia.com.br/noticia/ritz-lagoa-da-anta-o-5-estrelas-mais-desejado-de-maceio',
    eyebrow: 'Resort 5 Estrelas · Maceió',
    title: 'Ritz Lagoa da Anta',
    subtitle: 'All inclusive à beira-mar em Jatiúca · Spa · Gastronomia premiada',
    address: 'Av. Brigadeiro Eduardo Gomes, 546 · Lagoa da Anta · Maceió/AL',
    site: 'https://www.hoteisritzalagoas.com.br/lagoa/',
    siteLabel: 'Reservar no site · ver tarifas',
    whatsapp: 'https://wa.me/558221214120?text=Ol%C3%A1%21%20Vim%20pelo%20Voz%20de%20Bras%C3%ADlia%20e%20gostaria%20de%20cota%C3%A7%C3%A3o%20com%20o%20cupom%20VOZ2026.',
    whatsappLabel: 'Reservas (82) 2121-4120',
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
    address: 'Rua Engenheiro Mário de Gusmão · Jatiúca · Maceió/AL',
    site: 'https://hoteltambaqui.com.br/',
    siteLabel: 'Ver preços e disponibilidade',
    whatsapp: 'https://wa.me/5582991165869?text=Ol%C3%A1%21%20Vim%20pelo%20Voz%20de%20Bras%C3%ADlia%20e%20gostaria%20de%20reservar%20no%20Tambaqui%20Praia%20Hotel.',
    whatsappLabel: 'WhatsApp (82) 99116-5869',
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
    address: 'Rua Prefeito Abdon Arroxelas, 147 · Ponta Verde · Maceió/AL',
    site: 'https://www.wanchako.com.br',
    siteLabel: 'Ver cardápio e reservar',
    whatsapp: 'https://wa.me/5582988899634?text=Ol%C3%A1%21%20Vim%20pelo%20Voz%20de%20Bras%C3%ADlia%20e%20gostaria%20de%20reservar%20mesa%20no%20Wanchako.',
    whatsappLabel: 'WhatsApp (82) 98889-9634',
    cta: 'Reserve sua mesa',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1600&q=80',
    gradient: 'from-amber-950/90 via-amber-900/70 to-amber-950/40',
    accent: 'bg-amber-400 text-amber-950',
  },
  {
    href: 'https://www.vozdebrasilia.com.br/noticia/restaurante-janga-praia-a-experiencia-de-frutos-do-mar-mais-desejada-de-maceio',
    eyebrow: 'Frutos do Mar Premiados · Maceió',
    title: 'Restaurante Janga Praia',
    subtitle: '#2 melhor restaurante de Maceió · Lagosta, camarão e risotos autorais à beira-mar',
    address: 'Av. Silvio Carlos Viana, 1731 · Cruz das Almas · Maceió/AL',
    site: 'https://linktr.ee/PedidosJanga',
    siteLabel: 'Ver cardápio · fazer pedido',
    whatsapp: 'https://wa.me/558230283288?text=Ol%C3%A1%21%20Vim%20pelo%20Voz%20de%20Bras%C3%ADlia%20e%20gostaria%20de%20reservar%20mesa%20no%20Janga%20Praia.',
    whatsappLabel: 'Reservas (82) 3028-3288',
    cta: 'Reserve sua mesa à beira-mar',
    image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1600&q=80',
    gradient: 'from-cyan-950/90 via-teal-900/70 to-cyan-950/40',
    accent: 'bg-amber-400 text-teal-950',
  },
  {
    href: 'https://www.vozdebrasilia.com.br/noticia/ritz-suites-jatiuca-o-charme-pe-na-areia-mais-badalado-de-maceio',
    eyebrow: 'Hotel Boutique · Maceió',
    title: 'Ritz Suites Jatiúca',
    subtitle: 'Pé na areia em Jatiúca · Suítes vista mar · Piscina rooftop · Café premiado',
    address: 'Rua Engenheiro Mário de Gusmão, 1300 · Jatiúca · Maceió/AL',
    site: 'https://www.hoteisritzalagoas.com.br/suites/',
    siteLabel: 'Reservar no site · ver tarifas',
    whatsapp: 'https://wa.me/558221226300?text=Ol%C3%A1%21%20Vim%20pelo%20Voz%20de%20Bras%C3%ADlia%20e%20gostaria%20de%20cota%C3%A7%C3%A3o%20no%20Ritz%20Suites%20Jati%C3%BAca%20com%20cupom%20VOZ2026.',
    whatsappLabel: 'Reservas (82) 2122-6300',
    cta: 'Reserve com cupom VOZ2026',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1600&q=80',
    gradient: 'from-indigo-950/90 via-indigo-900/70 to-indigo-950/40',
    accent: 'bg-amber-400 text-indigo-950',
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
      <div className="relative rounded-2xl overflow-hidden shadow-lg border border-gray-200/60 bg-gray-900">
        {/* Mobile */}
        <div className="md:hidden">
          <a href={ad.href} className="block">
            <img src={ad.image} alt={ad.title} className="w-full h-40 object-cover" />
          </a>
          <div className="p-4 bg-gradient-to-b from-gray-900 to-black text-white">
            <div className="text-[10px] uppercase tracking-[0.25em] font-bold opacity-90 mb-1">
              {ad.eyebrow}
            </div>
            <div className="font-extrabold text-lg leading-tight mb-1">{ad.title}</div>
            <div className="text-xs opacity-90 mb-2">{ad.subtitle}</div>
            <div className="text-[11px] opacity-80 mb-3">📍 {ad.address}</div>
            <div className="flex flex-col gap-2">
              <a href={ad.site} target="_blank" rel="noopener noreferrer" className={`inline-flex justify-center items-center gap-2 ${ad.accent} font-bold text-xs px-4 py-2 rounded-full shadow`}>
                {ad.siteLabel} →
              </a>
              <a href={ad.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex justify-center items-center gap-2 bg-[#25D366] text-white font-bold text-xs px-4 py-2 rounded-full shadow">
                💬 {ad.whatsappLabel}
              </a>
            </div>
          </div>
        </div>
        {/* Desktop */}
        <div className="hidden md:block relative" style={{ aspectRatio: '1200/260' }}>
          <a href={ad.href} className="absolute inset-0 group">
            <img
              src={ad.image}
              alt={ad.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className={`absolute inset-0 bg-gradient-to-r ${ad.gradient}`} />
          </a>
          <div className="relative h-full flex flex-col justify-center px-10 text-white max-w-[70%] pointer-events-none">
            <div className="text-xs uppercase tracking-[0.25em] font-bold opacity-90 mb-2">
              {ad.eyebrow}
            </div>
            <div className="font-extrabold text-3xl leading-tight mb-1 drop-shadow">{ad.title}</div>
            <div className="text-sm opacity-95 mb-1 max-w-md">{ad.subtitle}</div>
            <div className="text-xs opacity-90 mb-3">📍 {ad.address}</div>
            <div className="flex flex-wrap gap-2 pointer-events-auto">
              <a href={ad.site} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-2 ${ad.accent} font-bold text-sm px-4 py-2 rounded-full shadow`}>
                {ad.siteLabel} →
              </a>
              <a href={ad.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[#25D366] text-white font-bold text-sm px-4 py-2 rounded-full shadow">
                💬 {ad.whatsappLabel}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

