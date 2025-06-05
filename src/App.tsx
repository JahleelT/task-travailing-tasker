import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './index.css'

function App() {
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
      <div className="min-h-screen flex flex-col">
        <header className="flex items-center justify-between p-8 border-b bg-spindle-300">
          <div className="logo">Task Travailing Tasker</div>
          <div className="flex-none w-1/2 px-4">
            {/* Search bar will be placed here */} Searchingggg!!!
          </div>

          <div className="w-12"></div>

          
        </header>
        
        <div className="flex flex-1">
          <aside className="w-64 bg-gray-100 p-4 border-r">
            {/* Sidebar goes here */} Sidebar
          </aside>

          {tasks.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 mb-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          ) : (
            <main className="flex-1 p-6 overflow-auto bg-white">
              Here goes the main section
            </main>
          )
        }
          
        </div>

        


        <footer></footer>

      </div>
    </>
  )
}

export default App
