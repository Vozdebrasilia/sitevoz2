import Header from '@/components/layout/Header';
import HeroCarousel from '@/components/home/HeroCarousel';
import LatestNews from '@/components/home/LatestNews';
import InterviewsSection from '@/components/home/InterviewsSection';
import Sidebar from '@/components/layout/Sidebar';
import Footer from '@/components/layout/Footer';
import CategoriesSection from '@/components/home/CategorySection';
import { getPosts, getInterviewPosts } from "../lib/wordpress";
import PremiumBanner from '@/components/common/PremiumBanner';

export default async function Home() {
  const posts = await getPosts(100);
  const interviews = await getInterviewPosts(40);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="pt-20">
        <div className="my-6">
          <PremiumBanner variant={0} />
        </div>

        <HeroCarousel posts={posts.slice(0, 5)} />

        <div className="bg-white py-8">
          <div className="max-w-[1400px] mx-auto px-4">
            <LatestNews posts={posts} />
          </div>
        </div>

        <div className="bg-gray-50 py-12">
          <div className="max-w-[1400px] mx-auto px-4">
            <InterviewsSection posts={interviews} />
          </div>
        </div>

        <div className="max-w-[1400px] mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-12">
              <CategoriesSection />
            </div>
            <div className="lg:col-span-1">
              <Sidebar />
            </div>
          </div>
        </div>

        <div className="my-10">
          <PremiumBanner variant={1} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
