import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  const error = request.nextUrl.searchParams.get("error");

  if (error || !code) {
    return new Response(
      html("Error", `<p>Autorización denegada: ${error || "no code"}</p><a href="/admin">Volver</a>`),
      { status: 400, headers: { "Content-Type": "text/html" } }
    );
  }

  const clientId = process.env.SPOTIFY_CLIENT_ID!;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET!;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const redirectUri = `${baseUrl}/api/spotify/callback`;
  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${credentials}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: redirectUri,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    return new Response(
      html("Error", `<p>Error obteniendo token: ${res.status}</p><pre>${text}</pre><a href="/admin">Volver</a>`),
      { status: 500, headers: { "Content-Type": "text/html" } }
    );
  }

  const data = await res.json();

  // Display the refresh token for the admin to save as an environment variable
  return new Response(
    html(
      "Spotify conectado",
      `
      <p style="color:green;font-weight:bold;">Conexión exitosa.</p>
      <p>Copia este <strong>refresh token</strong> y guárdalo como variable de entorno <code>SPOTIFY_REFRESH_TOKEN</code>:</p>
      <textarea readonly style="width:100%;height:80px;font-family:monospace;font-size:14px;padding:8px;margin:12px 0;">${data.refresh_token}</textarea>
      <p style="font-size:13px;color:#666;">Este token no caduca (a menos que revoques el acceso en Spotify). Solo necesitas hacer esto una vez.</p>
      <a href="/admin" style="display:inline-block;margin-top:16px;padding:8px 20px;background:#2D2A26;color:#F5F0EB;text-decoration:none;">Volver al Admin</a>
      `
    ),
    { headers: { "Content-Type": "text/html" } }
  );
}

function html(title: string, body: string) {
  return `<!DOCTYPE html>
<html><head><meta charset="utf-8"><title>${title}</title>
<style>body{font-family:system-ui;max-width:600px;margin:60px auto;padding:0 20px;background:#F5F0EB;color:#2D2A26;}code{background:#e5e0db;padding:2px 6px;}</style>
</head><body><h1>${title}</h1>${body}</body></html>`;
}
