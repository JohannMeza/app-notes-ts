import { FC, PropsWithChildren, useState } from 'react';
import { ViewComponent } from './categories-types';
import { NotesView } from './notes/NotesView';
import { MainView } from './main/MainView';

export const CategoriesView: FC<PropsWithChildren> = () => {
  const [stateView, setStateView] = useState<ViewComponent>(ViewComponent.MAIN);
  
  const View = {
    [ViewComponent.NOTES]: <NotesView setStateView={setStateView} />,
    [ViewComponent.MAIN]: <MainView setStateView={setStateView} />,
  };

  return (
    <>
      { View[stateView] }
    </>
  );
};