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

export default async function Home() {
  const posts = await getPosts(150);
  const interviews = await getInterviewPosts(40);

  const isMaceio = (p: any) => {
    const t = `${p?.title?.rendered ?? ''} ${p?.excerpt?.rendered ?? ''} ${p?.content?.rendered ?? ''} ${p?.category ?? ''}`
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();
    return /maceio|alagoas|pajucara|ponta verde|praia do frances|maragogi|sao miguel dos milagres/.test(t);
  };
  const maceioPosts = posts.filter(isMaceio);
  const ritzSlide = {
    id: 'ritz-plaza-mar-pajucara',
    slug: 'ritz-plaza-mar-pajucara',
    href: 'https://www.ritzhoteis.com.br/',
    ctaLabel: 'Reservar no Ritz Plaza Mar',
    title: { rendered: 'Ritz Plaza Mar: o pé na areia mais charmoso de Pajuçara' },
    excerpt: {
      rendered:
        'Frente para o mar de Pajuçara, piscina com vista, restaurante e o melhor pôr do sol da orla de Maceió.',
    },
    content: { rendered: '' },
    date: new Date().toISOString(),
    published_at: new Date().toISOString(),
    category: 'Turismo · Maceió',
    categorySlug: 'turismo',
    categoryColor: 'bg-amber-500',
    featured_image:
      'https://voz-central-ai.lovable.app/__l5e/assets-v1/29359ffd-d732-46f1-b10d-364b999c4c07/ritz-pajucara.jpg',
  };

  const heroPosts = [ritzSlide, ...maceioPosts.slice(0, 4)];

  const categories: { title: string; category: string }[] = [
    { title: 'Política', category: 'politica' },
    { title: 'Distrito Federal', category: 'distrito-federal' },
    { title: 'Turismo', category: 'turismo' },
    { title: 'Gastronomia', category: 'gastronomia' },
    { title: 'Economia', category: 'economia' },
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

        <MaceioShowcase />

        <div className="mt-4">
          <PremiumBanner variant={0} />
        </div>

        <div className="bg-white py-8">
          <div className="max-w-[1400px] mx-auto px-4">
            <LatestNews posts={posts} />
          </div>
        </div>

        <MosaicHighlights posts={posts} />

        <div className="mt-6 mb-2">
          <PremiumBanner variant={3} />
        </div>

        {/* Grid principal: categorias densas + sidebar */}
        <div className="max-w-[1400px] mx-auto px-4 py-10">
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

        <div className="bg-gray-50 py-10">
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
