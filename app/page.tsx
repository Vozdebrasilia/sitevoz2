import Header from '@/components/layout/Header';
import LatestNews from '@/components/home/LatestNews';
import InterviewsSection from '@/components/home/InterviewsSection';
import Sidebar from '@/components/layout/Sidebar';
import Footer from '@/components/layout/Footer';
import CategoriesSection from '@/components/home/CategorySection';
import { getPosts, getInterviewPosts } from "../lib/wordpress";
import PremiumBanner from '@/components/common/PremiumBanner';
import TrendingBar from '@/components/common/TrendingBar';
import MosaicHighlights from '@/components/common/MosaicHighlights';
import MaceioShowcase from '@/components/home/MaceioShowcase';
import ViralStrip from '@/components/home/ViralStrip';
import InstagramVideoBanner from '@/components/common/InstagramVideoBanner';
import SponsorBanner from '@/components/common/SponsorBanner';
import TopStoryBanner from '@/components/common/TopStoryBanner';
import TerracapBanner from '@/components/common/TerracapBanner';

export const revalidate = 61;

export default async function Home() {
  const feedPosts = await getPosts(150);
  const interviews = await getInterviewPosts(40);

  const posts = feedPosts.filter((p: any) => {
    const texto = `${p?.title?.rendered ?? p?.title ?? ''} ${p?.excerpt?.rendered ?? p?.excerpt ?? ''}`
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    return !texto.includes('mercadante') && !texto.includes('podcast com o presidente do bndes') && !(texto.includes('datafolha') && texto.includes('flavio bolsonaro') && !String(p?.date || '').startsWith('2026-10-04'));
  });

  const norm = (p: any) =>
    `${p?.title?.rendered ?? ''} ${p?.excerpt?.rendered ?? ''} ${p?.category ?? ''} ${p?.categorySlug ?? ''}`
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();

  const isMaceio = (p: any) =>
    /maceio|alagoas|pajucara|ponta verde|praia do frances|maragogi|sao miguel dos milagres/.test(norm(p));

  const maceioPosts = posts.filter(isMaceio);
  const fotoRuim = (p: any) => !p?.featured_image || /\.(gif)$/i.test(String(p.featured_image));

  // A capa agora é 100% orientada pela atualidade: as matérias antigas continuam
  // disponíveis nas seções abaixo, mas não ocupam mais o carrossel principal.
  const recentes = posts
    .filter((p: any) => !fotoRuim(p))
    .sort((a: any, b: any) => {
      const da = new Date(a?.published_at || a?.created_at || a?.date || 0).getTime();
      const db = new Date(b?.published_at || b?.created_at || b?.date || 0).getTime();
      return db - da;
    });

  // A primeira dobra prioriza estritamente as notícias dos últimos dois dias.
  // As matérias anteriores permanecem nas editorias e no arquivo, sem ocupar a vitrine.
  const agora = Date.now();
  const atuais = recentes.filter((p: any) => {
    const data = new Date(p?.published_at || p?.created_at || p?.date || 0).getTime();
    return Number.isFinite(data) && data <= agora + 60 * 60 * 1000 && data >= agora - 48 * 60 * 60 * 1000;
  });
  const capaAtual = atuais.length ? atuais : recentes.slice(0, 8);
  const postsDestaques = [...capaAtual, ...recentes.filter((p: any) => !capaAtual.includes(p))];
  const heroPosts = capaAtual.slice(0, 8);
  const edicao31Posts = [{"id":"tv31-cidadania","slug":"tv31-cidadania","title":{"rendered":"Encontro nacional do SUAS reúne propostas para fortalecer direitos e participação social"},"excerpt":{"rendered":"Reportagem original da TV Voz de Brasília com fonte oficial divulgada em 30/10/2026."},"category":"Cidadania","date":"2026-10-30T20:00:00-03:00","published_at":"2026-10-30T20:00:00-03:00","featured_image":"https://www.gov.br/mds/pt-br/noticias/encontro-nacional-dos-usuarios-do-suas-encerra-programacao-com-construcao-coletiva-de-carta-por-direitos-e-participacao-social/foto-divulgacao-mds/@@images/b0763b39-e1cb-4857-8a07-42949e7c676c.jpeg","href":"/noticias/edicao-31-outubro/#cidadania"},{"id":"tv31-energia","slug":"tv31-energia","title":{"rendered":"Leilão de transmissão termina com R$ 8,8 bilhões em investimentos"},"excerpt":{"rendered":"Reportagem original da TV Voz de Brasília com fonte oficial divulgada em 30/10/2026."},"category":"Energia","date":"2026-10-30T20:00:00-03:00","published_at":"2026-10-30T20:00:00-03:00","featured_image":"https://www.gov.br/aneel/pt-br/assuntos/noticias/2026/leilao-de-transmissao-no-4-2026-termina-com-os-8-lotes-arrematados-e-economia-para-o-consumidor/@@images/image-800-f58692531d8a1d9502228e9a16b5ca09.jpeg","href":"/noticias/edicao-31-outubro/#energia"},{"id":"tv31-saude","slug":"tv31-saude","title":{"rendered":"Belo Horizonte terá hospital 100% SUS com 250 novos leitos"},"excerpt":{"rendered":"Reportagem original da TV Voz de Brasília com fonte oficial divulgada em 30/10/2026."},"category":"Saúde","date":"2026-10-30T20:00:00-03:00","published_at":"2026-10-30T20:00:00-03:00","featured_image":"https://www.gov.br/saude/pt-br/assuntos/noticias/2026/outubro/belo-horizonte-mg-tera-novo-hospital-100-sus-com-oferta-de-servicos-especializados/pauta-bh.jpg/@@images/c935c025-5fc8-4538-af38-f11c57a0c34d.jpeg","href":"/noticias/edicao-31-outubro/#saude"},{"id":"tv31-transportes","slug":"tv31-transportes","title":{"rendered":"Brasil apresenta R$ 262,6 bilhões em projetos de transporte"},"excerpt":{"rendered":"Reportagem original da TV Voz de Brasília com fonte oficial divulgada em 30/10/2026."},"category":"Mobilidade","date":"2026-10-30T20:00:00-03:00","published_at":"2026-10-30T20:00:00-03:00","featured_image":"https://www.gov.br/transportes/pt-br/assuntos/noticias/2026/copy_of_10/em-londres-ministerio-dos-transportes-da-inicio-a-uma-serie-de-reunioes-com-fortes-investidores-estrangeiros-nesta-sexta-30/investidores-estrangeiros-em-londres.jpeg/@@images/image-1280-fcce63ea39740aa64929fc6a24be0fb3.jpeg","href":"/noticias/edicao-31-outubro/#transportes"},{"id":"tv31-cultura","slug":"tv31-cultura","title":{"rendered":"Brasil amplia cooperação internacional em dança"},"excerpt":{"rendered":"Reportagem original da TV Voz de Brasília com fonte oficial divulgada em 30/10/2026."},"category":"Cultura","date":"2026-10-30T20:00:00-03:00","published_at":"2026-10-30T20:00:00-03:00","featured_image":"https://www.gov.br/cultura/pt-br/assuntos/noticias/ministra-da-cultura-destaca-iniciativas-para-o-fortalecimento-da-danca-durante-encontro-internacional-promovido-pela-funarte/carrossel.png/@@images/d15df154-2043-4fb4-a34e-000e3b2b90e5.png","href":"/noticias/edicao-31-outubro/#cultura"}];
  // Destaque principal sempre derivado de uma notícia real do feed, nunca de uma data fixa.
  const topStory = heroPosts[0] || null;
  const secondaryStories = heroPosts.slice(1, 5);


  const categories: { title: string; category: string }[] = [
    { title: 'Política', category: 'politica' }, { title: 'Distrito Federal', category: 'distrito-federal' },
    { title: 'Economia', category: 'economia' }, { title: 'Turismo', category: 'turismo' },
    { title: 'Gastronomia', category: 'gastronomia' }, { title: 'Saúde', category: 'saude' },
    { title: 'Tecnologia', category: 'tecnologia' }, { title: 'Esportes', category: 'esportes' },
    { title: 'Internacional', category: 'internacional' }, { title: 'Cultura', category: 'cultura' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-0">
        <section id="agenda-governadora" aria-label="Agenda da governadora do Distrito Federal" className="mx-auto max-w-[1400px] px-4 py-5">
          <div className="rounded-2xl border border-blue-200 bg-white p-5 shadow-md md:p-7">
            <div className="text-xs font-bold uppercase tracking-wider text-blue-800">Distrito Federal · Agenda pública</div>
            <h2 className="mt-2 text-2xl font-extrabold text-slate-900 md:text-3xl">Agenda da governadora Celina Leão</h2>
            <p className="mt-1 font-semibold text-slate-600">Semana de 23 a 29 de novembro de 2026 · Boletim de 24/11</p>
            <a className="mt-3 inline-block rounded-lg bg-blue-900 px-4 py-3 font-bold text-white" href="https://www.df.gov.br/agenda-do-governador" target="_blank" rel="noopener noreferrer">Consultar programação oficial do dia e da semana →</a>
            <h3 className="mt-5 text-lg font-bold text-slate-900">Terça-feira, 24/11 — compromissos realizados e confirmados pelo GDF</h3>
            <div className="mt-3 grid gap-3 md:grid-cols-2">
              <div className="rounded-lg border border-slate-200 p-4"><h4 className="font-bold text-slate-900">Ceilândia — visita à Feira do Produtor</h4><p className="mt-1 text-slate-700">Acompanhamento da recuperação da cobertura e da ampliação do estacionamento. Horário do compromisso não confirmado.</p><a className="mt-2 inline-block text-sm font-semibold text-blue-800 underline" href="https://agenciabrasilia.df.gov.br/w/feira-do-produtor-de-ceilandia-recebe-nova-cobertura-termoacustica?redirect=%2Fnoticias" target="_blank" rel="noopener noreferrer">Registro oficial</a></div>
              <div className="rounded-lg border border-slate-200 p-4"><h4 className="font-bold text-slate-900">P Sul, Ceilândia — obras de drenagem</h4><p className="mt-1 text-slate-700">Assinatura de ata de registro de preços e autorização de intervenções de drenagem. Horário do compromisso não confirmado.</p><a className="mt-2 inline-block text-sm font-semibold text-blue-800 underline" href="https://www.agenciabrasilia.df.gov.br/w/gdf-lanca-pacote-de-quase-r-15-milhoes-para-drenagem-pluvial-em-ceilandia" target="_blank" rel="noopener noreferrer">Registro oficial</a></div>
            </div>
            <h3 className="mt-5 text-lg font-bold text-slate-900">Atos divulgados nesta semana</h3>
            <p className="mt-2 text-slate-700"><strong>23/11:</strong> divulgação da proposta de atualização dos valores venais para o IPVA de 2027. <strong>24/11:</strong> anúncio de ponto facultativo em 5 e 6 de janeiro de 2027.</p>
            <p className="mt-3 text-sm text-slate-600">Os horários e demais compromissos de 23 a 29/11 não foram confirmados nesta consulta. A programação oficial pode sofrer alterações; consulte o calendário do GDF acima. Fontes: GDF e Agência Brasília.</p>
          </div>
        </section>
        <section aria-label="Edição atualizada de 23 de novembro de 2026" className="mx-auto max-w-[1400px] px-4 pt-5 pb-4">
          <div className="rounded-2xl border-2 border-amber-400 bg-gradient-to-r from-slate-950 to-blue-950 px-6 py-6 text-white shadow-xl">
            <span className="text-sm font-black tracking-wider text-amber-300">TV VOZ DE BRASÍLIA · SEGUNDA-FEIRA · 23/11/2026</span>
            <h2 className="mt-3 text-3xl font-extrabold leading-tight md:text-4xl">Brasília em pauta: as prioridades de Júlio César e Rôney Nemer para 2027</h2>
            <p className="mt-3 max-w-4xl text-base text-blue-100">Duas reportagens autorais analisam o cenário pós-eleitoral do Distrito Federal e os compromissos anunciados pelos parlamentares eleitos.</p>
          </div>
          <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
            <a href="/noticia/julio-cesar-reeleito-esporte-protecao-mulheres-2027" className="overflow-hidden rounded-xl border border-amber-300 bg-white shadow-md hover:shadow-xl">
              <img src="https://www.camara.leg.br/internet/deputado/bandep/204372.jpg" alt="Deputado federal Júlio César Ribeiro, fotografia oficial da Câmara" className="h-56 w-full object-cover object-top" />
              <div className="p-5"><span className="text-xs font-black text-amber-700">POLÍTICA · 23/11/2026</span><h3 className="mt-2 text-xl font-extrabold text-slate-900">Júlio César reforça esporte e proteção às mulheres entre prioridades para 2027</h3><p className="mt-2 text-slate-700">Reeleito para a Câmara, o parlamentar defende oportunidades para jovens e fortalecimento de serviços de acolhimento.</p><strong className="mt-3 block text-blue-800">LER REPORTAGEM COMPLETA →</strong></div>
            </a>
            <a href="/noticia/roney-nemer-retorno-cldf-mandato-participativo-2027" className="overflow-hidden rounded-xl border border-amber-300 bg-white shadow-md hover:shadow-xl">
              <img src="https://images.metroimg.com/2022/04/12154107/roney-2.jpg" alt="Rôney Nemer em fotografia real de arquivo" className="h-56 w-full object-cover object-top" />
              <div className="p-5"><span className="text-xs font-black text-amber-700">DISTRITO FEDERAL · 23/11/2026</span><h3 className="mt-2 text-xl font-extrabold text-slate-900">Rôney Nemer prepara retorno à CLDF com proposta de mandato participativo</h3><p className="mt-2 text-slate-700">Deputado distrital eleito destaca saúde, transporte, regularização e diálogo com comunidades.</p><strong className="mt-3 block text-blue-800">LER REPORTAGEM COMPLETA →</strong></div>
            </a>
          </div>
        </section>
        <TrendingBar posts={[...edicao31Posts, ...postsDestaques]} />
        <div className="pt-4 space-y-4">
          {topStory && (
            <div className="max-w-[1400px] mx-auto px-4">
              <TopStoryBanner
                href={topStory.href || `/noticia/${topStory.slug}`}
                kicker={`MANCHETE • ${topStory.category || "BRASIL"} • ${String(topStory.date || topStory.published_at || "").slice(0, 10)}`}
                title={typeof topStory.title === 'object' ? topStory.title?.rendered || '' : topStory.title || ''}
                excerpt={typeof topStory.excerpt === 'object' ? topStory.excerpt?.rendered || '' : topStory.excerpt || ''}
                image={topStory.featured_image}
              />
            </div>
          )}
          <section aria-label="Quatro notícias secundárias verificadas" className="max-w-[1400px] mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {secondaryStories.map((p: any) => (
              <a key={p.id || p.slug} href={p.href || `/noticia/${p.slug}`} className="block overflow-hidden rounded-xl border border-amber-300 bg-white shadow-md hover:shadow-xl">
                <img src={p.featured_image} alt={String(p?.title?.rendered || 'Imagem documental da reportagem')} className="h-40 w-full object-cover" loading="lazy" />
                <div className="p-4"><small className="text-amber-700 font-bold">{p.category || 'NOTÍCIAS'} • {String(p.date || p.published_at || '').slice(0, 10)}</small><h3 className="text-lg font-bold text-slate-900 mt-2">{p?.title?.rendered || p.title}</h3><span className="text-blue-700 font-bold text-sm mt-3 block">LER REPORTAGEM →</span></div>
              </a>
            ))}
          </section>
          <SponsorBanner sponsor="snaider" />
        </div>
        <div className="w-full bg-[#020617] py-4">
          <div className="mx-auto max-w-[1200px] px-4">
            <img
              src="https://cdn.creativeclaw.co/u/d4de7256/images/b00ab739-9a74-4feb-87f8-859e585a4a0e.png"
              alt="Anuário Brasileiro 25 Anos — 1 milhão de exemplares, mil páginas e espaço para sua logomarca"
              className="mx-auto block h-auto w-full rounded-xl shadow-lg"
              loading="eager"
            />
          </div>
        </div>
        <div className="bg-white pt-8"><div className="max-w-[1400px] mx-auto px-4"><LatestNews posts={[...edicao31Posts, ...capaAtual]} /></div></div>
        <div className="mt-4"><PremiumBanner variant={0} /></div>
        <div className="mt-6"><SponsorBanner sponsor="visao" /></div>
        <ViralStrip />
        <MosaicHighlights posts={[...edicao31Posts, ...postsDestaques]} />
        <div className="mt-6 mb-2"><TerracapBanner /></div>

        <div className="mt-6 mb-2">
          <PremiumBanner variant={3} />
        </div>

        <div className="mt-4 mb-2">
          <SponsorBanner sponsor="lunardi" />
        </div>

        <div className="max-w-[1400px] mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-10">{categories.map((c) => (<CategoriesSection key={c.category} title={c.title} category={c.category} />))}</div>
            <aside className="lg:col-span-1"><div className="lg:sticky lg:top-24"><Sidebar /></div></aside>
          </div>
        </div>
        <div className="mb-2"><PremiumBanner variant={1} /></div>
        <div className="mt-4 mb-2"><SponsorBanner sponsor="coreto" /></div>
        {maceioPosts.length > 0 && <MaceioShowcase />}
        <div className="bg-gray-50 py-8"><div className="max-w-[1400px] mx-auto px-4"><InterviewsSection posts={interviews} /></div></div>
        <div className="mt-4 mb-2"><SponsorBanner sponsor="kumon" /></div>
        <div className="mt-2 mb-10"><PremiumBanner variant={2} /></div>
      </main>
      <Footer />
    </div>
  );
}
