import { useState } from 'react'
import { Play, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useLearningModulesQuery } from '@/api/learningModule'

interface Category {
  id: string
  name: string
  count: number
}

const categories: Category[] = [
  { id: 'happy-dog', name: 'Happy Dog', count: 24 },
  { id: 'happy-cat', name: 'Happy Cat', count: 18 },
]

export default function KnowledgeHubPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('happy-dog')
  const [currentPage, setCurrentPage] = useState(1)
  const navigate = useNavigate()
  const itemsPerPage = 8

  const { data: response, isLoading } = useLearningModulesQuery(
    currentPage,
    itemsPerPage,
    'video'
  )

  const videos = response?.data?.content || []
  const pagination = response?.data?.pagination
  const totalPages = pagination?.totalPages || 1

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#003863] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading videos...</p>
        </div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen px-4"
    >
      <div className="mx-auto max-w-[1400px]">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-6 sm:mb-10"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-[#003863] text-center mb-2">
            Knowledge Hub
          </h1>
          <p className="text-center text-sm sm:text-base text-gray-600">
            Learn everything about pet care through our video guides
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 sm:gap-8">
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
                    className={`w-full flex items-center justify-between px-6 py-4 hover:bg-[#e1eef4] transition-colors ${
                      selectedCategory === category.id
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
              {videos.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-600">No videos available</p>
                </div>
              ) : (
                videos.map((video, index) => (
                  <motion.div
                    key={video._id || video.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    onClick={() => navigate(`/video/${video._id || video.id}`)}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
                      {/* Video Thumbnail */}
                      <div className="relative group cursor-pointer">
                        <div className="relative rounded-xl overflow-hidden aspect-video bg-gray-200">
                          {video.thumbnail ? (
                            <img
                              src={video.thumbnail}
                              alt={video.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-[#e1eef4]">
                              <Play className="h-12 w-12 text-[#003863]" />
                            </div>
                          )}
                          {/* Play Button Overlay */}
                          <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/40 transition-colors">
                            <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                              <Play
                                className="h-8 w-8 text-[#003863] ml-1"
                                fill="currentColor"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Video Details */}
                      <div className="md:col-span-2 flex flex-col">
                        <h3 className="text-xl font-bold text-[#003863] mb-3">
                          {video.title}
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-grow line-clamp-4">
                          {video.content || video.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
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
                  className={`w-10 h-10 rounded-lg ${
                    currentPage === page
                      ? 'bg-[#003863] text-white hover:bg-[#002d4d]'
                      : 'bg-white text-[#003863] border border-[#003863] hover:bg-[#e1eef4]'
                  }`}
                >
                  {page}
                </Button>
              ))}

              <Button
                onClick={() =>
                  setCurrentPage(prev => Math.min(totalPages, prev + 1))
                }
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
    </motion.div>
  )
}
