'use client';

import OrderSummary from '../cart/order-summary';
import useCart from '../store/contexts/cart-context';

export default function OrderPreview() {
  const { cart } = useCart();
  if (!cart || cart.length === 0) return null;
  return (
    <div className='md:w-3/4 md:mx-auto'>
      <OrderSummary />
    </div>
  );
}
