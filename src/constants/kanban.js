export const COLUMN_IDS = {
  TODO:        'todo',
  IN_PROGRESS: 'inprogress',
  DONE:        'done',
}

export const DEFAULT_COLUMNS = [
  { id: COLUMN_IDS.TODO,        title: 'Yapılacak' },
  { id: COLUMN_IDS.IN_PROGRESS, title: 'Devam Ediyor' },
  { id: COLUMN_IDS.DONE,        title: 'Tamamlandı' },
]

export const PRIORITY = {
  HIGH:   'high',
  MEDIUM: 'medium',
  LOW:    'low',
}

export const PRIORITY_LABELS = {
  [PRIORITY.HIGH]:   'Yüksek',
  [PRIORITY.MEDIUM]: 'Orta',
  [PRIORITY.LOW]:    'Düşük',
}

export const STORAGE_KEYS = {
  CARDS:   'kanban_cards',
  COLUMNS: 'kanban_columns',
}