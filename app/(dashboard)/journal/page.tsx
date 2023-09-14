import EntryCard from '@/components/EntryCard'
import NewEntryCard from '@/components/NewEntryCard'
import Question from '@/components/Question'
import { analyze } from '@/utils/ai'
import { getUserByClerkID } from '@/utils/auth'
import { prisma } from '@/utils/db'
import Link from 'next/link'

const getEntries = async () => {
  const user = await getUserByClerkID()
  const data = await prisma.journal.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      analysis: true,
    }
  })

  return data
}

const JournalPage = async () => {
  const data = await getEntries()
  return (
    <div className="px-6 py-8 bg-zinc-100/60 h-full">
      <h1 className="text-4xl mb-12">Journals</h1>
      <div className="my-8">
        <Question />
      </div>
      <div className="grid grid-cols-3 gap-4">
        <NewEntryCard />
        {data.map((entry) => (
          <div key={entry.id}>
            <Link href={`/journal/${entry.id}`}>
              <EntryCard entry={entry} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default JournalPage