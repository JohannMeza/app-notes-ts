import { FC, PropsWithChildren, createContext, useMemo } from 'react';

interface NoteProps<T> { 
  state: object, 
  action: {
    handleRemoveNote: (prop: T) => void
    handleArchiveNote: (prop: T) => void
    handleEditNote: (prop: T) => void
    handleAddNote: (prop: { getContents: () => void }) => void
  }
}
export const NoteContext = createContext<NoteProps<object>>({ 
  state: {}, 
  action: {
    handleRemoveNote: () => {},
    handleArchiveNote: () => {},
    handleEditNote: () => {},
    handleAddNote: () => {},
  } 
});

export const NoteContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const handleRemoveNote = <T extends object>(prop: T): void => {
    console.log(prop);
  };
  const handleArchiveNote = <T extends object>(prop: T): void => {
    console.log(prop);
  };
  const handleEditNote = <T extends object>(prop: T): void => {
    console.log(prop);
  };
  const handleAddNote = (prop: { getContents: () => void }): void => {
    console.log(prop.getContents());
  };
  
  const value = useMemo(() => ({
    state: [],
    action: {
      handleRemoveNote,
      handleArchiveNote,
      handleEditNote,
      handleAddNote
    },
  }), []);

  return (
    <NoteContext.Provider value={value}>
      {children}
    </NoteContext.Provider>
  );
};