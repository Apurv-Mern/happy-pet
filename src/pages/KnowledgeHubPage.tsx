import { useState } from 'react'
import { Play } from 'lucide-react'
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
      className=""
    >
      <div className="py-20">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Sidebar - Categories */}
          <div className="lg:col-span-1">
            <div className="w-full max-w-[380px] bg-[#003863] rounded-[15px] px-4 py-3 flex items-center mb-5">
              <input
                type="text"
                placeholder="Search"
                className="bg-transparent text-white text-lg w-full focus:outline-none placeholder-white"
              />

              <button className="ml-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-4.35-4.35m1.1-5.4a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z"
                  />
                </svg>
              </button>
            </div>
            <div className="bg-[#E3E6ED] rounded-[15px] shadow-lg overflow-hidden top-4">
              <div className="bg-[#003863] text-white px-4 py-4 rounded-[15px]">
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
                    className={`w-full flex items-center justify-between px-6 py-4 hover:bg-[#e0e0e0]  rounded-[15px] ${
                      selectedCategory === category.id ? '' : ''
                    }`}
                  >
                    <span className="text-[#000] text-[18px] font-semibold">
                      {category.name}
                    </span>
                    {/* <ChevronRight className="h-5 w-5 text-gray-400" /> */}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content - Video List */}
          <div className="lg:col-span-3">
            {/* Category Title */}
            <div className="flex justify-between items-center border-b-[1px] border-[#003860] pb-[11px]">
              <h2 className="text-[32px] font-bold text-[#003863]">
                {categories.find(c => c.id === selectedCategory)?.name}
              </h2>
              <button className="bg-[#003860] text-white text-lg font-medium px-5 py-2 rounded-[15px] hover:bg-[#004C82] transition">
                View All Categories
              </button>
            </div>

            {/* Video Grid */}
            <div className="grid grid-cols-3 gap-6 py-6">
              {videos.length === 0 ? (
                <div className="col-span-3 text-center py-12">
                  <p className="text-gray-600">No videos available</p>
                </div>
              ) : (
                videos.map((video, index) => (
                  <motion.div
                    key={video.id || video._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    onClick={() => navigate(`/video/${video.id || video._id}`)}
                    className="cursor-pointer"
                  >
                    <div className="bg-[#E3E6ED] rounded-[10px] h-full p-6">
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
                          <div className="absolute rounded-[10px] inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/40 transition-colors">
                            <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                              <Play
                                className="h-8 w-8 text-[#003863] ml-1"
                                fill="currentColor"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="md:col-span-2 flex flex-col">
                          <h3 className="text-xl font-bold text-[#003863] mb-2 mt-2">
                            {video.title}
                          </h3>
                          <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-grow line-clamp-3">
                            {video.content}
                          </p>
                        </div>
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
                className="rounded-lg bg-[#3D4760] text-[#fff]"
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
                      : 'bg-white text-[#003863] border border-[#003863]'
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
                className="rounded-lg bg-[#3D4760] text-[#fff]"
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
