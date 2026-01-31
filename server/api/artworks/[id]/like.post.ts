import type { H3Event } from 'h3'

export default defineEventHandler(async (event: H3Event) => {
  const id = event.context.params?.id
  const db = event.context.cloudflare?.env?.DB

  if (!db) {
    // Mock implementation - just return success
    return { success: true, likes: 1 }
  }

  try {
    // Increment like count
    // Note: 'like' is a reserved keyword in SQL, so we must quote it "like"
    const query = `UPDATE pics SET "like" = COALESCE("like", 0) + 1 WHERE id = ?`
    const result = await db.prepare(query).bind(id).run()

    if (!result.success) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to update likes'
      })
    }

    // Return new count
    const newCount = await db.prepare(`SELECT "like" FROM pics WHERE id = ?`).bind(id).first()
    
    return { 
      success: true, 
      likes: (newCount as any).like 
    }
  } catch (e) {
    console.error('Database error:', e)
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error'
    })
  }
})
