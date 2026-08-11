import Header from '@/components/layout/Header';
import HeroCarousel from '@/components/home/HeroCarousel';
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

export const revalidate = 300;

export default async function Home() {
  const posts = await getPosts(150);
  const interviews = await getInterviewPosts(40);

  const norm = (p: any) =>
    `${p?.title?.rendered ?? ''} ${p?.excerpt?.rendered ?? ''} ${p?.category ?? ''} ${p?.categorySlug ?? ''}`
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();

  const isMaceio = (p: any) =>
    /maceio|alagoas|pajucara|ponta verde|praia do frances|maragogi|sao miguel dos milagres/.test(norm(p));

  const isPolitica = (p: any) =>
    p?.categorySlug === 'politica' ||
    /politica|lula|celina|tarcisio|bolsonaro|caiado|zema|ciro gomes|ratinho|congresso|presidenciav|eleicoes 2026|planalto|buriti/.test(
      norm(p),
    );

  const politicaPosts = posts.filter(isPolitica);
  const maceioPosts = posts.filter(isMaceio);

  // Fotos ruins/recortadas nao entram no destaque principal
  const fotoRuim = (p: any) =>
    !p?.featured_image ||
    /celina/i.test(norm(p)) ||
    /\.(gif)$/i.test(String(p.featured_image));

  const heroPosts = (politicaPosts.length >= 3 ? politicaPosts : posts)
    .filter((p: any) => !fotoRuim(p))
    .slice(0, 6);

  const categories: { title: string; category: string }[] = [
    { title: 'Política', category: 'politica' },
    { title: 'Distrito Federal', category: 'distrito-federal' },
    { title: 'Economia', category: 'economia' },
    { title: 'Turismo', category: 'turismo' },
    { title: 'Gastronomia', category: 'gastronomia' },
    { title: 'Saúde', category: 'saude' },
    { title: 'Tecnologia', category: 'tecnologia' },
    { title: 'Esportes', category: 'esportes' },
    { title: 'Internacional', category: 'internacional' },
    { title: 'Cultura', category: 'cultura' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="pt-16">
        <TrendingBar posts={posts} />

        <HeroCarousel posts={heroPosts} />

        <InstagramVideoBanner />

        <div className="bg-white pt-8">
          <div className="max-w-[1400px] mx-auto px-4">
            <LatestNews posts={politicaPosts.length ? politicaPosts : posts} />
          </div>
        </div>

        <div className="mt-4">
          <PremiumBanner variant={0} />
        </div>

        <ViralStrip />

        <MosaicHighlights posts={posts} />

        <div className="mt-6 mb-2">
          <PremiumBanner variant={3} />
        </div>

        {/* Grid principal: categorias densas + sidebar */}
        <div className="max-w-[1400px] mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-10">
              {categories.map((c) => (
                <CategoriesSection key={c.category} title={c.title} category={c.category} />
              ))}
            </div>
            <aside className="lg:col-span-1">
              <div className="lg:sticky lg:top-24">
                <Sidebar />
              </div>
            </aside>
          </div>
        </div>

        <div className="mb-2">
          <PremiumBanner variant={1} />
        </div>

        {maceioPosts.length > 0 && <MaceioShowcase />}

        <div className="bg-gray-50 py-8">
          <div className="max-w-[1400px] mx-auto px-4">
            <InterviewsSection posts={interviews} />
          </div>
        </div>

        <div className="mt-2 mb-10">
          <PremiumBanner variant={2} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
