export type TaskItem = {
  id: string
  name: string
}

export type TaskProps = {
  task: TaskItem
}

export default function Task({ task }: TaskProps) {
  const { id, name } = task
  const taskName = `task-${id}`
  return (
    <div>
      <input type="checkbox" name={taskName} id={taskName} />
      <label htmlFor={taskName}>{name}</label>
    </div>
  )
}
