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
    <button className='bg-blue-500text-gray-100 px-4 py-2 rounded' onClick={onClick}>
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
    {/** background */}
    <div className="bg-[#1B1D3C]/90 min-h-screen flex items-center justify-center font-sans bg-cover bg-center bg-fixed" style={{ backgroundImage: "url('./background.jpg')" }}>

      {/** glass */}
      <div className='glass max-w-6xl w-full mx-4 rounded-2xl shadow-lgtext-gray-100 p-8 space-y-16'>

        <header className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white/80 drop-shadow">Task Travailing Tasker</h1>
          <input type="text" placeholder="Search tasks..." className="bg-white/20text-gray-100 placeholder-white px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/50 w-1/2" />
        </header>

        <div className="flex flex-col md:flex-row gap-4 ">
          <aside className="w-full md:w-1/4 bg-white/10 p-4 rounded-xl">
            <p className="text-lg font-medium">Filters</p>
            <div className="flex flex-col gap-2 mt-2">
              <button onClick={() => filterTasks("todo")} className='bg-white/20 hover:bg-white/30text-gray-100 font-semibold px-5 py-2 rounded-xl transition duration-150 shadow hover:shadow-md text-sm md:text-base whitespace-nowrap'>To Do</button>
              <button onClick={() => filterTasks("in progress")} className='bg-white/20 hover:bg-white/30text-gray-100 font-semibold px-5 py-2 rounded-xl transition duration-150 shadow hover:shadow-md text-sm md:text-base whitespace-nowrap'>In Progress</button>
              <button onClick={() => filterTasks("completed")} className='bg-white/20 hover:bg-white/30text-gray-100 font-semibold px-5 py-2 rounded-xl transition duration-150 shadow hover:shadow-md text-sm md:text-base whitespace-nowrap'>Completed</button>
            </div>
          </aside>

          <main className="flex-1 bg-white/10 p-4 rounded-xl space-y-4">
            <div className="flex gap-2">
              <input type="text" placeholder='New task title...' value={newTitle} onChange={(e) => setNewTitle(e.target.value)} className="flex-1 px-4 py-2 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-white/50"/>
              <button onClick={handleAddTask} className='bg-white/20 hover:bg-white/30text-gray-100 font-semibold px-5 py-2 rounded-xl transition duration-150 shadow hover:shadow-md text-sm md:text-base whitespace-nowrap'>Add</button>
            </div>

            <ul className="space-y-2">
              {tasks.map((task) => (
                <li key={task.id} className={`p-4 rounded-xl flex justify-between items-center bg-white/20 ${task.completed ? 'line-through opacity-60' : ''}`}>
                  <span>{task.title}</span>
                  <div className='flex gap-2'>
                    <button onClick={() => toggleCompletion(task.id)} className="bg-white/20 hover:bg-white/30text-gray-100 font-semibold px-5 py-2 rounded-xl transition duration-150 shadow hover:shadow-md text-sm md:text-base whitespace-nowrap">{task.completed ? 'Undo' : 'Complete'}</button>
                    <button onClick={() => deleteTask(task.id)} className='bg-white/20 hover:bg-white/30text-gray-100 font-semibold px-5 py-2 rounded-xl transition duration-150 shadow hover:shadow-md text-sm md:text-base whitespace-nowrap'>Delete</button>
                  </div>
                </li>
              ))}
            </ul>
          </main>
        </div>
      </div>

      <footer className="fixed bottom-2 right-2 text-xstext-gray-100/70 backdrop-blur-md bg-white/10 px-3 py-1 rounded-xl shadow-sm z-50">
        Photo by <a href="https://unsplash.com/@neom?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">NEOM</a> on <a href="https://unsplash.com/photos/an-aerial-view-of-a-desert-with-rocks-and-sand-Iy59i0M7oP4?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
  
      </footer>

    </div>
    </>
  )
}

export default App
