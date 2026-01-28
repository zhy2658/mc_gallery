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

export interface ArtworkResponse {
  artworks: Artwork[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export const useGallery = () => {
  const page = useState<number>('gallery-page', () => 1)
  const filters = useState('gallery-filters', () => ({
    search: '',
    category: 'all',
    sort: 'latest',
    viewMode: 'grid' as 'grid' | 'list'
  }))

  // Reset page when filtering changes
  watch(() => [filters.value.category, filters.value.search], () => {
    page.value = 1
  })

  // Use useAsyncData for SSR-friendly data fetching
  const { data, refresh, status, error } = useAsyncData<ArtworkResponse>(
    'gallery-data',
    () => $fetch('/api/artworks', {
      query: {
        page: page.value,
        limit: 12,
        category: filters.value.category,
        search: filters.value.search,
        sort: filters.value.sort
      }
    }),
    {
      // Watch these reactive sources to auto-refresh
      watch: [
        page, 
        () => filters.value.category, 
        () => filters.value.search, 
        () => filters.value.sort
      ],
      default: () => ({
        artworks: [],
        total: 0,
        page: 1,
        limit: 12,
        totalPages: 0
      })
    }
  )

  const artworks = computed(() => data.value?.artworks || [])
  const total = computed(() => data.value?.total || 0)
  const totalPages = computed(() => data.value?.totalPages || 0)
  
  // Since filtering is now server-side, filteredArtworks is same as artworks
  // Keeping the name for backward compatibility with components
  const filteredArtworks = artworks

  const initArtworks = () => refresh()

  const setPage = (p: number) => {
    if (p >= 1 && p <= totalPages.value) {
      page.value = p
      // Optional: scroll to top
      if (import.meta.client) {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    }
  }

  return {
    filters,
    page,
    artworks,
    filteredArtworks,
    total,
    totalPages,
    status,
    error,
    initArtworks,
    setPage
  }
}
