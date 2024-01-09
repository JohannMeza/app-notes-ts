export enum ColorsCardEnum {
  BLUE = '#3498DB',
  GREEN = '#2ECC71',
  YELLOW = '#F1C40F',
  ORANGE = '#E67E22',
  RED = '#E74C3C',
  PURPLE = '#9B59B6',
}

export interface NotesProps {
  id: number
  archived: boolean
  note: string
  createAt: number
  updateAt: number
  color: ColorsCardEnum
}