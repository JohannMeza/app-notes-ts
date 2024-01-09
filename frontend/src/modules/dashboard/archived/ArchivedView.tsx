import { IconButton, Stack, Typography } from '@mui/material';
import { Controls } from '@src/shared/components/Controls';
import { FC, PropsWithChildren, ReactNode, useEffect, useState } from 'react';
import { ColorsCardEnum, NotesProps } from '../dashboard-types';
import { PopperArchivedNote } from '../component/popper/PopperNote';
import { QuillAddNote, QuillEditNote, QuillReadNote } from '../component/quill/QuillNote';
import { ButtonColor, ButtonColorClose, ButtonContain, GridNotesContain, ViewContain } from '../dashboard-styles';
import { useNoteContext } from '@src/shared/hooks/useNoteContext';
import { useCategorieContext } from '@src/shared/hooks/useCategorieContext';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import 'quill/dist/quill.snow.css';

export const ArchivedView: FC<PropsWithChildren> = () => {
  const { state, action } = useNoteContext();
  const { action: actionCategorie } = useCategorieContext();
  const [noteEdit, setNoteEdit] = useState<NotesProps>();  
  const [openColor, setOpenColor] = useState({ state: false, idNote: 0 });  
  const [openAdd, setOpenAdd] = useState(false);

  const handleDblClick = (dataNote: NotesProps): void => setNoteEdit(dataNote);
  const handleEditNote = (dataNote: NotesProps): void => setNoteEdit(dataNote);
  const handleChangeColor = (dataNote: NotesProps): void => {
    action.handleEditNote(dataNote);
    setOpenColor({ state: false, idNote: 0 });
  };
  const handleAddNote = (): void => setOpenAdd(true);

  const handleToggleColor = (idNote: number): void => setOpenColor({ state: !openColor.state, idNote });
  const handleCloseAddNote = (): void => setOpenAdd(false);
  const handleCloseEditNote = (): void => setNoteEdit(undefined);
  
  const Note = (el: NotesProps): ReactNode => (
    noteEdit?.id === el.id 
      ? <QuillEditNote {...el} handleCloseEditNote={handleCloseEditNote} /> 
      : <QuillReadNote {...el} />
  );

  useEffect(() => {
    action.fetchArchivedNotes();
    actionCategorie.setSelectCategory({ categorie: '', id: 0 });
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ViewContain>
    <Stack flexDirection="row" justifyContent="space-between" alignItems="center">
      <Typography variant="h2" color="text_light.main">Archived</Typography>
      <IconButton color='primary' onClick={handleAddNote}>
        <AddIcon />
      </IconButton>
    </Stack>
    <GridNotesContain>
      {
        openAdd && 
        <Controls.Card 
          color={ColorsCardEnum.BLUE} 
          onDoubleClick={() => {}}
        >
          <QuillAddNote 
            handleCloseAddNote={handleCloseAddNote} 
            archived={true}
          /> 
        </Controls.Card>
      }
      {
        state.archivedNotes.map((el) => (
          <Controls.Card 
            color={el.color} 
            key={el.id}
            onDoubleClick={() => handleDblClick(el)}
          >
            <ButtonContain
              onDoubleClick={(e) => e.stopPropagation()}
              opencolor={openColor.state && openColor.idNote === el.id}>
              <ButtonColorClose onClick={() => handleToggleColor(0)}>
                <CloseIcon sx={{ color: '#fff' }} />
              </ButtonColorClose>
              <ButtonColor 
                onClick={() => handleChangeColor({ ...el, color: ColorsCardEnum.BLUE })} 
                colorcard={ColorsCardEnum.BLUE}
              ></ButtonColor>
              <ButtonColor 
                onClick={() => handleChangeColor({ ...el, color: ColorsCardEnum.GREEN })} 
                colorcard={ColorsCardEnum.GREEN}
              ></ButtonColor>
              <ButtonColor 
                onClick={() => handleChangeColor({ ...el, color: ColorsCardEnum.ORANGE })} 
                colorcard={ColorsCardEnum.ORANGE}
              ></ButtonColor>
              <ButtonColor 
                onClick={() => handleChangeColor({ ...el, color: ColorsCardEnum.PURPLE })} 
                colorcard={ColorsCardEnum.PURPLE}
              ></ButtonColor>
              <ButtonColor 
                onClick={() => handleChangeColor({ ...el, color: ColorsCardEnum.RED })} 
                colorcard={ColorsCardEnum.RED}
              ></ButtonColor>
              <ButtonColor 
                onClick={() => handleChangeColor({ ...el, color: ColorsCardEnum.YELLOW })} 
                colorcard={ColorsCardEnum.YELLOW}
              ></ButtonColor>
            </ButtonContain>
            <PopperArchivedNote 
              handleToggleColor={handleToggleColor}
              handleEditNote={handleEditNote} 
              {...el} 
            />
            <Note {...el} />
          </Controls.Card>
        ))
      }
    </GridNotesContain>
  </ViewContain>
  );
};