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
    return !(texto.includes('datafolha') && texto.includes('flavio bolsonaro') && !String(p?.date || '').startsWith('2026-10-04'));
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
  const edicao31Posts = [{"id":"20261105-1","slug":"05-novembro-gastronomia","title":{"rendered":"Rota do Quiosque poderá selecionar até 100 estabelecimentos no DF"},"excerpt":{"rendered":"Projeto anunciado em 5/11 prevê formação, circuito gastronômico e premiação; inscrições até 6/11."},"category":"Gastronomia","date":"2026-11-05T12:00:00-03:00","published_at":"2026-11-05T12:00:00-03:00","featured_image":"/news-images/festival.png","href":"/noticias/edicao-05-novembro/#gastronomia"},{"id":"20261105-2","slug":"05-novembro-saude","title":{"rendered":"Saúde detalha repasses federais para o piso da enfermagem"},"excerpt":{"rendered":"Fundo Nacional de Saúde publicou em 5/11 planilhas de recursos de outubro para estados, municípios e DF."},"category":"Saúde","date":"2026-11-05T12:00:00-03:00","published_at":"2026-11-05T12:00:00-03:00","featured_image":"/news-images/senado.png","href":"/noticias/edicao-05-novembro/#saude"},{"id":"20261105-3","slug":"05-novembro-tecnologia","title":{"rendered":"Serpro realiza programação de soberania em IA em Brasília"},"excerpt":{"rendered":"Encontro oficial de 5/11 discute governança de dados, nuvem e tecnologias para o setor público."},"category":"Tecnologia e IA","date":"2026-11-05T12:00:00-03:00","published_at":"2026-11-05T12:00:00-03:00","featured_image":"/news-images/itamaraty.png","href":"/noticias/edicao-05-novembro/#tecnologia"},{"id":"20261105-4","slug":"05-novembro-mobilidade","title":{"rendered":"Seminário Via Viva debate segurança viária e frotas limpas"},"excerpt":{"rendered":"Programação oficial de 5/11 inclui mobilidade urbana e infraestrutura de transportes."},"category":"Mobilidade","date":"2026-11-05T12:00:00-03:00","published_at":"2026-11-05T12:00:00-03:00","featured_image":"/news-images/festival.png","href":"/noticias/edicao-05-novembro/#mobilidade"},{"id":"20261105-5","slug":"05-novembro-economia","title":{"rendered":"IBGE inclui divulgação da produção industrial no calendário de 5 de novembro"},"excerpt":{"rendered":"Indicador de setembro tem data prevista de divulgação nesta quinta-feira; resultados devem ser consultados na fonte oficial."},"category":"Economia","date":"2026-11-05T12:00:00-03:00","published_at":"2026-11-05T12:00:00-03:00","featured_image":"/news-images/senado.png","href":"/noticias/edicao-05-novembro/#economia"}];
  const topStory = {
    href: '/noticias/edicao-05-novembro/#gastronomia',
    category: 'Brasília • Economia e Gastronomia',
    title: { rendered: 'Rota do Quiosque poderá selecionar até 100 estabelecimentos no DF' },
    excerpt: { rendered: 'Projeto anunciado em 5/11 prevê formação, circuito gastronômico e premiação; inscrições até 6/11.' },
    featured_image: '/news-images/festival.png',
  };

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
        <TrendingBar posts={[...edicao31Posts, ...postsDestaques]} />
        <div className="pt-4 space-y-4">
          {topStory && (
            <div className="max-w-[1400px] mx-auto px-4">
              <TopStoryBanner
                href={topStory.href || `/noticia/${topStory.slug}`}
                kicker="MANCHETE • BRASÍLIA • FONTE 05/11/2026 • EDIÇÃO 05/11"
                title={typeof topStory.title === 'object' ? topStory.title?.rendered || '' : topStory.title || ''}
                excerpt={typeof topStory.excerpt === 'object' ? topStory.excerpt?.rendered || '' : topStory.excerpt || ''}
                image={topStory.featured_image}
              />
            </div>
          )}
          <section aria-label="Quatro destaques com fontes identificadas de 5 de novembro" className="max-w-[1400px] mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              ["saude","SAÚDE","Saúde detalha repasses federais para o piso da enfermagem"],
              ["tecnologia","TECNOLOGIA","Serpro realiza programação de soberania em IA em Brasília"],
              ["mobilidade","MOBILIDADE","Seminário Via Viva debate segurança viária e frotas limpas"],
              ["economia","ECONOMIA","IBGE inclui divulgação da produção industrial no calendário de 5 de novembro"]
            ].map(([id,tag,title]) => <a key={id} href={`/noticias/edicao-05-novembro/#${id}`} className="block rounded-xl border border-amber-300 bg-white shadow-md p-5 hover:shadow-xl"><small className="text-amber-700 font-bold">FONTE 05/11 • {tag}</small><h3 className="text-lg font-bold text-slate-900 mt-2">{title}</h3><span className="text-blue-700 font-bold text-sm mt-3 block">LER REPORTAGEM →</span></a>)}
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
