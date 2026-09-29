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
  title: "Storyblok Demo — Headless CMS Powered Site",
  description: "A beautiful demo website powered by Storyblok headless CMS and Next.js. Explore the power of modern content management.",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const data = await getGlobalConfig();
  
  const headerData = data?.story?.content?.header?.[0];
  const footerData = data?.story?.content?.footer?.[0];

  return (
    <html lang="en">
      <StoryblokProvider>
        <body>
          {/* ===== HEADER ===== */}
          <header className="site-header">
            <div className="header-inner">
              <a href="/" className="site-logo">
                <div className="logo-icon">S</div>
                {headerData?.logo?.filename ? (
                  <img src={headerData.logo.filename} alt="Site Logo" style={{ height: 28, width: 'auto' }} />
                ) : (
                  <span>Storyblok</span>
                )}
              </a>
              <nav>
                {headerData ? (
                  <Navigation items={headerData.nav_items} />
                ) : (
                  <ul className="nav-links">
                    <li><a href="#features">Features</a></li>
                    <li><a href="#testimonials">Testimonials</a></li>
                    <li><a href="#about">About</a></li>
                    <li><a href="#contact" className="nav-cta">Get Started</a></li>
                  </ul>
                )}
              </nav>
            </div>
          </header>
          
          <main>{children}</main>
          
          {/* ===== FOOTER ===== */}
          <footer className="site-footer">
            <div className="footer-inner">
              <div className="footer-grid">
                {/* Brand Column */}
                <div className="footer-brand">
                  <a href="/" className="site-logo">
                    <div className="logo-icon">S</div>
                    <span>Storyblok</span>
                  </a>
                  <p>Building the future of content management with a headless CMS that empowers both developers and content editors.</p>
                  <div className="footer-socials">
                    <a href="#" aria-label="Twitter">𝕏</a>
                    <a href="#" aria-label="GitHub">⌨</a>
                    <a href="#" aria-label="LinkedIn">in</a>
                  </div>
                </div>

                {/* Product Column */}
                <div className="footer-col">
                  <h4>Product</h4>
                  <ul>
                    <li><a href="#features">Features</a></li>
                    <li><a href="#">Pricing</a></li>
                    <li><a href="#">Integrations</a></li>
                    <li><a href="#">Changelog</a></li>
                    <li><a href="#">Documentation</a></li>
                  </ul>
                </div>

                {/* Company Column */}
                <div className="footer-col">
                  <h4>Company</h4>
                  <ul>
                    <li><a href="#about">About</a></li>
                    <li><a href="#">Blog</a></li>
                    <li><a href="#">Careers</a></li>
                    <li><a href="#contact">Contact</a></li>
                    <li><a href="#">Press</a></li>
                  </ul>
                </div>

                {/* Resources Column */}
                <div className="footer-col">
                  <h4>Resources</h4>
                  <ul>
                    <li><a href="#">Community</a></li>
                    <li><a href="#">Tutorials</a></li>
                    <li><a href="#">Support</a></li>
                    <li><a href="#">Status</a></li>
                    <li><a href="#">API Reference</a></li>
                  </ul>
                </div>
              </div>

              {/* Storyblok dynamic footer nav */}
              {footerData && (
                <div style={{ padding: '20px 0', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                  <Navigation items={footerData.nav_items} />
                </div>
              )}

              <div className="footer-bottom">
                <span>© {new Date().getFullYear()} Storyblok Demo. All rights reserved.</span>
                <div className="footer-legal">
                  <a href="/privacy-policy">Privacy Policy</a>
                  <a href="/terms-of-service">Terms of Service</a>
                  <a href="#">Cookies</a>
                </div>
              </div>
            </div>
          </footer>
        </body>
      </StoryblokProvider>
    </html>
  );
}