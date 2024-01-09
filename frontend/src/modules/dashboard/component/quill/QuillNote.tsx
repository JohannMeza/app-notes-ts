import { Box, IconButton } from '@mui/material';
import { useQuill } from 'react-quilljs';
import { Toolbar, formats } from '@src/shared/quill/Toolbar';
import { FC, useEffect } from 'react';
import { useNoteContext } from '@src/shared/hooks/useNoteContext';
import { NotesProps } from '../../dashboard-types';
import SaveIcon from '@mui/icons-material/Save';
import hljs from 'highlight.js';

export const QuillReadNote: FC<NotesProps> = (props) => {
  const { quill, quillRef } = useQuill({ 
    readOnly: true,
    modules: { 
      syntax: { highlight: (text: string) => hljs.highlightAuto(text).value }, 
      toolbar: false 
  }, formats });

  useEffect(() => { 
    if (quill) quill.setContents(props.note);
  }, [props.note, quill]);

  return (
    <Box height={1} display="grid" gridTemplateRows="1fr auto">
      <Box className="ql-quillContent" ref={quillRef}></Box>
    </Box>
  );
};

export const QuillEditNote: FC<NotesProps & { handleCloseEditNote: () => void }> = (props) => {
  const { action } = useNoteContext();
  const { quill, quillRef } = useQuill({ 
    modules: { 
      syntax: { highlight: (text: string) => hljs.highlightAuto(text).value }, 
      toolbar: Toolbar 
  }, formats });

  const handleEditNote = (): void => {
    action.handleEditNote({ ...props, note: quill.getContents(props.note) });
    props.handleCloseEditNote();
  };

  useEffect(() => { 
    if (quill) quill.setContents(props.note);
  }, [props.note, quill]);

  return (
    <>
      <IconButton
        color='primary' 
        size='small' 
        sx={{ position: 'absolute', bottom: 5, right: 5, zIndex: 1000 }}
        onClick={handleEditNote}
      >
        <SaveIcon />
      </IconButton>
      <Box height={1} display="grid" gridTemplateRows="1fr auto">
        <Box className="ql-quillContent" ref={quillRef}></Box>
      </Box>
    </>
  );
};

export const QuillAddNote: FC<{ archived: boolean, handleCloseAddNote: () => void }> = ({ archived, handleCloseAddNote }) => {
  const { action } = useNoteContext();
  const { quill, quillRef } = useQuill({ 
    modules: { 
      syntax: { highlight: (text: string) => hljs.highlightAuto(text).value }, 
      toolbar: Toolbar 
  }, formats });

  const handleAddNote = (): void => {
    action.handleAddNote(quill, archived);
    handleCloseAddNote();
  };

  useEffect(() => { 
    if (quill) quill.setText('');
  }, [quill]);

  return (
    <>
      <IconButton
        color='primary' 
        size='small' 
        sx={{ position: 'absolute', bottom: 5, right: 5, zIndex: 1000 }}
        onClick={handleAddNote}
      >
        <SaveIcon />
      </IconButton>
      <Box height={1} display="grid" gridTemplateRows="1fr auto">
        <Box className="ql-quillContent" ref={quillRef}></Box>
      </Box>
    </>
  );
};