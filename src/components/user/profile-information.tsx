import Link from "next/link";

type ProfileInformationProps = {
  username?: string;
  email?: string;
  created_at: string;
};

export default function ProfileInformation({
  username,
  email,
  created_at,
}: ProfileInformationProps) {
  const dateRegistered = new Date(created_at).toLocaleDateString("en-us", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  const profileInformation = [
    {
      id: 0,
      title: "email",
      value: email,
    },
    {
      id: 1,
      title: "username",
      value: username || "-",
    },
    {
      id: 2,
      title: "join date",
      value: dateRegistered,
    },
  ];
  return (
    <div className=" px-3">
      <h3 className="text-xl text-teal-600">Profile Information</h3>
      <ul className="space-y-1 border-y border-grey-100/20 py-3 my-7">
        {profileInformation.map(({ id, title, value }) => (
          <li key={id}>
            <span className="min-w-24 inline-block capitalize text-lg">
              {title}:{" "}
            </span>
            <span>{value}</span>
          </li>
        ))}
      </ul>

      <Link href={""}>edit profile</Link>
    </div>
  );
}
