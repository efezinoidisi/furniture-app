import Back from "@/components/buttons/back";
import PageHeader from "@/components/shared/page-header";
import WishList from "@/components/wishlist/list";

export default function WishlistPage() {
  return (
    <main className="pb-4">
      <Back className="ml-2 md:hidden" />

      <PageHeader title="wishlist" />
      <div>
        <WishList />
      </div>
    </main>
  );
}
