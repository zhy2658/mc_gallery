import type { H3Event } from 'h3'

export default defineEventHandler(async (event: H3Event) => {
  const id = event.context.params?.id
  const db = event.context.cloudflare?.env?.DB

  if (!db) {
    // Mock implementation
    return { success: true, views: 1 }
  }

  try {
    // Increment visit count
    const query = `UPDATE pics SET visit = COALESCE(visit, 0) + 1 WHERE id = ?`
    const result = await db.prepare(query).bind(id).run()

    if (!result.success) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to update visits'
      })
    }

    const newCount = await db.prepare(`SELECT visit FROM pics WHERE id = ?`).bind(id).first()
    
    return { 
      success: true, 
      views: (newCount as any).visit 
    }
  } catch (e) {
    console.error('Database error:', e)
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error'
    })
  }
})
