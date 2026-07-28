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

      {/* Hotel destaque */}
      <div className="bg-gradient-to-b from-cyan-950 to-cyan-900 py-10">
        <div className="max-w-[1400px] mx-auto px-4">
          <div className="flex items-end justify-between mb-6">
            <h3 className="text-2xl md:text-3xl font-bold text-white">
              Onde ficar em Maceió
            </h3>
            <span className="text-cyan-200 text-sm">Seleção Voz de Brasília</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-md">
            {RESTAURANTES.map((r) => (
              <article
                key={r.name}
                className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-white/10"
              >
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={r.image}
                    alt={`${r.name} em Maceió`}
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
