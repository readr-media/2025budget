export type BudgetData = {
  ID: number
  time_place: string
  category: string
  full_name: string
  who: string
  action: string
  result: string
  content: string
  cost: string
  url: string
  totalReaction: number
  reaction?: {
    happy?: number
    angry?: number
    letdown?: number
    indifferent?: number
  }
}

export type CategoryItem = {
  [key: string]: string[]
}

export type CategoryData = {
  items: { [key: number]: CategoryItem }
}

export type News = {
  date_time: string
  content: string
}
