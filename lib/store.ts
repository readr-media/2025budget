import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { type Reaction } from '@/components/random-ten'

const STORAGE_VERSION = 1

type UserReactionStore = {
  targetReactions: Record<number, Reaction>
  setReaction: (targetId: number, reaction: Reaction) => void
}
type ComponentKey = 'Landing' | 'RandomTen' | 'BudgetList'
type ComponentState = {
  currentComponent: ComponentKey
  setCurrentComponent: (component: ComponentKey) => void
}

const useComponentStore = create<ComponentState>()((set) => ({
  currentComponent: 'Landing',
  setCurrentComponent: (component) => set({ currentComponent: component }),
}))

const useUserReactionStore = create<UserReactionStore>()(
  persist(
    (set) => ({
      targetReactions: {},
      setReaction: (targetId, reaction) =>
        set((state) => {
          return {
            targetReactions: {
              ...state.targetReactions,
              [targetId]: reaction,
            },
          }
        }),
    }),
    {
      name: 'user-reactions',
      storage: createJSONStorage(() => localStorage),
      version: STORAGE_VERSION,
    }
  )
)

export { useComponentStore, useUserReactionStore }
