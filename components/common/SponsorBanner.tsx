'use client';

type Sponsor = {
  key: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  address?: string;
  cta: string;
  href: string;
  image: string;
  gradient: string;
  accent: string;
};

export const SPONSORS: Record<string, Sponsor> = {
  petrobras: {
    key: 'petrobras',
    eyebrow: 'Energia que move o Brasil',
    title: 'Petrobras',
    subtitle: 'Investimento em energia, tecnologia e desenvolvimento nacional',
    cta: 'Conheça a Petrobras',
    href: 'https://petrobras.com.br',
    image: '/anuncios/petrobras.jpg',
    gradient: 'from-emerald-950/92 via-emerald-900/70 to-emerald-900/30',
    accent: 'bg-yellow-400 text-emerald-950',
  },
  snaider: {
    key: 'snaider',
    eyebrow: 'Engenharia e Construção',
    title: 'Snaider',
    subtitle: 'Obras, reformas e soluções em engenharia com padrão premium',
    address: 'Brasília · Distrito Federal',
    cta: 'Fale com a Snaider',
    href: 'https://www.google.com/search?q=Snaider+engenharia+Bras%C3%ADlia',
    image: '/anuncios/snaider.jpg',
    gradient: 'from-slate-950/92 via-blue-950/70 to-blue-900/30',
    accent: 'bg-sky-400 text-slate-950',
  },
  visao: {
    key: 'visao',
    eyebrow: 'Saúde ocular · Valparaíso de Goiás',
    title: 'Instituto da Visão',
    subtitle: 'Consultas, exames e cirurgias oftalmológicas com tecnologia de ponta',
    address: 'Valparaíso de Goiás · Entorno do DF',
    cta: 'Agende sua consulta',
    href: 'https://www.google.com/search?q=Instituto+da+Vis%C3%A3o+Valpara%C3%ADso+de+Goi%C3%A1s',
    image: '/anuncios/instituto-visao.jpg',
    gradient: 'from-cyan-950/92 via-sky-900/70 to-cyan-900/30',
    accent: 'bg-cyan-300 text-cyan-950',
  },
  lunardi: {
    key: 'lunardi',
    eyebrow: 'Demolição e terraplanagem',
    title: 'Lunardi Demolições',
    subtitle: 'Demolição técnica, remoção de entulho e limpeza de terreno com segurança',
    address: 'Brasília e Entorno',
    cta: 'Solicite um orçamento',
    href: 'https://www.google.com/search?q=Lunardi+Demoli%C3%A7%C3%B5es',
    image: '/anuncios/lunardi.jpg',
    gradient: 'from-stone-950/92 via-amber-950/70 to-stone-900/30',
    accent: 'bg-amber-400 text-stone-950',
  },
  coreto: {
    key: 'coreto',
    eyebrow: 'Móveis corporativos',
    title: 'Coreto Móveis Corporativos',
    subtitle: 'Projetos de escritório sob medida: estações, salas de reunião e recepções',
    address: 'Brasília · DF',
    cta: 'Peça seu projeto',
    href: 'https://www.google.com/search?q=Coreto+M%C3%B3veis+Corporativos+Bras%C3%ADlia',
    image: '/anuncios/coreto.jpg',
    gradient: 'from-neutral-950/92 via-amber-950/65 to-neutral-900/30',
    accent: 'bg-orange-300 text-neutral-950',
  },
  kumon: {
    key: 'kumon',
    eyebrow: 'Educação · Park Sul',
    title: 'Kumon Park Sul',
    subtitle: 'Matemática, Português e Inglês — autonomia nos estudos em qualquer idade',
    address: 'Park Sul · Brasília/DF',
    cta: 'Agende uma aula experimental',
    href: 'https://www.kumon.com.br/',
    image: '/anuncios/kumon.jpg',
    gradient: 'from-blue-950/92 via-indigo-900/70 to-blue-900/30',
    accent: 'bg-yellow-300 text-blue-950',
  },
};

export default function SponsorBanner({ sponsor }: { sponsor: keyof typeof SPONSORS }) {
  const ad = SPONSORS[sponsor];
  if (!ad) return null;

  return (
    <div className="w-full max-w-[1200px] mx-auto px-4">
      <div className="mb-1">
        <span className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-semibold">
          Publicidade
        </span>
      </div>
      <a
        href={ad.href}
        target="_blank"
        rel="noopener noreferrer"
        className="group block relative rounded-2xl overflow-hidden shadow-lg border border-gray-200/60 bg-gray-900"
      >
        {/* Mobile */}
        <div className="md:hidden">
          <img
            src={ad.image}
            alt={ad.title}
            width={1600}
            height={512}
            loading="lazy"
            className="w-full h-36 object-cover"
          />
          <div className="p-4 bg-gradient-to-b from-gray-900 to-black text-white">
            <div className="text-[10px] uppercase tracking-[0.25em] font-bold opacity-90 mb-1">
              {ad.eyebrow}
            </div>
            <div className="font-extrabold text-lg leading-tight mb-1">{ad.title}</div>
            <div className="text-xs opacity-90 mb-2">{ad.subtitle}</div>
            {ad.address && <div className="text-[11px] opacity-80 mb-3">📍 {ad.address}</div>}
            <span className={`inline-flex justify-center items-center ${ad.accent} font-bold text-xs px-4 py-2 rounded-full shadow`}>
              {ad.cta} →
            </span>
          </div>
        </div>
        {/* Desktop */}
        <div className="hidden md:block relative" style={{ aspectRatio: '1200/240' }}>
          <img
            src={ad.image}
            alt={ad.title}
            width={1600}
            height={512}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className={`absolute inset-0 bg-gradient-to-r ${ad.gradient}`} />
          <div className="relative h-full flex flex-col justify-center px-10 text-white max-w-[70%]">
            <div className="text-xs uppercase tracking-[0.25em] font-bold opacity-90 mb-2">
              {ad.eyebrow}
            </div>
            <div className="font-extrabold text-3xl leading-tight mb-1 drop-shadow">{ad.title}</div>
            <div className="text-sm opacity-95 mb-1 max-w-lg">{ad.subtitle}</div>
            {ad.address && <div className="text-xs opacity-90 mb-3">📍 {ad.address}</div>}
            <span className={`mt-2 inline-flex w-fit items-center ${ad.accent} font-bold text-sm px-4 py-2 rounded-full shadow`}>
              {ad.cta} →
            </span>
          </div>
        </div>
      </a>
    </div>
  );
}
