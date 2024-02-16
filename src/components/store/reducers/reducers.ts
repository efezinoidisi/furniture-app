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
      const cartItem = state.find((item) => item.product.id === payload.id);

      if (cartItem) {
        return state.map((product) => {
          if (product.product.id === payload.id) {
            return { product: product.product, quantity: product.quantity + 1 };
          }
          return product;
        });
      }
      return [{ product: payload, quantity: 1 }, ...state];
    }
    case CartAction.REMOVE_FROM_CART: {
      const newState = state.filter((item) => item.product.id !== payload.id);
      return newState;
    }

    case QuantityAction.INCREASE_QUANTITY: {
      const product = state?.find((item) => item.product.id === payload);

      const quantity = product?.quantity ? product.quantity + 1 : 1;
      return state.map((item) => {
        return item.product.id === product?.product.id
          ? {
              product: item.product,
              quantity,
            }
          : item;
      });
    }
    case QuantityAction.REDUCE_QUANTITY: {
      const product =
        state?.find((item) => item.product.id === payload) ?? null;

      // only decrease quantity when it is greater than 1

      const quantity =
        product?.quantity && product?.quantity > 1 ? product?.quantity - 1 : 1;

      return state.map((item) => {
        return item.product.id === product?.product.id
          ? {
              product: item.product,
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
