import type { H3Event } from 'h3'

export default defineEventHandler(async (event: H3Event) => {
  const db = event.context.cloudflare?.env?.DB

  if (!db) {
    // Mock data
    return {
      totalArtworks: 90,
      totalArtists: 5,
      totalCategories: 2,
      totalViews: 3500
    }
  }

  try {
    const [artworks, artists, categories, views] = await Promise.all([
      db.prepare('SELECT COUNT(*) as count FROM pics').first(),
      db.prepare('SELECT COUNT(DISTINCT artist) as count FROM pics').first(),
      db.prepare('SELECT COUNT(DISTINCT category) as count FROM pics').first(),
      db.prepare('SELECT SUM(visit) as count FROM pics').first()
    ])

    return {
      totalArtworks: (artworks as any).count,
      totalArtists: (artists as any).count,
      totalCategories: (categories as any).count,
      totalViews: (views as any).count || 0
    }
  } catch (e) {
    console.error('Database error:', e)
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error'
    })
  }
})
