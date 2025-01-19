import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { type Reaction, defaultReaction } from '@/components/random-ten'

type UserReactionStore = {
  targetReactions: Record<number, Record<Reaction, number>>
  setReaction: (targetId: number, reaction: Reaction) => void
}

export const useUserReactionStore = create<UserReactionStore>()(
  persist(
    (set) => ({
      targetReactions: {},
      setReaction: (targetId, reaction) =>
        set((state) => {
          const targetData = state.targetReactions[targetId] || defaultReaction
          const updatedReactions = {
            ...targetData,
            [reaction]: targetData[reaction] + 1,
          }

          return {
            targetReactions: {
              ...state.targetReactions,
              [targetId]: updatedReactions,
            },
          }
        }),
    }),
    {
      name: 'user-reactions',
      storage: createJSONStorage(() => localStorage),
    }
  )
)
