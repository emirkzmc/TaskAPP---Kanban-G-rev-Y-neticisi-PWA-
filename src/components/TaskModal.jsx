import { useState } from 'react'
import { X, Plus } from 'lucide-react'
import { DEFAULT_COLUMNS, PRIORITY, PRIORITY_LABELS, COLUMN_IDS } from '../constants/kanban'
import { addCard } from '../services/kanban'
import { Button } from './ui/Button'
export function TaskModal({ isOpen, onClose }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [columnId, setColumnId] = useState(COLUMN_IDS.TODO)
  const [priority, setPriority] = useState(PRIORITY.MEDIUM)
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (!isOpen) return null

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title.trim()) return

    setIsSubmitting(true)
    try {
      await addCard({ title, description, columnId, priority })
      setTitle('')
      setDescription('')
      setColumnId(COLUMN_IDS.TODO)
      setPriority(PRIORITY.MEDIUM)
      onClose()
    } catch (error) {
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm">
      <div className="bg-white w-full max-w-md rounded-xl border border-slate-200 shadow-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-slate-800">Yeni Görev Oluştur</h2>
          <Button onClick={onClose} variant="icon" size="none">
            <X size={20} />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="title" className="text-sm font-medium text-slate-600">Başlık</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-sm"
              placeholder="Görev başlığı"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="description" className="text-sm font-medium text-slate-600">Açıklama (Opsiyonel)</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="3"
              className="bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all resize-none shadow-sm"
              placeholder="Görev detayı..."
            />
          </div>

          <div className="flex gap-4">
            <div className="flex flex-col gap-1.5 flex-1">
              <label htmlFor="status" className="text-sm font-medium text-slate-600">Durum</label>
              <select
                id="status"
                value={columnId}
                onChange={(e) => setColumnId(e.target.value)}
                className="cursor-pointer bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:border-blue-500 transition-all shadow-sm"
              >
                {DEFAULT_COLUMNS.map(col => (
                  <option key={col.id} value={col.id}>{col.title}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1.5 flex-1">
              <label htmlFor="priority" className="text-sm font-medium text-slate-600">Öncelik</label>
              <select
                id="priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="cursor-pointer bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:border-blue-500 transition-all shadow-sm"
              >
                {Object.values(PRIORITY).map(p => (
                  <option key={p} value={p}>{PRIORITY_LABELS[p]}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-4">
            <Button
              type="button"
              onClick={onClose}
              variant="ghost"
              size="md"
            >
              İptal
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              variant="primary"
              size="md"
            >
              {isSubmitting ? (
                'Oluşturuluyor...'
              ) : (
                <>
                  <Plus size={16} /> Görevi Oluştur
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}