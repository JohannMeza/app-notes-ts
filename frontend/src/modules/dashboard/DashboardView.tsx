import { SidebarView } from '@src/shared/layout/sidebar/Sidebar';
import { FC, PropsWithChildren, useState } from 'react';
import { DashboardRouter } from './dashboard-router';
import { DashboardBody, DashboardContain, DashboardContent } from './dashboard-styles';
import { Appbar } from '@src/shared/layout/appbar/Appbar';

export const DashboardView: FC<PropsWithChildren> = () => {
  const [openSidebar, setOpenSidebar] = useState(false);
  const handleActiveSidevar = (): void => setOpenSidebar(!openSidebar);

  return (
    <DashboardContain open={openSidebar}>
      <SidebarView open={openSidebar} />
      <DashboardContent>
        <Appbar handleOpen={handleActiveSidevar} />
        <DashboardBody>
          <DashboardRouter />
        </DashboardBody>
      </DashboardContent>
    </DashboardContain>
  );
};