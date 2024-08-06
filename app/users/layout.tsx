import getUsers from "actions/getUsers";
import Sidebar from "components/sidebar/Sidebar";
import UserList from "./components/UserList";

export default async function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const users = await getUsers();
  console.log(users);

  return (
    <div className="h-full">
      <UserList items={users!} />
      <Sidebar>{children}</Sidebar>
    </div>
  );
}
