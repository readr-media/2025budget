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
  // 根據 action 取得正確的金額
  const getAmount = (item: BudgetData) => {
    // 檢查 action 是否包含特定動作
    const hasDeleted = item.action.includes('減列')
    const hasFrozen = item.action.includes('凍結')
    
    // 計算總金額
    const deletedAmount = hasDeleted ? (parseInt(item.deleted) || 0) : 0
    const frozenAmount = hasFrozen ? (parseInt(item.frozen) || 0) : 0
    
    return deletedAmount + frozenAmount
  }

  // 如果需要分別取得減列和凍結金額，可以新增輔助函數
  const getDeletedAmount = (item: BudgetData) => {
    return item.action.includes('減列') ? (parseInt(item.deleted) || 0) : 0
  }

  const getFrozenAmount = (item: BudgetData) => {
    return item.action.includes('凍結') ? (parseInt(item.frozen) || 0) : 0
  }

  const sortedList = useMemo(() => {
    return list
      .filter(item => {
        const amount = getAmount(item)
        return amount > 0
      })
      .sort((a, b) => {
        const amountA = getAmount(a)
        const amountB = getAmount(b)
        return amountB - amountA
      })
  }, [list])

  const maxAmount = useMemo(() => 
    Math.max(...sortedList.map(item => getAmount(item))),
    [sortedList]
  )

  // 修改統計計算
  const stats = useMemo(() => {
    const initialStats = {
      '減列': { total: 0, passed: 0, percentage: 0, totalAmount: 0 },
      '凍結': { total: 0, passed: 0, percentage: 0, totalAmount: 0 },
      '其他建議': { total: 0, passed: 0, percentage: 0, totalAmount: 0 }
    } as Record<string, ActionStats>

    list.forEach(item => {
      const action = item.action as keyof typeof ACTION_COLORS
      const amount = getAmount(item)
      
      if (initialStats[action]) {
        initialStats[action].total++
        if (item.result === '通過') {
          initialStats[action].passed++
        }
        if (amount > 0) {
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

  // 計算實際預算變動
  const budgetImpact = list.map(item => ({
    ...item,
    impact: (item.deleted || 0) + (item.frozen || 0)  // 計算總影響金額
  }));

  // 依照影響金額排序
  const sortedData = [...budgetImpact].sort((a, b) => (b.impact - a.impact));

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
      <div className="grid grid-cols-3 gap-8 mb-12">
        {/* Total Cases Card */}
        <div className="flex flex-col items-start">
          <h3 className="text-sm text-gray-500 mb-1">總案件數</h3>
          <p className="text-4xl font-bold">{totalCases}</p>
        </div>

        {/* Total Deleted Amount Card */}
        <div className="flex flex-col items-center">
          <h3 className="text-sm text-gray-500 mb-1">總減列金額</h3>
          <p className="text-4xl font-bold text-custom-red">
            {formatAmountToChinese(stats['減列'].totalAmount)}元
          </p>
        </div>

        {/* Total Frozen Amount Card */}
        <div className="flex flex-col items-end">
          <h3 className="text-sm text-gray-500 mb-1">總凍結金額</h3>
          <p className="text-4xl font-bold text-custom-blue">
            {formatAmountToChinese(stats['凍結'].totalAmount)}元
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
          {sortedList.map((item, index) => {
            const amount = getAmount(item)
            const width = maxAmount > 0 ? (amount / maxAmount) * 100 : 0
            const color = ACTION_COLORS[item.action as keyof typeof ACTION_COLORS] || 'bg-text-gray'
            const opacity = item.result === '通過' ? 'opacity-100' : 'opacity-50'
            
            return (
              <div 
                key={item.ID} 
                className="relative group flex items-center gap-3"
                role="button"
                tabIndex={0}
                aria-label={`${item.full_name} - ${item.action} - ${formatAmountToChinese(amount)}元`}
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
                      {item.full_name} - {item.action} - {formatAmountToChinese(amount)}元
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
        <div className="mb-4">
          <h3 className="text-sm text-gray-500">通過案件分析</h3>
          <p className="text-xs text-gray-500 mt-1">註：統計資料會隨著頁面捲動更新，請捲動至頁面底部以取得完整統計。</p>
        </div>
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