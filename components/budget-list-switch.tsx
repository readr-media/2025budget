import { BudgetListViewMode } from '@/types/budget'
import React from 'react'

const switchConfig = [BudgetListViewMode.Category, BudgetListViewMode.Search]

export default function BudgetListSwitch({
  mode,
  onChange,
}: {
  mode: BudgetListViewMode
  onChange: (newMode: BudgetListViewMode) => void
}) {
  return (
    <div className="mt-7 flex items-center justify-center gap-[25px] rounded-lg lg:mt-10">
      {switchConfig.map((switchMode) => (
        <SwitchButton
          key={switchMode}
          text={switchMode}
          isChecked={mode === switchMode}
          onChange={() => onChange(switchMode)}
        />
      ))}
    </div>
  )
}

const SwitchButton = ({
  onChange,
  isChecked,
  text,
}: {
  onChange: () => void
  isChecked: boolean
  text: string
}) => {
  return (
    <label className="flex cursor-pointer items-center gap-[9px]">
      <input
        type="radio"
        name="switch"
        value={text}
        checked={isChecked}
        onChange={onChange}
        className="hidden"
      />
      <div className="relative flex size-4 items-center justify-center rounded-full border border-black">
        {isChecked && <div className="size-3 rounded-full bg-black" />}
      </div>
      <span className="text-black">{text}</span>
    </label>
  )
}
