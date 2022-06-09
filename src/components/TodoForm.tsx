import { FC, useState } from 'react'
import '../styles/TodoForm.scss'

import TodoList from './TodoList'

import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';


interface Todo {
    id: number,
    name: string,
    description: string,
    status: string
    edit: boolean
    delete: boolean
  }


const TodoForm: FC = () => {
// data
  const filterOptions = [ 'all', 'incomplete', 'completed','softdeleted']

// states
  const [name, setName] = useState('')

  const [desc, setDesc] = useState('')

  const [todoData, setTodoData] = useState<Todo[]>([])

  const [checked, setChecked] = useState(false)

  const [descTable, setDescTable] = useState(false)

// functions
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const handleTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDesc(e.target.value)
  }

  const handleCheck = () => {
    setChecked(!checked)
  }

  console.log(todoData)


  const handleAdd = () => {
    if (name !== '') {
      const newTodo: Todo = {
        id: todoData.length,
        name: name,
        description: desc,
        status: 'incomplete',
        edit: true,
        delete: false
      }
      setDesc('')
      setTodoData([...todoData, newTodo])
      if (desc !== '') {
        setDescTable(true)
      }
      console.log(descTable)
      setName('')
    }
  }

  return (
    <>
      <div style={{paddingTop: '20px'}}>
        <div className='div'>
          <div className='input'>
            <input value={name} placeholder='Add todo' onChange={handleInput}/>
            <button onClick={handleAdd}>Add</button>
            <input className='checkbox' type='checkbox' title={'Add description'} onClick={handleCheck}/>
          </div>
          <Dropdown className='dropdown' options={filterOptions} placeholder="Select an option" />
          <button>Filter</button>
        </div>
        {checked ? <div className='div'>
          <textarea placeholder='Add description' onChange={handleTextArea} value={desc}></textarea>
        </div> : null}
        <div style={{paddingTop: '20px'}}>
          <TodoList todoData={todoData} setTodoData={setTodoData} descTable = {descTable}/>
        </div>
      </div>
    </>
  )
}

export default TodoForm
