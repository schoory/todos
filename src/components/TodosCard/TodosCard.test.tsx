import { getByText, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Item } from "../../types"
import { TodosCard } from "./TodosCard"

test('test', () => {
  let items: Item[] = [
    { id: 1, name: 'Test 1', done: false },
    { id: 2, name: 'Test 2', done: true },
    { id: 3, name: 'Test 3', done: false },
  ]
  const handleItemsChanged = (newItems: Item[]) => {
    items = newItems
  }

  // Тестирует рендер TodosCard
  const { container } = render(
    <TodosCard 
      items={items}
      itemsChanged={handleItemsChanged}
    />
  )
  const card = container.querySelector('.todos-card')
  expect(card).toBeInTheDocument()

  // Тестирует рендер TodosItem
  const item1 = screen.getByText('Test 1')
  const item2 = screen.getByText('Test 2')
  const item3 = screen.getByText('Test 3')
  expect(item1).toBeInTheDocument()
  expect(item2).toBeInTheDocument()
  expect(item3).toBeInTheDocument()
  
  // Тестирует добавление нового todo
  const cardInput = container.querySelector('input')
  expect(cardInput).toBeInTheDocument()
  if (cardInput) {
    userEvent.type(cardInput, 'New test{enter}')
    expect(items.length).toBe(4)
  }

  // Тестирует работоспособность фильтров
  const activeFilter = screen.getByText('Active')
  const completeFilter = screen.getByText('Completed')
  userEvent.click(activeFilter)
  expect(() => screen.getByText('Test 2')).toThrow()
  userEvent.click(completeFilter)
  expect(screen.getByText('Test 2')).toBeInTheDocument()
  expect(() => screen.getByText('Test 1')).toThrow()
})