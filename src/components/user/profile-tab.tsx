import { mergeStyles } from "@/utils/style-helpers";
import Link from "next/link";
import Logout from "../navigation/logout";

const tabs = ["profile", "addresses", "orders"];

export default function ProfileTabs({
  currentTab,
}: {
  currentTab: "profile" | "orders" | "addresses";
}) {
  return (
    <div className="bg-white flex flex-col w-full md:min-w-56  gap-2 items-center ">
      {tabs.map((tab) => {
        const activeTab = tab === currentTab;

        return (
          <Link
            key={tab}
            href={`?t=${tab}`}
            className={mergeStyles(
              "capitalize shadow-md py-3 w-full block text-center text-lg hover:bg-secondary/40 transition-colors duration-200 ease-linear",
              activeTab && "bg-secondary text-white"
            )}
          >
            {tab}
          </Link>
        );
      })}
      <Logout />
    </div>
  );
}
