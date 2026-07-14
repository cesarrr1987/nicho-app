// Esta función corre en el servidor de Vercel, NO en el navegador.
// Tu clave del API (ANTHROPIC_API_KEY) queda oculta y segura aquí.

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { profile, lang } = req.body || {};
  if (!profile) {
    return res.status(400).json({ error: "Missing profile" });
  }

  const langName = lang === "en" ? "English" : "Spanish";

  const prompt = `You are NICHO, a world-class advisor that combines career-vocation psychology with social-commerce expertise (TikTok Shop, affiliate marketing, short-form video). Your mission: help this person find a niche that feels like a TRUE CALLING — something aligned with who they are — that can ALSO make money.

Their profile:
${profile}

Rules for a great recommendation:
- The niche must sit at the intersection of: what they love, what they're naturally good at, their camera comfort level, their available time, and their budget. Do not suggest something that contradicts their profile (e.g., no daily face-to-camera vlogs for someone who wants to stay faceless).
- Be SPECIFIC. Never say "sell gadgets" — name real product types with realistic price ranges. Never say "make engaging videos" — give the exact format, length and hook style.
- The "why" must reference THEIR answers so they feel seen and understood.
- Keep every string concise and punchy. Mobile users will read this.

Respond ONLY with valid JSON (no markdown, no backticks) in ${langName}, with this exact shape:
{
  "niche": "specific niche name, max 6 words",
  "subNiche": "an even more specific angle within the niche that has less competition, max 10 words",
  "why": "3-4 sentences connecting THEIR specific answers to this niche. Make them feel understood — this should read like it was written for them personally.",
  "vocationInsight": "1-2 sentences about what their answers reveal about their deeper vocation/strengths, beyond just selling",
  "whatToSell": [
    {"product": "specific product type 1", "priceRange": "$X–$Y", "whyItWorks": "one line"},
    {"product": "specific product type 2", "priceRange": "$X–$Y", "whyItWorks": "one line"},
    {"product": "specific product type 3", "priceRange": "$X–$Y", "whyItWorks": "one line"},
    {"product": "specific product type 4", "priceRange": "$X–$Y", "whyItWorks": "one line"}
  ],
  "howToSell": [
    {"format": "video format name", "detail": "exact style, length, structure — one line"},
    {"format": "...", "detail": "..."},
    {"format": "...", "detail": "..."}
  ],
  "hooks": ["ready-to-use opening line for a video 1", "hook 2", "hook 3"],
  "hashtags": ["#tag1", "#tag2", "#tag3", "#tag4", "#tag5", "#tag6"],
  "monetize": [
    {"platform": "platform name", "how": "one line on how to earn there for this niche", "potential": "realistic monthly range for a beginner, e.g. $50–$300/mes"},
    {"platform": "...", "how": "...", "potential": "..."},
    {"platform": "...", "how": "...", "potential": "..."}
  ],
  "week1Plan": [
    {"day": "Día 1-2", "task": "concrete task"},
    {"day": "Día 3-4", "task": "concrete task"},
    {"day": "Día 5-6", "task": "concrete task"},
    {"day": "Día 7", "task": "concrete task"}
  ]
}

(If responding in English, use "Day 1-2" etc. for week1Plan days. Money potential ranges must be conservative and realistic for beginners, never hype.)`;

  try {
    const apiRes = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 2000,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const data = await apiRes.json();

    if (!apiRes.ok) {
      console.error("Anthropic error:", data);
      return res.status(502).json({ error: "AI request failed" });
    }

    const text = (data.content || [])
      .filter((b) => b.type === "text")
      .map((b) => b.text)
      .join("");

    const clean = text.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(clean);

    return res.status(200).json(parsed);
  } catch (e) {
    console.error("Handler error:", e);
    return res.status(500).json({ error: "Server error" });
  }
}
