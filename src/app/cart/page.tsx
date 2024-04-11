import Back from "@/components/buttons/back";
import List from "@/components/cart/list";
import OrderSummary from "@/components/cart/order-summary";
import PageHeader from "@/components/shared/page-header";

export default async function CartPage() {
  return (
    <main className="">
      <Back className="ml-2 md:hidden" />

      <PageHeader title="cart" />
      <div className="page-size">
        <div className="grid md:grid-cols-3 gap-6">
          <List />
          <OrderSummary />
        </div>
      </div>
    </main>
  );
}
