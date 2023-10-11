import { TaskItem } from '@/components/tasks/Task'
import TaskSection from '@/components/tasks/TaskSection'
import { Client, Company, CopilotAPI } from '@/utils/copilotApiUtils'
import Image from 'next/image'

type SearchParams = { [key: string]: string | string[] | undefined }

type TaskData = {
  pending: TaskItem[]
  completed: TaskItem[]
}

const testTaskData: TaskData = {
  pending: [
    {
      id: '103',
      name: 'Connect a custom domain',
    },
  ],
  completed: [
    {
      id: '101',
      name: 'Create a client',
    },
    {
      id: '102',
      name: 'Add a team member',
    },
  ],
}

async function getContent(searchParams: SearchParams) {
  if (!process.env.COPILOT_API_KEY) {
    throw new Error('Missing COPILOT_API_KEY')
  }

  // get tasks from s3.
  // const tasks: TaskItem[] = [];

  const copilotAPI = new CopilotAPI(process.env.COPILOT_API_KEY)
  const result: { client?: Client; company?: Company; tasks: TaskData } = {
    tasks: testTaskData,
  }

  if (searchParams.clientId && typeof searchParams.clientId === 'string') {
    result.client = await copilotAPI.getClient(searchParams.clientId)
  }

  if (searchParams.companyId && typeof searchParams.companyId === 'string') {
    result.company = await copilotAPI.getCompany(searchParams.companyId)
  }

  return result
}

export default async function Page({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const data = await getContent(searchParams)
  const numPendingTasks = data.tasks.pending.length
  return (
    <main className="flex min-h-screen flex-col items-center justify-between px-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <TaskSection
          title={`${numPendingTasks} task${
            numPendingTasks === 1 ? '' : 's'
          } left to complete`}
          tasks={data.tasks.pending}
        />
        <TaskSection title="Completed tasks" tasks={data.tasks.completed} />
      </div>
    </main>
  )
}
