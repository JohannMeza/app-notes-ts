import { FC, PropsWithChildren, createContext, useCallback, useMemo, useState } from 'react';
import { APP_TOKEN, APP_URL } from '../constants/EnvConstants';
import { CategoriesProps } from '@src/modules/dashboard/categories/main/main-types';
import { useAuthContext } from '../hooks/useAuthContext';
import { NotesProps } from '@src/modules/dashboard/dashboard-types';
import axios from 'axios';

interface CategorieProps { 
  state: {
    categories: CategoriesProps[]
    notes: NotesProps[]
    selectCategory: CategoriesProps
  }, 
  action: {
    handleRemoveCategorie: (prop: CategoriesProps) => void
    handleEditCategorie: (prop: CategoriesProps) => void
    handleAddCategorie: (prop: { categorie: string }) => void
    
    fetchCategories: () => Promise<void>
    fetchNotes: (categorieId?: number) => Promise<void>

    setSelectCategory: (prop: CategoriesProps) => void
  }
}

export const CategorieContext = createContext<CategorieProps>({ 
  state: {
    categories: [],
    notes: [],
    selectCategory: { id: null, categorie: '' }
  }, 
  action: {
    handleRemoveCategorie: () => {},
    handleEditCategorie: () => {},
    handleAddCategorie: () => {},

    fetchCategories: async () => {},
    fetchNotes: async () => {},

    setSelectCategory: () => {}
  } 
});

export const CategorieContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const { state } = useAuthContext();
  const [categories, setCategories] = useState([]);
  const [notes, setNotes] = useState([]);
  const [selectCategory, setSelectCategory] = useState<CategoriesProps>({ id: null, categorie: '' });

  const fetchCategories = async (): Promise<void> => {
    const headers = { 
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `${localStorage.getItem(APP_TOKEN)}`
      } 
    };
    const response = await axios.post(`${APP_URL}/categorie`, { },headers);
    setCategories(response.data);
  };

  const fetchNotes = useCallback(async (): Promise<void> => {
    const data = { categorieId: selectCategory.id };
    const headers = { 
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `${localStorage.getItem(APP_TOKEN)}`
      } 
    };
    const response = await axios.post(`${APP_URL}/categorie/indexNotes`, data, headers);
    const notesCategories = response.data.map((el: NotesProps) => ({ ...el, note: JSON.parse(el.note) }));
    setNotes(notesCategories);
  }, [selectCategory.id]);

  const handleRemoveCategorie = useCallback(async(prop: CategoriesProps): Promise<void> => {
    const headers = { 
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `${localStorage.getItem(APP_TOKEN)}`
      } 
    };
    await axios.delete(`${APP_URL}/categorie/delete/${prop.id}`, headers);
    await fetchCategories();
  }, []);
  const handleEditCategorie = useCallback(async (prop: CategoriesProps): Promise<void> => {
    const data = { id: prop.id, categorie: prop.categorie };
    const headers = { 
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `${localStorage.getItem(APP_TOKEN)}`
      } 
    };
    await axios.put(`${APP_URL}/categorie/update`, data, headers);
    await fetchCategories();
  }, []);
  const handleAddCategorie = useCallback(async (prop: { categorie: string }): Promise<void> => {
    const { categorie } = prop;
    const headers = { 
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `${localStorage.getItem(APP_TOKEN)}`
      } 
    };
    await axios.post(`${APP_URL}/categorie/store`, { categorie, userId: state.user.id }, headers);
    await fetchCategories();
  }, [state.user.id]);

  const value = useMemo(() => ({
    state: {
      categories,
      notes,
      selectCategory
    },
    action: {
      handleRemoveCategorie,
      handleEditCategorie,
      handleAddCategorie,

      fetchCategories,
      fetchNotes,

      setSelectCategory
    },
  }), [categories, fetchNotes, handleAddCategorie, handleEditCategorie, handleRemoveCategorie, notes, selectCategory]);

  return (
    <CategorieContext.Provider value={value}>
      {children}
    </CategorieContext.Provider>
  );
};