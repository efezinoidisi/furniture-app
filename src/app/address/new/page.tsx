import NewShippingAddress from "@/components/address/new-address-form";
import PageHeader from "@/components/shared/page-header";
import { getUser } from "@/lib/actions/user";
import { redirect } from "next/navigation";

export default async function NewAddressPage() {
  const user = await getUser();

  if (!user) {
    redirect(`/login?from=address/new`);
  }
  return (
    <main className="">
      <PageHeader title="new address" />
      <NewShippingAddress />
    </main>
  );
}
