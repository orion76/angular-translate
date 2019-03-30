import { MenuItem } from 'primeng/components/common/menuitem';

export interface IMenuProps {
  menuId: string;
}
export type TMenuPlace = 'right' | 'middle' | 'left';

export type IMenuMainItems = {
  [key in TMenuPlace]: MenuItem
}



export interface IMenuState {
  place: TMenuPlace,
  path?: string[];
  id?: string,
  weight?: number,
  item?: MenuItem;
}
