export type BudgetData = {
  ID: number
  time_place: string
  category: string
  full_name: string
  who: string
  action: string
  result: string
  content: string
  cost: number
  url: string
  totalReaction: number
}

export type CategoryData = {
  [key: string]: string[]
}
