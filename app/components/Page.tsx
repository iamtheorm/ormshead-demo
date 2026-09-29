import { storyblokEditable, StoryblokComponent } from "@storyblok/react";

export default function Page({ blok }: { blok: any }) {
  return (
    <main {...storyblokEditable(blok)} className="w-full">
      {blok.body?.map((nestedBlok: any) => (
        <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}
    </main>
  );
}
