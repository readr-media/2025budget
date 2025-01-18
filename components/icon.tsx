import Image from 'next/image'
export type IconName =
  | 'logo'
  | 'icon-share'
  | 'icon-triangle-left'
  | 'icon-triangle-right'
  | 'icon-project-entry'
  | 'icon-bracket-left'
  | 'icon-bracket-right'
  | 'icon-happy'
  | 'icon-angry'
  | 'icon-sad'
  | 'icon-indifferent'

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
      src={`/${iconName}.svg`}
      width={size.width}
      height={size.height}
      alt={iconName}
      className={className}
    />
  )
}
