import { useContext } from 'react';
import { NoteContext } from '../contexts/NoteContext';
import { NotesProps } from '@src/modules/dashboard/dashboard-types';
interface NoteProps { 
  state: {
    notes: NotesProps[]
    archivedNotes: NotesProps[]
  }, 
  action: {
    handleRemoveNote: (prop: NotesProps) => void
    handleEditNote: (prop: NotesProps) => void
    handleAddNote: (prop: { getContents: () => { ops: [] } }, archived: boolean) => void

    fetchAllNotes: () => Promise<void>
    fetchArchivedNotes: () => Promise<void>
  }
}
export const useNoteContext = (): NoteProps => useContext(NoteContext);