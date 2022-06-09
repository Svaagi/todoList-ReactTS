import { FC, useState } from 'react'
import '../styles/TodoList.scss'

interface Todo {
    id: number,
    name: string,
    description: string,
    status: string,
    edit: boolean,
    delete: boolean
}

interface Props {
  todoData: {
    id: number,
    name: string,
    description: string,
    status: string,
    edit: boolean,
    delete: boolean
  }[],
  setTodoData: React.Dispatch<React.SetStateAction<Todo[]>>,
  descTable: boolean
}

 const TodoList: FC<Props> = ({ todoData, setTodoData, descTable }) => {

  const [complete, setComplete] = useState(true)

  const handleComplete = (index: number) => {
    setComplete(!complete)
    if (complete) {
      todoData[index].status = 'completed'
    }
    else {
      todoData[index].status = 'incomplete'
    }
  }

  const handleEditButton = (index: number) => {
    setTodoData((prevTodoData) =>
      prevTodoData.map((todo) => {
        return todo.id === index ? { ...todo, edit: !todo.edit } : todo;
      }),
    );
  };

  const handleEdit = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    setTodoData((prevTodoData) =>
      prevTodoData.map((todo) => {
        return todo.id === index ? { ...todo, name: e.target.value } : todo;
      }),
    );
  }

  const handleDelete = (index: number) => {
    if (todoData[index].status !== 'softdeleted') {
    setTodoData((prevTodoData) =>
      prevTodoData.map((todo) => {
         return todo.id === index ? { ...todo, status: 'softdeleted' } : todo;
      }),
    );
    } else {
      setTodoData((prevTodoData) =>
      prevTodoData.filter((todo) => todo.id !== todoData[index].id),
    );
    }
  }

  const todoTables = todoData.map((todo, index) => (
    <tr key={index}>
      <th className='thCheckbox'>
        <input className='checkbox' type='checkbox' onClick={() => handleComplete(index)}/>
      </th>
      {todo.edit ? <th>{todo.name}</th> : <th><input defaultValue={todo.name} onChange={(e) => handleEdit(e, index)}/></th>}
      {descTable ? <th>{todo.description}</th> : null}
      <th>{todo.status}</th>
      <th>
        <div className='divActions'><button className='edit' onClick={() => handleEditButton(index)}>
          Edit
          </button>
          <button className='delete' onClick={() => handleDelete(index)}>
            Delete
          </button>
        </div>
      </th>
    </tr>
  ))
  return (
    <>
      <table>
        <thead>
          <tr>
            <th className='thCheckbox'><input className='checkbox' type='checkbox'/></th>
            <th>Name</th>
            {descTable ? <th>Description</th> : null}
            <th style={{width: '150px'}}>Status</th>
            <th style={{width: '150px'}}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {todoTables}
        </tbody>
      </table>
    </>
  )
}

export default TodoList
