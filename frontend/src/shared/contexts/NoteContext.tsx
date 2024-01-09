import axios from 'axios';
import { FC, PropsWithChildren, createContext, useCallback, useMemo, useState } from 'react';
import { APP_TOKEN, APP_URL } from '../constants/EnvConstants';
import { ColorsCardEnum, NotesProps } from '@src/modules/dashboard/dashboard-types';
import { useAuthContext } from '../hooks/useAuthContext';
import { useCategorieContext } from '../hooks/useCategorieContext';

interface NoteProps { 
  state: {
    notes: NotesProps[],
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
export const NoteContext = createContext<NoteProps>({ 
  state: {
    notes: [],
    archivedNotes: []
  }, 
  action: {
    handleRemoveNote: () => {},
    handleEditNote: () => {},
    handleAddNote: async () => [],

    fetchAllNotes: async () => {},
    fetchArchivedNotes: async () => {}
  } 
});

export const NoteContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const { state } = useAuthContext();
  const { action, state: stateCategorie } = useCategorieContext();
  const [notes, setNotes] = useState([]);
  const [archivedNotes, setArchivedNotes] = useState([]);
  
  const fetchAllNotes = async (): Promise<void> => {
    const headers = { 
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `${localStorage.getItem(APP_TOKEN)}`
      } 
    };
    const response = await axios.post(`${APP_URL}/note`, { }, headers);
    const data = response.data.map((el: NotesProps) => ({ ...el, note: JSON.parse(el.note) }));
    setNotes(data);
  };

  const fetchArchivedNotes = async (): Promise<void> => {
    const headers = { 
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `${localStorage.getItem(APP_TOKEN)}`
      } 
    };
    const response = await axios.post(`${APP_URL}/note/archived`, { }, headers);
    const data = response.data.map((el: NotesProps) => ({ ...el, note: JSON.parse(el.note) }));
    setArchivedNotes(data);
  };

  const handleRemoveNote = useCallback(async (prop: NotesProps): Promise<void> => {
    const headers = { 
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `${localStorage.getItem(APP_TOKEN)}`
      } 
    };
    await axios.delete(`${APP_URL}/note/delete/${prop.id}`, headers);
    await fetchAllNotes();
    await fetchArchivedNotes();
    await action.fetchNotes();
  }, [action]);

  const handleEditNote = useCallback(async (prop: NotesProps): Promise<void> => {
    const data = { id: prop.id, archived: prop.archived, color: prop.color, note: JSON.stringify(prop.note) };
    const headers = { 
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `${localStorage.getItem(APP_TOKEN)}`
      } 
    };
    await axios.put(`${APP_URL}/note/update`, data, headers);
    await fetchAllNotes();
    await fetchArchivedNotes();
    await action.fetchNotes();
  }, [action]);
  
  const handleAddNote = useCallback(async (prop: { getContents: () => { ops: [] } }, archived: boolean): Promise<void> => {
    const data = { 
      note: JSON.stringify(prop.getContents().ops), 
      color: ColorsCardEnum.BLUE,
      categorieId: stateCategorie.selectCategory.id,
      userId: state.user.id, 
      archived, 
    };
    const headers = { 
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `${localStorage.getItem(APP_TOKEN)}`
      } 
    };
    await axios.post(`${APP_URL}/note/store`, data, headers);
    await fetchAllNotes();
    await fetchArchivedNotes();
    await action.fetchNotes();
  }, [action, state.user.id, stateCategorie.selectCategory.id]);

  const value = useMemo(() => ({
    state: {
      notes,
      archivedNotes
    },
    action: {
      handleRemoveNote,
      handleEditNote,
      handleAddNote,
      
      fetchAllNotes,
      fetchArchivedNotes
    },
  }), [notes, archivedNotes, handleAddNote, handleEditNote, handleRemoveNote]);
  
  return (
    <NoteContext.Provider value={value}>
      {children}
    </NoteContext.Provider>
  );
};