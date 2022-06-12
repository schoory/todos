import { FC, KeyboardEvent, MouseEvent, useRef, useState } from "react";
import './TodosCard.scss'
import {ReactComponent as ChevronBottom} from '../../assets/icons/chevron-bottom.svg'
import { Item, EDisplayMode, DisplayMode } from "../../types";
import { TodosItem } from "../TodosItem/TodosItem";

type TodosCardProps = {
  items: Item[],
  itemsChanged: (newItems: Item[]) => void
}

export const TodosCard: FC<TodosCardProps> = ({ items, itemsChanged }) => {

  const [inputValue, setInputValue] = useState('') // значение поля для создания todo
  const [displayMode, setDisplayMode] = useState<DisplayMode>(EDisplayMode.ALL) // текущий режим отображения
  const [isListWrapped, setIsListWrapper] = useState(false) // флаг для сворачивания списка todo

  /**
   * Обработка нажатия кнопок поля ввода
   * При нажатии на Enter добавляется новый todo
   */
  const handleInputKeyDown = ({ key }: KeyboardEvent<HTMLInputElement>): void => {
    if (key === 'Enter' && inputValue.trim()) {
      itemsChanged([ ...items, { id: new Date().getTime(), done: false, name: inputValue } ])
      setInputValue('')
    }
  }

  /**
   * Изменяет значение `done` у todo
   * @param newItem Измененный todo
   */
  const handleItemChanged = (newItem: Item) => {
    const newItems = [ ...items ]
    const item = newItems.find(item => item.id === newItem.id)
    if (item) {
      item.done = newItem.done
      itemsChanged(newItems)
    }
  }

  /**
   * Удаляет todo из списка
   * @param id ID удаленного todo
   */
  const handleItemDeleted = (id: number) => {
    const newItems = [ ...items ]
    newItems.splice(newItems.findIndex(item => item.id === id), 1)
    itemsChanged(newItems)
  }

  /**
   * Отображает список todo в зависимости от текущего `displayMode`
   * @returns Список todo
   */
  const renderItems = (): JSX.Element[] => {
    const renderedItems: JSX.Element[] = []
    switch (displayMode) {
      case EDisplayMode.ALL:
        items.forEach((item, index) => {
          renderedItems.push(
            <TodosItem 
              item={item} 
              itemChanged={handleItemChanged}
              itemDeleted={handleItemDeleted}
              key={index} 
            />
          )
        })
        break;
      case EDisplayMode.ACTIVE: 
        items
          .filter(item => !item.done)
          .forEach((item, index) => {
            renderedItems.push(
              <TodosItem 
                item={item} 
                itemChanged={handleItemChanged}
                itemDeleted={handleItemDeleted}
                key={index} 
              />
            )
          })
        break;
      case EDisplayMode.COMPLETED: 
        items
          .filter(item => item.done)
          .forEach((item, index) => {
            renderedItems.push(
              <TodosItem 
                item={item} 
                itemChanged={handleItemChanged}
                itemDeleted={handleItemDeleted}
                key={index} 
              />
            )
          })
        break;
    }
    return renderedItems
  }

  return (
    <div className="todos-card">
      <div className="todos-card__header">
        <button className="todos-card__wrap" onClick={() => setIsListWrapper(value => !value)}>
          <ChevronBottom style={!isListWrapped ? { transform: 'rotate(180deg)' } : {}} />
        </button>
        <input 
          type="text" 
          className="todos-card__input" 
          placeholder="What needs to be done?" 
          onKeyDown={handleInputKeyDown} 
          value={inputValue}
          onInput={({ target }) => setInputValue((target as HTMLInputElement).value)}
        />
      </div>
      <div 
        className={["todos-card__list", isListWrapped ? "todos-card__list_wrapped" : ''].join(' ')}
      >
        {
          items.length === 0 
            ? <p className="todos-card__empty">Добавьте, что необходимо сделать</p>
            : renderItems()
        }
      </div>
      <div className="todos-card__footer">
        <p className="todos-card__remains">
          {`${items.filter(item => !item.done).length} left`}
        </p>
        <div className="todos-card__controls">
          <button 
            className={["todos-card__control", displayMode === EDisplayMode.ALL ? 'todos-card__control_active' : ''].join(' ')}
            onClick={() => { setDisplayMode(EDisplayMode.ALL) }}
          >All</button>
          <button 
            className={["todos-card__control", displayMode === EDisplayMode.ACTIVE ? 'todos-card__control_active' : ''].join(' ')}
            onClick={() => { setDisplayMode(EDisplayMode.ACTIVE) }}
          >Active</button>
          <button 
            className={["todos-card__control", displayMode === EDisplayMode.COMPLETED ? 'todos-card__control_active' : ''].join(' ')}
            onClick={() => { setDisplayMode(EDisplayMode.COMPLETED) }}
          >Completed</button>
        </div>
        <button 
          className="todos-card__control"
          onClick={() => { itemsChanged(items.filter(item => !item.done)) }}
        >Clear completed</button>
      </div>
    </div>
  )
}