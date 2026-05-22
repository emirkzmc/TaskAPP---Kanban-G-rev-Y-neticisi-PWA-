import { useState, useEffect } from 'react'
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { TaskDetailModal } from './TaskDetailModal'
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import { Column } from './Column'
import { Card } from './Card'
import { DEFAULT_COLUMNS } from '../constants/kanban'
import { getCardsByColumn } from '../utils/kanban'
import { subscribeToCards, updateCardColumn } from '../services/kanban'

export function Board() {
  const [cards, setCards] = useState([])
  const [activeCard, setActiveCard] = useState(null)
  const [selectedCard, setSelectedCard] = useState(null)

  useEffect(() => {
    const unsubscribe = subscribeToCards((fetchedCards) => {
      setCards(fetchedCards)
    })

    return () => unsubscribe()
  }, [])

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragStart = (event) => {
    const { active } = event
    if (active.data.current?.type === 'Card') {
      setActiveCard(active.data.current.card)
    }
  }

  const handleDragOver = (event) => {
    const { active, over } = event
    if (!over) return

    const activeId = active.id
    const overId = over.id

    if (activeId === overId) return

    const isActiveCard = active.data.current?.type === 'Card'
    const isOverCard = over.data.current?.type === 'Card'
    const isOverColumn = over.data.current?.type === 'Column'

    if (!isActiveCard) return

    if (isActiveCard && isOverCard) {
      setCards((prevCards) => {
        const activeIndex = prevCards.findIndex((card) => card.id === activeId)
        const overIndex = prevCards.findIndex((card) => card.id === overId)

        if (prevCards[activeIndex].columnId !== prevCards[overIndex].columnId) {
          const newCards = [...prevCards]
          newCards[activeIndex].columnId = prevCards[overIndex].columnId
          return arrayMove(newCards, activeIndex, overIndex)
        }

        return arrayMove(prevCards, activeIndex, overIndex)
      })
    }

    if (isActiveCard && isOverColumn) {
      setCards((prevCards) => {
        const activeIndex = prevCards.findIndex((card) => card.id === activeId)
        const newCards = [...prevCards]
        newCards[activeIndex].columnId = overId
        return arrayMove(newCards, activeIndex, activeIndex)
      })
    }
  }

  const handleDragEnd = async (event) => {
    setActiveCard(null)
    const { active, over } = event
    if (!over) return

    const activeId = active.id
    
    const draggedCard = cards.find((card) => card.id === activeId)
    
    if (draggedCard) {
      try {
        await updateCardColumn(draggedCard.id, draggedCard.columnId)
      } catch (error) {
        console.error("Kart sütunu güncellenirken hata oluştu:", error)
      }
    }
  }

  return (
    <>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className="flex h-full w-full gap-6 p-8 overflow-x-auto bg-slate-50 text-slate-900">
          {DEFAULT_COLUMNS.map((column) => (
            <Column
              key={column.id}
              column={column}
              cards={getCardsByColumn(cards, column.id)}
              onCardClick={(card) => setSelectedCard(card)} 
            />
          ))}
        </div>
        
        <DragOverlay>
          {activeCard ? <Card card={activeCard} /> : null}
        </DragOverlay>
      </DndContext>

      <TaskDetailModal 
        card={selectedCard} 
        onClose={() => setSelectedCard(null)} 
      />
    </>
  )
}