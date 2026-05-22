import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { AlignLeft } from 'lucide-react'
import { PRIORITY, PRIORITY_LABELS } from '../constants/kanban'

export function Card({ card, onClick }) {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: card.id,
    data: {
      type: 'Card',
      card,
    },
  })

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  }

  const priorityStyles = {
    [PRIORITY.HIGH]: 'bg-red-50 text-red-700 border-red-200',
    [PRIORITY.MEDIUM]: 'bg-amber-50 text-amber-700 border-amber-200',
    [PRIORITY.LOW]: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={() => onClick && onClick(card)}
      className={`p-4 mb-3 rounded-lg bg-white border border-slate-200 shadow-sm cursor-grab active:cursor-grabbing hover:border-slate-300 transition-colors ${
        isDragging ? 'opacity-50 ring-2 ring-blue-500 shadow-md' : ''
      }`}
    >
      <h4 className="text-sm font-medium text-slate-800 mb-3">{card.title}</h4>
      <div className="flex items-center justify-between">
        <span
          className={`text-xs px-2.5 py-1 rounded-md border ${
            priorityStyles[card.priority]
          }`}
        >
          {PRIORITY_LABELS[card.priority]}
        </span>
        {card.description && (
           <span className="text-slate-400 flex items-center" title="Bu görevin açıklaması var">
             <AlignLeft size={16} />
           </span>
        )}
      </div>
    </div>
  )
}