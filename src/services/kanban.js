import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot, query, orderBy } from 'firebase/firestore'
import { db } from '../config/firebase.config'
import { STORAGE_KEYS } from '../constants/kanban'

const getCardsCollection = () => collection(db, STORAGE_KEYS.CARDS)

export const subscribeToCards = (callback) => {
  const q = query(getCardsCollection(), orderBy('createdAt', 'desc'))

  return onSnapshot(q, (snapshot) => {
    const cards = snapshot.docs.map(docItem => ({
      id: docItem.id,
      ...docItem.data()
    }))
    callback(cards)
  })
}

export const addCard = async (cardData) => {
  const docRef = await addDoc(getCardsCollection(), {
    ...cardData,
    createdAt: new Date().toISOString()
  })
  return docRef.id
}

export const updateCardColumn = async (cardId, newColumnId) => {
  const cardRef = doc(db, STORAGE_KEYS.CARDS, cardId)
  await updateDoc(cardRef, {
    columnId: newColumnId
  })
}

export const deleteCard = async (cardId) => {
  const cardRef = doc(db, STORAGE_KEYS.CARDS, cardId)
  await deleteDoc(cardRef)
}

export const updateCardDetails = async (cardId, updates) => {
  const cardRef = doc(db, STORAGE_KEYS.CARDS, cardId)
  await updateDoc(cardRef, updates)
}