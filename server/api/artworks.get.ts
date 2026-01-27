import type { H3Event } from 'h3'

export interface ArtworkRow {
  id: number
  url: string
  title: string
  description: string
  user_id: number | null
  created_at: string
  category: string | null
  artist: string | null
  likes?: number
  views?: number
}

export default defineEventHandler(async (event: H3Event) => {
  // Cloudflare D1 binding is available on event.context.cloudflare.env.DB
  // For local dev without wrangler dev, we might need a fallback or mock
  // But Nuxt usually handles this if we run with proper preset
  
  const db = event.context.cloudflare?.env?.DB
  
  if (!db) {
    // Fallback for standard dev server if bindings aren't loaded (e.g. npm run dev without --host or platform proxy)
    // However, to see real data we need to run with wrangler or have a way to proxy
    // For now, let's return mock data if DB is missing to avoid crashing, but warn
    console.warn('D1 Database binding not found. Ensure you are running with platform proxy enabled.')
    return []
  }

  try {
    const { results } = await db.prepare(
      'SELECT * FROM pics ORDER BY created_at DESC'
    ).all<ArtworkRow>()

    return results.map(row => ({
      id: String(row.id),
      title: row.title || '无题',
      description: row.description || '',
      imageUrl: row.url,
      category: row.category || '未分类',
      artist: row.artist || 'Unknown',
      createdAt: new Date(row.created_at),
      views: row.views || 0,
      likes: row.likes || 0
    }))
  } catch (e) {
    console.error('Database error:', e)
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error'
    })
  }
})
