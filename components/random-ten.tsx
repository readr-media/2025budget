import NextLink from 'next/link'
import { useState, useEffect } from 'react'
import { db } from '@/utils/firebase/app'
import { BudgetData } from '@/types/budget'
import { useRouter } from 'next/navigation'
import { collection, getDocs } from 'firebase/firestore'
import Icon from './icon'
import { Noto_Sans_TC } from 'next/font/google'

const notoSansTC = Noto_Sans_TC({
  subsets: ['latin'],
})

const iconButtons: {
  name: 'icon-happy' | 'icon-angry' | 'icon-sad' | 'icon-indifferent'
  label: string
}[] = [
  { name: 'icon-happy', label: 'Feeling Happy' },
  { name: 'icon-angry', label: 'Feeling Angry' },
  { name: 'icon-sad', label: 'Feeling Sad' },
  { name: 'icon-indifferent', label: 'Feeling Indifferent' },
]
const randomness = 10

export default function RandomTen() {
  const router = useRouter()
  const [progress, setProgress] = useState(0)
  const [viewData, setViewData] = useState<BudgetData[] | null>(null)

  useEffect(() => {
    const init = async () => {
      try {
        const querySnapshot = await getDocs(
          collection(db, 'project-bucket-2025')
        )
        const data: BudgetData[] = querySnapshot.docs.map((doc) => ({
          ID: doc.data().ID,
          action: doc.data().action,
          category: doc.data().category,
          content: doc.data().content,
          cost: doc.data().cost,
          full_name: doc.data().full_name,
          result: doc.data().result,
          time_place: doc.data().time_place,
          totalReaction: doc.data().totalReaction,
          url: doc.data().url,
          who: doc.data().who,
        }))
        const randomIndexes = getRandomValues(data.length, randomness)
        const randomData = randomIndexes.map((index) => data[index])
        console.log(data)
        setViewData(randomData)
      } catch (err) {
        console.error(err)
      }
    }

    init()
  }, [])

  const handleClickButton = (feeling: (typeof iconButtons)[number]['name']) => {
    console.log(`write ${feeling} into firestore`)
    if (progress === randomness - 1) {
      router.push('#budget-list')
    } else {
      setProgress((prev) => prev + 1)
    }
  }

  return (
    <section id="random-ten" className="h-[calc(100vh-68px)] pt-[68px]">
      <div className="flex flex-col items-center">
        <div className="flex flex-row items-center gap-2 pt-[46px]">
          <Icon iconName="icon-bracket-left" size={{ width: 8, height: 26 }} />
          <p
            className={`${notoSansTC.className} w-[300px] text-center text-base font-medium`}
          >
            這些是目前在立法院預算審議過程中，立委提出的刪減和凍結提案：
          </p>
          <Icon iconName="icon-bracket-right" size={{ width: 8, height: 26 }} />
        </div>
        <div className="pb-[60px] pt-[30px]">
          <ProgressBar progress={progress * 10} />
        </div>
        <div className="mb-12 h-[192px] w-[360px] overflow-y-scroll rounded-lg border border-black px-9 py-3">
          <p className="">{viewData?.[progress].time_place}</p>
          <p>{viewData?.[progress].full_name}</p>
          <p>{viewData?.[progress].who}</p>
          <p>{viewData?.[progress].content}</p>
        </div>
        <div className="flex flex-row gap-2 pb-[72px]">
          {iconButtons.map(({ name, label }) => (
            <button
              key={name}
              className="flex items-center justify-center"
              aria-label={label}
              onClick={() => handleClickButton(name)}
            >
              <Icon iconName={name} size={{ width: 86, height: 54 }} />
            </button>
          ))}
        </div>
        <p className="text-base font-normal">
          想直接看所有提案內容？
          <NextLink
            href={'#budget-list'}
            className="text-custom-blue underline"
          >
            點我跳轉
          </NextLink>
        </p>
      </div>
    </section>
  )
}

const getRandomValues = (arrLength: number, num: number) => {
  const randomIds = new Set<number>()
  while (randomIds.size < num) {
    const randomIndex =
      crypto.getRandomValues(new Uint32Array(1))[0] % arrLength
    randomIds.add(randomIndex)
  }
  return [...randomIds]
}

const ProgressBar = ({ progress }: { progress: number }) => {
  return (
    <div className="h-2.5 w-[174px] border border-black bg-gray-200">
      <div
        className="h-2 bg-custom-blue"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  )
}
