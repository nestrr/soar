import { auth } from "@/auth";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const limit = request.nextUrl.searchParams.get("limit") ?? 5;
  const offset = request.nextUrl.searchParams.get("offset") ?? 0;
  const session = await auth();
  const response = await fetch(
    `https://api.spotify.com/v1/me/playlists?limit=${limit}&offset=${offset}`,
    {
      headers: { Authorization: `Bearer ${session?.accessToken}` },
    }
  );
  const { ok, statusText, headers: responseHeaders } = response;
  if (ok) {
    return Response.json(await response.json());
  }
  console.log(response);
  return new Response("An error happened while fetching saved playlists.", {
    statusText,
    headers: responseHeaders,
  });
}
