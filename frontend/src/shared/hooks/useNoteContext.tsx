import { useContext } from 'react';
import { NoteContext } from '../contexts/NoteContext';
interface NoteProps<T> { 
  state: object, 
  action: {
    handleRemoveNote: (prop: T) => void
    handleArchiveNote: (prop: T) => void
    handleEditNote: (prop: T) => void
    handleAddNote: (prop: { getContents: () => void }) => void
  }
}
export const useNoteContext = <T extends object>(): NoteProps<T> => useContext(NoteContext);