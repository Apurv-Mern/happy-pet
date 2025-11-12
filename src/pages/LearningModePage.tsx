import { useState } from 'react'
import { Eye, Download, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { useLearningModulesQuery } from '@/api/learningModule'

export default function LearningModePage() {
  const [currentPage, setCurrentPage] = useState(1)
  const { data: learningModules, isLoading } = useLearningModulesQuery()
  const itemsPerPage = 8

  const modules = learningModules || []
  const totalPages = Math.ceil(modules.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const currentModules = modules.slice(startIndex, startIndex + itemsPerPage)

  const handleView = (module: { id: string; title: string; content: string }) => {
    // For now, you can implement a modal or navigate to a detail page
    console.log('View module:', module)
    // window.open(module.fileUrl, '_blank')
  }

  const handleDownload = (module: { id: string; title: string; content: string }) => {
    // Create a text file with the content
    const blob = new Blob([module.content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${module.title}.txt`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#003863] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading learning modules...</p>
        </div>
      </div>
    )
  }

  return (
    <motion.div
      className="min-h-screen "
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mx-auto max-w-[1400px]">
        {/* Header */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h1 className="text-4xl font-bold text-[#003863] text-center mb-2">
            Learning Modules
          </h1>
          <p className="text-center text-gray-600">
            Discover insightful articles about pet care and happiness
          </p>
        </motion.div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {currentModules.map((module, index) => (
            <motion.div
              key={module.id}
              className="bg-[#E1EEF4] rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
            >
              <div className="flex gap-4">
                {/* Document Icon */}
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-[#d4e7f6] rounded-lg flex items-center justify-center">
                    <FileText className="h-8 w-8 text-[#003863]" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-grow">
                  <h3 className="text-lg font-bold text-[#003863] mb-2">
                    {module.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                    {module.content}
                  </p>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-3">
                    <Button
                      onClick={() => handleView(module)}
                      className="flex items-center gap-2 bg-white text-[#003863] border border-[#003863] hover:bg-[#e1eef4] rounded-full px-4 h-9 text-sm font-medium"
                    >
                      <Eye className="h-4 w-4" />
                      View
                    </Button>
                    <Button
                      onClick={() => handleDownload(module)}
                      className="flex items-center gap-2 bg-[#003863] text-white hover:bg-[#002d4d] rounded-full px-4 h-9 text-sm font-medium"
                    >
                      <Download className="h-4 w-4" />
                      Download
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-2">
          <Button
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="bg-white text-[#003863] border border-[#003863] hover:bg-[#e1eef4] rounded-lg px-4 h-10 disabled:opacity-50 disabled:cursor-not-allowed"
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
            className="bg-white text-[#003863] border border-[#003863] hover:bg-[#e1eef4] rounded-lg px-4 h-10 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </Button>
        </div>
      </div>
    </motion.div>
  )
}
