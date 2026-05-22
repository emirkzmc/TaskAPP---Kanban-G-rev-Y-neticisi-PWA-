import { PRIORITY } from '../constants/kanban'

/**
 * Yeni bir kart objesi oluşturur
 * @param {string} title
 * @param {string} columnId
 * @returns {import('../types/kanban').Card}
 */
export function createCard(title, columnId) {
  return {
    id: Date.now(),
    title,
    columnId,
    description: '',
    priority: PRIORITY.MEDIUM,
    createdAt: new Date().toISOString(),
  }
}

/**
 * Belirli sütundaki kartları döndürür
 * @param {import('../types/kanban').Card[]} cards
 * @param {string} columnId
 */
export function getCardsByColumn(cards, columnId) {
  return cards.filter(card => card.columnId === columnId)
}

/**
 * Kartı bir sütundan diğerine taşır
 * @param {import('../types/kanban').Card[]} cards
 * @param {number} cardId
 * @param {string} newColumnId
 */
export function moveCard(cards, cardId, newColumnId) {
  return cards.map(card =>
    card.id === cardId ? { ...card, columnId: newColumnId } : card
  )
}