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
  like?: number
  visit?: number
}

export const getMockArtworks = (page: number, limit: number, category: string, search: string, sort: string) => {
  // Mock Data
  const mockData: ArtworkRow[] = Array.from({ length: 24 }).map((_, i) => ({
    id: i + 1,
    title: `艺术作品 ${i + 1}`,
    description: `这是第 ${i + 1} 个示例艺术作品的描述，展示了独特的创意与风格。`,
    url: `https://picsum.photos/seed/${i + 1}/800/600`,
    category: ['风景', '城市', '静物', '抽象'][i % 4],
    artist: '苗畅',
    created_at: new Date(Date.now() - i * 86400000).toISOString(),
    views: 100 + i * 10,
    likes: 50 + i * 5,
    user_id: 1
  }))

  // Filter
  let filtered = mockData
  if (category && category !== 'all') {
    filtered = filtered.filter(item => item.category === category)
  }
  if (search) {
    const lowerSearch = search.toLowerCase()
    filtered = filtered.filter(item => 
      item.title.toLowerCase().includes(lowerSearch) || 
      item.description.toLowerCase().includes(lowerSearch)
    )
  }

  // Sort
  if (sort === 'oldest') {
    filtered.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
  } else if (sort === 'popular') {
    filtered.sort((a, b) => (b.views || 0) - (a.views || 0))
  } else {
    // latest
    filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
  }

  const total = filtered.length
  const offset = (page - 1) * limit
  const paginated = filtered.slice(offset, offset + limit)

  const artworks = paginated.map(row => ({
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
}
