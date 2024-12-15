import { auth } from "@/auth";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const session = await auth();
  const response = await fetch(`https://api.spotify.com/v1/me`, {
    headers: { Authorization: `Bearer ${session?.accessToken}` },
  });
  const { ok, statusText, headers: responseHeaders } = response;
  if (ok) {
    return Response.json(await response.json());
  }
  console.log(response);
  return new Response("An error happened while fetching saved albums.", {
    statusText,
    headers: responseHeaders,
  });
}
