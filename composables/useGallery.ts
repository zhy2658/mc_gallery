export interface Artwork {
  id: string
  title: string
  description: string
  imageUrl: string
  category: string
  artist: string
  createdAt: Date
  views: number
  likes: number
}

export const useGallery = () => {
  const filters = useState('gallery-filters', () => ({
    search: '',
    category: 'all',
    sort: 'latest',
    viewMode: 'grid' as 'grid' | 'list'
  }))

  const { data: artworks, refresh } = useAsyncData<Artwork[]>('artworks', () => $fetch('/api/artworks'), {
    default: () => []
  })

  // For backward compatibility or manual refresh
  const initArtworks = () => {
    refresh()
  }

  const filteredArtworks = computed(() => {
    let result = artworks.value || []

    if (filters.value.category !== 'all') {
      result = result.filter(item => item.category === filters.value.category)
    }

    if (filters.value.search) {
      const query = filters.value.search.toLowerCase()
      result = result.filter(item => 
        item.title.toLowerCase().includes(query) || 
        item.description.toLowerCase().includes(query)
      )
    }

    // Sort logic
    if (filters.value.sort === 'latest') {
       result = [...result].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    }

    return result
  })

  return {
    filters,
    artworks,
    initArtworks,
    filteredArtworks
  }
}