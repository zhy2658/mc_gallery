import type { H3Event } from 'h3'
import { getMockArtworks } from '~/server/utils/mockArtworks'

export default defineEventHandler(async (event: H3Event) => {
  const id = event.context.params?.id
  const db = event.context.cloudflare?.env?.DB

  if (!db) {
    // Mock implementation
    const { artworks } = getMockArtworks(1, 100, 'all', '', 'latest')
    const artwork = artworks.find(a => a.id === id)
    
    if (!artwork) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Artwork not found'
      })
    }
    
    return artwork
  }

  try {
    const query = `SELECT * FROM pics WHERE id = ?`
    const result = await db.prepare(query).bind(id).first()

    if (!result) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Artwork not found'
      })
    }

    const row = result as any
    return {
      id: String(row.id),
      title: row.title || '无题',
      description: row.description || '',
      imageUrl: row.url,
      category: row.category || '未分类',
      artist: row.artist || 'Unknown',
      createdAt: new Date(row.created_at),
      views: row.visit ?? row.views ?? 0,
      likes: row.like ?? row.likes ?? 0
    }
  } catch (e: any) {
    if (e.statusCode === 404) throw e
    console.error('Database error:', e)
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error'
    })
  }
})
