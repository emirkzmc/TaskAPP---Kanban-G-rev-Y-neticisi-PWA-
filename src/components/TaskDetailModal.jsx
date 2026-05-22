import { useState, useEffect } from 'react'
import { X, Trash2, Save } from 'lucide-react'
import { PRIORITY, PRIORITY_LABELS } from '../constants/kanban'
import { updateCardDetails, deleteCard } from '../services/kanban'
import { Button } from './ui/Button'

export function TaskDetailModal({ card, onClose }) {
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState(PRIORITY.MEDIUM)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    if (card) {
      setDescription(card.description || '')
      setPriority(card.priority || PRIORITY.MEDIUM)
    }
  }, [card])

  if (!card) return null

  const handleSave = async () => {
    setIsSaving(true)
    try {
      await updateCardDetails(card.id, {
        description,
        priority
      })
      onClose()
    } catch (error) {
      console.error("Güncelleme hatası:", error)
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async () => {
    const isConfirmed = window.confirm("Bu görevi silmek istediğinize emin misiniz?")
    if (isConfirmed) {
      try {
        await deleteCard(card.id)
        onClose()
      } catch (error) {
        console.error("Silme hatası:", error)
      }
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm">
      <div className="bg-white w-full max-w-lg rounded-xl border border-slate-200 shadow-xl p-6 relative">
        <Button 
          onClick={onClose} 
          variant="icon"
          size="none"
          className="absolute top-4 right-4"
        >
          <X size={20} />
        </Button>

        <div className="mb-6 pr-8">
          <h2 className="text-xl font-semibold text-slate-800">{card.title}</h2>
          <p className="text-xs text-slate-500 mt-2">
            Oluşturulma: {new Date(card.createdAt).toLocaleDateString('tr-TR')}
          </p>
        </div>

        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-600">Açıklama</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
              className="bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all resize-none shadow-sm"
              placeholder="Görev hakkında daha fazla detay ekleyin..."
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-600">Öncelik</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="cursor-pointer bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:border-blue-500 transition-all w-1/2 shadow-sm"
            >
              {Object.values(PRIORITY).map(p => (
                <option key={p} value={p}>{PRIORITY_LABELS[p]}</option>
              ))}
            </select>
          </div>

          <div className="flex justify-between items-center mt-4 pt-4 border-t border-slate-100">
            <Button
              onClick={handleDelete}
              variant="danger"
              size="sm"
            >
              <Trash2 size={16} />
              Görevi Sil
            </Button>
            
            <div className="flex gap-3">
              <Button
                onClick={onClose}
                variant="ghost"
                size="md"
              >
                İptal
              </Button>
              <Button
                onClick={handleSave}
                disabled={isSaving}
                variant="primary"
                size="md"
              >
                {isSaving ? (
                  'Kaydediliyor...'
                ) : (
                  <>
                    <Save size={16} /> Değişiklikleri Kaydet
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}