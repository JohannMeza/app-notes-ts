import { FC, PropsWithChildren } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AllNotesView } from './all-notes/AllNotesView';
import { CategoriesView } from './categories/CategoriesView';
import { NotfoundView } from './notfound/NotfoundView';
import { ArchivedView } from './archived/ArchivedView';

export const DashboardRouter: FC<PropsWithChildren> = () => (
  <Routes>
    <Route path='/all-notes' element={<AllNotesView />} />
    <Route path='/archived' element={<ArchivedView />} />
    <Route path='/categories' element={<CategoriesView />} />
    <Route path='/*' element={<NotfoundView />} />
  </Routes>
);