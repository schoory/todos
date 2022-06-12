import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Item } from "../../types"
import { TodosItem } from "./TodosItem"

test('Renders TODO item, change & delete item', () => {
  
  let item = { id: 1, done: false, name: 'Test' }
  let deleted = false
  const handleItemChanged = (newItem: Item) => {
    item = newItem
  }
  const handleDeleteItem = (id: number) => {
    if (item.id === id) {
      deleted = true
    }
  }

  const { container } = render(<TodosItem item={item} itemChanged={handleItemChanged} itemDeleted={handleDeleteItem} />)
  const renderedItem = screen.getByText(/Test/i)
  // Тестирует рендер
  expect(renderedItem).toBeInTheDocument()
  // Тестирует изменение значения todo на true
  userEvent.click(renderedItem)
  expect(item.done).toBe(true)
  // Тестирует отображение кнопки удаления при наведении на todo
  userEvent.hover(renderedItem)
  const deleteBtn = container.querySelector('svg')
  expect(deleteBtn).toBeInTheDocument() 
  // Ожидает удаления todo
  userEvent.click(deleteBtn as Element)
  expect(deleted).toBe(true)
})