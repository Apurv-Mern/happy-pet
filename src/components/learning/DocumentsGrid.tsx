import { memo, useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'

interface Module {
  id: string
  title: string
  description: string
  [key: string]: any
}

interface DocumentsGridProps {
  modules: Module[]
  handleView: (module: Module) => void
  handleDownload: (module: Module) => void
}

export const DocumentsGrid = memo(
  ({ modules, handleView, handleDownload }: DocumentsGridProps) => {
    const [isDescriptionModalOpen, setIsDescriptionModalOpen] = useState(false)
    const [selectedModule, setSelectedModule] = useState<Module | null>(null)

    const handleReadMore = (module: Module) => {
      setSelectedModule(module)
      setIsDescriptionModalOpen(true)
    }

    const closeDescriptionModal = () => {
      setIsDescriptionModalOpen(false)
      setSelectedModule(null)
    }

    // Truncate text to 3 lines (approximately 120-150 characters)
    const truncateText = (text: string, maxLength: number = 150) => {
      if (!text) return 'No description available'
      if (text.length <= maxLength) return text
      return text.substring(0, maxLength) + '...'
    }

    return (
      <>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {modules.map((module, index) => (
            <motion.div
              key={module.id}
              className="bg-[#E3E6ED] rounded-2xl shadow-lg p-6 transition-shadow"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <div className="flex gap-4">
                {/* Document Icon */}
                <div className="flex-shrink-0">
                  <div className="p-3 border-2 border-[#003863] rounded-full flex items-center justify-center">
                    <svg
                      width="36"
                      height="36"
                      viewBox="0 0 36 36"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        x="7.33301"
                        y="5.86401"
                        width="20.5314"
                        height="24.9218"
                        rx="2"
                        stroke="#003863"
                        stroke-width="2"
                      />
                      <path
                        d="M13.1992 13.1938H21.9984"
                        stroke="#003863"
                        stroke-width="2"
                        stroke-linecap="round"
                      />
                      <path
                        d="M13.1992 19.0579H21.9984"
                        stroke="#003863"
                        stroke-width="2"
                        stroke-linecap="round"
                      />
                      <path
                        d="M13.1992 24.9219H19.0653"
                        stroke="#003863"
                        stroke-width="2"
                        stroke-linecap="round"
                      />
                    </svg>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-grow">
                  <h3 className="text-lg font-bold text-[#003863] mb-2">
                    {module.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-2 line-clamp-3">
                    {truncateText(module.description)}
                  </p>

                  {/* Read More Button - Only show if text is longer than truncation */}
                  {module.description && module.description.length > 150 && (
                    <button
                      onClick={() => handleReadMore(module)}
                      className="text-[#003863] text-sm font-semibold hover:underline mb-3"
                    >
                      Read more
                    </button>
                  )}

                  {/* Action Buttons */}
                  <div className="flex items-center gap-3 mt-2">
                    <Button
                      onClick={() => handleView(module)}
                      className="flex items-center gap-2 bg-white text-[#003863] border border-[#003863] hover:bg-[#fff] rounded-full px-4 h-9 text-sm font-medium"
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9.59863 7.39697C10.8138 7.39697 11.7987 8.38148 11.7988 9.59521C11.7988 10.8091 10.8138 11.7944 9.59863 11.7944C8.38364 11.7942 7.39941 10.8089 7.39941 9.59521C7.39957 8.38164 8.38374 7.39724 9.59863 7.39697Z"
                          stroke="#003860"
                          stroke-width="2"
                        />
                        <path
                          d="M15.9751 8.53651C16.3677 8.99697 16.564 9.2272 16.564 9.59564C16.564 9.96407 16.3677 10.1943 15.9751 10.6548C14.7704 12.0677 12.3671 14.3934 9.59875 14.3934C6.83044 14.3934 4.42706 12.0677 3.2224 10.6548C2.82981 10.1943 2.63351 9.96407 2.63351 9.59564C2.63351 9.2272 2.82981 8.99697 3.2224 8.53651C4.42706 7.12359 6.83044 4.79785 9.59875 4.79785C12.3671 4.79785 14.7704 7.12359 15.9751 8.53651Z"
                          stroke="#003860"
                          stroke-width="2"
                        />
                      </svg>
                      View
                    </Button>
                    <Button
                      onClick={() => handleDownload(module)}
                      className="flex items-center gap-2 bg-white text-[#003863] border border-[#003863] hover:bg-[#fff] rounded-full px-4 h-9 text-sm font-medium"
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9.59924 11.1948L8.89226 11.9021L9.59924 12.6088L10.3062 11.9021L9.59924 11.1948ZM10.5992 3.99815C10.5992 3.44586 10.1515 2.99815 9.59924 2.99815C9.04696 2.99815 8.59924 3.44586 8.59924 3.99815L9.59924 3.99815L10.5992 3.99815ZM5.59961 7.19667L4.89263 7.90391L8.89226 11.9021L9.59924 11.1948L10.3062 10.4876L6.30659 6.48943L5.59961 7.19667ZM9.59924 11.1948L10.3062 11.9021L14.3058 7.90391L13.5989 7.19667L12.8919 6.48943L8.89226 10.4876L9.59924 11.1948ZM9.59924 11.1948L10.5992 11.1948L10.5992 3.99815L9.59924 3.99815L8.59924 3.99815L8.59924 11.1948L9.59924 11.1948Z"
                          fill="#003863"
                        />
                        <path
                          d="M4 12.7942L4 13.5938C4 14.4771 4.71628 15.1931 5.59985 15.1931L13.5991 15.1931C14.4827 15.1931 15.199 14.4771 15.199 13.5938V12.7942"
                          stroke="#003863"
                          stroke-width="2"
                        />
                      </svg>
                      Download
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Description Modal */}
        {isDescriptionModalOpen && selectedModule && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full overflow-hidden"
            >
              {/* Modal Header */}
              <div className="bg-[#003863] text-white p-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold pr-8">
                  {selectedModule.title}
                </h2>
                <button
                  onClick={closeDescriptionModal}
                  className="flex-shrink-0 hover:bg-white/20 rounded-full p-2 transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 overflow-y-auto max-h-[calc(80vh-120px)]">
                <p className="text-gray-700 text-base leading-relaxed whitespace-pre-wrap">
                  {selectedModule.description || 'No description available'}
                </p>
              </div>

              {/* Modal Footer */}
              <div className="bg-gray-50 px-6 py-4 flex justify-end gap-3 border-t">
                <button
                  onClick={closeDescriptionModal}
                  className="bg-[#003863] text-white px-6 py-2 rounded-full font-semibold hover:bg-[#004c82] transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </>
    )
  }
)

DocumentsGrid.displayName = 'DocumentsGrid'
