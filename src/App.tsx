import { useEffect, useState } from 'react';
import './App.scss';
import { TodosCard } from './components/TodosCard/TodosCard';
import { Item } from './types';

function App() {

  const [items, setItems] = useState<Item[]>([]) // Список todo

  // получает список todo из локального хранилища при загрузке страницы
  useEffect(() => {
    const items = localStorage.getItem('TODOS_ITEMS') 
    if (items) {
      setItems(JSON.parse(items))
    }
  }, [])

  /**
   * Записывает новый измененный список todo в локальное хранилище
   * @param newItems Новый список todo
   */
  const itemsChanged = (newItems: Item[]) => {
    localStorage.setItem('TODOS_ITEMS', JSON.stringify(newItems))
    setItems(newItems)
  }

  return (
    <main className="app">
      <section className='app__title'>
        todos
      </section>
      <section className='app__wrapper'>
        <TodosCard 
          itemsChanged={itemsChanged}
          items={items} 
        />
      </section>
    </main>
  );
}

export default App;
