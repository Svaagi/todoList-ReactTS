import { FC, useState } from 'react'

import '../styles/Todo.scss'

interface Props {
  todo: {
    name: string,
    description: string,
    status: string,
    edit: boolean,
    delete: boolean
  },
  index: number,
  descTable: boolean
}

 const Todo: FC<Props> = ({todo, index, descTable}) => {
  const [object, setObject] = useState(todo)

  console.log(todo)

  const [complete, setComplete] = useState(true)

  const handleComplete = () => {

    setComplete(!complete)
    if (complete) {
      setObject({...object, status: 'completed'})
    }
    else {
      setObject({...object, status: 'incomplete'})
    }
  }

  const handleEdit = (e: any) => {
    
  }

  const handleEditButton = () => {
    setObject({...object, edit: false})
  }

  const handleDelete = () => {
  }

  return (
    <tr key={index}>
      <th className='thCheckbox'>
        <input className='checkbox' type='checkbox' onClick={() => handleComplete()}/>
      </th>
      {todo.edit ? <th>{todo.name}</th> : <th><input defaultValue={todo.name} onClick={(e) => handleEdit(e)}/></th>}
      {descTable ? <th>{todo.description}</th> : null}
      <th>{todo.status}</th>
      <th>
        <div className='divActions'><button className='edit' onClick={() => handleEditButton()}>
          Edit
          </button>
          <button className='delete' onClick={() => handleDelete()}>
            Delete
          </button>
        </div>
      </th>
    </tr>
  )
}


export default Todo