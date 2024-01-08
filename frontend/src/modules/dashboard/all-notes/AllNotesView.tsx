import { IconButton, Stack, Typography } from '@mui/material';
import { Controls } from '@src/shared/components/Controls';
import { FC, PropsWithChildren, ReactNode, useState } from 'react';
import { allNotesMockups } from './all-notes-mockups';
import { ColorsCardEnum, NotesProps } from '../dashboard-types';
import { PopperNote } from '../component/popper/PopperNote';
import { QuillAddNote, QuillEditNote } from '../component/quill/QuillNote';
import { ButtonColor, ButtonColorClose, ButtonContain, GridNotesContain, ViewContain } from '../dashboard-styles';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import 'quill/dist/quill.snow.css';

export const AllNotesView: FC<PropsWithChildren> = () => {
  const [noteEdit, setNoteEdit] = useState<NotesProps>();  
  const [openColor, setOpenColor] = useState({ state: false, idNote: 0 });  
  const [openAdd, setOpenAdd] = useState(false);

  const handleDblClick = (dataNote: NotesProps): void => setNoteEdit(dataNote);
  const handleEditNote = (dataNote: NotesProps): void => setNoteEdit(dataNote);
  const handleAddNote = (): void => setOpenAdd(true);

  const handleToggleColor = (idNote: number): void => setOpenColor({ state: !openColor.state, idNote });
  
  const Note = (el: NotesProps): ReactNode => (
    noteEdit?.id === el.id 
      ? <QuillEditNote {...el} /> 
      : <Typography variant='body1' padding="15px">{el.note}</Typography>
  );

  return (
    <ViewContain>
      <Stack flexDirection="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h2" color="text_light.main">All Notes</Typography>
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
          allNotesMockups.map((el) => (
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