import { Suspense } from 'react'
import ClientPage from './_components/client-page'

export default function ProposalPage() {
  return (
    <Suspense>
      <ClientPage />
    </Suspense>
  )
}
