import { FC, useState } from "react";
import { Item } from "../../types";
import {ReactComponent as DeleteIcon} from '../../assets/icons/delete.svg'
import './TodosItem.scss'

type TodosItemProps = {
  item: Item,
  itemChanged: (newItem: Item) => void
  itemDeleted: (id: number) => void
}

export const TodosItem: FC<TodosItemProps> = ({ item, itemChanged, itemDeleted }) => {

  const [isDeleteBtnVisible, setIsDeleteBtnVisible] = useState(false) // флаг видимости кнопки удаления

  return (
    <div 
      className="todos-item" 
      onMouseEnter={() => setIsDeleteBtnVisible(true)}
      onMouseLeave={() => setIsDeleteBtnVisible(false)}
    >
      <label className="todos-item__checkbox">
        <input 
          type="checkbox" 
          className="todos-item__checkbox-mark" 
          checked={item.done} 
          onChange={() => { itemChanged({ id: item.id, done: !item.done, name: item.name }) }}
        />
        <span className="todos-item__checkbox-fake" />
        <p className="todos-item__checkbox-name">{item.name}</p>
      </label>
      {
        isDeleteBtnVisible
          ? (
            <button className="todos-item__delete" onClick={() => { itemDeleted(item.id) }}>
              <DeleteIcon />
            </button>
          )
          : null
      }
    </div>
  )
}