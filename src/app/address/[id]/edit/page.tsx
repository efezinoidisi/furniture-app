import EditShippingAddress from "@/components/address/edit-address";
import { getAddress, getUser } from "@/lib/actions/user";
import { redirect } from "next/navigation";

type EditAddressPageProps = {
  params: {
    id: string;
  };
};

export default async function EditAddressPage({
  params: { id },
}: EditAddressPageProps) {
  const user = await getUser();

  const address = await getAddress(id);

  if (!id) {
    throw new Error("no address provided");
  }

  if (!user) {
    redirect(`/login?from=address/${id}/edit`);
  }
  return (
    <div>
      <EditShippingAddress id={id} initialValues={address} />
    </div>
  );
}
