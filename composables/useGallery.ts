export interface Artwork {
  id: string
  title: string
  description: string
  imageUrl: string
  category: string
  artist: string
  createdAt: string
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

  const artworks = useState<Artwork[]>('artworks', () => [])

  // Mock data initialization (In real app, fetch from API)
  const initArtworks = () => {
    artworks.value = [
      {
        id: '1',
        title: '山间晨雾',
        description: '清晨的第一缕阳光穿过云雾',
        imageUrl: 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Morning%20mist%20in%20mountains%2C%20sunlight%20piercing%20through%20clouds%2C%20serene%20nature%20landscape%2C%20high%20quality%2C%20photorealistic&image_size=portrait_4_3',
        category: '风景',
        artist: '苗昀',
        createdAt: '2025-01-15',
        views: 1250,
        likes: 340
      },
      {
        id: '2',
        title: '城市倒影',
        description: '雨后城市的霓虹倒影',
        imageUrl: 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=City%20reflections%20after%20rain%2C%20neon%20lights%20on%20wet%20pavement%2C%20cyberpunk%20vibes%2C%20urban%20night%2C%20high%20detail&image_size=portrait_4_3',
        category: '城市',
        artist: '苗昀',
        createdAt: '2025-02-10',
        views: 980,
        likes: 210
      },
      {
        id: '3',
        title: '静物花卉',
        description: '午后阳光下的静物写生',
        imageUrl: 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Still%20life%20flowers%20in%20vase%2C%20afternoon%20sunlight%2C%20oil%20painting%20style%2C%20classic%20art%2C%20detailed&image_size=portrait_4_3',
        category: '静物',
        artist: '苗昀',
        createdAt: '2025-03-05',
        views: 1500,
        likes: 450
      },
      {
        id: '4',
        title: '抽象梦境',
        description: '色彩与线条的交织',
        imageUrl: 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Abstract%20dreamscape%2C%20interweaving%20colors%20and%20lines%2C%20surreal%20art%2C%20vivid%20colors%2C%20creative&image_size=portrait_4_3',
        category: '抽象',
        artist: '苗昀',
        createdAt: '2025-03-20',
        views: 800,
        likes: 180
      }
    ]
  }

  const filteredArtworks = computed(() => {
    let result = artworks.value

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

    // Sort logic can be added here
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