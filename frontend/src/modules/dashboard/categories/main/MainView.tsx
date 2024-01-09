/* eslint-disable jsx-a11y/no-autofocus */
import { IconButton, Stack, Typography } from '@mui/material';
import { ChangeEvent, FC, MouseEvent, useEffect, useState } from 'react';
import { CardCategorie, GridContain } from './main-styles';
import { ViewComponent } from '../categories-types';
import { ViewContain } from '../../dashboard-styles';
import { Controls } from '@src/shared/components/Controls';
import { PopperCategorie } from '../../component/popper/PopperCategorie';
import { CategoriesProps } from './main-types';
import { useCategorieContext } from '@src/shared/hooks/useCategorieContext';
import AddIcon from '@mui/icons-material/Add';

interface MainProps { 
  setStateView: (prop: ViewComponent) => void
}

const initialState = { categorie: '' };

export const MainView: FC<MainProps> = ({ setStateView }) => {
  const { state, action } = useCategorieContext();
  const [form, setForm] = useState(initialState);
  const [categorieEdit, setCategorieEdit] = useState<CategoriesProps>();  
  const [openAdd, setOpenAdd] = useState(false);

  const handleChangeForm = ({ target }: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
    const { value, name } = target;
    const letter = { ...form, [name]: value };
    setForm(letter);
  };
  const handleClickCategorie = (el: CategoriesProps): void => {
    setStateView(ViewComponent.NOTES);
    action.setSelectCategory(el);
  };
  
  const handleChangeEdit = (prop: CategoriesProps): void => {
    setCategorieEdit(prop);
    setForm({ categorie: prop.categorie });
    setOpenAdd(false);
  };

  const handleAddCategorie = (e: MouseEvent<HTMLButtonElement | HTMLInputElement>): void => {
    const target = e.target as HTMLElement;
    if (target.nodeName === 'BUTTON') return;
    setOpenAdd(true);
    setForm({ categorie: '' });
    setCategorieEdit({ categorie: '', id: null });
  };
  
  useEffect(() => {
    action.fetchCategories();
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ViewContain>
      <Stack flexDirection="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h2" color="text_light.main">Categories</Typography>
        <IconButton color='primary' onClick={handleAddCategorie}>
          <AddIcon />
        </IconButton>
      </Stack>
      <GridContain>
        <CardCategorie onClick={handleAddCategorie} onKeyDown={(e) => e.isPropagationStopped()}>
          {
            openAdd 
              ? <Controls.Input 
                  variant='transparent' 
                  autoFocus={true} 
                  value={form.categorie}
                  sx={{ textAlign: 'center' }} 
                  onSubmit={(e) => console.log(e)}
                  placeholder='Ingrese categoria'
                  onChange={handleChangeForm}
                  name='categorie'
                  onBlur={() => {
                    if (!form.categorie.trim()) {
                      setCategorieEdit({ categorie: '', id: null });
                      setOpenAdd(false);
                      return;
                    };
                    
                    action.handleAddCategorie(form);
                    setCategorieEdit({ categorie: '', id: null });
                    setOpenAdd(false);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      if (!form.categorie.trim()) {
                        setCategorieEdit({ categorie: '', id: null });
                        setOpenAdd(false);
                        return;
                      };

                      action.handleAddCategorie(form);
                      setOpenAdd(false);
                    }
                  }}
                />
              : <AddIcon 
                  fontSize='large' 
                  color='secondary' 
                />
          }
        </CardCategorie>
        {
          state.categories.map((el) => (
            <CardCategorie key={el.id} onClick={() => categorieEdit?.id !== el.id && handleClickCategorie(el)}>
              <PopperCategorie {...el} handleChangeEdit={handleChangeEdit} />
              {
                categorieEdit?.id === el.id 
                  ? <Controls.Input 
                      variant='transparent' 
                      autoFocus={true} 
                      value={form.categorie}
                      sx={{ textAlign: 'center' }} 
                      placeholder='Ingrese categoria' 
                      onChange={handleChangeForm}
                      name='categorie'
                      onBlur={() => {
                        if (!form.categorie.trim()) {
                          setCategorieEdit({ categorie: '', id: null });
                          setOpenAdd(false);
                          return;
                        };

                        action.handleEditCategorie({ ...el, ...form });
                        setCategorieEdit({ categorie: '', id: null });
                        setOpenAdd(false);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          if (!form.categorie.trim()) {
                            setCategorieEdit({ categorie: '', id: null });
                            setOpenAdd(false);
                            return;
                          };

                          action.handleEditCategorie({ ...el, ...form });
                          setCategorieEdit({ categorie: '', id: null });
                          setOpenAdd(false);
                        }
                  }}
                    />
                  : <Typography variant='h2' color="text_light.main">{el.categorie}</Typography>
              }
            </CardCategorie>
          ))
        }
      </GridContain>
    </ViewContain>
  );
};