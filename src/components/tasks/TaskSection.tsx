import Task, { TaskItem, TaskProps } from './Task'

export type TaskSectionProps = {
  title: string
  tasks: TaskItem[]
}

export default function TaskSection({ title, tasks }: TaskSectionProps) {
  return (
    <div className="pt-16">
      <h1>{title}</h1>
      <div className="pt-4">
        {tasks.map((task) => (
          <Task key={task.id} task={task} />
        ))}
      </div>
    </div>
  )
}
