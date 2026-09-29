import { storyblokEditable } from "@storyblok/react";

export default function Hero({ blok }: { blok: any }) {
  return (
    <section {...storyblokEditable(blok)} className="hero-section text-center py-24 bg-blue-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-6">
          {blok.headline || "Storyblok Hero Headline"}
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
          {blok.subheadline || "This content is driven by Storyblok Headless CMS."}
        </p>
      </div>
    </section>
  );
}
