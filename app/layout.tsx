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
                    <li className="relative group">
                      <button className="flex items-center gap-1 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                        Products
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:rotate-180">
                          <path d="M6 9l6 6 6-6" />
                        </svg>
                      </button>
                      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-40 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-md shadow-lg p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all flex flex-col gap-1">
                        <a href="/security" className="block px-3 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">Security</a>
                        <a href="/analytics" className="block px-3 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">Analytics</a>
                      </div>
                    </li>
                    <li><a href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Home</a></li>
                  </ul>
                )}
              </nav>
            </div>
          </header>
          
          <main className="flex-1">{children}</main>
          
          {/* ===== FOOTER ===== */}
          <footer className="w-full p-8 bg-gray-100 dark:bg-gray-900 text-sm border-t border-gray-200 dark:border-gray-800 mt-auto">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-2 font-bold text-gray-900 dark:text-white">
                <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center text-white text-xs">O</div>
                <span>Orm'shead</span>
              </div>
              
              {footerData ? (
                <Navigation items={footerData.nav_items} />
              ) : (
                <ul className="flex gap-6 items-center text-gray-600 dark:text-gray-400">
                  <li><a href="/privacy-policy" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Privacy Policy</a></li>
                  <li><a href="/terms-of-service" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Terms of Service</a></li>
                </ul>
              )}
            </div>
            <div className="max-w-6xl mx-auto mt-6 text-center text-gray-500 dark:text-gray-500 text-xs">
              © {new Date().getFullYear()} Orm'shead. All rights reserved.
            </div>
          </footer>
        </body>
      </StoryblokProvider>
    </html>
  );
}