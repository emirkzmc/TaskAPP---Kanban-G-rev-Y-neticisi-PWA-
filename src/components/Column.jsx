import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { useDroppable } from '@dnd-kit/core'
import { Card } from './Card'

export function Column({ column, cards, onCardClick }) {
  const { setNodeRef } = useDroppable({
    id: column.id,
    data: {
      type: 'Column',
      column,
    },
  })

  return (
    <div className="flex flex-col bg-slate-100/50 w-80 rounded-xl border border-slate-200 shrink-0">
      <div className="p-4 flex items-center justify-between border-b border-slate-200">
        <h3 className="text-sm font-semibold text-slate-700">{column.title}</h3>
        <span className="bg-slate-200 text-slate-600 text-xs px-2 py-1 rounded-full font-medium">
          {cards.length}
        </span>
      </div>

      <div
        ref={setNodeRef}
        className="p-3 flex-1 overflow-y-auto min-h-50"
      >
        <SortableContext
          items={cards.map((card) => card.id)}
          strategy={verticalListSortingStrategy}
        >
          {cards.map((card) => (
            <Card key={card.id} card={card} onClick={onCardClick} />
          ))}
        </SortableContext>
      </div>
    </div>
  )
}