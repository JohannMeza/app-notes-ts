import { FC, ReactNode, useEffect, useState } from 'react';
import { Button, IconButton, Stack, Typography } from '@mui/material';
import { ViewComponent } from '../categories-types';
import { Controls } from '@src/shared/components/Controls';
import { ColorsCardEnum, NotesProps } from '../../dashboard-types';
import { QuillAddNote, QuillEditNote, QuillReadNote } from '../../component/quill/QuillNote';
import { PopperNote } from '../../component/popper/PopperNote';
import { ButtonColor, ButtonColorClose, ButtonContain, GridNotesContain, ViewContain } from '../../dashboard-styles';
import { useCategorieContext } from '@src/shared/hooks/useCategorieContext';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import 'quill/dist/quill.snow.css';
import { useNoteContext } from '@src/shared/hooks/useNoteContext';

interface NotesViewProps {
  setStateView: (prop: ViewComponent) => void
}

export const NotesView: FC<NotesViewProps> = ({ setStateView }) => {
  const { action, state } = useCategorieContext();
  const { action: actionNote } = useNoteContext();
  const [noteEdit, setNoteEdit] = useState<NotesProps>();  
  const [openColor, setOpenColor] = useState({ state: false, idNote: 0 });  
  const [openAdd, setOpenAdd] = useState(false);

  const handleDblClick = (dataNote: NotesProps): void => setNoteEdit(dataNote);
  const handleEditNote = (dataNote: NotesProps): void => setNoteEdit(dataNote);
  const handleAddNote = (): void => setOpenAdd(true);
  const handleClickBack = (): void => {
    setStateView(ViewComponent.MAIN);
    action.setSelectCategory({ id: null, categorie: '' });
  };
  const handleChangeColor = (dataNote: NotesProps): void => {
    actionNote.handleEditNote(dataNote);
    setOpenColor({ state: false, idNote: 0 });
  };

  const handleToggleColor = (idNote: number): void => setOpenColor({ state: !openColor.state, idNote });
  const handleCloseAddNote = (): void => setOpenAdd(false);
  const handleCloseEditNote = (): void => setNoteEdit(undefined);

  const Note = (el: NotesProps): ReactNode => (
    noteEdit?.id === el.id 
      ? <QuillEditNote {...el} handleCloseEditNote={handleCloseEditNote} /> 
      : <QuillReadNote {...el} />
  );

  useEffect(() => {
    action.fetchNotes();
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ViewContain>
      <Stack flexDirection="row" justifyContent="space-between" alignItems="center">
        <Stack flexDirection="row" gap={2} alignItems="center">
          <Button variant='contained' onClick={handleClickBack}>Back</Button>
          <Typography variant="h2" color="text_light.main">Categorie: { state.selectCategory.categorie }</Typography>
        </Stack>
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
              archived={false}
            /> 
          </Controls.Card>
        }
        {
          state.notes.map((el) => (
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
              <PopperNote
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