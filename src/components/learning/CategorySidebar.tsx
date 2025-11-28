import { memo, useCallback } from 'react'

interface Category {
  id: string
  name: string
  count: number
}

interface CategorySidebarProps {
  title: string
  categories: Category[]
  selectedCategory: string
  onCategoryClick: (categoryId: string) => void
}

export const CategorySidebar = memo(
  ({
    title,
    categories,
    selectedCategory,
    onCategoryClick,
  }: CategorySidebarProps) => {
    const handleClick = useCallback(
      (categoryId: string) => {
        onCategoryClick(categoryId)
      },
      [onCategoryClick]
    )

    return (
      <div className="bg-[#E3E6ED] rounded-bl-[15px] rounded-br-[15px]">
        <div className="bg-[#003863] rounded-tl-[15px] rounded-tr-[15px] text-white px-6 py-4">
          <h2 className="text-xl font-bold">{title}</h2>
        </div>
        <div>
          {categories.map((category, index) => (
            <button
              key={category.id}
              onClick={() => handleClick(category.id)}
              className={`w-full text-left px-6 py-4 hover:bg-[#D0D2D9] transition-colors ${
                index === categories.length - 1
                  ? 'rounded-b-[15px]'
                  : 'border-b border-gray-300'
              } ${selectedCategory === category.id ? 'bg-[#D0D2D9]' : ''}`}
            >
              <span className="text-[#003863] text-[18px] font-semibold">
                {category.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    )
  }
)

CategorySidebar.displayName = 'CategorySidebar'
