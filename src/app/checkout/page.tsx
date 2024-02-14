import BreadCrump from '@/components/breadcrumb/breadcrump';
import Back from '@/components/buttons/back';
import OrderPreview from '@/components/checkout/order-preview';
import ShippingDetails from '@/components/checkout/shipping-details';
import { ProductType } from '@/types/product';
import { getProduct } from '@/utils/helper-functions';

type CheckoutPageprops = {
  searchParams: { id?: string };
};

export default async function CheckoutPage(props: CheckoutPageprops) {
  const {
    searchParams: { id = '' },
  } = props;

  let product: ProductType | null = null;

  if (id) {
    product = (await getProduct(id)) as ProductType;
  }
  return (
    <main className='page-size flex flex-col gap-y-3'>
      <Back />
      <h2 className='font-bold capitalize font-fira-code text-2xl'>checkout</h2>
      <BreadCrump
        items={[
          { path: '/cart', title: 'cart' },
          { path: '/checkout', title: 'checkout' },
        ]}
      />
      <section className='grid md:grid-cols-2 gap-x-10 gap-y-9'>
        <ShippingDetails />
        <OrderPreview product={product} />
      </section>
    </main>
  );
}
