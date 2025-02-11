// https://paper.dropbox.com/doc/--CgFy9SD0pKWQ7D3c49iH9ONyAg-X3zpllEXjjW45E0ogZgEB#:uid=236969044648153574696318&h2=%E6%8F%90%E6%A1%88-mockdata
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
  deleted: string
  frozen: string
  item: string
  item_note: string
  last_cost: string
  last_budget: string
  budget_diff: string
  budget_url: string
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

export enum BudgetListViewMode {
  Category = '依部會分類',
  Search = '搜尋',
}
