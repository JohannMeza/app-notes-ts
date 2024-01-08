import { FC, PropsWithChildren, createContext, useMemo } from 'react';

interface NoteProps<T> { 
  state: object, 
  action: {
    handleRemoveCategorie: (prop: T) => void
    handleEditCategorie: (prop: T) => void
    handleAddCategorie: (prop: T) => void

  }
}
export const CategorieContext = createContext<NoteProps<object>>({ 
  state: {}, 
  action: {
    handleRemoveCategorie: () => {},
    handleEditCategorie: () => {},
    handleAddCategorie: () => {},
  } 
});

export const CategorieContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const handleRemoveCategorie = <T extends object>(prop: T): void => console.log(prop);
  const handleEditCategorie = <T extends object>(prop: T): void => console.log(prop);
  const handleAddCategorie = <T extends object>(prop: T): void => console.log(prop);

  
  const value = useMemo(() => ({
    state: [],
    action: {
      handleRemoveCategorie,
      handleEditCategorie,
      handleAddCategorie,
    },
  }), []);

  return (
    <CategorieContext.Provider value={value}>
      {children}
    </CategorieContext.Provider>
  );
};