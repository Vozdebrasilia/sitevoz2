use client';

interface AdComponentProps {
  token: string;
  width: string;
  height: string;
}

type LocalAd = {
  href: string;
  image: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  address: string;
  site: string;
  siteLabel: string;
  whatsapp: string;
  whatsappLabel: string;
  gradient: string;
  badge: string;
};

const LOCAL_ADS: Record<string, LocalAd> = {
  tambaqui: {
    href: 'https://www.vozdebrasilia.com.br/noticia/hotel-tambaqui-praia-hospedagem-premium-em-jatiuca-vira-febre-entre-turistas-em',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80',
    eyebrow: 'Hospede-se em Maceió',
    title: 'Hotel Tambaqui Praia',
    subtitle: 'Jatiúca · conforto perto da orla · café regional',
    address: 'Rua Eng. Mário de Gusmão · Jatiúca · Maceió/AL',
    site: 'https://hoteltambaqui.com.br/',
    siteLabel: 'Ver preços',
    whatsapp: 'https://wa.me/5582991165869?text=Ol%C3%A1%21%20Vim%20pelo%20Voz%20de%20Bras%C3%ADlia%20e%20gostaria%20de%20reservar%20no%20Tambaqui%20Praia%20Hotel.',
    whatsappLabel: 'WhatsApp',
    gradient: 'from-emerald-950/90 via-emerald-900/70 to-emerald-800/35',
    badge: 'OFERTA VOZ',
  },
  wanchako: {
    href: 'https://www.vozdebrasilia.com.br/noticia/wanchako-cozinha-peruana-premiada-e-destaque-gastronomico-de-maceio',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=80',
    eyebrow: 'Gastronomia premiada',
    title: 'Wanchako',
    subtitle: 'Ceviches, tiraditos e cozinha peruana em Ponta Verde',
    address: 'Rua Prefeito Abdon Arroxelas, 147 · Maceió/AL',
    site: 'https://www.wanchako.com.br',
    siteLabel: 'Ver cardápio',
    whatsapp: 'https://wa.me/5582988899634?text=Ol%C3%A1%21%20Vim%20pelo%20Voz%20de%20Bras%C3%ADlia%20e%20gostaria%20de%20reservar%20mesa%20no%20Wanchako.',
    whatsappLabel: 'Reservar',
    gradient: 'from-amber-950/90 via-orange-900/70 to-amber-800/35',
    badge: 'RESERVAS',
  },
  ritz: {
    href: 'https://www.vozdebrasilia.com.br/noticia/ritz-lagoa-da-anta-o-5-estrelas-mais-desejado-de-maceio',
    image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1200&q=80',
    eyebrow: 'Resort 5★ em Maceió',
    title: 'Ritz Lagoa da Anta',
    subtitle: 'All inclusive · spa · cupom VOZ2026',
    address: 'Av. Brigadeiro Eduardo Gomes, 546 · Maceió/AL',
    site: 'https://www.hoteisritzalagoas.com.br/lagoa/',
    siteLabel: 'Ver tarifas',
    whatsapp: 'https://wa.me/558221214120?text=Ol%C3%A1%21%20Vim%20pelo%20Voz%20de%20Bras%C3%ADlia%20e%20gostaria%20de%20cota%C3%A7%C3%A3o%20com%20o%20cupom%20VOZ2026.',
    whatsappLabel: 'Cotar agora',
    gradient: 'from-blue-950/90 via-sky-900/70 to-blue-800/35',
    badge: '5★ MACEIÓ',
  },
};

function pickAd(width: string, height: string, token: string) {
  if (token.includes('528') || height === '600') return LOCAL_ADS.wanchako;
  if (token.includes('cad') || width === '728') return LOCAL_ADS.ritz;
  return LOCAL_ADS.tambaqui;
}

export default function AdComponent({ token, width, height }: AdComponentProps) {
  const ad = pickAd(width, height, token);
  const isWide = Number(width) >= 700;
  const isTall = Number(height) >= 500;

  return (
    <div
      className="mx-auto overflow-hidden rounded-xl shadow-md border border-gray-100 bg-white"
      style={{ maxWidth: `${width}px`, width: '100%', minHeight: `${height}px` }}
    >
      <div className={`relative ${isWide ? 'min-h-[90px]' : isTall ? 'min-h-[600px]' : 'min-h-[250px]'}`}>
        <img src={ad.image} alt={ad.title} className="absolute inset-0 h-full w-full object-cover" />
        <div className={`absolute inset-0 bg-gradient-to-r ${ad.gradient}`} />

        <div className={`relative z-10 flex h-full min-h-[inherit] text-white ${isWide ? 'items-center justify-between gap-4 p-4' : 'flex-col justify-end p-4'}`}>
          <a href={ad.href} className="block min-w-0" target="_blank" rel="noopener noreferrer">
            <div className="mb-2 inline-flex rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-black uppercase tracking-wide text-gray-900">
              {ad.badge}
            </div>
            <div className="text-[11px] font-semibold uppercase tracking-wide text-emerald-100">{ad.eyebrow}</div>
            <div className={`${isWide ? 'text-xl' : 'text-2xl'} font-black leading-tight drop-shadow-sm`}>{ad.title}</div>
            <div className="mt-1 text-xs font-medium text-white/90">{ad.subtitle}</div>
            {!isWide && <div className="mt-2 text-[11px] leading-snug text-white/85">📍 {ad.address}</div>}
          </a>

          <div className={`mt-3 flex ${isWide ? 'shrink-0 flex-row' : 'flex-col'} gap-2`}>
            <a
              href={ad.site}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-white px-3 py-2 text-center text-xs font-black text-gray-900 shadow-sm hover:bg-gray-100"
            >
              {ad.siteLabel}
            </a>
            <a
              href={ad.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-green-500 px-3 py-2 text-center text-xs font-black text-white shadow-sm hover:bg-green-600"
            >
              {ad.whatsappLabel}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
