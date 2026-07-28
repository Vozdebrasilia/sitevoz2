import Link from 'next/link';

type Resto = {
  name: string;
  tag: string;
  desc: string;
  address: string;
  site: string;
  siteLabel: string;
  whatsapp?: string;
  whatsappLabel?: string;
  image: string;
};

const RESTAURANTES: Resto[] = [
  {
    name: 'Janga Praia',
    tag: 'Frutos do mar · Cruz das Almas',
    desc: 'Lagosta, camarão e risotos autorais com o mar na janela. Um dos mais desejados da orla.',
    address: 'Av. Silvio Carlos Viana, 1731 · Cruz das Almas · Maceió/AL',
    site: 'https://linktr.ee/PedidosJanga',
    siteLabel: 'Cardápio e pedidos',
    whatsapp:
      'https://wa.me/558230283288?text=Ol%C3%A1%21%20Vim%20pelo%20Voz%20de%20Bras%C3%ADlia%20e%20gostaria%20de%20reservar%20mesa%20no%20Janga%20Praia.',
    whatsappLabel: 'Reservas (82) 3028-3288',
    image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1200&q=80',
  },
  {
    name: 'Wanchako',
    tag: 'Cozinha peruana · Ponta Verde',
    desc: 'Ceviches autorais, tiraditos e coquetelaria assinada. Gastronomia premiada de Maceió.',
    address: 'Rua Prefeito Abdon Arroxelas, 147 · Ponta Verde · Maceió/AL',
    site: 'https://www.wanchako.com.br',
    siteLabel: 'Ver cardápio',
    whatsapp:
      'https://wa.me/5582988899634?text=Ol%C3%A1%21%20Vim%20pelo%20Voz%20de%20Bras%C3%ADlia%20e%20gostaria%20de%20reservar%20mesa%20no%20Wanchako.',
    whatsappLabel: 'WhatsApp (82) 98889-9634',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=80',
  },
  {
    name: 'Divina Gula',
    tag: 'Cozinha regional · Ponta Verde',
    desc: 'Mais de 30 anos de casa cheia. Sabores mineiros e alagoanos em porções generosas.',
    address: 'Av. Eng. Paulo Brandão Nogueira, 85 · Maceió/AL',
    site: 'http://restaurantedivinagula.com.br/',
    siteLabel: 'Site oficial',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80',
  },
  {
    name: 'Kanoa Beach Club',
    tag: 'Pé na areia · Praia do Francês',
    desc: 'Day use, música ao vivo e drinks de frente pro mar. O point mais animado do litoral sul.',
    address: 'Av. Caravelas, s/n · Praia do Francês · Marechal Deodoro/AL',
    site: 'https://kanoabeach.com.br/frances',
    siteLabel: 'Day use e reservas',
    image: 'https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?w=1200&q=80',
  },
  {
    name: 'Ritz Plaza Mar',
    tag: 'Hotel · Praia de Pajuçara',
    desc: 'Frente para a praia de Pajuçara, piscina, restaurante e a melhor vista do pôr do sol da orla.',
    address: 'Av. Dr. Antônio Gouveia, 1141 · Pajuçara · Maceió/AL',
    site: 'https://www.ritzhoteis.com.br/',
    siteLabel: 'Reservar diária',
    whatsapp:
      'https://wa.me/558230228700?text=Ol%C3%A1%21%20Vim%20pelo%20Voz%20de%20Bras%C3%ADlia%20e%20gostaria%20de%20informa%C3%A7%C3%B5es%20sobre%20o%20Ritz%20Plaza%20Mar%20em%20Paju%C3%A7ara.',
    whatsappLabel: 'WhatsApp Ritz Plaza Mar',
    image: 'https://voz-central-ai.lovable.app/__l5e/assets-v1/29359ffd-d732-46f1-b10d-364b999c4c07/ritz-pajucara.jpg',
  },
];

export default function MaceioShowcase() {
  return (
    <section className="relative overflow-hidden">
      {/* Faixa hero de Maceió */}
      <div className="relative h-[320px] md:h-[440px] w-full">
        <img
          src="https://images.unsplash.com/photo-1590523278191-995cbcda646b?w=2000&q=85"
          alt="Praia de águas turquesa e jangadas em Maceió, Alagoas"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-cyan-950/95 via-cyan-900/50 to-transparent" />
        <div className="relative h-full max-w-[1400px] mx-auto px-4 flex flex-col justify-end pb-8">
          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-amber-400 px-4 py-1 text-xs font-bold uppercase tracking-widest text-cyan-950">
            Especial Maceió · Alagoas
          </span>
          <h2 className="mt-3 text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg leading-tight">
            O mar mais bonito do Brasil
          </h2>
          <p className="mt-2 max-w-2xl text-base md:text-lg text-cyan-50/95">
            Jangadas nas piscinas naturais, coqueirais na orla e uma cena gastronômica que virou
            destino. O Voz de Brasília leva você para dentro de Maceió.
          </p>
        </div>
      </div>

      {/* Quatro restaurantes */}
      <div className="bg-gradient-to-b from-cyan-950 to-cyan-900 py-10">
        <div className="max-w-[1400px] mx-auto px-4">
          <div className="flex items-end justify-between mb-6">
            <h3 className="text-2xl md:text-3xl font-bold text-white">
              Onde comer em Maceió
            </h3>
            <span className="text-cyan-200 text-sm">Seleção Voz de Brasília</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            {RESTAURANTES.map((r) => (
              <article
                key={r.name}
                className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-white/10"
              >
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={r.image}
                    alt={`Restaurante ${r.name} em Maceió`}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <span className="absolute left-3 top-3 max-w-[88%] rounded-full bg-cyan-950/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-amber-300 truncate">
                    {r.tag}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-4">
                  <h4 className="text-lg font-bold text-cyan-950">{r.name}</h4>
                  <p className="mt-1 text-sm text-gray-600 flex-1">{r.desc}</p>
                  <p className="mt-3 text-xs text-gray-500 min-h-[32px]">{r.address}</p>

                  <div className="mt-4 flex flex-col gap-2">
                    <Link
                      href={r.site}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-lg bg-cyan-950 px-3 py-2 text-center text-sm font-semibold text-white hover:bg-cyan-800 transition-colors"
                    >
                      {r.siteLabel}
                    </Link>
                    {r.whatsapp && (
                      <Link
                        href={r.whatsapp}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-lg bg-emerald-500 px-3 py-2 text-center text-sm font-semibold text-white hover:bg-emerald-600 transition-colors"
                      >
                        {r.whatsappLabel}
                      </Link>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
