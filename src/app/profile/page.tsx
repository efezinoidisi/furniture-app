import PageHeader from "@/components/shared/page-header";
import ProfileInformation from "@/components/user/profile-information";
import ProfileTabs from "@/components/user/profile-tab";
import UserAddresses from "@/components/user/user-addresses";
import Orders from "@/components/user/user-orders";
import { getShippingDetails } from "@/lib/actions/data";
import createSupabaseServerClient from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type ProfilePageProps = {
  searchParams: {
    t?: "profile" | "addresses" | "orders"; // tab
  };
};

export default async function ProfilePage({
  searchParams: { t = "profile" },
}: ProfilePageProps) {
  const cookieStore = cookies();

  const supabase = await createSupabaseServerClient(cookieStore);
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (!user?.id || error) {
    redirect("/login?from=profile");
  }

  const addresses = (await getShippingDetails()) ?? [];

  const tabs = {
    profile: (
      <ProfileInformation
        username={user.user_metadata.user_name || user.user_metadata.name}
        email={user.email}
        created_at={user.created_at}
      />
    ),

    addresses: <UserAddresses addresses={addresses} />,
    orders: <Orders addresses={addresses} />,
  };

  return (
    <main>
      <PageHeader title="profile" />
      {/* tab navigation */}
      <section className="space-y-9 md:grid md:grid-cols-[auto_1fr] gap-9 page-size md:space-y-0">
        <ProfileTabs currentTab={t} />

        {tabs[t]}
      </section>
    </main>
  );
}
