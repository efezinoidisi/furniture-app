import { CartItem, ProductType } from './product';

export enum CartAction {
  ADD_TO_CART = 'ADD_TO_CART',
  REMOVE_FROM_CART = 'REMOVE_FROM_CART',
}

export enum QuantityAction {
  INCREASE_QUANTITY = 'INCREASE_QUANTITY',
  REDUCE_QUANTITY = 'REDUCE_QUANTITY',
}

type UpdateItem = {
  type: CartAction;
  payload: ProductType;
};

type UpdateQuantity = {
  type: QuantityAction;
  payload: number;
};

type UpdateList = {
  type: 'UPDATE_LIST';
  payload: CartItem[];
};
export type CartActionType = UpdateItem | UpdateList | UpdateQuantity;

export type StateType = CartItem[] | [];
