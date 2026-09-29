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

  if (data?.story) {
    return (
      <div className="max-w-5xl mx-auto py-12">
        <StoryblokStory story={data.story} />
      </div>
    );
  }

  return (
    <>
      {/* ===== HERO SECTION ===== */}
      <section className="hero-section" id="home">
        <div className="hero-inner">
          <div>
            <div className="hero-badge">
              <span></span>
              Now with Visual Editor
            </div>
            <h1 className="hero-title">
              Create content that <span className="gradient-text">moves people</span>
            </h1>
            <p className="hero-description">
              Build blazing-fast websites with a headless CMS that gives your content editors full visual control — 
              and your developers complete freedom.
            </p>
            <div className="hero-actions">
              <a href="#contact" className="btn-primary">
                Start Free Trial
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
              <a href="#features" className="btn-secondary">
                Explore Features
              </a>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-card">
              <div className="stats-grid">
                <div className="stat-item">
                  <div className="stat-number">99.9%</div>
                  <div className="stat-label">Uptime SLA</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">3ms</div>
                  <div className="stat-label">Avg Response</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">200+</div>
                  <div className="stat-label">Integrations</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">50K+</div>
                  <div className="stat-label">Happy Users</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FEATURES SECTION ===== */}
      <section className="features-section" id="features">
        <div className="section-inner">
          <div className="section-header">
            <span className="section-label">Why Choose Us</span>
            <h2 className="section-title">Everything you need to build amazing experiences</h2>
            <p className="section-subtitle">
              A complete toolkit for content-driven websites, from editing to deployment.
            </p>
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🎨</div>
              <h3>Visual Editor</h3>
              <p>Edit content inline with a real-time preview. What you see is truly what you get — no guesswork required.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Lightning Fast CDN</h3>
              <p>Content delivered from 250+ global edge locations. Your pages load in milliseconds, everywhere.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3>Enterprise Security</h3>
              <p>SOC 2 compliant with role-based access control, SSO, and full audit logging out of the box.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🧩</div>
              <h3>Modular Components</h3>
              <p>Build reusable content blocks that editors can mix and match to compose any page layout.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🌍</div>
              <h3>Multi-Language</h3>
              <p>Manage translations for 100+ languages from a single dashboard. Go global without the headache.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🔌</div>
              <h3>API-First</h3>
              <p>RESTful and GraphQL APIs let you deliver content to any frontend, mobile app, or IoT device.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS SECTION ===== */}
      <section className="testimonials-section" id="testimonials">
        <div className="section-inner">
          <div className="section-header">
            <span className="section-label">Testimonials</span>
            <h2 className="section-title">Loved by teams worldwide</h2>
            <p className="section-subtitle">
              See why thousands of companies trust us to power their digital experiences.
            </p>
          </div>

          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-stars">★★★★★</div>
              <p className="testimonial-text">
                &ldquo;The visual editor completely transformed our content workflow. Our marketing team can now publish pages in minutes instead of days.&rdquo;
              </p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">SK</div>
                <div className="testimonial-meta">
                  <strong>Sarah Kim</strong>
                  <span>Head of Marketing, TechFlow</span>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="testimonial-stars">★★★★★</div>
              <p className="testimonial-text">
                &ldquo;As a developer, I love the flexibility. We can use any frontend framework and the API integration is seamless and well-documented.&rdquo;
              </p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">MR</div>
                <div className="testimonial-meta">
                  <strong>Marcus Rodriguez</strong>
                  <span>Lead Developer, CloudBase</span>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="testimonial-stars">★★★★★</div>
              <p className="testimonial-text">
                &ldquo;We migrated from WordPress and saw a 3× improvement in page load times. Our SEO rankings jumped within weeks.&rdquo;
              </p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">AL</div>
                <div className="testimonial-meta">
                  <strong>Aisha Lawal</strong>
                  <span>CTO, GreenPath Digital</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="cta-section" id="contact">
        <div className="cta-card">
          <h2>Ready to transform your content?</h2>
          <p>
            Join 50,000+ creators and developers building the next generation of digital experiences.
          </p>
          <a href="#" className="btn-white">
            Get Started Free
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </section>
    </>
  );
}
