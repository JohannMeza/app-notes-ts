import { styled } from '@mui/material/styles';
import { Box, ClickAwayListener, Grow, IconButton, MenuItem, MenuList, Paper, Popper } from '@mui/material';
import { FC, useRef, useState } from 'react';
import { useNoteContext } from '@src/shared/hooks/useNoteContext';
import { NotesProps } from '../../dashboard-types';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

export const PopperContain = styled(Box)(() => ({
  position: 'absolute',
  top: 0,
  right: 0,
  zIndex: 1000
}));

export const PopperNote: FC<NotesProps & { handleEditNote: (prop: NotesProps) => void, handleToggleColor: (id: number) => void }> = (props) => {
  const [open, setOpen] = useState(false);
  const { action } = useNoteContext();
  const anchorRef = useRef<HTMLDivElement >(null);
  const handleToggle = (): void => setOpen((prevOpen) => !prevOpen);

  const handleClose = (event: Event | React.SyntheticEvent): void => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) return;
    setOpen(false);
  };
  
  const handleListKeyDown = (event: React.KeyboardEvent): void => {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  };

  const handleClicItem = (act: number): void => {
    setOpen(false);
    switch (act) {
      case 1: action.handleRemoveNote(props);
        break;
      case 2: props.handleEditNote(props);
        break;
      case 3: props.handleToggleColor(props.id);
        break;
      case 4: action.handleEditNote({ ...props, archived: true });
        break;
    };
  };

  return (
    <>
      <PopperContain className='popperButton' ref={anchorRef} position='absolute' top={0} right={0}>
        <IconButton 
          id="composition-button"
          aria-controls={open ? 'composition-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          onClick={handleToggle}
          aria-haspopup="true"
        >
          <MoreHorizIcon />
        </IconButton>
      </PopperContain>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        sx={{ zIndex: 1000 }}
        role={undefined}
        placement="bottom-end"
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom-start' ? 'left top' : 'left bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="composition-menu"
                  aria-labelledby="composition-button"
                  onKeyDown={handleListKeyDown}
                >
                  <MenuItem onClick={() => handleClicItem(2)}>Edit</MenuItem>
                  <MenuItem onClick={() => handleClicItem(1)}>Remove</MenuItem>
                  <MenuItem onClick={() => handleClicItem(3)}>Change color</MenuItem>
                  <MenuItem onClick={() => handleClicItem(4)}>Archive note</MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
     
      </Popper>
    </>
  );
};

export const PopperArchivedNote: FC<NotesProps & { handleEditNote: (prop: NotesProps) => void, handleToggleColor: (id: number) => void }> = (props) => {
  const [open, setOpen] = useState(false);
  const { action } = useNoteContext();
  const anchorRef = useRef<HTMLDivElement >(null);
  const handleToggle = (): void => setOpen((prevOpen) => !prevOpen);

  const handleClose = (event: Event | React.SyntheticEvent): void => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) return;
    setOpen(false);
  };
  
  const handleListKeyDown = (event: React.KeyboardEvent): void => {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  };

  const handleClicItem = (act: number): void => {
    setOpen(false);
    switch (act) {
      case 1: action.handleRemoveNote(props);
        break;
      case 2: props.handleEditNote(props);
        break;
      case 3: props.handleToggleColor(props.id);
        break;
      case 4: action.handleEditNote({ ...props, archived: false });
        break;
    };
  };

  return (
    <>
      <PopperContain className='popperButton' ref={anchorRef} position='absolute' top={0} right={0}>
        <IconButton 
          id="composition-button"
          aria-controls={open ? 'composition-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          onClick={handleToggle}
          aria-haspopup="true"
        >
          <MoreHorizIcon />
        </IconButton>
      </PopperContain>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        sx={{ zIndex: 1000 }}
        role={undefined}
        placement="bottom-end"
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom-start' ? 'left top' : 'left bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="composition-menu"
                  aria-labelledby="composition-button"
                  onKeyDown={handleListKeyDown}
                >
                  <MenuItem onClick={() => handleClicItem(2)}>Edit</MenuItem>
                  <MenuItem onClick={() => handleClicItem(1)}>Remove</MenuItem>
                  <MenuItem onClick={() => handleClicItem(3)}>Change color</MenuItem>
                  <MenuItem onClick={() => handleClicItem(4)}>Unarchive note</MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
     
      </Popper>
    </>
  );
};
