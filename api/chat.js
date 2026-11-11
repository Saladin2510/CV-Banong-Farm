/**
 * CV Banong Farms - Secure Server-Side AI Proxy (Vercel Serverless Function)
 * Membaca process.env.DEEPSEEK_API_KEY (TANPA prefix VITE_) agar tidak pernah terekspos ke browser.
 */

export default async function handler(req, res) {
  const allowedOrigins = [
    'https://cvbanongfarms.site',
    'https://www.cvbanongfarms.site',
    'http://localhost:5173',
    'http://127.0.0.1:5173',
  ]

  const origin = req.headers.origin || ''
  const referer = req.headers.referer || ''
  const host = req.headers.host || ''

  const isVercelPreview = host.endsWith('.vercel.app') && (!origin || origin.endsWith('.vercel.app'))
  const isAllowedOrigin =
    isVercelPreview ||
    (origin && allowedOrigins.includes(origin)) ||
    (referer && allowedOrigins.some((a) => referer.startsWith(a)))

  if (origin && (allowedOrigins.includes(origin) || origin.endsWith('.vercel.app'))) {
    res.setHeader('Access-Control-Allow-Origin', origin)
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(isAllowedOrigin ? 200 : 403).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: { message: 'Method not allowed' } })
  }

  if (!isAllowedOrigin) {
    return res.status(403).json({ error: { message: 'Forbidden: Origin not authorized' } })
  }

  const apiKey = (process.env.DEEPSEEK_API_KEY || '').trim()
  if (!apiKey || !apiKey.startsWith('sk-')) {
    return res.status(503).json({ error: { message: 'Server DEEPSEEK_API_KEY belum dikonfigurasi pada Vercel Environment Variables' } })
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {})
    if (!Array.isArray(body.messages) || body.messages.length === 0) {
      return res.status(400).json({ error: { message: 'Format messages wajib diisi' } })
    }

    const allowedRoles = new Set(['system', 'user', 'assistant'])
    let totalChars = 0
    const sanitizedMessages = []

    for (const msg of body.messages.slice(0, 10)) {
      if (!msg || typeof msg.content !== 'string') continue
      totalChars += msg.content.length
      if (totalChars > 18000) {
        return res.status(400).json({ error: { message: 'Panjang pesan melebihi batas maksimal' } })
      }
      sanitizedMessages.push({
        role: allowedRoles.has(msg.role) ? msg.role : 'user',
        content: msg.content,
      })
    }

    if (sanitizedMessages.length === 0) {
      return res.status(400).json({ error: { message: 'Tidak ada pesan valid' } })
    }

    const reqMaxTokens = Number(body.max_tokens) || 600
    const safeMaxTokens = Math.max(50, Math.min(reqMaxTokens, 750))
    const reqTemp = Number(body.temperature)
    const safeTemp = Number.isFinite(reqTemp) ? Math.max(0, Math.min(reqTemp, 1)) : 0.7

    const upstream = await fetch('https://api.deepseek.com/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat', // Dikunci paksa ke model termurah deepseek-chat
        messages: sanitizedMessages,
        temperature: safeTemp,
        max_tokens: safeMaxTokens,
      }),
    })

    const data = await upstream.json()
    return res.status(upstream.status).json(data)
  } catch (err) {
    return res.status(502).json({ error: { message: 'Proxy error: ' + err.message } })
  }
}
