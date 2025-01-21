import NextLink from 'next/link'
import { useState, useEffect } from 'react'
import { db } from '@/utils/firebase/app'
import { BudgetData } from '@/types/budget'
import {
  collection,
  getDocs,
  query,
  where,
  updateDoc,
  increment,
  getCountFromServer,
} from 'firebase/firestore'
import Icon from './icon'
import { Noto_Sans_TC } from 'next/font/google'
import Spinner from './spinner'
import { useUserReactionStore } from '@/lib/store'

const notoSansTC = Noto_Sans_TC({
  subsets: ['latin'],
})

export const iconButtons: {
  name: 'icon-happy' | 'icon-angry' | 'icon-letdown' | 'icon-indifferent'
  reaction: Reaction
  label: string
}[] = [
  { name: 'icon-happy', reaction: 'happy', label: 'Feeling Happy' },
  { name: 'icon-angry', reaction: 'angry', label: 'Feeling Angry' },
  { name: 'icon-letdown', reaction: 'letdown', label: 'Feeling Letdown' },
  {
    name: 'icon-indifferent',
    reaction: 'indifferent',
    label: 'Feeling Indifferent',
  },
]

export type Reaction = keyof typeof defaultReaction
export const defaultReaction = {
  happy: 0,
  angry: 0,
  letdown: 0,
  indifferent: 0,
}

const randomness = 10

export default function RandomTen() {
  const [progress, setProgress] = useState(0)
  const [viewData, setViewData] = useState<BudgetData[] | null>(null)
  const { setReaction } = useUserReactionStore()

  useEffect(() => {
    const init = async () => {
      try {
        const budgetCol = collection(db, 'project-bucket-2025')
        const snapshot = await getCountFromServer(budgetCol)
        const totalCount = snapshot.data().count
        const randomIndexes = getRandomValues(totalCount, randomness)
        const q = query(
          collection(db, 'project-bucket-2025'),
          where('ID', 'in', randomIndexes)
        )
        const querySnapshot = await getDocs(q)
        const data = querySnapshot.docs.map((doc) => doc.data()) as BudgetData[]

        setViewData(data)
      } catch (err) {
        console.error(err)
      }
    }

    init()
  }, [])

  const handleClickButton = async (reaction: Reaction, id: number) => {
    if (progress < randomness) {
      setReaction(id, reaction)
      await handleUserReaction(reaction, id)
      setProgress((prev) => prev + 1)
    }
  }

  return (
    <>
      <section id="random-ten" className="h-svh pt-[69px] lg:pt-[102px]">
        <div className="flex flex-col items-center">
          <div className="flex flex-row items-center gap-2 pt-5 lg:pt-[100px]">
            <Icon
              iconName="icon-bracket-left"
              size={{ width: 8, height: 26 }}
            />
            <p
              className={`${notoSansTC.className} w-[300px] text-center text-base font-medium`}
            >
              這些是目前在立法院預算審議過程中，立委提出的刪減和凍結提案：
            </p>
            <Icon
              iconName="icon-bracket-right"
              size={{ width: 8, height: 26 }}
            />
          </div>
          <div className="pb-[60px] pt-[30px]">
            <ProgressBar progress={progress * 10} />
          </div>
          {progress === randomness ? (
            <>
              <div className="mb-12 flex h-[192px] w-[360px] flex-col items-center justify-center">
                <p className="text-lg text-text-gray">感謝你表示意見！</p>
                <p className="text-lg text-text-gray">
                  來看大家都關心什麼預算提案
                </p>
              </div>
              <div className="flex flex-row gap-2 pb-6">
                <NextLink href={'#budget-list'}>
                  <Icon
                    iconName="icon-project-entry"
                    size={{ width: 148, height: 94 }}
                  />
                </NextLink>
              </div>
            </>
          ) : (
            <>
              {viewData?.[progress] ? (
                <>
                  <div className="mb-4 flex h-[192px] w-[360px] flex-col items-center overflow-y-scroll rounded-lg border border-black px-9 py-3">
                    <p className="pb-[10px] text-base font-bold">
                      {viewData[progress].time_place}，
                      {viewData[progress].result}
                    </p>
                    <p className="pb-1 text-base font-medium">
                      部會：{viewData[progress].full_name}
                    </p>
                    <p className="pb-5 text-sm font-normal">
                      提案連署人：{viewData[progress].who}
                    </p>
                    <p className="whitespace-pre-line text-base font-normal">
                      {viewData[progress].content}
                    </p>
                  </div>
                  <div className="flex w-[200px] flex-wrap gap-2 pb-6">
                    {iconButtons.map(({ name, reaction, label }) => (
                      <button
                        key={name}
                        className="flex items-center justify-center"
                        aria-label={label}
                        onClick={() =>
                          handleClickButton(reaction, viewData[progress].ID)
                        }
                      >
                        <Icon
                          iconName={name}
                          size={{ width: 96, height: 60 }}
                        />
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                <div className="flex h-[366px] items-center justify-center">
                  <Spinner />
                </div>
              )}
            </>
          )}
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
    </>
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

export const handleUserReaction = async (
  userReaction: Reaction,
  docId: number
) => {
  const q = query(
    collection(db, 'project-bucket-2025'),
    where('ID', '==', docId)
  )
  const querySnapshot = await getDocs(q)
  querySnapshot.forEach(async (docSnapshot) => {
    await updateDoc(docSnapshot.ref, {
      [`reaction.${userReaction}`]: increment(1),
      totalReaction: increment(1),
    })
  })
}
