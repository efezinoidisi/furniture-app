import BreadCrump from '@/components/breadcrumb/breadcrump';
import Back from '@/components/buttons/back';
import List from '@/components/cart/list';
import OrderSummary from '@/components/cart/order-summary';

const breadCrump = [
  {
    path: '/cart',
    title: 'cart',
  },
];

export default async function CartPage() {
  return (
    <main className='page-size'>
      <Back />
      <h2 className='sr-only'>cart</h2>
      <BreadCrump items={breadCrump} />
      <div className='grid md:grid-cols-3 gap-6'>
        <List />
        <OrderSummary />
      </div>
    </main>
  );
}
