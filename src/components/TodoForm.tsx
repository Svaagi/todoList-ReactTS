import { FC, useState } from 'react'
import '../styles/TodoForm.scss'

import TodoList from './TodoList'

import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';


interface Todo{
    name: string,
    description: string,
    status: string
  }


const TodoForm: FC = () => {
// data
  const filterOptions = [ 'all', 'incomplete', 'completed','softdeleted']

// states
  const [name, setName] = useState('')

  const [todoData, setTodoData] = useState<Todo[]>([])

// functions
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const handleAdd = () => {
    if (name !== '') {
      const newTodo: Todo = {
        name: name,
        description: '',
        status: 'incomplete'
      }
      setTodoData([...todoData, newTodo])
      setName('')
    }
  }

  return (
    <>
      <div style={{paddingTop: '20px'}}>
        <div className='div'>
          <input value={name} placeholder='Add todo' onChange={handleInput}/>
          <button onClick={handleAdd}>Add</button>
          <Dropdown className='dropdown' options={filterOptions} placeholder="Select an option" />
          <button>Filter</button>
        </div>
        <div style={{paddingTop: '20px'}}>
          <TodoList todoData={todoData}/>
        </div>
      </div>
    </>
  )
}

export default TodoForm
