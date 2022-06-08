import { FC } from 'react'
import '../styles/TodoList.scss'

interface Props {
  todoData: {
    name: string,
    description: string,
    status: string
  }[]
}

 const TodoList: FC<Props> = ({ todoData }) => {
  const todos = todoData.map((todo, index) => (
    <tr key={index}>
      <th>{todo.name}</th>
      <th>{todo.description}</th>
      <th>{todo.status}</th>
    </tr>
  ))
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {todos}
        </tbody>
      </table>
    </>
  )
}

export default TodoList
