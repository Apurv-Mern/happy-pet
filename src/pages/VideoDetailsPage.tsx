import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ChevronLeft, ChevronRight, ChevronDown, ChevronUp } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Video {
    id: string
    title: string
    description: string
    videoUrl: string
    category: string
    duration: string
}

interface Category {
    id: string
    name: string
}

const categories: Category[] = [
    { id: 'happy-dog', name: 'Happy Dog' },
    { id: 'happy-cat', name: 'Happy Cat' },
]

const videos: Video[] = [
    {
        id: '1',
        title: "There's nothing quite like the pure joy of a happy dog",
        description:
            "There's nothing quite like the pure joy of a happy dog. With every wag of the tail and sparkle in their eyes, they remind us to live in the moment. Whether it's a walk in the park, a favorite treat, or a simple belly rub, a dog's happiness is contagious.\n\nThere's nothing quite like the pure joy of a happy dog. With every wag of the tail and sparkle in their eyes, they remind us to live in the moment. There's nothing quite like the pure joy of a happy dog. With every wag of the tail and sparkle in their eyes, they remind us to live in the moment. Whether it's a walk in the park, a favorite treat, or a simple belly rub, a dog's happiness is contagious.",
        videoUrl: '/videos/happy-dog-1.mp4',
        category: 'happy-dog',
        duration: '4:32',
    },
    // Add more videos...
]

export default function VideoDetailPage() {
    const { videoId } = useParams<{ videoId: string }>()
    const navigate = useNavigate()
    const [selectedCategory, setSelectedCategory] = useState<string>('happy-dog')
    const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false)

    const video = videos.find(v => v.id === videoId)

    if (!video) {
        return <div>Video not found</div>
    }

    const descriptionLines = video.description.split('\n')
    const shortDescription = descriptionLines.slice(0, 2).join('\n')
    const fullDescription = video.description

    return (
        <div className="min-h-screen">
            <div className="mx-auto max-w-[1400px]">
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
                                            navigate('/knowledge-hub')
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

                    {/* Main Content - Video Player */}
                    <div className="lg:col-span-3">
                        {/* Video Title */}
                        <div className="bg-[#d4e7f6] rounded-xl px-6 py-4 mb-6">
                            <h1 className="text-2xl font-bold text-[#003863]">
                                {video.title}
                            </h1>
                        </div>

                        {/* Video Player */}
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
                            <div className="relative aspect-video bg-black">
                                <video
                                    className="w-full h-full"
                                    controls
                                    poster={`/thumbnails/${video.id}.jpg`}
                                >
                                    <source src={video.videoUrl} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            </div>

                            {/* Video Description */}
                            <div className="p-6">
                                <div className="relative">
                                    <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
                                        {isDescriptionExpanded ? fullDescription : shortDescription}
                                        {!isDescriptionExpanded && descriptionLines.length > 2 && '...'}
                                    </p>

                                    {descriptionLines.length > 2 && (
                                        <button
                                            onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                                            className="mt-4 flex items-center gap-2 text-[#003863] font-semibold hover:underline transition-colors"
                                        >
                                            {isDescriptionExpanded ? (
                                                <>
                                                    Show Less
                                                    <ChevronUp className="h-4 w-4" />
                                                </>
                                            ) : (
                                                <>
                                                    Read More
                                                    <ChevronDown className="h-4 w-4" />
                                                </>
                                            )}
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Navigation Buttons */}
                        <div className="flex items-center justify-between">
                            <Button
                                onClick={() => navigate('/knowledge-hub')}
                                className="flex items-center gap-2 bg-white text-[#003863] border-2 border-[#003863] hover:bg-[#e1eef4] rounded-full px-6"
                            >
                                <ChevronLeft className="h-5 w-5" />
                                Back to Videos
                            </Button>

                            <div className="flex gap-3">
                                <Button
                                    variant="outline"
                                    className="border-[#003863] text-[#003863] hover:bg-[#e1eef4] rounded-full px-6"
                                >
                                    Previous Video
                                </Button>
                                <Button
                                    className="bg-[#003863] text-white hover:bg-[#002d4d] rounded-full px-6 flex items-center gap-2"
                                >
                                    Next Video
                                    <ChevronRight className="h-5 w-5" />
                                </Button>
                            </div>
                        </div>

                        {/* Related Videos */}
                        <div className="mt-10">
                            <h2 className="text-2xl font-bold text-[#003863] mb-6">
                                Related Videos
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {videos.slice(0, 4).map(relatedVideo => (
                                    <div
                                        key={relatedVideo.id}
                                        onClick={() => navigate(`/video/${relatedVideo.id}`)}
                                        className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow"
                                    >
                                        <div className="relative aspect-video bg-gray-200">
                                            <img
                                                src={`/thumbnails/${relatedVideo.id}.jpg`}
                                                alt={relatedVideo.title}
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                                                {relatedVideo.duration}
                                            </div>
                                        </div>
                                        <div className="p-4">
                                            <h3 className="text-[#003863] font-semibold line-clamp-2">
                                                {relatedVideo.title}
                                            </h3>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
