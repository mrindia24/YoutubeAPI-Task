import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");

  let url = "";

  // 🔹 If user searched
  if (query) {
    url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=12&q=${encodeURIComponent(
      query
    )}&key=${process.env.YOUTUBE_API_KEY}`;
  } 
  // 🔹 Default videos (Trending)
  else {
    url = `https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=12&regionCode=IN&key=${process.env.YOUTUBE_API_KEY}`;
  }

  const res = await fetch(url);
  const data = await res.json();

  // Normalize response
  const items = query ? data.items : data.items.map((item: any) => ({
    id: { videoId: item.id },
    snippet: item.snippet,
  }));

  return NextResponse.json(items);
}
