import { memo } from 'react'

export const PageSkeleton = memo(() => {
  return (
    <div className="animate-pulse">
      <div className="flex justify-between items-center border-b-[1px] border-gray-200 pb-[11px] mb-10">
        <div className="h-14 bg-gray-200 rounded w-1/3"></div>
        <div className="h-12 bg-gray-200 rounded w-96"></div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 sm:gap-8">
        {/* Sidebar skeleton */}
        <div className="lg:col-span-1">
          <div className="bg-[#E3E6ED] rounded-[15px] overflow-hidden">
            <div className="bg-[#003863] h-16"></div>
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="px-6 py-4 border-b border-gray-300">
                <div className="h-6 bg-gray-300 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        </div>
        {/* Grid skeleton - children will be passed */}
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="bg-[#E1EEF4] rounded-2xl p-6">
                <div className="flex gap-4">
                  <div className="w-16 h-16 bg-gray-300 rounded-lg flex-shrink-0"></div>
                  <div className="flex-grow space-y-3">
                    <div className="h-5 bg-gray-300 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-300 rounded w-full"></div>
                    <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                    <div className="flex gap-3 mt-4">
                      <div className="h-9 bg-gray-300 rounded-full w-20"></div>
                      <div className="h-9 bg-gray-300 rounded-full w-28"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
})

PageSkeleton.displayName = 'PageSkeleton'

export const VideoGridSkeleton = memo(() => {
  return (
    <div className="grid grid-cols-3 gap-6 animate-pulse">
      {[1, 2, 3, 4, 5, 6].map(i => (
        <div key={i} className="bg-[#E3E6ED] rounded-[10px] p-6">
          <div className="aspect-video bg-gray-300 rounded-xl mb-4"></div>
          <div className="h-5 bg-gray-300 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-full"></div>
          <div className="h-4 bg-gray-300 rounded w-5/6 mt-2"></div>
        </div>
      ))}
    </div>
  )
})

VideoGridSkeleton.displayName = 'VideoGridSkeleton'

export const DocumentGridSkeleton = memo(() => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-pulse">
      {[1, 2, 3, 4].map(i => (
        <div key={i} className="bg-[#E1EEF4] rounded-2xl p-6">
          <div className="flex gap-4">
            <div className="w-16 h-16 bg-gray-300 rounded-lg flex-shrink-0"></div>
            <div className="flex-grow space-y-3">
              <div className="h-5 bg-gray-300 rounded w-3/4"></div>
              <div className="h-4 bg-gray-300 rounded w-full"></div>
              <div className="h-4 bg-gray-300 rounded w-5/6"></div>
              <div className="flex gap-3 mt-4">
                <div className="h-9 bg-gray-300 rounded-full w-20"></div>
                <div className="h-9 bg-gray-300 rounded-full w-28"></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
})

DocumentGridSkeleton.displayName = 'DocumentGridSkeleton'
