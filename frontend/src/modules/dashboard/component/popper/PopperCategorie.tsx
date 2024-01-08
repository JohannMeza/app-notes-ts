import { styled } from '@mui/material/styles';
import { Box, ClickAwayListener, Grow, IconButton, MenuItem, MenuList, Paper, Popper } from '@mui/material';
import { FC, MouseEvent, useRef, useState } from 'react';
import { useCategorieContext } from '@src/shared/hooks/useCategorieContext';
import { CategoriesProps } from '../../categories/main/main-types';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

export const PopperContain = styled(Box)(() => ({
  position: 'absolute',
  top: 0,
  right: 0,
  zIndex: 1000
}));

export const PopperCategorie: FC<CategoriesProps & { setCategorieEdit: (prop: CategoriesProps) => void }> = (props) => {
  const [open, setOpen] = useState(false);
  const { action } = useCategorieContext();
  const anchorRef = useRef<HTMLDivElement >(null);
  const handleToggle = (e: MouseEvent): void => {
    e.stopPropagation();
    setOpen((prevOpen) => !prevOpen);
  };

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

  const handleClicItem = (e: MouseEvent, act: number): void => {
    setOpen(false);
    e.stopPropagation();
    switch (act) {
      case 1: props.setCategorieEdit(props);
        break;
      case 2: action.handleRemoveCategorie(props);
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
                  <MenuItem onClick={(e) => handleClicItem(e, 1)}>Edit</MenuItem>
                  <MenuItem onClick={(e) => handleClicItem(e, 2)}>Remove</MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
     
      </Popper>
    </>
  );
};
