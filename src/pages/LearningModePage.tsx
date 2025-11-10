import { useState } from 'react'
import { Eye, Download, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Article {
  id: string
  title: string
  description: string
  fileUrl: string
  fileSize: string
  pageCount: number
}

const articles: Article[] = [
  {
    id: '1',
    title: 'Every Tail Tells a Story of Joy',
    description:
      "At Happy Dog, we believe every pup deserves a life filled with love, play, and endless adventures. From morning walks to cozy naps, each moment is a reason to wag that tail a little harder.",
    fileUrl: '/documents/article-1.pdf',
    fileSize: '2.5 MB',
    pageCount: 12,
  },
  {
    id: '2',
    title: 'Every Tail Tells a Story of Joy',
    description:
      "At Happy Dog, we believe every pup deserves a life filled with love, play, and endless adventures. From morning walks to cozy naps, each moment is a reason to wag that tail a little harder.",
    fileUrl: '/documents/article-2.pdf',
    fileSize: '3.2 MB',
    pageCount: 15,
  },
  {
    id: '3',
    title: 'Every Tail Tells a Story of Joy',
    description:
      "At Happy Dog, we believe every pup deserves a life filled with love, play, and endless adventures. From morning walks to cozy naps, each moment is a reason to wag that tail a little harder.",
    fileUrl: '/documents/article-3.pdf',
    fileSize: '1.8 MB',
    pageCount: 10,
  },
  {
    id: '4',
    title: 'Every Tail Tells a Story of Joy',
    description:
      "At Happy Dog, we believe every pup deserves a life filled with love, play, and endless adventures. From morning walks to cozy naps, each moment is a reason to wag that tail a little harder.",
    fileUrl: '/documents/article-4.pdf',
    fileSize: '2.1 MB',
    pageCount: 11,
  },
  {
    id: '5',
    title: 'Every Tail Tells a Story of Joy',
    description:
      "At Happy Dog, we believe every pup deserves a life filled with love, play, and endless adventures. From morning walks to cozy naps, each moment is a reason to wag that tail a little harder.",
    fileUrl: '/documents/article-5.pdf',
    fileSize: '2.8 MB',
    pageCount: 14,
  },
  {
    id: '6',
    title: 'Every Tail Tells a Story of Joy',
    description:
      "At Happy Dog, we believe every pup deserves a life filled with love, play, and endless adventures. From morning walks to cozy naps, each moment is a reason to wag that tail a little harder.",
    fileUrl: '/documents/article-6.pdf',
    fileSize: '2.3 MB',
    pageCount: 13,
  },
  {
    id: '7',
    title: 'Every Tail Tells a Story of Joy',
    description:
      "At Happy Dog, we believe every pup deserves a life filled with love, play, and endless adventures. From morning walks to cozy naps, each moment is a reason to wag that tail a little harder.",
    fileUrl: '/documents/article-7.pdf',
    fileSize: '1.9 MB',
    pageCount: 9,
  },
  {
    id: '8',
    title: 'Every Tail Tells a Story of Joy',
    description:
      "At Happy Dog, we believe every pup deserves a life filled with love, play, and endless adventures. From morning walks to cozy naps, each moment is a reason to wag that tail a little harder.",
    fileUrl: '/documents/article-8.pdf',
    fileSize: '3.0 MB',
    pageCount: 16,
  },
]

export default function LearningModePage() {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8

  const totalPages = Math.ceil(articles.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const currentArticles = articles.slice(startIndex, startIndex + itemsPerPage)

  const handleView = (article: Article) => {
    window.open(article.fileUrl, '_blank')
  }

  const handleDownload = (article: Article) => {
    const link = document.createElement('a')
    link.href = article.fileUrl
    link.download = `${article.title}.pdf`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="min-h-screen ">
      <div className="mx-auto max-w-[1400px]">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-[#003863] text-center mb-2">
            Knowledge Hub Articles
          </h1>
          <p className="text-center text-gray-600">
            Discover insightful articles about pet care and happiness
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {currentArticles.map((article, index) => (
            <div
              key={article.id}
              className="bg-[#E1EEF4] rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow"
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
                    {article.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {article.description}
                  </p>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-3">
                    <Button
                      onClick={() => handleView(article)}
                      className="flex items-center gap-2 bg-white text-[#003863] border border-[#003863] hover:bg-[#e1eef4] rounded-full px-4 h-9 text-sm font-medium"
                    >
                      <Eye className="h-4 w-4" />
                      View
                    </Button>
                    <Button
                      onClick={() => handleDownload(article)}
                      className="flex items-center gap-2 bg-[#003863] text-white hover:bg-[#002d4d] rounded-full px-4 h-9 text-sm font-medium"
                    >
                      <Download className="h-4 w-4" />
                      Download
                    </Button>
                  </div>
                </div>
              </div>
            </div>
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
    </div>
  )
}
