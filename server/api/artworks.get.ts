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
  const query = getQuery(event)
  const page = Math.max(1, Number(query.page) || 1)
  const limit = Math.max(1, Math.min(50, Number(query.limit) || 12))
  const offset = (page - 1) * limit
  
  const category = query.category as string
  const search = query.search as string
  // Default sort is latest (created_at desc)
  const sort = query.sort as string

  const db = event.context.cloudflare?.env?.DB
  
  if (!db) {
    console.warn('D1 Database binding not found.')
    return {
      artworks: [],
      total: 0,
      page,
      limit
    }
  }

  try {
    let whereClause = 'WHERE 1=1'
    const bindParams: any[] = []

    // Filter by category
    if (category && category !== 'all') {
      whereClause += ' AND category = ?'
      bindParams.push(category)
    }

    // Filter by search term
    if (search) {
      whereClause += ' AND (title LIKE ? OR description LIKE ?)'
      bindParams.push(`%${search}%`)
      bindParams.push(`%${search}%`)
    }

    // Determine Sort Order
    let orderClause = 'ORDER BY created_at DESC'
    if (sort === 'oldest') {
      orderClause = 'ORDER BY created_at ASC'
    } else if (sort === 'popular') {
      orderClause = 'ORDER BY views DESC, created_at DESC'
    }

    // Get Total Count and Data in parallel
    const countSql = `SELECT COUNT(*) as total FROM pics ${whereClause}`
    const dataSql = `SELECT * FROM pics ${whereClause} ${orderClause} LIMIT ? OFFSET ?`
    const dataParams = [...bindParams, limit, offset]
    
    const [countResult, dataResult] = await Promise.all([
      db.prepare(countSql).bind(...bindParams).first(),
      db.prepare(dataSql).bind(...dataParams).all()
    ])

    // Debug logging
    console.log('API Debug:', { 
      hasDb: !!db,
      countResult, 
      dataResultType: typeof dataResult,
      isDataArray: Array.isArray(dataResult),
      dataResultKeys: typeof dataResult === 'object' ? Object.keys(dataResult as any) : []
    })

    const total = countResult ? (countResult as any).total : 0
    
    // Robust results extraction
    const rawData = dataResult as any
    // Handle both { results: [...] } (Cloudflare D1) and Array (some mocks)
    const results = (Array.isArray(rawData) ? rawData : (rawData?.results || [])) as ArtworkRow[]

    const artworks = results.map(row => ({
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

    return {
      artworks,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    }

  } catch (e) {
    console.error('Database error:', e)
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error'
    })
  }
})
