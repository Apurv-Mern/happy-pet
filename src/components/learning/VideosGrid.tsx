import { memo } from 'react'
import { motion } from 'framer-motion'
import { Play } from 'lucide-react'
import { useTranslation } from '@/contexts/I18nContext'

interface Video {
  id: string
  title: string
  description: string
  thumbnail: string
  category: string
  thumbnailUrl?: string
  presignedThumbnailUrl?: string
  fileUrl?: string
  presignedFileUrl?: string
}

interface VideosGridProps {
  videos: Video[]
  navigate: any
}

export const VideosGrid = memo(({ videos, navigate }: VideosGridProps) => {
  const { t } = useTranslation()

  return (
    <div className="grid grid-cols-3 gap-6">
      {videos.length === 0 ? (
        <div className="col-span-3 text-center py-12">
          <p className="text-gray-600">{t('knowledgeHub.noVideosAvailable')}</p>
        </div>
      ) : (
        videos.map((video, index) => (
          <motion.div
            key={video.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            onClick={() => {
              if (video.presignedFileUrl) {
                window.open(video.presignedFileUrl, '_blank')
              } else {
                navigate(`/video/${video.id}`)
              }
            }}
            className="cursor-pointer"
          >
            <div className="bg-[#E3E6ED] rounded-[10px] h-full p-6">
              <div className="relative group cursor-pointer">
                <div className="relative rounded-xl overflow-hidden aspect-video bg-gray-200">
                  {video.presignedThumbnailUrl ||
                  video.thumbnailUrl ||
                  video.thumbnail ? (
                    <img
                      src={
                        video.presignedThumbnailUrl ||
                        video.thumbnailUrl ||
                        video.thumbnail
                      }
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
                    {video.description}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ))
      )}
    </div>
  )
})

VideosGrid.displayName = 'VideosGrid'
