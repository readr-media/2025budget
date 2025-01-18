export default function BudgetListControl({
  currentCategory,
  categories,
  currentSubCategory,
  subCategories,
  onChangeCategory,
  onChangeSubCategory,
}: {
  currentCategory: string
  categories: string[]
  currentSubCategory: string
  subCategories: string[]
  onChangeCategory: (category: string) => void
  onChangeSubCategory: (subCategory: string) => void
}) {
  return (
    <>
      <div className="mt-4 flex flex-wrap justify-center gap-2 lg:mt-8 lg:w-[730px] lg:gap-3">
        {categories.map((category) => (
          <CategoryButton
            key={category}
            text={category}
            isActive={category === currentCategory}
            onClick={() => onChangeCategory(category)}
          />
        ))}
      </div>
      <div className="mt-5 flex flex-wrap justify-center gap-3 lg:gap-1">
        {subCategories.map((subCategory) => (
          <SubCategoryButton
            key={subCategory}
            text={subCategory}
            isActive={subCategory === currentSubCategory}
            onClick={() => onChangeSubCategory(subCategory)}
          />
        ))}
      </div>
    </>
  )
}

const CategoryButton = ({
  text,
  isActive,
  onClick,
}: {
  text: string
  isActive: boolean
  onClick: () => void
}) => {
  return (
    <button
      className={`shrink-0 rounded-[4px] border border-black p-1 lg:p-[10px] ${isActive ? 'bg-custom-blue text-white' : ''}`}
      onClick={onClick}
      disabled={isActive}
    >
      {text}
    </button>
  )
}

const SubCategoryButton = ({
  text,
  isActive,
  onClick,
}: {
  text: string
  isActive: boolean
  onClick: () => void
}) => {
  return (
    <button
      className={`lg:p-[10px] ${isActive ? 'text-custom-blue' : 'text-text-gray'}`}
      onClick={onClick}
      disabled={isActive}
    >
      {text}
    </button>
  )
}
