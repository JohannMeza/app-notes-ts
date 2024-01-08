import { useContext } from 'react';
import { CategorieContext } from '../contexts/CategorieContext';
interface CategorieProps<T> { 
  state: object, 
  action: {
    handleRemoveCategorie: (prop: T) => void
    handleEditCategorie: (prop: T) => void
    handleAddCategorie: (prop: T) => void
  }
}
export const useCategorieContext = <T extends object>(): CategorieProps<T> => useContext(CategorieContext);