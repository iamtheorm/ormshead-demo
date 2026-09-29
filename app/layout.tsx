import { draftMode } from "next/headers";
import StoryblokProvider from "./components/StoryblokProvider";
import Navigation from "./components/Navigation";
import "./globals.css";

async function getGlobalConfig() {
  try {
    const { isEnabled } = await draftMode();
    const version = isEnabled ? "draft" : "published";

    const res = await fetch(
      `https://api.storyblok.com/v2/cdn/stories/settings/global?version=${version}&token=${process.env.NEXT_PUBLIC_STORYBLOK_TOKEN}`,
      { 
        next: { tags: ["storyblok-global"] } 
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch Storyblok configuration");
    }

    return await res.json();
  } catch (error) {
    console.error(error);
    return null; // Return null to trigger fallback state
  }
}

export const metadata = {
  title: "Orm'shead — Modern Web Experience",
  description: "A beautiful demo website for Orm'shead powered by Storyblok headless CMS and Next.js.",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const data = await getGlobalConfig();
  
  const headerData = data?.story?.content?.header?.[0];
  const footerData = data?.story?.content?.footer?.[0];

  return (
    <html lang="en">
      <StoryblokProvider>
        <body className="min-h-screen flex flex-col">
          {/* ===== HEADER ===== */}
          <header className="site-header">
            <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
              <a href="/" className="flex items-center gap-2 text-xl font-bold text-gray-900 dark:text-white">
                <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center text-white font-bold shadow-md">O</div>
                {headerData?.logo?.filename ? (
                  <img src={headerData.logo.filename} alt="Orm'shead Logo" style={{ height: 28, width: 'auto' }} />
                ) : (
                  <span>Orm'shead</span>
                )}
              </a>
              <nav>
                {headerData ? (
                  <Navigation items={headerData.nav_items} />
                ) : (
                  <ul className="flex gap-6 items-center text-sm font-medium text-gray-600 dark:text-gray-300">
                    <li><a href="#services" className="hover:text-blue-600 dark:hover:text-blue-400">Services</a></li>
                    <li><a href="#portfolio" className="hover:text-blue-600 dark:hover:text-blue-400">Portfolio</a></li>
                    <li><a href="#about" className="hover:text-blue-600 dark:hover:text-blue-400">About</a></li>
                    <li><a href="#contact" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">Contact Us</a></li>
                  </ul>
                )}
              </nav>
            </div>
          </header>
          
          <main className="flex-1">{children}</main>
          
          {/* ===== FOOTER ===== */}
          <footer className="bg-gray-900 text-gray-400 py-12 px-6">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 pb-8 border-b border-gray-800">
                <div className="col-span-1 md:col-span-1">
                  <a href="/" className="flex items-center gap-2 text-xl font-bold text-white mb-4">
                    <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center text-white font-bold">O</div>
                    <span>Orm'shead</span>
                  </a>
                  <p className="text-sm">Crafting premium digital experiences and software solutions for the modern web.</p>
                </div>

                <div>
                  <h4 className="text-white font-bold mb-4">Services</h4>
                  <ul className="space-y-2 text-sm">
                    <li><a href="#" className="hover:text-white">Web Development</a></li>
                    <li><a href="#" className="hover:text-white">UI/UX Design</a></li>
                    <li><a href="#" className="hover:text-white">Cloud Consulting</a></li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-white font-bold mb-4">Company</h4>
                  <ul className="space-y-2 text-sm">
                    <li><a href="#about" className="hover:text-white">About Us</a></li>
                    <li><a href="#" className="hover:text-white">Careers</a></li>
                    <li><a href="#contact" className="hover:text-white">Contact</a></li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-white font-bold mb-4">Connect</h4>
                  <ul className="space-y-2 text-sm">
                    <li><a href="#" className="hover:text-white">Twitter</a></li>
                    <li><a href="#" className="hover:text-white">LinkedIn</a></li>
                    <li><a href="#" className="hover:text-white">GitHub</a></li>
                  </ul>
                </div>
              </div>

              {footerData && (
                <div className="py-4 border-b border-gray-800 mb-4">
                  <Navigation items={footerData.nav_items} />
                </div>
              )}

              <div className="flex flex-col md:flex-row justify-between items-center text-sm">
                <span>© {new Date().getFullYear()} Orm'shead. All rights reserved.</span>
                <div className="flex gap-4 mt-4 md:mt-0">
                  <a href="#" className="hover:text-white">Privacy Policy</a>
                  <a href="#" className="hover:text-white">Terms of Service</a>
                </div>
              </div>
            </div>
          </footer>
        </body>
      </StoryblokProvider>
    </html>
  );
}