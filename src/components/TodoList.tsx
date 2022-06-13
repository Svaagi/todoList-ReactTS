import { FC } from 'react'
import '../styles/TodoList.scss'

interface Todo {
    name: string,
    description: string,
    status: string,
    edit: boolean,
    delete: boolean
}

interface Props {
  todoData: {
    name: string,
    description: string,
    status: string,
    edit: boolean,
    delete: boolean
  }[],
  setTodoData: React.Dispatch<React.SetStateAction<Todo[]>>,
  descTable: boolean,
  filterValue: string
}

 const TodoList: FC<Props> = ({ todoData, setTodoData, descTable, filterValue }) => {

/**
 * 
 * @param index index of the todo in the array
 */
  const handleComplete = (index: number) => {
    setTodoData((prevTodoData) =>
      prevTodoData.map((todo, id) => {
        if (todo.status === 'incomplete') {
          return id === index ? { ...todo, status: 'completed' } : todo;
        }
        else {
          return id === index ? { ...todo, status: 'incomplete' } : todo;
        }
      }),
    );
  }

  /**
   * 
   * @param index index of the todo in the array
   */
  const handleEditButton = (index: number) => {
    setTodoData((prevTodoData) =>
      prevTodoData.map((todo, id) => {
        return id === index ? { ...todo, edit: !todo.edit } : todo;
      }),
    );
  };

  /**
   * 
   * @param e event
   * @param index index of the todo in the array
   */
  const handleEdit = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    setTodoData((prevTodoData) =>
      prevTodoData.map((todo, id) => {
        return id === index ? { ...todo, name: e.target.value } : todo;
      }),
    );
  }

  /**
   * 
   * @param e event of the textarea
   * @param index index of the todo in the array
   */
  const handleEditDescription = (e: React.ChangeEvent<HTMLTextAreaElement>, index: number) => {
    setTodoData((prevTodoData) =>
      prevTodoData.map((todo, id) => {
        return id === index ? { ...todo, description: e.target.value } : todo;
      }),
    );
  }

  /**
   * 
   * @param index index of the todo in the array
   */
  const handleDelete = (index: number) => {
    if (todoData[index].status !== 'softdeleted' && todoData[index].status !== 'completed') {
    setTodoData((prevTodoData) =>
      prevTodoData.map((todo, id) => {
         return id === index ? { ...todo, status: 'softdeleted' } : todo;
      }),
    );
    } else {
      setTodoData((prevTodoData) =>
      prevTodoData.filter((todo) => todo !== todoData[index]),
    );
    }
  }

  /**
   * 
   * @param todo todo to be edited
   * @param index index of the todo in the array
   * @returns edit for todo description or todo description
   */
  const descEdit = (todo: Todo, index: number) => {
    if (descTable && todo.edit) {
      return (
        <th style={{padding: 0}}>
          <textarea className='editTextarea' value={todo.description} onChange={(e) => handleEditDescription(e, index)}></textarea>
        </th>
      )
    }
    else if (descTable && todo.edit === false) {
      return (
        <th>{todo.description}</th>
      )
    }
    else {
      return null
    }
  }

  /**
   * @param todo todo to be returned
   * @param index index of the todo in the array
   * @param filterValue value of the filter that checks if the todo matches the filter
   * @returns table of todos
   */
  const todoTables = todoData.map((todo, index) => (filterValue === 'all' || filterValue === todo.status) && (
    <tr key={index}>
      <th className='thCheckbox'>
        <input className='checkbox' type='checkbox' onClick={() => handleComplete(index)}/>
      </th>
      {todo.edit ? <th style={{padding: 0}}><input className='editName' defaultValue={todo.name} onChange={(e) => handleEdit(e, index)}/></th> : <th>{todo.name}</th>}
      {descEdit(todo, index)}
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
