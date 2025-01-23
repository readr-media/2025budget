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

type ActionStats = {
  total: number
  passed: number
  percentage: number
  totalAmount: number
}

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

  // Calculate statistics
  const stats = useMemo(() => {
    const initialStats = {
      '減列': { total: 0, passed: 0, percentage: 0, totalAmount: 0 },
      '凍結': { total: 0, passed: 0, percentage: 0, totalAmount: 0 },
      '其他建議': { total: 0, passed: 0, percentage: 0, totalAmount: 0 }
    } as Record<string, ActionStats>

    // Count all cases including those without valid amounts
    list.forEach(item => {
      const action = item.action as keyof typeof ACTION_COLORS
      const amount = parseInt(item.cost) || 0
      
      if (initialStats[action]) {
        initialStats[action].total++
        if (item.result === '通過') {
          initialStats[action].passed++
        }
        if (!isNaN(amount) && amount > 0) {
          initialStats[action].totalAmount += amount
        }
      }
    })

    // Calculate percentages
    Object.keys(initialStats).forEach(action => {
      const { total, passed } = initialStats[action]
      initialStats[action].percentage = total > 0 ? (passed / total) * 100 : 0
    })

    return initialStats
  }, [list])

  if (!sortedList.length) {
    return null
  }

  const totalAmount = Object.values(stats).reduce((sum, stat) => sum + stat.totalAmount, 0)
  const totalCases = list.length // Use original list length

  // Format amount in Chinese
  const formatAmountToChinese = (amount: number) => {
    if (amount >= 100000000) {
      return `${(amount / 100000000).toFixed(1)}億`
    }
    if (amount >= 10000) {
      return `${(amount / 10000).toFixed(1)}萬`
    }
    return amount.toString()
  }

  return (
    <div className="w-full max-w-[964px] mt-8 mb-12" role="region" aria-label="預算提案視覺化">
      {/* Top Stats Row */}
      <div className="grid grid-cols-2 gap-8 mb-12">
        {/* Total Cases Card */}
        <div className="flex flex-col items-start">
          <h3 className="text-sm text-gray-500 mb-1">總案件數</h3>
          <p className="text-4xl font-bold">{totalCases}</p>
        </div>

        {/* Total Amount Card */}
        <div className="flex flex-col items-end">
          <h3 className="text-sm text-gray-500 mb-1">總預算</h3>
          <p className="text-4xl font-bold">
            {formatAmountToChinese(totalAmount)}元
          </p>
        </div>
      </div>

      {/* Chart Section */}
      <div className="mb-12">
        <div className="flex flex-col gap-2 mb-6">
          <div className="flex gap-6 items-center">
            {Object.entries(ACTION_COLORS).map(([action, color]) => (
              <div key={action} className="flex items-center gap-1.5">
                <div className={`w-3 h-3 ${color}`} role="presentation" />
                <span className="text-sm">{action}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500">
            註：顏色較淺代表該提案「保留」，較深代表「通過」
          </p>
        </div>
        
        <div className="space-y-1.5">
          {sortedList.map(item => {
            const amount = parseInt(item.cost) || 0
            const width = maxAmount > 0 ? (amount / maxAmount) * 100 : 0
            const color = ACTION_COLORS[item.action as keyof typeof ACTION_COLORS] || 'bg-text-gray'
            const opacity = item.result === '通過' ? 'opacity-100' : 'opacity-50'
            
            return (
              <div 
                key={item.ID} 
                className="relative group flex items-center gap-3"
                role="button"
                tabIndex={0}
                aria-label={`${item.full_name} - ${item.action} - ${item.cost}元`}
              >
                <div className="w-16 text-sm text-right flex-shrink-0 text-gray-500 font-mono">
                  {item.ID}
                </div>
                <div className="flex-grow">
                  <div 
                    className={`h-7 ${color} ${opacity} transition-all rounded-sm`}
                    style={{ width: `${width}%` }}
                  />
                  <div className="absolute left-20 top-0 h-full flex items-center opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 px-2">
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

      {/* Analysis Section */}
      <div>
        <h3 className="text-sm text-gray-500 mb-6">通過案件分析</h3>
        <div className="grid grid-cols-3 gap-8">
          {Object.entries(stats).map(([action, stat]) => (
            <div key={action} className="relative">
              <div className="flex items-center gap-2 mb-4">
                <div className={`w-3 h-3 ${ACTION_COLORS[action as keyof typeof ACTION_COLORS]}`} />
                <span className="font-medium">{action}</span>
              </div>
              <table className="w-full text-sm">
                <tbody className="space-y-2">
                  <tr className="flex justify-between py-1">
                    <td className="text-gray-500">提案</td>
                    <td className="font-medium">{stat.total}件</td>
                  </tr>
                  <tr className="flex justify-between py-1">
                    <td className="text-gray-500">通過</td>
                    <td className="font-medium">{stat.passed}件</td>
                  </tr>
                  <tr className="flex justify-between py-1">
                    <td className="text-gray-500">通過比例</td>
                    <td className="font-medium">{stat.percentage.toFixed(1)}%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 