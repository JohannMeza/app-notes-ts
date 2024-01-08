/* eslint-disable jsx-a11y/no-autofocus */
import { IconButton, Stack, Typography } from '@mui/material';
import { FC, useState } from 'react';
import { CardCategorie, GridContain } from './main-styles';
import { CategoriesMockups } from './main-mockups';
import { ViewComponent } from '../categories-types';
import { ViewContain } from '../../dashboard-styles';
import { Controls } from '@src/shared/components/Controls';
import { PopperCategorie } from '../../component/popper/PopperCategorie';
import AddIcon from '@mui/icons-material/Add';
import { CategoriesProps } from './main-types';

interface MainProps {
  setStateView: (prop: ViewComponent) => void
}

export const MainView: FC<MainProps> = ({ setStateView }) => {
  const [categorieEdit, setCategorieEdit] = useState<CategoriesProps>();  
  const [openAdd, setOpenAdd] = useState(false);

  const handleClickCategorie = (): void => setStateView(ViewComponent.NOTES);
  const handleAddCategorie = (): void => {
    setOpenAdd(true);
  };
  
  return (
    <ViewContain>
      <Stack flexDirection="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h2" color="text_light.main">Categories</Typography>
        <IconButton color='primary' onClick={handleAddCategorie}>
          <AddIcon />
        </IconButton>
      </Stack>
      <GridContain>
        <CardCategorie onClick={() => setOpenAdd(true)}>
          {
            openAdd 
              ? <Controls.Input variant='transparent' autoFocus={true} sx={{ textAlign: 'center' }} placeholder='Ingrese categoria' />
              : <AddIcon fontSize='large' color='secondary' />
          }
        </CardCategorie>
        {
          CategoriesMockups.map((el) => (
            <CardCategorie key={el.id} onClick={() => categorieEdit?.id !== el.id && handleClickCategorie()}>
              <PopperCategorie {...el} setCategorieEdit={setCategorieEdit} />
              {
                categorieEdit?.id === el.id 
                  ? <Controls.Input variant='transparent' autoFocus={true} sx={{ textAlign: 'center' }} placeholder='Ingrese categoria' />
                  : <Typography variant='h2' color="text_light.main">{el.categorie}</Typography>
              }
            </CardCategorie>
          ))
        }
      </GridContain>
    </ViewContain>
  );
};