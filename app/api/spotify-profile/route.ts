import { auth } from "@/auth";
import { type NextRequest } from "next/server";

// TODO: see if request arg is needed
export async function GET(_request: NextRequest) {
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
