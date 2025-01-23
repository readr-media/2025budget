import { useMemo } from 'react'
import { BudgetData } from '@/types/budget'

type BudgetVisProps = {
  list: BudgetData[]
}

const ACTION_COLORS = {
  '減列': 'bg-custom-red',
  '凍結': 'bg-custom-blue',
  '其他建議': 'bg-text-gray'
} as const

export default function BudgetVisualization({ list }: BudgetVisProps) {
  // Filter out items without valid amount and sort by amount
  const sortedList = useMemo(() => {
    return list
      .filter(item => {
        const amount = parseInt(item.cost)
        return !isNaN(amount) && amount > 0
      })
      .sort((a, b) => {
        const amountA = parseInt(a.cost) || 0
        const amountB = parseInt(b.cost) || 0
        return amountB - amountA
      })
  }, [list])

  const maxAmount = useMemo(() => 
    Math.max(...sortedList.map(item => parseInt(item.cost) || 0)),
    [sortedList]
  )

  if (!sortedList.length) {
    return null
  }

  return (
    <div className="w-full max-w-[964px] mt-8 mb-12" role="region" aria-label="預算提案視覺化">
      <div className="flex flex-col gap-3 mb-6">
        <div className="flex gap-4 items-center">
          {Object.entries(ACTION_COLORS).map(([action, color]) => (
            <div key={action} className="flex items-center gap-2">
              <div className={`w-4 h-4 ${color}`} role="presentation" />
              <span>{action}</span>
            </div>
          ))}
        </div>
        <p className="text-sm text-gray-600">
          註：顏色較淺代表該提案「保留」，較深代表「通過」
        </p>
      </div>
      
      <div className="space-y-2">
        {sortedList.map(item => {
          const amount = parseInt(item.cost) || 0
          const width = maxAmount > 0 ? (amount / maxAmount) * 100 : 0
          const color = ACTION_COLORS[item.action as keyof typeof ACTION_COLORS] || 'bg-text-gray'
          const opacity = item.result === '通過' ? 'opacity-100' : 'opacity-50'
          
          return (
            <div 
              key={item.ID} 
              className="relative group flex items-center gap-2"
              role="button"
              tabIndex={0}
              aria-label={`${item.full_name} - ${item.action} - ${item.cost}元`}
            >
              <div className="w-16 text-sm text-right flex-shrink-0">
                {item.ID}
              </div>
              <div className="flex-grow">
                <div 
                  className={`h-8 ${color} ${opacity} transition-all`}
                  style={{ width: `${width}%` }}
                />
                <div className="absolute left-20 top-0 h-full flex items-center opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 px-2">
                  <span className="text-sm whitespace-nowrap">
                    {item.full_name} - {item.action} - {item.cost}元
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
} 