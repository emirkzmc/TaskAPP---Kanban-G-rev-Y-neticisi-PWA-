import { useState } from 'react'
import { Board } from './components/Board'
import { TaskModal } from './components/TaskModal'
import { Kanban, Plus } from 'lucide-react'
import Header from './components/layout/Header'
function App() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Header setIsModalOpen={setIsModalOpen} />

      <main className="flex-1 overflow-hidden">
        <Board />
      </main>

      <TaskModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  )
}

export default App