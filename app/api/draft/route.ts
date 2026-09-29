import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");

  const draft = await draftMode();
  draft.enable();
  
  if (slug) {
    redirect(`/${slug !== "home" ? slug : ""}`);
  }

  return new Response("Draft mode enabled");
}
