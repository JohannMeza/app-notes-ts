import { FC, ReactNode } from 'react';
import { CardContain } from './card-styles';
import { ColorsCardEnum } from '@src/modules/dashboard/dashboard-types';

interface CardProps {
  children: ReactNode
  color: ColorsCardEnum
  onDoubleClick: () => void
}

export const Card: FC<CardProps> = ({ children, color, onDoubleClick }) => (
  <CardContain color={color} onDoubleClick={onDoubleClick}>
    {children}
  </CardContain>
);