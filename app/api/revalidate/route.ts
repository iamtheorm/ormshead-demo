import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const payload = await request.json();
  
  // Verify the webhook payload/secret from Storyblok here
  
  if (payload.action === "published" || payload.action === "unpublished") {
    revalidateTag("storyblok-global");
    revalidateTag("storyblok-home");
    return NextResponse.json({ revalidated: true, now: Date.now() });
  }

  return NextResponse.json({ revalidated: false, now: Date.now() });
}
