// Supabase Edge Function: Google Translate proxy
// Deno runtime

export const corsHeaders: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "content-type": "application/json" },
    });
  }

  try {
    const { text, source, target } = await req.json();

    if (!text || !target) {
      return new Response(JSON.stringify({ error: "Missing 'text' or 'target'" }), {
        status: 400,
        headers: { ...corsHeaders, "content-type": "application/json" },
      });
    }

    const apiKey = Deno.env.get("GOOGLE_TRANSLATE_API_KEY");
    if (!apiKey) {
      return new Response(JSON.stringify({ error: "Server missing API key" }), {
        status: 500,
        headers: { ...corsHeaders, "content-type": "application/json" },
      });
    }

    // Build Google Translate v2 request
    const params = new URLSearchParams();
    params.set("q", text);
    params.set("target", String(target));
    params.set("format", "text");
    if (source && source !== "auto") params.set("source", String(source));

    const googleResp = await fetch(
      `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`,
      {
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        body: params.toString(),
      }
    );

    const data = await googleResp.json();

    if (!googleResp.ok) {
      return new Response(
        JSON.stringify({ error: data?.error ?? "Translation failed" }),
        { status: googleResp.status, headers: { ...corsHeaders, "content-type": "application/json" } }
      );
    }

    const translatedText = data?.data?.translations?.[0]?.translatedText ?? "";

    return new Response(JSON.stringify({ translatedText }), {
      headers: { ...corsHeaders, "content-type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { ...corsHeaders, "content-type": "application/json" },
    });
  }
});