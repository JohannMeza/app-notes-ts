import { Box, IconButton } from '@mui/material';
import { useQuill } from 'react-quilljs';
import { Toolbar, formats } from '@src/shared/quill/Toolbar';
import { FC, PropsWithChildren, useEffect } from 'react';
import { useNoteContext } from '@src/shared/hooks/useNoteContext';
import { NotesProps } from '../../dashboard-types';
import SaveIcon from '@mui/icons-material/Save';
import hljs from 'highlight.js';

export const QuillEditNote: FC<NotesProps> = (props) => {
  const { action } = useNoteContext();
  const { quill, quillRef } = useQuill({ 
    modules: { 
      syntax: { highlight: (text: string) => hljs.highlightAuto(text).value }, 
      toolbar: Toolbar 
  }, formats });

  useEffect(() => { 
    if (quill) quill.setText(props.note);
  }, [props.note, quill]);

  return (
    <>
      <IconButton
        color='primary' 
        size='small' 
        sx={{ position: 'absolute', bottom: 5, right: 5, zIndex: 1000 }}
        onClick={() => action.handleEditNote(props)}
      >
        <SaveIcon />
      </IconButton>
      <Box height={1} display="grid" gridTemplateRows="1fr auto">
        <Box className="ql-quillContent" ref={quillRef}></Box>
      </Box>
    </>
  );
};

export const QuillAddNote: FC<PropsWithChildren> = () => {
  const { action } = useNoteContext();
  const { quill, quillRef } = useQuill({ 
    modules: { 
      syntax: { highlight: (text: string) => hljs.highlightAuto(text).value }, 
      toolbar: Toolbar 
  }, formats });

  useEffect(() => { 
    if (quill) quill.setText('');
  }, [quill]);

  return (
    <>
      <IconButton
        color='primary' 
        size='small' 
        sx={{ position: 'absolute', bottom: 5, right: 5, zIndex: 1000 }}
        onClick={() => action.handleAddNote(quill)}
      >
        <SaveIcon />
      </IconButton>
      <Box height={1} display="grid" gridTemplateRows="1fr auto">
        <Box className="ql-quillContent" ref={quillRef}></Box>
      </Box>
    </>
  );
};