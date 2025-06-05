import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './index.css'

function App() {
  const [count, setCount] = useState(0);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [shownTasks, setShownTasks] = useState<Task[]>([]);
  const [newTitle, setNewTitle] = useState('');

  type Task = {
    id: string;
    title: string;
    category?: string; 
    description?: string;
    currentStatus?: 'todo' | 'in-progress' | 'done';
    createdAt: Date;
    updatedAt?: Date;
    priority?: 'low' | 'medium' | 'high';
    completed: boolean;
  };

  const Button = ({ onClick, children }: { onClick: () => void; children: React.ReactNode }) => (
    <button className='bg-blue-500 text-white px-4 py-2 rounded' onClick={onClick}>
      {children}
    </button>
  );

  const createTask = (
    title: string,
    category ?: string,
    description?: string,
    priority: 'low' | 'medium' | 'high' = 'medium',
  ): Task => {
    const now = new Date();
    return {
    id: crypto.randomUUID(),
    title,
    category,
    description,
    currentStatus: 'todo',
    createdAt: now,
    updatedAt: now,
    priority,
    completed: false,
    };
  };



  const editTask = (id: string, updates: Partial<Task>) => {
    setTasks(
      tasks.map(task => {
        if (task.id == id) {
          return {
            ...task,
            ...updates,
            updatedAt: new Date()
          };
        } else {
          return task;
        }
      })
    )
  };

  const deleteTask = (id: string) => {
    setTasks(
      tasks.filter(task => task.id !== id)
    );
  };


  const handleAddTask = () => {
    if (!newTitle.trim()) return;

    const task = createTask(newTitle);
    setTasks([...tasks, task]);
    setNewTitle('');
  };

  const filterTasks = (status: string) => {
    setShownTasks(
      tasks.filter(task => {
        return task.currentStatus == status;
      })
    );
  };

  const toggleCompletion = (id: string) => {
    setTasks(
      tasks.map(task => {
        if (task.id === id) {
          return {
            ...task, 
            completed: !task.completed,
            updatedAt: new Date()
          }
        } else {
          return task
        }
      })
    )
  };





  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
