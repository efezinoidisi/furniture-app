import {
  CartAction,
  CartActionType,
  QuantityAction,
  StateType,
} from '@/types/reducers';

export function cartReducer(state: StateType, action: CartActionType) {
  const { type, payload } = action;

  switch (type) {
    case CartAction.ADD_TO_CART: {
      return [{ ...payload, quantity: 1 }, ...state];
    }
    case CartAction.REMOVE_FROM_CART: {
      const newState = state.filter((item) => item.id !== payload.id);
      return newState;
    }

    case QuantityAction.INCREASE_QUANTITY: {
      const product = state?.find((item) => item.id === payload);

      const quantity = product?.quantity ? product.quantity + 1 : 1;
      return state.map((item) => {
        return item.id === product?.id
          ? {
              ...item,
              quantity,
            }
          : item;
      });
    }
    case QuantityAction.REDUCE_QUANTITY: {
      const product = state?.find((item) => item.id === payload) ?? null;

      // only decrease quantity when it is greater than 1

      const quantity =
        product?.quantity && product?.quantity > 1 ? product?.quantity - 1 : 1;

      return state.map((item) => {
        return item.id === product?.id
          ? {
              ...item,
              quantity,
            }
          : item;
      });
    }

    case 'UPDATE_LIST': {
      return payload;
    }
    default: {
      return state;
    }
  }
}
