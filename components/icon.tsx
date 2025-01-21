import Image from 'next/image'

import logo from '@/public/logo.svg'
import iconShare from '@/public/icon-share.svg'
import iconTriangleLeft from '@/public/icon-triangle-left.svg'
import iconTriangleRight from '@/public/icon-triangle-right.svg'
import iconProjectEntry from '@/public/icon-project-entry.svg'
import iconBracketLeft from '@/public/icon-bracket-left.svg'
import iconBracketRight from '@/public/icon-bracket-right.svg'
import iconHappy from '@/public/icon-happy.svg'
import iconAngry from '@/public/icon-angry.svg'
import iconLetdown from '@/public/icon-letdown.svg'
import iconIndifferent from '@/public/icon-indifferent.svg'
import iconHappyOff from '@/public/icon-happy-off.svg'
import iconAngryOff from '@/public/icon-angry-off.svg'
import iconLetdownOff from '@/public/icon-letdown-off.svg'
import iconIndifferentOff from '@/public/icon-indifferent-off.svg'
import iconGoUp from '@/public/icon-go-up.svg'
import iconReaction from '@/public/icon-reaction.svg'

const IconMap = {
  logo,
  'icon-share': iconShare,
  'icon-triangle-left': iconTriangleLeft,
  'icon-triangle-right': iconTriangleRight,
  'icon-project-entry': iconProjectEntry,
  'icon-bracket-left': iconBracketLeft,
  'icon-bracket-right': iconBracketRight,
  'icon-happy': iconHappy,
  'icon-angry': iconAngry,
  'icon-letdown': iconLetdown,
  'icon-indifferent': iconIndifferent,
  'icon-happy-off': iconHappyOff,
  'icon-angry-off': iconAngryOff,
  'icon-letdown-off': iconLetdownOff,
  'icon-indifferent-off': iconIndifferentOff,
  'icon-go-up': iconGoUp,
  'icon-reaction': iconReaction,
}

type IconName = keyof typeof IconMap

export default function Icon({
  iconName,
  size,
  className,
}: {
  iconName: IconName
  size: { width: number; height: number }
  className?: string
}) {
  return (
    <Image
      src={IconMap[iconName]}
      width={size.width}
      height={size.height}
      alt={iconName}
      className={className}
    />
  )
}
