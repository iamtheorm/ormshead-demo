import { draftMode } from "next/headers";
import { StoryblokStory } from "@storyblok/react/rsc";

async function fetchHomePage() {
  try {
    const { isEnabled } = await draftMode();
    const version = isEnabled ? "draft" : "published";

    const res = await fetch(
      `https://api.storyblok.com/v2/cdn/stories/home?version=${version}&token=${process.env.NEXT_PUBLIC_STORYBLOK_TOKEN}`,
      { 
        next: { tags: ["storyblok-home"] } 
      }
    );

    if (!res.ok) {
      return null;
    }

    return await res.json();
  } catch (error) {
    return null;
  }
}

export default async function Home() {
  const data = await fetchHomePage();

  // If Storyblok data is successfully fetched, render the headless CMS implementation
  if (data?.story) {
    return (
      <div className="max-w-5xl mx-auto py-12">
        <StoryblokStory story={data.story} />
      </div>
    );
  }

  // Fallback to the hardcoded static demo
  return (
    <>
      <section className="hero-section" id="home">
        <div className="inline-block px-4 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-semibold mb-4">
          Welcome to Orm'shead
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight">
          Crafting Digital <span className="text-blue-600">Masterpieces</span>
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl">
          We build robust, scalable, and visually stunning web applications that elevate your brand and drive results.
        </p>
        <div className="flex gap-4 mt-8">
          <a href="#contact" className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 shadow-lg shadow-blue-500/30 transition">
            Start a Project
          </a>
          <a href="#services" className="px-6 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-semibold rounded-lg border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition">
            Our Services
          </a>
        </div>
      </section>

      <section className="features-section" id="services">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-blue-600 font-bold tracking-wider uppercase text-sm">What We Do</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mt-2">Comprehensive Digital Solutions</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="feature-card">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/40 rounded-lg flex items-center justify-center text-blue-600 text-2xl mb-6">💻</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Custom Development</h3>
              <p className="text-gray-600 dark:text-gray-400">Tailor-made web applications built with cutting-edge technologies for optimal performance and scalability.</p>
            </div>
            
            <div className="feature-card">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/40 rounded-lg flex items-center justify-center text-purple-600 text-2xl mb-6">🎨</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">UI/UX Design</h3>
              <p className="text-gray-600 dark:text-gray-400">User-centric interfaces that are not just beautiful, but intuitive and engineered for engagement.</p>
            </div>

            <div className="feature-card">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/40 rounded-lg flex items-center justify-center text-green-600 text-2xl mb-6">🚀</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Cloud Architecture</h3>
              <p className="text-gray-600 dark:text-gray-400">Robust cloud infrastructure setups ensuring your applications are always available, secure, and fast.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 md:px-12 max-w-5xl mx-auto text-center" id="contact">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-10 md:p-16 text-white shadow-xl shadow-blue-500/20">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to bring your vision to life?</h2>
          <p className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto">
            Partner with Orm'shead to transform your ideas into reality. Let's discuss your next big project.
          </p>
          <a href="mailto:hello@ormshead.demo" className="inline-block px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:shadow-lg transition">
            Contact Us Today
          </a>
        </div>
      </section>
    </>
  );
}
