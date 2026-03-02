export async function POST(request) {
  const { thumbnail, title } = await request.json();

  if (!thumbnail || !title) {
    return Response.json({ error: 'Missing thumbnail or title' }, { status: 400 });
  }

  if (!process.env.GROQ_API_KEY) {
    return Response.json({ error: 'GROQ_API_KEY not configured' }, { status: 500 });
  }

  const prompt = `You are a YouTube growth expert who specializes in CTR optimization. Analyze this thumbnail image and video title.

Title: "${title}"

Return a JSON object with this exact structure (no other text):
{
  "overall_score": <integer 1-10>,
  "thumbnail": {
    "score": <integer 1-10>,
    "strengths": [<up to 3 short strings>],
    "weaknesses": [<up to 3 short strings>]
  },
  "title": {
    "score": <integer 1-10>,
    "strengths": [<up to 3 short strings>],
    "weaknesses": [<up to 3 short strings>]
  },
  "suggestions": [<3 specific, actionable improvement strings>]
}

Be direct and specific. Focus on what actually drives clicks on YouTube.`;

  const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'meta-llama/llama-4-scout-17b-16e-instruct',
      messages: [
        {
          role: 'user',
          content: [
            { type: 'text', text: prompt },
            { type: 'image_url', image_url: { url: thumbnail } },
          ],
        },
      ],
      temperature: 0.3,
      response_format: { type: 'json_object' },
    }),
  });

  if (!groqResponse.ok) {
    const err = await groqResponse.text();
    console.error('Groq error:', err);
    return Response.json({ error: 'Failed to get AI feedback' }, { status: 502 });
  }

  const data = await groqResponse.json();
  const content = data.choices?.[0]?.message?.content;

  try {
    const feedback = JSON.parse(content);
    return Response.json(feedback);
  } catch {
    return Response.json({ error: 'Failed to parse AI response' }, { status: 502 });
  }
}
