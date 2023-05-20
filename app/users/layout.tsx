import getUsers from "../actions/getUsers";
import SiderBar from "../components/siderbar/SiderBar";
import UserList from "./components/UserList";

export default async function UsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const users = await getUsers();
  return (
    // @ts-expect-error Server Component
    <SiderBar>
      <UserList items={users} />
      <div className="h-full">{children}</div>;
    </SiderBar>
  );
}
