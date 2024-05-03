import Back from "@/components/buttons/back";
import OrderPreview from "@/components/checkout/order-preview";
import ShippingDetails from "@/components/checkout/shipping-details";
import PageHeader from "@/components/shared/page-header";
import { getProduct, getShippingDetails } from "@/lib/actions/data";
import { getUser } from "@/lib/actions/user";
import { ProductType } from "@/types/product";
import { redirect } from "next/navigation";

type CheckoutPageprops = {
  searchParams: { id?: string };
};

export default async function CheckoutPage(props: CheckoutPageprops) {
  const {
    searchParams: { id = "" },
  } = props;

  let product: ProductType | null = null;

  if (id) {
    product = (await getProduct(id)) as ProductType;
  }
  const user = await getUser();

  if (!user) {
    redirect("/login?from=checkout");
  }

  const addresses = await getShippingDetails();

  return (
    <main className="flex flex-col gap-y-3">
      <PageHeader title={"checkout"} />
      <Back className="px-5 md:px-14 mb-3" />
      <section className="grid md:grid-cols-2 gap-x-10 gap-y-9 px-5 md:px-14 lg:px-20">
        <ShippingDetails addresses={addresses || []} />
        <OrderPreview product={product} />
      </section>
    </main>
  );
}
