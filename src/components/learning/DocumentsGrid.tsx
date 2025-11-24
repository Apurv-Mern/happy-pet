import { memo } from 'react'
import { motion } from 'framer-motion'
import { FileText, Eye, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'

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
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {modules.map((module, index) => (
          <motion.div
            key={module.id}
            className="bg-[#E1EEF4] rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
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
                  {module.description}
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
    )
  }
)

DocumentsGrid.displayName = 'DocumentsGrid'
