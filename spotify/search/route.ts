import { type NextRequest } from "next/server";
import { searchTracks } from "@/lib/spotify";

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q");

  if (!q || q.trim().length === 0) {
    return Response.json({ error: "Missing query parameter: q" }, { status: 400 });
  }

  try {
    const tracks = await searchTracks(q.trim());
    return Response.json(tracks);
  } catch (error) {
    console.error("Spotify search error:", error);
    return Response.json({ error: "Error searching tracks" }, { status: 500 });
  }
}
