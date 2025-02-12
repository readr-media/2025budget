import { BudgetData } from '@/types/budget'
import Icon from './icon'
import { useUserReactionStore } from '@/lib/store'
import { handleUpdateUserReaction } from './reaction-button'
import { defaultReaction, handleUserReaction, Reaction } from './random-ten'
import { useState } from 'react'

const reactions = [
  {
    icon: { on: 'icon-happy', off: 'icon-happy-off' },
    reaction: 'happy',
    text: '我感到很讚',
  },
  {
    icon: { on: 'icon-angry', off: 'icon-angry-off' },
    reaction: 'angry',
    text: '我感到生氣',
  },
  {
    icon: { on: 'icon-letdown', off: 'icon-letdown-off' },
    reaction: 'letdown',
    text: '我感到失望',
  },
  {
    icon: { on: 'icon-indifferent', off: 'icon-indifferent-off' },
    reaction: 'indifferent',
    text: '我不在意',
  },
] as const

export default function SingleBudgetReaction({ item }: { item: BudgetData }) {
  const { setReaction, targetReactions } = useUserReactionStore()
  const userReaction = targetReactions[item.ID]
  const [itemReactions, setItemReactions] = useState({
    ...defaultReaction,
    ...item.reaction,
  })

  const onReactionChanged = (newReaction: Reaction) => {
    if (userReaction) {
      handleUpdateUserReaction(newReaction, userReaction, item.ID)
      setItemReactions({
        ...itemReactions,
        [userReaction]: itemReactions[userReaction] - 1,
        [newReaction]: itemReactions[newReaction] + 1,
      })
    } else {
      handleUserReaction(newReaction, item.ID)
      setItemReactions({
        ...itemReactions,
        [newReaction]: itemReactions[newReaction] + 1,
      })
    }
    setReaction(item.ID, newReaction)
  }

  return (
    <div className="mx-auto mt-[68px] flex w-[286px] flex-wrap justify-center gap-x-12 gap-y-5 lg:mt-16 lg:w-auto">
      {reactions.map((reactionObj) => (
        <div key={reactionObj.reaction} className="flex flex-col items-center">
          <div className="font-bold">{reactionObj.text}</div>
          <div className="mt-2">{itemReactions[reactionObj.reaction] ?? 0}</div>
          {userReaction === reactionObj.reaction ? (
            <button className="mt-5" disabled>
              <Icon
                iconName={reactionObj.icon.on}
                size={{ width: 119, height: 74 }}
              />
            </button>
          ) : (
            <button
              className="mt-5"
              onClick={() => {
                onReactionChanged(reactionObj.reaction)
              }}
            >
              <Icon
                iconName={reactionObj.icon.off}
                size={{ width: 119, height: 74 }}
              />
            </button>
          )}
        </div>
      ))}
    </div>
  )
}
