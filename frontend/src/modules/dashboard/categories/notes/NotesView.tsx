import { FC, ReactNode, useState } from 'react';
import { Button, IconButton, Stack, Typography } from '@mui/material';
import { ViewComponent } from '../categories-types';
import { Controls } from '@src/shared/components/Controls';
import { ColorsCardEnum, NotesProps } from '../../dashboard-types';
import { NotesMockups } from './notes-mockups';
import { QuillAddNote, QuillEditNote } from '../../component/quill/QuillNote';
import { PopperNote } from '../../component/popper/PopperNote';
import { ButtonColor, ButtonColorClose, ButtonContain, GridNotesContain, ViewContain } from '../../dashboard-styles';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import 'quill/dist/quill.snow.css';

interface NotesViewProps {
  setStateView: (prop: ViewComponent) => void
}

export const NotesView: FC<NotesViewProps> = ({ setStateView }) => {
  const [noteEdit, setNoteEdit] = useState<NotesProps>();  
  const [openColor, setOpenColor] = useState({ state: false, idNote: 0 });  
  const [openAdd, setOpenAdd] = useState(false);

  const handleDblClick = (dataNote: NotesProps): void => setNoteEdit(dataNote);
  const handleEditNote = (dataNote: NotesProps): void => setNoteEdit(dataNote);
  const handleAddNote = (): void => setOpenAdd(true);
  const handleClickBack = (): void => setStateView(ViewComponent.MAIN);

  const handleToggleColor = (idNote: number): void => setOpenColor({ state: !openColor.state, idNote });
  
  const Note = (el: NotesProps): ReactNode => (
    noteEdit?.id === el.id 
      ? <QuillEditNote {...el} /> 
      : <Typography variant='body1' padding="15px">{el.note}</Typography>
  );


  return (
    <ViewContain>
      <Stack flexDirection="row" justifyContent="space-between" alignItems="center">
        <Stack flexDirection="row" gap={2} alignItems="center">
          <Button variant='contained' onClick={handleClickBack}>Back</Button>
          <Typography variant="h2" color="text_light.main">Categorie: Trabajo</Typography>
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
            <QuillAddNote /> 
          </Controls.Card>
        }
        {
          NotesMockups.map((el) => (
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
                <ButtonColor colorcard={ColorsCardEnum.BLUE}></ButtonColor>
                <ButtonColor colorcard={ColorsCardEnum.GREEN}></ButtonColor>
                <ButtonColor colorcard={ColorsCardEnum.ORANGE}></ButtonColor>
                <ButtonColor colorcard={ColorsCardEnum.PURPLE}></ButtonColor>
                <ButtonColor colorcard={ColorsCardEnum.RED}></ButtonColor>
                <ButtonColor colorcard={ColorsCardEnum.YELLOW}></ButtonColor>
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