import {IMenuItem} from '@app-library/menu-main/types';

export interface IMenuProps {
  menuId: string;
}

export type TMenuPlace = 'right' | 'middle' | 'left';

export type IMenuMainItems = {
  [key in TMenuPlace]: IMenuItem
};


export interface IMenuState {
  menuName: string;
  path?: string[];
  id?: string;
  item?: IMenuItem;
}
