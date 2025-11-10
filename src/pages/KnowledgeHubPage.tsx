import { useState } from 'react'
import { Play, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'


interface Video {
  id: string
  title: string
  description: string
  thumbnail: string
  category: string
}

interface Category {
  id: string
  name: string
  count: number
}

const categories: Category[] = [
  { id: 'happy-dog', name: 'Happy Dog', count: 24 },
  { id: 'happy-cat', name: 'Happy Cat', count: 18 },
]

const videos: Video[] = [
  {
    id: '1',
    title: "There's nothing quite like the pure joy of a happy dog",
    description:
      "There's nothing quite like the pure joy of a happy dog. With every wag of the tail and sparkle in their eyes, they remind us to live in the moment. Whether it's a walk in the park, a favorite treat, or a simple belly rub, a dog's happiness is contagious.",
    thumbnail: '/path-to-dog-video-thumbnail.jpg',
    category: 'happy-dog',
  },
  {
    id: '2',
    title: "There's nothing quite like the pure joy of a happy dog",
    description:
      "There's nothing quite like the pure joy of a happy dog. With every wag of the tail and sparkle in their eyes, they remind us to live in the moment. Whether it's a walk in the park, a favorite treat, or a simple belly rub, a dog's happiness is contagious.",
    thumbnail: '/path-to-dog-video-thumbnail-2.jpg',
    category: 'happy-dog',
  },
  {
    id: '3',
    title: "There's nothing quite like the pure joy of a happy dog",
    description:
      "There's nothing quite like the pure joy of a happy dog. With every wag of the tail and sparkle in their eyes, they remind us to live in the moment.",
    thumbnail: '/path-to-dog-video-thumbnail-3.jpg',
    category: 'happy-dog',
  },
  {
    id: '4',
    title: "There's nothing quite like the pure joy of a happy dog",
    description:
      "There's nothing quite like the pure joy of a happy dog. With every wag of the tail and sparkle in their eyes, they remind us to live in the moment.",
    thumbnail: '/path-to-dog-video-thumbnail-4.jpg',
    category: 'happy-dog',
  },
]

export default function KnowledgeHubPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('happy-dog')
  const [currentPage, setCurrentPage] = useState(1)
  const navigate = useNavigate()
  const itemsPerPage = 4

  const filteredVideos = selectedCategory
    ? videos.filter(video => video.category === selectedCategory)
    : videos

  const totalPages = Math.ceil(filteredVideos.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const currentVideos = filteredVideos.slice(startIndex, startIndex + itemsPerPage)

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-[1400px]">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-[#003863] text-center mb-2">
            Knowledge Hub
          </h1>
          <p className="text-center text-gray-600">
            Learn everything about pet care through our video guides
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Categories */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden sticky top-4">
              <div className="bg-[#003863] text-white px-6 py-4">
                <h2 className="text-xl font-bold">Categories</h2>
              </div>
              <div className="divide-y divide-gray-200">
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => {
                      setSelectedCategory(category.id)
                      setCurrentPage(1)
                    }}
                    className={`w-full flex items-center justify-between px-6 py-4 hover:bg-[#e1eef4] transition-colors ${selectedCategory === category.id
                      ? 'bg-[#e1eef4] border-l-4 border-[#003863]'
                      : ''
                      }`}
                  >
                    <span className="text-[#003863] font-medium">
                      {category.name}
                    </span>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content - Video List */}
          <div className="lg:col-span-3">
            {/* Category Title */}
            <div className="bg-[#d4e7f6] rounded-xl px-6 py-4 mb-6">
              <h2 className="text-2xl font-bold text-[#003863]">
                {categories.find(c => c.id === selectedCategory)?.name}
              </h2>
            </div>

            {/* Video Grid */}
            <div className="space-y-6">
              {currentVideos.map(video => (
                <div
                  key={video.id}
                  onClick={() => navigate(`/video/${video.id}`)}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
                    {/* Video Thumbnail */}
                    <div className="relative group cursor-pointer">
                      <div className="relative rounded-xl overflow-hidden aspect-video bg-gray-200">
                        <img
                          src={video.thumbnail}
                          alt={video.title}
                          className="w-full h-full object-cover"
                        />
                        {/* Play Button Overlay */}
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/40 transition-colors">
                          <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Play className="h-8 w-8 text-[#003863] ml-1" fill="currentColor" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Video Details */}
                    <div className="md:col-span-2 flex flex-col">
                      <h3 className="text-xl font-bold text-[#003863] mb-3">
                        {video.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-grow">
                        {video.description}
                      </p>
                      {/* <div className="flex items-center gap-4">
                        <Button className="bg-[#003863] hover:bg-[#002d4d] text-white rounded-full px-6">
                          Watch Now
                        </Button>
                        <Button
                          variant="outline"
                          className="border-[#003863] text-[#003863] hover:bg-[#e1eef4] rounded-full px-6"
                        >
                          Save for Later
                        </Button>
                      </div> */}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center gap-2 mt-10">
              <Button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                variant="outline"
                className="rounded-lg border-[#003863] text-[#003863] hover:bg-[#e1eef4] disabled:opacity-50"
              >
                Previous
              </Button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <Button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-10 h-10 rounded-lg ${currentPage === page
                    ? 'bg-[#003863] text-white hover:bg-[#002d4d]'
                    : 'bg-white text-[#003863] border border-[#003863] hover:bg-[#e1eef4]'
                    }`}
                >
                  {page}
                </Button>
              ))}

              <Button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                variant="outline"
                className="rounded-lg border-[#003863] text-[#003863] hover:bg-[#e1eef4] disabled:opacity-50"
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
