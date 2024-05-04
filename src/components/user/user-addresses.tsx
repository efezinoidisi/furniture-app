import { Icons } from "@/lib/icons";
import { Address } from "@/types/shipping";
import Link from "next/link";
import AddressItem from "../shared/address-item";

type UserAddressesProps = {
  addresses: Array<Address>;
};

export default function UserAddresses({ addresses }: UserAddressesProps) {
  return (
    <section className="flex flex-col ">
      <h2 className="font-semibold text-charcoal capitalize text-2xl border-b mb-5 pb-5">
        all addresses
      </h2>
      <div>
        {addresses.length === 0 ? (
          <>no address added yet</>
        ) : (
          addresses.map((address) => (
            <address key={address.id}>
              <AddressItem {...address} />
            </address>
          ))
        )}
      </div>

      <Link
        href={"/address/new"}
        className="flex items-center gap-2 text-primary text-lg w-fit mt-7 self-end hover:text-green transition-colors ease-in-out"
      >
        <Icons.plus size={20} />
        <span>Add new address</span>
      </Link>
    </section>
  );
}
