import ProfileInformation from "@/components/user/profile-information";
import ProfileTabs from "@/components/user/profile-tab";
import createSupabaseServerClient from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type ProfilePageProps = {
  searchParams: {
    t?: "profile" | "address" | "orders"; // tab
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

  return (
    <section className="grid md:grid-cols-[auto_1fr] gap-9 px-5">
      {/* tab navigation */}
      <ProfileTabs currentTab={t} />

      {/* user profile information */}
      {t === "profile" ? (
        <ProfileInformation
          username={user.user_metadata.user_name || user.user_metadata.name}
          email={user.email}
          created_at={user.created_at}
        />
      ) : null}
    </section>
  );
}

const tabs = ["profile", "address", "orders"];
