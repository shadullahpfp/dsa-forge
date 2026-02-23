// Difficulty symbols for DSA FORGE
// ● = Beginner (EASY)
// ▲ = Intermediate (MEDIUM)
// ■ = Advanced (HARD)

export type Difficulty = 'EASY' | 'MEDIUM' | 'HARD'

export const difficultySymbols: Record<Difficulty, string> = {
  EASY: '●',
  MEDIUM: '▲',
  HARD: '■',
}

export const difficultyLabels: Record<Difficulty, string> = {
  EASY: 'Beginner',
  MEDIUM: 'Intermediate',
  HARD: 'Advanced',
}

export function getDifficultySymbol(difficulty: Difficulty | string): string {
  return difficultySymbols[difficulty as Difficulty] || '●'
}

export function getDifficultyLabel(difficulty: Difficulty | string): string {
  return difficultyLabels[difficulty as Difficulty] || 'Beginner'
}

export function getDifficultyColor(difficulty: Difficulty | string): string {
  switch (difficulty) {
    case 'EASY':
      return 'text-green-600 dark:text-green-400'
    case 'MEDIUM':
      return 'text-yellow-600 dark:text-yellow-400'
    case 'HARD':
      return 'text-red-600 dark:text-red-400'
    default:
      return 'text-green-600 dark:text-green-400'
  }
}

export function getDifficultyBgColor(difficulty: Difficulty | string): string {
  switch (difficulty) {
    case 'EASY':
      return 'bg-green-500/10 border-green-500/20'
    case 'MEDIUM':
      return 'bg-yellow-500/10 border-yellow-500/20'
    case 'HARD':
      return 'bg-red-500/10 border-red-500/20'
    default:
      return 'bg-green-500/10 border-green-500/20'
  }
}
