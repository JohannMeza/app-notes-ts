import { useContext } from 'react';
import { CategorieContext } from '../contexts/CategorieContext';
import { CategoriesProps } from '@src/modules/dashboard/categories/main/main-types';
import { NotesProps } from '@src/modules/dashboard/dashboard-types';
interface CategorieProps { 
  state: {
    categories: CategoriesProps[]
    notes: NotesProps[],
    selectCategory: CategoriesProps
  }, 
  action: {
    handleRemoveCategorie: (prop: CategoriesProps) => void
    handleEditCategorie: (prop: CategoriesProps) => void
    handleAddCategorie: (prop: { categorie: string }) => void
    
    fetchCategories: () => Promise<void>
    fetchNotes: () => Promise<void>

    setSelectCategory: (prop: CategoriesProps) => void
  }
}
export const useCategorieContext = (): CategorieProps => useContext(CategorieContext);