"use client";
import { storyblokInit, apiPlugin } from "@storyblok/react/rsc";
import Page from "./Page";
import Hero from "./Hero";

storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_TOKEN,
  use: [apiPlugin],
  components: {
    page: Page,
    hero: Hero,
  },
});

export default function StoryblokProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}