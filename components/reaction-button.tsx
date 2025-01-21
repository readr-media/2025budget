import { useMemo, useRef, useState } from 'react'
import Icon from './icon'
import { handleUserReaction, iconButtons, Reaction } from './random-ten'
import useBlockBodyScroll from '@/hooks/use-block-body-scroll'
import useClickOutside from '@/hooks/use-click-outside'
import { useUserReactionStore } from '@/lib/store'
import {
  collection,
  getDocs,
  increment,
  query,
  updateDoc,
  where,
} from 'firebase/firestore'
import { db } from '@/utils/firebase/app'

export default function ReactionButton({
  reaction,
  itemId,
}: {
  reaction?: Reaction
  itemId: number
}) {
  const [showReactionModal, setShowReactionModal] = useState(false)
  const { setReaction } = useUserReactionStore()

  const openReactionModal = () => {
    setShowReactionModal(true)
  }

  const closeReactionModal = () => {
    setShowReactionModal(false)
  }

  const onReactionChanged = (newReaction: Reaction) => {
    if (reaction) {
      handleUpdateUserReaction(newReaction, reaction, itemId)
    } else {
      handleUserReaction(newReaction, itemId)
    }
    setReaction(itemId, newReaction)
    closeReactionModal()
  }

  const buttonJsx = useMemo(() => {
    return reaction ? (
      <button onClick={openReactionModal}>
        <Icon iconName={`icon-${reaction}`} size={{ width: 60, height: 38 }} />
      </button>
    ) : (
      <button onClick={openReactionModal}>
        <Icon iconName="icon-reaction" size={{ width: 60, height: 38 }} />
      </button>
    )
  }, [reaction])

  return (
    <>
      {buttonJsx}
      {showReactionModal && (
        <ReactionModal
          onClose={closeReactionModal}
          onSelect={onReactionChanged}
        />
      )}
    </>
  )
}

const ReactionModal = ({
  onClose,
  onSelect,
}: {
  onClose: () => void
  onSelect: (reaction: Reaction) => void
}) => {
  const modalRef = useRef(null)
  useBlockBodyScroll()
  useClickOutside(modalRef, () => {
    onClose()
  })
  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center">
      <div
        className="flex max-w-full gap-2 border-[3px] border-black bg-background-gray p-5 lg:gap-5 lg:p-10"
        ref={modalRef}
      >
        {iconButtons.map(({ name, reaction, label }) => (
          <button
            key={name}
            className="flex items-center justify-center"
            aria-label={label}
            onClick={() => {
              onSelect(reaction)
            }}
          >
            <Icon iconName={name} size={{ width: 86, height: 54 }} />
          </button>
        ))}
      </div>
    </div>
  )
}

export const handleUpdateUserReaction = async (
  newReaction: Reaction,
  oldReaction: Reaction,
  docId: number
) => {
  const q = query(
    collection(db, 'project-bucket-2025'),
    where('ID', '==', docId)
  )
  const querySnapshot = await getDocs(q)
  querySnapshot.forEach(async (docSnapshot) => {
    await updateDoc(docSnapshot.ref, {
      [`reaction.${oldReaction}`]: increment(-1),
      [`reaction.${newReaction}`]: increment(1),
    })
  })
}
